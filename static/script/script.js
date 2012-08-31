

function init() {
    canvas = document.getElementById('canvas');
    rect = new RectView(10, 10, 100, 50, "#f00");
    rect.speedx = 10;
    var views= [
            rect,
            //new RectView(10, 10, 100, 50, "#f00"),
            new CircleView(50, 100, 100, "#0f0"),
            new ImageView(10, 10, "/static/icon/bg.jpg",98, 48),
        ];

    anim = new AnimationContext(canvas, 500, 200, 10, views);
    setInterval(anim.draw, anim.timeframe);
    return anim;
}




document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        // call init()
        init();
    }
}
