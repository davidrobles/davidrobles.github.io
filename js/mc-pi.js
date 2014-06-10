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

MCPI.inside = function(point) {
    return (Math.pow(point.x, 2) + Math.pow(point.y, 2)) < 1;
};

MCPI.randomPoint = function() {
    return {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    };
};

MCPI.Model = function() {
    this.counters = {
        inside: 0,
        outside: 0
    };
    this.handlers = [];
    this.points = [];
};

MCPI.Model.prototype = {

    constructor: MCPI.Model,

    addPoint: function(point) {
        this.points.push(point);
        this.updateCounters(point);
        this.trigger("pointAdded", [this, point]);
    },

    addRandomPoint: function() {
        var randomPoint = MCPI.randomPoint();
        this.addPoint(randomPoint);
    },

    addRandomPoints: function(number) {
        for (var i = 0; i < number; i++) {
            this.addRandomPoint();
        }
    },

    bind: function(handler) {
        this.handlers.push(handler);
        if ("ready" in handler) {
            handler.ready.call(handler);
        }
    },

    calculatePi: function() {
        return (4.0 * this.counters.inside) / this.points.length;
    },

    reset: function() {
        this.points = [];
        this.counters.inside = 0;
        this.counters.outside = 0;
        this.trigger("reset", [this]);
    },

    trigger: function(event, params) {
        this.handlers.forEach(function(handler) {
            if (event in handler) {
                handler[event].apply(handler, params);
            }
        });
    },

    updateCounters: function(point) {
        var side = MCPI.inside(point) ? "inside" : "outside";
        this.counters[side]++;
    }

};

MCPI.Controller = function(model, sampleSize) {
    this.model = model;
    this.sampleSize = sampleSize;
    this.play = false;
};

MCPI.Controller.prototype = {

    constructor: MCPI.Controller,

    next: function() {
        if (this.play && this.model.points.length < this.sampleSize) {
            this.model.addRandomPoint();
            window.requestNextAnimationFrame(function() {
                this.next();
            }.bind(this));
        }
    },

    reset: function() {
        this.model.reset();
        this.play = false;
    },

    run: function() {
        this.model.reset();
        this.play = true;
        window.requestNextAnimationFrame(function() {
            this.next();
        }.bind(this));
    }

};

MCPI.DashboardView = function(options) {
    this.completionBar = options.completionBar;
    this.controller = options.controller;
    this.counters = {
        inside: options.counters.inside,
        outside: options.counters.outside
    };
    this.equation = options.equation;
    this.pointSize = options.pointSize;
    this.sampleSize = options.sampleSize;
    this.startButton = options.startButton;
    this.addListeners();
};

MCPI.DashboardView.prototype = {

    constructor: MCPI.DashboardView,

    addListeners: function() {
        this.startButton.addEventListener("click", function() {
            if (this.startButton.value === "start") {
                var pointSizeStr = this.pointSize.value;
                var sampleSizeStr = this.sampleSize.value;
                // view.pointSize = parseInt(pointSizeStr, 10);
                // model.sampleSize = parseInt(sampleSizeStr, 10);
                this.sampleSize.disabled = true;
                this.pointSize.disabled = true;
                this.startButton.className = "mcpiStartStop mcpiStop";
                this.startButton.innerHTML = "RESET";
                this.startButton.value = "stop";
                this.controller.run();
            } else if (this.startButton.value === "stop") {
                this.startButton.className = "mcpiStartStop mcpiStart";
                this.startButton.innerHTML = "START";
                this.startButton.value = "start";
                this.sampleSize.disabled = false;
                this.pointSize.disabled = false;
                this.controller.reset();
            }
        }.bind(this));
    },

    pointAdded: function(model) {
        this.renderEquation(model);
        this.renderCounters(model);
        this.renderCompletionBar(model);
    },

    reset: function(model) {
        this.renderEquation(model);
        this.renderCounters(model);
        this.renderCompletionBar(model);
    },

    renderCompletionBar: function(model) {
        var test = (model.points.length * 249) / 5000;
        this.completionBar.setAttribute("width", "" + test);
    },

    renderCounters: function(model) {
        this.counters.inside.innerHTML = model.counters.inside;
        this.counters.outside.innerHTML = model.counters.outside;
    },

    renderEquation: function(model) {
        var pi = model.calculatePi();
        if (model.points.length % 50 == 0) {
            var math = MathJax.Hub.getAllJax(this.equation.id)[0];
            MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{" +
               model.counters.inside + "}{" + model.points.length + "} = " + pi.toFixed(4)]);
        }
    }

};

MCPI.CanvasView = function(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.pointSize = options.pointSize;
    this.canvas.width = options.size;
    this.canvas.height = options.size;
};

MCPI.CanvasView.prototype = {

    constructor: MCPI.CanvasView,

    // Callbacks

    pointAdded: function(model, point) {
        var circleSide = MCPI.inside(point) ? "inside" : "outside",
            color = this.colors[circleSide];
        this.renderPoint(point, color);
    },

    reset: function() {
        this.ready();
    },

    // Object

    ready: function() {
        var ctx = this.ctx,
            canvas = this.canvas,
            centerX = canvas.width / 2,
            centerY = canvas.height / 2,
            radius = canvas.width / 2,
            borderSize = Math.round(canvas.width * 0.05);

        // border
        canvas.style.border = borderSize + "px solid " + this.colors.circle;

        // background
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.colors.bg;
        ctx.fill();

        // circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colors.circle;
        ctx.fill();
    },

    renderPoint: function(point, color) {
        var ctx = this.ctx,
            centerX = this.canvas.width * ((point.x + 1) / 2),
            centerY = this.canvas.height * ((point.y + 1) / 2);
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.pointSize, 0, Math.PI * 2, false);
        ctx.fillStyle = color;
        ctx.fill();
    }

};

(function() {

    var model = new MCPI.Model();

    var controller = new MCPI.Controller(model, 5000);

    var canvasView = new MCPI.CanvasView({
        canvas: document.getElementById("mcpiCanvasView"),
        pointSize: parseInt(document.getElementById("mcpiPointSize").value, 10),
        size: 300,
        colors: {
            bg: "#F2D6B3",      // light brown
            circle: "#D9B89C",  // brown
            inside: "#2980b9",  // blue
            outside: "#c0392b"  // red
        }
    });

    var dashboardView = new MCPI.DashboardView({
        colors: {
            inside: "#2980b9",  // blue
            outside: "#c0392b"  // red
        },
        completionBar: document.getElementById("mcpiRect"),
        counters: {
            inside: document.getElementById("mcpiInsideCounter"),
            outside: document.getElementById("mcpiOutsideCounter")
        },
        equation: document.getElementById("mcpiEquation"),
        sampleSize: document.getElementById("mcpiSampleSize"),
        pointSize: document.getElementById("mcpiPointSize"),
        startButton: document.getElementById("mcpiStartButton"),
        controller: controller
    });

    model.bind(canvasView);
    model.bind(dashboardView);
    
}());
