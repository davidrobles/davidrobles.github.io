---
layout:     post
title:      "Estimating PI using Monte Carlo Simulation"
date:       2014-05-26 09:48:16
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

Monte Carlo simulations are a broad class of computational algorithms that rely
on repeated random sampling to obtain numerical results; typically one runs
simulations many times over in order to obtain the distribution of an unknown
probabilistic entity. One of the most popular examples of Monte Carlo
simulations is estimating the value of \\( \pi \\). So how can we do that?

We generate random points and verify if they are inside or outside

asymptotically approaching the real value of PI.

<img src="/img/mcpi.png" class="center" width="250px" height="250px" />

But, how do we estimate Pi by simulation? In the simulation, you keep throwing
darts at random onto the dartboard. All of the darts fall within the square,
but not all of them fall within the circle. Here is the key. If you throw darts
completely at random, this experiment estimate the ratio of the area of the
circle to the area of the square, by counting the number of darts in each.

Well, we know that the **area of the circle** is \\( A\_{circle} = \pi r^2 \\)
and the **area of the square** is \\( A\_{square} = (2r)^2 \\). Then, the ratio
of both areas is:

$$
\frac{A\_{circle}}{A\_{square}} = \frac{\pi r^2}{(2r)^2}
                                = \frac{\pi r^2}{4 r^2}
                                = \frac{\pi}{4}
$$

Solving for \\( \pi \\) yields:

$$
{ \pi = 4 \frac{A\_{circle}}{A\_{square}} }
$$

Knowing this we can run a simulation in which we randomly place \\( n \\)
number of dots, with the idea of approximating the value of \\( \pi \\) by
counting the points **inside** the circle, \\( A\_{circle} \\), and
**outside**, \\( A\_{square} \\).

### Steps

This Demonstration approximates using the Monte Carlo method:

1. Randomly select points in a square with an inscribed circle.
2. Multiply the number of points inside the circle by four.
3. Divide by the total number of points in the square.

### Demo

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
            </select>
            <br /><br />
            <button id="mcpiStartButton" class="mcpiStartStop mcpiStart" value="start">START</button>
        </div>
    </div>

    <div style="clear: both;"></div>

</div>

<div style="clear: both;"></div>

### View on Github

The code for this tutorial is in
[Github](http://www.github.com/davidrobles/mcpi.js). To run it just include the
JavaScript file:

{% highlight html %}
<script src="mcpi.js"></script>
{% endhighlight html %}

This is how we can configure and run this example:

{% highlight javascript %}
var view = new MCPI.View({
    canvas: document.getElementById("pi-mc"),
    lineWidth: 3,
    dotRadius: 2,
    colors: {
        bg: "something",
        line: "rgb(154, 129, 61)",
        inside: "rgb(67, 148, 145)",
        outside: "rgb(216, 59, 55)"
    }
});
var model = new MCPI.Model({
    dotSims: 10000
});
model.addObserver(view);
model.run();
{% endhighlight %}

<script src="/js/mcpi.js"></script>


<!--
We created a program to estimate the value of PI using JavaScript. Why JavaScript? Simply because is
the best programming language for demos! If you look for a tutorial or demo about any algorithm or
technique you will find code in different programming languages that DO NOT run in a web browser,
videos, or even worse, Java applets! With JavaScript we can create a program with beautiful
interfaces that will load as you open a web page. No waiting for a video to load, or Java applets to
load!.
-->


