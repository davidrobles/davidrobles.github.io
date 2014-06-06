window.requestNextAnimationFrame = (function () {
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.msRequestAnimationFrame     ||
           function (callback, element) {
               var self = this,
                   start,
                   finish;
               window.setTimeout(function() {
                   start = +new Date();
                   callback(start);
                   finish = +new Date();
                   self.timeout = 1000 / 60 - (finish - start);
               }, self.timeout);
           };
}());

var MCPI = MCPI || {};

MCPI.Model = function(options) {
    this.points = [];
    this.observers = [];
    this.timerId = 0;
    this.sampleSize = options.sampleSize;
    this.lastTime = 0;
    this.counters = {
        inside: 0,
        outside: 0
    };
};

MCPI.Model.prototype = {

    addObserver: function(observer) {
        this.observers.push(observer);
        observer.render(this);
    },

    addPoint: function(that) {
        var point = {
            x: (Math.random() * 2) - 1,
            y: (Math.random() * 2) - 1
        };
        if (MCPI.inside(point)) {
            this.counters.inside += 1;
        } else {
            this.counters.outside += 1;
        }
        this.points.push(point);
        var pi = (4.0 * this.counters.inside) / this.points.length;
        // if (this.points.length % 4 == 0) {
            document.getElementById("inside").innerHTML = this.counters.inside;
            document.getElementById("outside").innerHTML = this.counters.outside;
        // }
        if (this.points.length % 50 == 0) {
            var math = MathJax.Hub.getAllJax("pi")[0];
            MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{" +
               this.counters.inside + "}{" + this.points.length + "} = " + pi.toFixed(4)]);

            document.getElementById("all").innerHTML = this.points.length;
        }
        // document.getElementById("mcpiFPS").innerHTML = this.calculateFps().toFixed() + " fps";
        this.notifyObservers(point);
        if (this.points.length < this.sampleSize) {
            // clearInterval(this.timerId);
            window.requestNextAnimationFrame(function() { that.addPoint(that); });
        }
    },

    calculateFps: function() {
        var now = (+new Date),
            fps = 1000 / (now - this.lastTime);
        this.lastTime = now;
        return fps;
    },

    fire: function(event) {

    },

    notifyObservers: function(point) {
        this.observers.forEach(function(observer) {
            observer.renderPoint(point);
        });
    },

    reset: function() {
        clearInterval(this.timerId);
        this.points = [];
        this.fire("reset");
    },

    run: function() {
        var that = this;
        this.reset();
        // this.timerId = setInterval(function() { that.addPoint(that); }, 3);
        this.timerId = window.requestNextAnimationFrame(function() { that.addPoint(that); });
    }

};

MCPI.inside = function(point) {
    return (Math.pow(point.x, 2) + Math.pow(point.y, 2)) < 1;
};

MCPI.View = function(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.pointSize = options.pointSize;
    this.canvas.width = options.size;
    this.canvas.height = options.size;
};

MCPI.View.prototype = {

    render: function(model) {
        this.canvas.style.backgroundColor = this.colors.bg;
        this.canvas.style.border = Math.round(this.canvas.width * 0.05) + "px solid " + this.colors.circle; // handcoded value
        var centerX = this.canvas.width / 2,
            centerY = this.canvas.height / 2,
            radius = this.canvas.width / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.colors.circle;
        this.ctx.fill();
    },

    renderPoint: function(point) {
        var centerX = this.canvas.width * ((point.x + 1) / 2),
            centerY = this.canvas.height * ((point.y + 1) / 2);
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.pointSize, 0, Math.PI * 2, false);
        if (MCPI.inside(point)) {
            this.ctx.fillStyle = this.colors.inside;
        } else {
            this.ctx.fillStyle = this.colors.outside;
        }
        this.ctx.fill();
    },

    update: function(point) {
        this.renderPoint(point);
    },

    start: function() {

    }

};

(function() {

    var model = new MCPI.Model({
        sampleSize: document.getElementById("mcpiSampleSize").value
    });
    var view = new MCPI.View({
        canvas: document.getElementById("mcpi"),
        start: document.getElementById("start"),
        pointSize: parseInt(document.getElementById("mcpiPointSize").value, 10),
        size: 250,
        colors: {
            bg: "#F2D6B3",      // light brown
            inside: "#46658C",  // blue
            outside: "#BB2115", // red
            circle: "#D9B89C",  // brown
        }
    });
    model.addObserver(view);
    var mcpiStart = document.getElementById("mcpiStart");
    mcpiStart.addEventListener("click", function() {
        model.run();
    });

}());
