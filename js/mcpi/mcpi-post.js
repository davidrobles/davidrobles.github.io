(function() {
    var model = new MCPI.Model({
        sampleSize: 75000,
        stepSize: 500
    });
    var controller = new MCPI.Controller({
        model: model
    });
    var canvasView = new MCPI.CanvasView({
        canvasEl: document.getElementById("mcpiShortDemo"),
        size: 220,
        pointSize: 1,
        colors: {
            bg: "#F2D6B3",      // light brown
            circle: "#D9B89C",  // brown
            inside: "#2980b9",  // blue
            outside: "#c0392b"  // red
        }
    });
    model.bind(canvasView);
    controller.loop();
}());

(function() {

    var model = new MCPI.Model({
        sampleSize: 5000,
        stepSize: 500
    });

    var controller = new MCPI.Controller({
        model: model
    });

    var canvasView = new MCPI.CanvasView({
        canvasEl: document.getElementById("mcpiCanvasView"),
        size: 300,
        pointSize: 1,
        colors: {
            bg: "#F2D6B3",      // light brown
            circle: "#D9B89C",  // brown
            inside: "#2980b9",  // blue
            outside: "#c0392b"  // red
        }
    });

    var dashboardView = new MCPI.DashboardView({
        model: model,
        controller: controller,
        colors: {
            inside: "#2980b9",  // blue
            outside: "#c0392b"  // red
        },
        elems: {
            equation: document.getElementById("mcpiEquation"),
            insideCounter: document.getElementById("mcpiInsideCounter"),
            outsideCounter: document.getElementById("mcpiOutsideCounter"),
            meter: document.getElementById("mcpiDemoMeter"),
            sampleSize: document.getElementById("mcpiSampleSize"),
            startButton: document.getElementById("mcpiStartButton")
        }
    });

    model.bind(canvasView);
    model.bind(dashboardView);
    controller.bind(dashboardView);
    
}());
