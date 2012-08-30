

function init() {
    canvas = document.getElementById('canvas');
    var views= [
            new RectView(10, 10, 100, 50, "#f00"),
            new CircleView(50, 100, 100, "#0f0")
        ];

    var anim = new AnimationContext(canvas, 500, 200, 10, views);
    setInterval(anim.draw(), anim.timeframe);
    return anim;
}




document.onreadystatechange=function(){
    if (document.readyState=="complete"){
        // call init()
        init();
    }
}
