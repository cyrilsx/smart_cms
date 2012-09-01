
Filters = {};
Filters.getPixels = function(context, img) {
    context.drawImage(img, 0,0);
    return context.getImageData(0,0,img.width,img.height);
};

Filters.filterImage = function(filter, context, image, var_args) {
    var args = [this.getPixels(context, image)];
    for (var i=2; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

Filters.blur = function (passes, context, element) {
    var i, x, y;
    context.globalAlpha =    0.125;
    // Loop for each blur pass.
    for (i = 1; i <= passes; i += 1) {
        for (y = -1; y < 2; y += 1) {
            for (x = -1; x < 2; x += 1) {
                // Place eight versions of the image over the original
                // image, each with 1/8th of full opacity. The images are
                // placed around the original image like a square filter.
                // This gives the impression the image has been blurred,
                // but it's done at native browser speed, thus making it
                // much faster than writing a proper blur filter in
                // Javascript.
                context.drawImage(element, 0, 0);
            }
        }
    }
    context.globalAlpha = 1.0;
}

Filters.tmpCanvas = document.createElement('canvas');
Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

Filters.createImageData = function(w,h) {
      return this.tmpCtx.createImageData(w,h);
};

Filters.convolute = function(pixels, weights, opaque) {
  var side = Math.round(Math.sqrt(weights.length));
  var halfSide = Math.floor(side/2);
  var src = pixels.data;
  var sw = pixels.width;
  var sh = pixels.height;
  // pad output by the convolution matrix
  var w = sw;
  var h = sh;
  var output = Filters.createImageData(w, h);
  var dst = output.data;
  // go through the destination image pixels
  var alphaFac = opaque ? 1 : 0;
  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      // calculate the weighed sum of the source image pixels that
      // fall under the convolution matrix
      var r=0, g=0, b=0, a=0;
      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;
          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
};
