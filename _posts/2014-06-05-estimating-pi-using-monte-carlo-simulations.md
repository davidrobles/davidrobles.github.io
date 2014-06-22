---
layout:     post
title:      "Estimating PI using Monte Carlo Simulations"
date:       2014-06-19 09:48:16
comments:   true
categories: [JavaScript, Monte Carlo]
tags:       [JavaScript, Monte Carlo]
style:      ["mcpi/mcpi.css", "mcpi/mcpi-post.css"]
js:         ["mcpi/mcpi.js", "mcpi/mcpi-model.js", "mcpi/mcpi-controller.js",
             "mcpi/mcpi-dashboard.js", "mcpi/mcpi-canvas.js", "mcpi/mcpi-post.js"]
jsExternal: ["http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"]
---

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

One of the best examples to illustrate how Monte Carlo simulations work is
estimating the value of \\(\pi\\). So how can we do that? First of all, we know
that:

- The **area of the circle** is \\( A\_{C} = \pi r^2 \\).

- The **area of the square** is \\( A\_{S} = (2r)^2 \\).

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
tutorial on [Github](http://www.github.com/davidrobles/mcpi).

<div class="mcpiDemo">

    <div class="mcpiCanvasPanel">
        <canvas id="mcpiCanvasView">
            Your browser does not support HTML5 Canvas!
        </canvas>
    </div>

    <div class="rightPanel">

        <div id="mcpiEquation" class="mcpiEquation">
            <div class="pi" id="pi">\( \pi \approx 4 \frac{A_{circle}}{A_{square}} \)</div>
        </div>

        <div class="mcpiStatsPanel">
            <div class="mcpiCounter">
                <svg height="24" width="24" style="vertical-align: middle;">
                    <circle cx="12" cy="12" r="12" fill="#2980b9" />
                </svg>
                <span id="mcpiInsideCounter" class="mcpiCounter">0</span>
            </div>
            <div class="mcpiCounter">
                <svg height="24" width="24" style="vertical-align: middle;">
                    <circle cx="12" cy="12" r="12" fill="#c0392b" />
                </svg>
                <span id="mcpiOutsideCounter">0</span></span>
            </div>
            <meter id="mcpiDemoMeter" value="0" max="100" style="width: 255px"></meter>
        </div>

        <div class="mcpiConfigPanel">
            <label for="mcpiSelect">Sample size:</label>
            <select id="mcpiSampleSize" class="mcpiSelect">
                <option value="50000" selected>50000</option>
                <option value="100000">100000</option>
                <option value="250000">250000</option>
                <option value="500000">500000</option>
                <option value="1000000">1000000</option>
            </select>
            <br /><br />
            <button id="mcpiStartButton" class="mcpiStartStop mcpiStart" value="start">START</button>
        </div>
    </div>

    <div style="clear: both;"></div>

</div>

<div style="clear: both;"></div>

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    showProcessingMessages: false
});
</script>
