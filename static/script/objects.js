

function View() {

    this.draw = function(context) {
    }
}


function CircleView(radius, x, y, color) {

    this.prototype = new View();
    this.prototype.constructor = CircleView;

    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;

    this.draw = function(context) {
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

}

function RectView(x, y, width, height, color) {
    this.prototype = new View();
    this.prototype.constructor = RectView;
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.border_color = null;
    this.line_width = 0;
    
    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        if(this.border_color != null) {
            context.strokeStyle = this.border_color;
            context.lineWidth   = this.line_widthis.line_widthh;
            context.strokeRect(this.x,  this.y, this.width, this.height);
        }
    }
}


function AnimationContext(canvas, width, height, timeframe,array_views) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.views = array_views;
    this.timeframe = timeframe;
    this.context = this.canvas.getContext("2d");

    this.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);

    }

    this.draw = function() {
        this.clear();

        for(var i = 0; i < this.views.length; i++) {
            this.views[i].draw(this.context);
        }
    }

}
