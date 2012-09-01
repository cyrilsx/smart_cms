

function View() {

    this.draw = function(context) {
    }

    this.animate = function() {
    }
}


function CircleView(radius, x, y, color) {

    this.prototype = new View();
    this.prototype.constructor = CircleView;

    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;

    this.speedx = 0; // px/s 
    this.speedy = 0; // px/s 

    this.draw = function(context) {
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    }

    this.animate = function(timeframe) {
        this.x += (timeframe * this.speedx) / 1000;
        this.y += (timeframe * this.speedy) / 1000;
    }

}

function RectView(x, y, width, height, color) {
    this.prototype = new View();
    this.prototype.constructor = RectView;
    
    this.x = x;
    this.y = y;
    this.translatex = 0;
    this.translatey = 0;
    this.width = width;
    this.height = height;
    this.color = color;

    this.border_color = null;
    this.line_width = 0;
    
    this.rot = 0;
    
    this.speedx = 0; // px/s 
    this.speedy = 0; // px/s 
    
    this.draw = function(context) {
        context.rotate(this.rot * Math.PI / 180);
        context.translate(this.translatex, this.translatey)
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        if(this.border_color != null) {
            context.strokeStyle = this.border_color;
            context.lineWidth   = this.line_widthis.line_widthh;
            context.strokeRect(this.x,  this.y, this.width, this.height);
        }
    }
    
    this.animate = function(timeframe) {
        this.translatex += (timeframe * this.speedx) / 1000;
        this.translatey += (timeframe * this.speedy) / 1000;
    }
}

function ImageView(x, y, image, width, height) {
    this.prototype = new View();
    this.prototype.constructor = ImageView;
    
    this.x = x;
    this.y = y;
    this.translatex = 0;
    this.translatey = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.rot = 0;
    
    this.speedx = 0; // px/s 
    this.speedy = 0; // px/s 
    
    this.draw = function(context) {
        context.rotate(this.rot * Math.PI / 180);
        context.translate(this.translatex, this.translatey)
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    
    this.animate = function(timeframe) {
        this.translatex += (timeframe * this.speedx) / 1000;
        this.translatey += (timeframe * this.speedy) / 1000;
    }

}


function AnonymousPictureView(x, y, width, height, image, border_weight, rotation, speedx, speedy) {
    
    this.prototype = new View();
    this.prototype.constructor = AnonymousPictureView;

    this.border_w = border_weight;
    this.imageView = new ImageView(x + this.border_w, y + this.border_w, image, width - (2 * this.border_w), height - this.border_w - 10);
    //this.imageView.rot = rotation;
    this.frame = new RectView(x, y, width, height, "#FFF");
    //this.frame.rot = rotation;
    this.rot = rotation;
    this.speedx = speedx;
    this.speedy = speedy;
    this.translatex = 0;
    this.translatey = 0;

    this.draw = function(context) {
        context.save();
        context.rotate(this.rot * Math.PI / 180);
        context.translate(this.translatex, this.translatey);


        context.shadowColor = "black";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 3;
        context.blur = 5;
        this.frame.draw(context);

        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.blur = 0;
        this.imageView.draw(context);

        context.restore();
    }
    
    this.animate = function(timeframe) {
        this.translatex += (timeframe * this.speedx) / 1000;
        this.translatey += (timeframe * this.speedy) / 1000;
    }


}

function AnimationContext(canvas, width, height, timeframe,array_views) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.views = array_views;
    this.timeframe = timeframe;
    this.context = this.canvas.getContext("2d");

    var self = this;

    this.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);

    }

    this.draw = function() {
        self.clear();

        for(var i = 0; i < self.views.length; i++) {
            self.views[i].draw(self.context);
            self.views[i].animate(self.timeframe);
        }

    }

}
