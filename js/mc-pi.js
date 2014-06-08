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
    // this.timerId = 0;
    this.sampleSize = options.sampleSize;
    // this.lastTime = 0;
    this.counters = {
        inside: 0,
        outside: 0
    };
};

MCPI.randomPoint = function() {
    return {
        x: (Math.random() * 2) - 1,
        y: (Math.random() * 2) - 1
    };
}

MCPI.inside = function(point) {
    return (Math.pow(point.x, 2) + Math.pow(point.y, 2)) < 1;
};

MCPI.Model.prototype = {

    addPoint: function(point) {
        this.points.push(point);
        this.updateCounters(point);
        this.trigger("pointAdded", [point]);
    },

    addRandomPoint: function() {
        var randomPoint = MCPI.randomPoint();
        this.addPoint(randomPoint);
        // if (this.points.length < this.sampleSize) {
        //     window.requestNextAnimationFrame(function() {
        //         that.addPoint(that);
        //     });
        // } else {
        //     clearInterval(this.timerId);
        // }
    },

    addRandomPoints: function(number) {
        for (var i = 0; i < number; i++) {
            this.addRandomPoint();
        }
    },

    bind: function(observer) {
        this.observers.push(observer);
        observer.ready.call(observer);
    },

    trigger: function(event, params) {
        this.observers.forEach(function(observer) {
            if (event in observer) {
                observer[event].apply(observer, params);
            }
        });
    },

    updateCounters: function(point) {
        var side = MCPI.inside(point) ? "inside" : "outside";
        this.counters[side] += 1;
    },

    notifyObservers: function(point) {
        // var pi = (4.0 * this.counters.inside) / this.points.length;
        // document.getElementById("inside").innerHTML = this.counters.inside;
        // document.getElementById("outside").innerHTML = this.counters.outside;
        // var test = (this.points.length * 249) / this.sampleSize;
        // document.getElementById("mcpiRect").setAttribute("width", "" + test);
        // if (this.points.length % 50 == 0) {
        //     var math = MathJax.Hub.getAllJax("pi")[0];
        //     MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{" +
        //        this.counters.inside + "}{" + this.points.length + "} = " + pi.toFixed(4)]);
        // }
        // this.observers.forEach(function(observer) {
        //     observer.renderPoint(point);

        //     this.renderPoint(point, hello);

        // });
    },

    reset: function() {
        // clearInterval(this.timerId);
        this.points = [];
        this.inside = 0;
        this.outside = 0;
        this.trigger("reset");
    },

    // run: function() {
    //     var that = this;
    //     this.reset();
    //     this.timerId = window.requestNextAnimationFrame(function() { that.addPoint(that); });
    // }

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

    // Callbacks

    pointAdded: function(point) {
        var circleSide = MCPI.inside(point) ? "inside" : "outside";
        var color = this.colors[circleSide];
        this.renderPoint(point, color);
    },

    ready: function() {
        this.canvas.style.backgroundColor = this.colors.bg;
        var borderSize = Math.round(this.canvas.width * 0.05);
        this.canvas.style.border = borderSize + "px solid " + this.colors.circle;
        var centerX = this.canvas.width / 2,
            centerY = this.canvas.height / 2,
            radius = this.canvas.width / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.colors.circle;
        this.ctx.fill();
    },

    // Drawing

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
    var view = new MCPI.View({
        canvas: document.getElementById("mcpi"),
        start: document.getElementById("start"),
        pointSize: parseInt(document.getElementById("mcpiPointSize").value, 10),
        size: 300,
        colors: {
            bg: "#F2D6B3",      // light brown
            inside: "#2980b9",  // blue
            outside: "#c0392b", // red
            circle: "#D9B89C",  // brown
        }
    });
    model.bind(view);
    model.addRandomPoints(10000);
    var mcpiStart = document.getElementById("mcpiStartStop");
    mcpiStart.addEventListener("click", function() {
        if (mcpiStart.value === "start") {
            var pointSizeStr = document.getElementById("mcpiPointSize").value;
            var sampleSizeStr = document.getElementById("mcpiSampleSize").value;
            view.pointSize = parseInt(pointSizeStr, 10);
            model.sampleSize = parseInt(sampleSizeStr, 10);
            document.getElementById("mcpiSampleSize").disabled = "disabled";
            document.getElementById("mcpiPointSize").disabled = "disabled";
            mcpiStart.className = "mcpiStartStop mcpiStop";
            mcpiStart.innerHTML = "RESET";
            mcpiStart.value = "stop";
            // model.run();
        } else if (mcpiStart.value === "stop") {
            mcpiStart.className = "mcpiStartStop mcpiStart";
            mcpiStart.innerHTML = "START";
            mcpiStart.value = "start";
        }
    });

}());
