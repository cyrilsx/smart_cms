

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
    canvas = createCanvasHeader('anim-header', 'letter-anim');  
    canvasBuf = createCanvasHeader('anim-header-buf', 'letter-anim-buf');  
    var width = document.documentElement.clientWidth || document.body.clientWidth;
    canvas.witdh = width;
    canvas.height = 100;

    textAnim = new Three3DTextAnimationContext(canvas, canvasBuf, 50, 10, 500);    
    setInterval(textAnim.draw, textAnim.timeframe);


}

function createCanvasHeader(id, className) {
    var header = document.querySelector('header');
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', id);
    canvas.className += className;
    header.appendChild(canvas); 
    return canvas;
}

function showMenu() {
    var showMenuBtn = document.getElementById('showMenuBtn');
    var hideMenuBtn = document.getElementById('hideMenuBtn');
    showMenuBtn.style.visibility = "hidden";
    hideMenuBtn.style.visibility = "visible";
    var menu = document.getElementById('menu');
    menu.style.visibility = "visible";
    menuBtn = document.getElementById('menuBtn');
    menuBtn.style.visibility = "visible";
}


function hideMenu() {
    var showMenuBtn = document.getElementById('showMenuBtn');
    var hideMenuBtn = document.getElementById('hideMenuBtn');
    var menu = document.getElementById('menu');
    var menuBtn = document.getElementById('menuBtn');
    hideMenuBtn.style.visibility = "hidden";
    showMenuBtn.style.visibility = "visible";
    menu.style.visibility = "hidden";
    menuBtn.style.visibility = "visible";
}




document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        // call init()
        //init();
        animateBanner();
        hideMenu();
    }
}
