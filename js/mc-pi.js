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

MCPI.randomPoint = function() {
    return {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
    };
};

MCPI.inside = function(point) {
    return (Math.pow(point.x, 2) + Math.pow(point.y, 2)) < 1;
};

MCPI.Model = function(options) {
    this.points = [];
    this.handlers = [];
    this.counters = {
        inside: 0,
        outside: 0
    };
};

MCPI.Model.prototype = {

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

    reset: function() {
        this.points = [];
        this.inside = 0;
        this.outside = 0;
        this.trigger("reset");
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
};

MCPI.Controller.prototype = {

    run: function() {
        this.model.reset();
        window.requestNextAnimationFrame(function() {
            this.next();
        }.bind(this));
    },

    next: function() {
        if (this.model.points.length < this.sampleSize) {
            this.model.addRandomPoint();
            window.requestNextAnimationFrame(function() {
                this.next();
            }.bind(this));
        }
    }

};

MCPI.DashboardView = function(options) {
    this.equation = options.equation;
    this.counters = {
        inside: options.counters.inside,
        outside: options.counters.outside
    };
    this.completionBar = options.completionBar;
    this.sampleSize = options.sampleSize;
    this.pointSize = options.pointSize;
};

MCPI.DashboardView.prototype = {

    pointAdded: function(model) {
        this.renderEquation(model);
        this.renderCounters(model);
        this.renderCompletionBar(model);
    },

    renderCompletionBar: function(model) {
        var test = (model.points.length * 249) / 5000;
        this.completionBar.setAttribute("width", "" + test);
    },

    renderEquation: function(model) {
        // var pi = (4.0 * model.counters.inside) / model.points.length;
        // if (model.points.length % 50 == 0) {
        //     var math = MathJax.Hub.getAllJax("pi")[0];
        //     MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{" +
        //        this.counters.inside + "}{" + this.points.length + "} = " + pi.toFixed(4)]);
        // }
    },

    renderCounters: function(model) {
        this.counters.inside.innerHTML = model.counters.inside;
        this.counters.outside.innerHTML = model.counters.outside;
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

    pointAdded: function(model, point) {
        var circleSide = MCPI.inside(point) ? "inside" : "outside",
            color = this.colors[circleSide];
        this.renderPoint(point, color);
    },

    ready: function() {
        var ctx = this.ctx,
            canvas = this.canvas,
            centerX = canvas.width / 2,
            centerY = canvas.height / 2,
            radius = canvas.width / 2,
            borderSize = Math.round(canvas.width * 0.05);
        canvas.style.backgroundColor = this.colors.bg;
        canvas.style.border = borderSize + "px solid " + this.colors.circle;
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

    var model = new MCPI.Model({
        sampleSize: parseInt(document.getElementById("mcpiSampleSize").value, 10)
    });

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
        // equation: document.getElementById(""),
        sampleSize: document.getElementById("mcpiSampleSize"),
        pointSize: document.getElementById("mcpiPointSize")
    });

    model.bind(canvasView);
    model.bind(dashboardView);
    
    var controller = new MCPI.Controller(model, 5000);
    controller.run();

    // var mcpiStart = document.getElementById("mcpiStartStop");

    // mcpiStart.addEventListener("click", function() {
    //     if (mcpiStart.value === "start") {
    //         var pointSizeStr = document.getElementById("mcpiPointSize").value;
    //         var sampleSizeStr = document.getElementById("mcpiSampleSize").value;
    //         view.pointSize = parseInt(pointSizeStr, 10);
    //         model.sampleSize = parseInt(sampleSizeStr, 10);
    //         document.getElementById("mcpiSampleSize").disabled = "disabled";
    //         document.getElementById("mcpiPointSize").disabled = "disabled";
    //         mcpiStart.className = "mcpiStartStop mcpiStop";
    //         mcpiStart.innerHTML = "RESET";
    //         mcpiStart.value = "stop";
    //         // model.run();
    //     } else if (mcpiStart.value === "stop") {
    //         mcpiStart.className = "mcpiStartStop mcpiStart";
    //         mcpiStart.innerHTML = "START";
    //         mcpiStart.value = "start";
    //     }
    // });

}());
