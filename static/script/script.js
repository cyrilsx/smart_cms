

function init() {
    var canvas = document.getElementById('canvas');
    canvas.witdh = 800;
    canvas.height = 800;

    var views= [
            new AnonymousPictureView(-10, 400, 100, 150, "/static/img/anim_bg/anonymous_character.jpg", 3, 20, 30, -8),
            new AnonymousPictureView(-180, 50, 150, 150, "/static/img/anim_bg/net_character.png", 3, -20, 30, 8),
            new AnonymousPictureView(-300, 45, 150, 150, "/static/img/anim_bg/ski_character.png", 3, 10, 30, -3),
        ];

    anim = new AnimationContext(canvas, canvas.width, canvas.height, 10, views);
    

    var imageData = anim.context.getImageData(0,0,canvas.width,canvas.height);
    Filters.filterImage(Filters.convolute, anim.context, canvas,
            [ 2/9, 2/9, 2/9,
            2/9, 2/9, 2/9,
            2/9, 2/9, 2/9 ]
     );


    setInterval(anim.draw, anim.timeframe);
    return anim;
}


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


document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        // call init()
        init();
    }
}
