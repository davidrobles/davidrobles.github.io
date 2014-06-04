
var MCPI = MCPI || {};

MCPI.Problem = function() {
    this.points = [];
};

MCPI.prototype = {
    addPoint: function(point) {
        this.points.push(point);
    }
};

(function() {
    var canvas = document.getElementById("pi-mc"),
        ctx = canvas.getContext("2d");

    ctx.strokeRect(10, 10, 200, 200);

}());
