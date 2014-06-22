var MCPI = MCPI || {};

MCPI.DashboardView = function(options) {
    this.model = options.model;
    this.controller = options.controller;
    this.counters = {
        inside: options.elems.insideCounter,
        outside: options.elems.outsideCounter
    };
    this.meter = options.elems.meter;
    this.equation = options.elems.equation;
    this.sampleSizeEl = options.elems.sampleSize;
    this.startButton = options.elems.startButton;
    this.addListeners();
};

MCPI.DashboardView.prototype = {

    constructor: MCPI.DashboardView,

    addListeners: function() {
        this.addStartResetListener();
        this.addSampleSizeListener();
    },

    addSampleSizeListener: function() {
        this.sampleSizeEl.addEventListener("change", function(event) {
            this.updateSampleSize();
        }.bind(this));
    },

    addStartResetListener: function() {
        this.startButton.addEventListener("click", function() {
            if (this.startButton.value === "start") {
                this.controller.startAnimation();
            } else if (this.startButton.value === "stop") {
                this.controller.reset();
            }
        }.bind(this));
    },

    updateSampleSize: function() {
        this.model.sampleSize = parseInt(this.sampleSizeEl.value, 10);
        this.controller.stepSize = this.model.sampleSize / 100;
    },

    // Model callbacks

    pointsAdded: function() {
        this.renderEquation();
        this.renderCounters();
        this.renderMeter();
    },

    // Controller callbacks

    bound: function() {
        this.updateSampleSize();
    },

    reset: function(model) {
        this.renderEquation();
        this.renderCounters();
        this.renderMeter();
        this.startButton.className = "mcpiStartStop mcpiStart";
        this.startButton.innerHTML = "START";
        this.startButton.value = "start";
        this.sampleSizeEl.disabled = false;
    },

    start: function() {
        this.sampleSizeEl.disabled = true;
        this.startButton.className = "mcpiStartStop mcpiStop";
        this.startButton.innerHTML = "RESET";
        this.startButton.value = "stop";
    },

    // Rendering

    renderMeter: function() {
        var numPoints = this.model.counters.total,
            sampleSize = this.model.sampleSize,
            completionPercentage = Math.round((numPoints / sampleSize) * 100);
        this.meter.setAttribute("value", "" + completionPercentage);
    },

    renderCounters: function() {
        this.counters.inside.innerHTML = this.model.counters.inside;
        this.counters.outside.innerHTML = this.model.counters.outside;
    },

    renderEquation: function() {
        var pi = this.model.calculatePi();
        if (this.model.counters.total == 0) {
            var math = MathJax.Hub.getAllJax(this.equation.id)[0];
            MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{" +
                "A_C}{A_S}"]);

        } else if (this.model.counters.total % 50 == 0) {
            var math = MathJax.Hub.getAllJax(this.equation.id)[0];
            MathJax.Hub.Queue(["Text",math,"\\pi \\approx 4 \\frac{"
                + this.model.counters.inside + "}{" + this.model.counters.total
                + "} = " + pi.toFixed(4)]);
        }
    }

};
