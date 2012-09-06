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

        //Filters.blur(8,self.context, self.canvas);
    }

}


function ThreeDTextView(x, y, z, size, font, color, text, speedx, diedwhenx, callback) {
    this.prototype = new View();
    this.prototype.constructor = ThreeDTextView;
    
    this.x = x;
    this.y = y;
    this.z = z;
    //this.translatex = 10;
    //this.translatey = 0;
    this.color = color;
    this.text = text;

    this.callback = callback;
    this.diedwhenx = diedwhenx;
    this.size = size;
    this.font = font;

    this.rot = 0;
    
    this.speedx = speedx; // px/s 
    this.speedy = 0; // px/s 
    
    this.draw = function(context) {
        //context.rotate(this.rot * Math.PI / 180);
        //context.translate(this.translatex, this.translatey);
        context.fillStyle = this.color;
        context.textBaseline = 'middle';
        context.font = "bold " + this.size * (1/this.z) + "px " + font;
        context.globalAlpha = 1 - 1.5 * (this.x / this.diedwhenx);
        context.fillText(this.text, this.x, this.y);

    }
    
    this.animate = function(timeframe) {
        if(this.x >= this.diedwhenx) {
            this.callback(this);
        }
        this.x += (timeframe * this.speedx) / 1000;
        this.y += (timeframe * this.speedy) / 1000;
    }
}

function randomString(string_length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars[rnum];
    }
    return randomstring;
}

function randomColor(r, b, g, varR, varB, varG) {
    //i5073b0
    r += varR/2 - Math.floor(Math.random() * varR);
    b += varB/2 - Math.floor(Math.random() * varB);
    g += varG/2 - Math.floor(Math.random() * varG);
    return "rgb(" + r + "," + g + "," + b + ")";
}


//function Three3DTextAnimationContext(canvas/*, width, height,*/ x, y, targetx) {
function Three3DTextAnimationContext(canvas,bufCanvas, x, y, targetx) {
    this.canvas = canvas;
    this.currentBufIndex = 0;
    this.buffers = [canvas, bufCanvas];
    this.views = [];
    this.targetx = targetx;
    this.timeframe = 100;

    this.context = this.canvas.getContext("2d");
    this.generationInterval = 10;
    this.currentTimeline = 0;
    this.x = x;
    this.y = y;

    var self = this;

    this.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.switchBuffer = function() {
        if(this.currentBufIndex == 0) {
            this.buffers[0].style.visibility='hidden';
            this.buffers[1].style.visibility='visible';
            this.currentBufIndex = 1;
        } else {
            this.buffers[1].style.visibility='hidden';
            this.buffers[0].style.visibility='visible';
            this.currentBufIndex = 0;
        }
        this.context = this.buffers[this.currentBufIndex].getContext('2d');
    }

    this.dead = function(textRef) {
        var i = self.views.indexOf(textRef);
        self.views.slice(i);
    }

    this.generateText = function() {
        var y = 25 + Math.floor(Math.random() * 50);
        var z = Math.floor(Math.random() * 5);
        var text = randomString(1);
        var color = randomColor(80,200,115,0,80,0);
        this.views.push(new ThreeDTextView(this.x, y, z, 12, "sans-serif", color, text, 5, this.targetx, this.dead));
        this.currentTimeline = 0;
    }

    this.draw = function() {
        self.clear();
        for(var i = 0; i < self.views.length; i++) {
            self.views[i].draw(self.context);
            self.views[i].animate(self.timeframe);
        }

       if(self.currentTimeline >= self.generationInterval) {
            self.generateText();
       }

        self.currentTimeline++;
        self.switchBuffer();
    }

}
