

function init() {
    var canvas = document.getElementById('canvas');
    canvas.witdh = 1024;
    canvas.height = 768;

    var views= [
            new AnonymousPictureView(-10, 400, 100, 150, "/static/img/anim_bg/anonymous_character.jpg", 3, 20, 30, -4),
            new AnonymousPictureView(-180, 350, 100, 150, "/static/img/anim_bg/net_character.png", 3, -20, 30, 4),
            new AnonymousPictureView(-300, 450, 100, 150, "/static/img/anim_bg/ski_character.png", 3, 10, 30, -2),
        ];

    anim = new AnimationContext(canvas, canvas.width, canvas.height, 10, views);
    

    var imageData = anim.context.getImageData(0,0,canvas.width,canvas.height);
        //Filters.filterImage(Filters.convolute, anim.context, canvas,
        //        [ 1/9, 1/9, 1/9,
        //        1/9, 1/9, 1/9,
        //        1/9, 1/9, 1/9 ]
        // );


    setInterval(anim.draw, anim.timeframe);
    return anim;
}

function animateBanner() {
    canvas = createCanvasHeader('anim-header', "100%", "100px");  
    


}

function createCanvasHeader(id, canvasWidth, canvasHeight) {
    var canvasDiv = document.getElementById('header');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas); 
    return canvas;
}




document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        // call init()
        //init();
    }
}
