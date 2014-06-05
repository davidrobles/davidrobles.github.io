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

MCPI.Model = function(maxPoints) {
    this.points = [];
    this.observers = [];
    this.timerId = 0;
    this.maxPoints = maxPoints;
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
            x: Math.random(),
            y: Math.random()
        };
        if (MCPI.inside(point)) {
            this.counters.inside += 1;
        } else {
            this.counters.outside += 1;
        }
        this.points.push(point);
        var pi = (4.0 * this.counters.inside) / this.points.length;
        if (this.points.length % 50 == 0) {
            document.getElementById("pi").innerHTML = pi.toFixed(4);
            document.getElementById("all").innerHTML = this.points.length;
            document.getElementById("inside").innerHTML = this.counters.inside;
            document.getElementById("outside").innerHTML = this.counters.outside;
        }
        document.getElementById("fps").innerHTML = this.calculateFps().toFixed() + " fps";
        this.notifyObservers(point);
        if (this.points.length == this.maxPoints) {
            clearInterval(this.timerId);
        }
        window.requestNextAnimationFrame(function() { that.addPoint(that); });
    },

    calculateFps: function() {
        var now = (+new Date),
            fps = 1000 / (now - this.lastTime);
        console.log(this.points.length);
        this.lastTime = now;
        return fps;
    },

    notifyObservers: function(point) {
        this.observers.forEach(function(observer) {
            observer.renderPoint(point);
        });
    },

    run: function() {
        var that = this;
        // this.timerId = setInterval(function() { that.addPoint(that); }, 3);
        window.requestNextAnimationFrame(function() { that.addPoint(that); });
    }

};

MCPI.inside = function(point) {
    var dist = Math.pow(point.x - 0.5, 2) + Math.pow(point.y - 0.5, 2);
    return dist < Math.pow(0.50, 2);
};

MCPI.View = function(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.lineWidth = options.lineWidth;
    this.colors = options.colors;
    this.dotRadius = options.dotRadius;
};

MCPI.View.prototype = {

    render: function(model) {
        var centerX = this.canvas.width / 2,
            centerY = this.canvas.height / 2,
            radius = (this.canvas.width / 2) - (this.lineWidth / 2) + 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillStyle = this.colors.circle;
        this.ctx.fill();
    },

    renderPoint: function(point) {
        var centerX = point.x * this.canvas.width,
            centerY = point.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.dotRadius, 0, Math.PI * 2, false);
        if (MCPI.inside(point)) {
            this.ctx.fillStyle = this.colors.inside;
        } else {
            this.ctx.fillStyle = this.colors.outside;
        }
        this.ctx.fill();
    },

    update: function(point) {
        this.renderPoint(point);
    }

};

(function() {

    var model = new MCPI.Model(10000);
    var view = new MCPI.View({
        canvas: document.getElementById("pi-mc"),
        lineWidth: 4,
        dotRadius: 3,
        colors: {
            bg: "something",

            inside: "#01254C",
            outside: "#EA575B",
            circle: "#52718D",

            // line: "rgb(154, 129, 61)",
            // inside: "rgb(67, 148, 145)",
            // outside: "rgb(216, 59, 55)"
        }
    });
    model.addObserver(view);
    model.run();

}());
