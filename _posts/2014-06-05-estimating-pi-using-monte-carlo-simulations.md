---
layout:     post
title:      "Estimating PI using Monte Carlo Simulations"
date:       2014-06-19 09:48:16
comments:   true
categories: [Evolutionary algorithms, Genetic Algorithms]
style:      mcpi.scss
js:         mcpi.js
---

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    showProcessingMessages: false
});
</script>
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
<script src="/js/mcpi.js"></script>

<canvas id="mcpiShortDemo">
    Your browser does not support HTML5 Canvas!
</canvas>

Monte Carlo simulations are a class of computational algorithms that involve
multiple computational trials driven by random sampling to approximate the
optimal solution. Each trial is called a **simulation**, which is a random
realization of the model for a given set of parameters. Because each simulation
is powered by random numbers the results tend to be noisy, and is often
necessary to run thousands of simulations in order to approximate the optimal
solution.

<script>
(function() {
    var model = new MCPI.Model();
    var controller = new MCPI.Controller({
        model: model,
        sampleSize: 25000,
        stepSize: 100
    });
    var canvasView = new MCPI.CanvasView({
        canvas: document.getElementById("mcpiShortDemo"),
        size: 220,
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
</script>

One of the best examples to illustrate how Monte Carlo simulations work is
estimating the value of \\(\pi\\). So how can we do that? First of all, we know
that:

- The **area of the circle** is \\( A\_{C} = \pi r^2 \\).

- And, the **area of the square** is \\( A\_{S} = (2r)^2 \\).

Therefore, the ratio of the circle's area to the square's area is:
$$
\frac{A\_{C}}{A\_{S}} = \frac{\pi r^2}{(2r)^2}
                                = \frac{\pi r^2}{4 r^2}
                                = \frac{\pi}{4}
$$
and solving for \\( \pi \\) yields:
$$
\pi = 4 \frac{A\_{C}}{A\_{S}}
$$

This means that if we can find the ratio \\(\frac{A\_{C}}{A\_{S}}\\) on the
right hand side of the equation, we can determine the value of \\(\pi\\). So how
can we find the values for \\(A\_{C}\\) and \\(A\_{S}\\)? Here is where Monte
Carlo simulations come into play.  If we randomly choose \\(\(x, y\)\\) points
in the range \\([-1, 1]\\), we can calculate the distance of that point's
location \\(\(x^2 + y^2\)\\) from the origin. This would tell us if the point
lies inside the circle, \\(x^2 + y^2 < 1\\), or outside the circle,
\\(x^2 + y^2 >= 1\\).

The steps for this procedure can be summarized as follows:

1. Generate \\(N\\) random points drawn from the interval \\([-1, 1]\\).
2. The number of points generated, \\(N\\), will be the value of \\(A\_{S}\\).
3. The number of points that lie inside the circle, \\(x^2 + y^2 < 1\\), will be
   \\(A\_{C}\\).
4. Find the value \\( \pi = 4 \frac{A\_{C}}{A\_{S}} \\).

### Demo

Here is a demo written in JavaScript for showing how a Monte Carlo simulation
can estimate the value of \\(\pi\\). You can get the full source code of this
tutorial on [Github](http://www.github.com/davidrobles/mcpi.js).

<div class="mcpiDemo">

    <div class="mcpiCanvasPanel">
        <canvas id="mcpiCanvasView" style="margin: 0 auto; display: block;">
            Your browser does not support HTML5 Canvas!
        </canvas>
    </div>

    <div class="rightPanel">

        <div id="mcpiEquation" class="mcpiEquation">
            <div class="pi" id="pi">\( \pi \approx 4 \frac{A_{circle}}{A_{square}} \)</div>
        </div>

        <div class="mcpiStatsPanel">
            <svg height="24" width="24" style="vertical-align: middle;">
                <circle cx="12" cy="12" r="12" fill="#2980b9" />
            </svg><span style="height: 24px; margin: 0; padding: 0; font-size: 1.1em; vertical-align: middle;">
            <span id="mcpiInsideCounter" style="width: 40px; display: inline-block; text-align: left;">0</span></span>
            <svg height="24" width="24" style="vertical-align: middle;">
                <circle cx="12" cy="12" r="12" fill="#c0392b" />
            </svg><span style="font-size: 1.1em; vertical-align: middle;">
            <span id="mcpiOutsideCounter">0</span></span>
            <br />
            <br />
            <svg height="20" width="255" style="display: block;">
                <rect x="0" y="0" width="255px" height="20" fill="#cecece" />
                <rect id="mcpiRect" x="3" y="3" width="0" height="14" fill="#7f8c8d" />
            </svg>

        </div>

        <div class="mcpiConfigPanel">
            <label for="mcpiSelect">Sample size:</label>
            <select id="mcpiSampleSize" class="mcpiSelect">
                <option value="10000" selected="selected">10000</option>
                <option value="50000">50000</option>
                <option value="100000">100000</option>
                <option value="150000">150000</option>
                <option value="250000">250000</option>
                <option value="10000000">10000000</option>
            </select>
            <br /><br />
            <button id="mcpiStartButton" class="mcpiStartStop mcpiStart" value="start">START</button>
        </div>
    </div>

    <div style="clear: both;"></div>

</div>

<div style="clear: both;"></div>

<script>
(function() {

    var model = new MCPI.Model();

    var controller = new MCPI.Controller({
        model: model,
        sampleSize: 50000,
        stepSize: 500
    });

    var canvasView = new MCPI.CanvasView({
        canvas: document.getElementById("mcpiCanvasView"),
        size: 300,
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
        completionBar: document.getElementById("mcpiRect"),
        counters: {
            inside: document.getElementById("mcpiInsideCounter"),
            outside: document.getElementById("mcpiOutsideCounter")
        },
        equation: document.getElementById("mcpiEquation"),
        sampleSize: document.getElementById("mcpiSampleSize"),
        startButton: document.getElementById("mcpiStartButton")
    });

    model.bind(canvasView);
    model.bind(dashboardView);
    controller.bind(dashboardView);
    
}());
</script>

<!-- We created a program to estimate the value of PI using JavaScript. Why
JavaScript? Simply because is the best programming language for demos! If you
look for a tutorial or demo about any algorithm or technique you will find code
in different programming languages that DO NOT run in a web browser, videos, or
even worse, Java applets! With JavaScript we can create a program with beautiful
interfaces that will load as you open a web page. No waiting for a video to
load, or Java applets to load!.  -->

