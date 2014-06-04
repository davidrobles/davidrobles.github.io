
var MCPI = MCPI || {};

MCPI.Model = function(maxPoints) {
    this.points = [];
    this.observers = [];
    this.timerId = 0;
    this.maxPoints = maxPoints;
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
        that.points.push(point);
        that.notifyObservers(point);
        if (that.points.length == this.maxPoints) {
            clearInterval(that.timerId);
        }
    },

    notifyObservers: function(point) {
        this.observers.forEach(function(observer) {
            observer.renderPoint(point);
        });
    },

    run: function() {
        var that = this;
        this.timerId = setInterval(function() { that.addPoint(that); }, 10);
    }

};

MCPI.inside = function(x, y) {
    var dist = Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2));
    return dist < 0.5 ? true : false; // remove this!
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
            radius = (this.canvas.width / 2) - (this.lineWidth / 2);
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.colors.line;
        this.ctx.stroke();
    },

    renderPoint: function(point) {
        var centerX = point.x * this.canvas.width,
            centerY = point.y * this.canvas.height;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.dotRadius, 0, Math.PI * 2, false);
        if (MCPI.inside(point.x, point.y)) {
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

    var model = new MCPI.Model();
    var view = new MCPI.View({
        canvas: document.getElementById("pi-mc"),
        lineWidth: 3,
        dotRadius: 2,
        colors: {
            bg: "something",
            line: "rgb(154, 129, 61)",
            inside: "rgb(67, 148, 145)",
            outside: "rgb(216, 59, 55)"
        }
    });
    model.addObserver(view);
    model.run();

}());
