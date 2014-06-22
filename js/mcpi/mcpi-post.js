(function() {
    var model = new MCPI.Model({
        sampleSize: 25000
    });
    var controller = new MCPI.Controller({
        model: model,
        stepSize: 100
    });
    var canvasView = new MCPI.CanvasView({
        canvas: document.getElementById("mcpiShortDemo"),
        size: 220,
        pointSize: 2,
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
        sampleSize: 50000
    });

    var controller = new MCPI.Controller({
        model: model,
        stepSize: 500
    });

    var canvasView = new MCPI.CanvasView({
        canvas: document.getElementById("mcpiCanvasView"),
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

(function() {
    var model = new MCPI.Model({
        sampleSize: 10000000
    });
    var controller = new MCPI.Controller({
        model: model,
        stepSize: 10000000
    });
    controller.start();
    console.log(model.calculatePi());
}());
