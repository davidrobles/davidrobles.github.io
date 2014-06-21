var MCPI = MCPI || {};

MCPI.CanvasView = function(options) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    this.pointSize = 1;
    this.canvas.width = options.size;
    this.canvas.height = options.size;
};

MCPI.CanvasView.prototype = {

    constructor: MCPI.CanvasView,

    // Callbacks

    pointsAdded: function(model, points) {
        for (var i = 0; i < points.length; i++) {
            var point = points[i],
                circleSide = MCPI.inside(point) ? "inside" : "outside",
                color = this.colors[circleSide];
            this.renderPoint(point, color);
        }
    },

    reset: function() {
        this.renderAll();
    },

    // Model callbacks

    bound: function() {
        this.renderAll();
    },

    // Rendering

    renderAll: function() {
        this.renderBackground();
        this.renderBorder();
        this.renderCircle();
    },

    renderBackground: function() {
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fill();
    },

    renderBorder: function() {
        var borderSize = Math.round(this.canvas.width * 0.05);
        this.canvas.style.border = borderSize + "px solid " + this.colors.circle;
    },

    renderCircle: function() {
        var centerX = this.canvas.width / 2,
            centerY = this.canvas.height / 2,
            radius = this.canvas.width / 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.colors.circle;
        this.ctx.fill();
    },

    renderPoint: function(point, color) {
        var centerX = this.canvas.width * ((point.x + 1) / 2),
            centerY = this.canvas.height * ((point.y + 1) / 2);
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.pointSize, 0, Math.PI * 2, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

};
