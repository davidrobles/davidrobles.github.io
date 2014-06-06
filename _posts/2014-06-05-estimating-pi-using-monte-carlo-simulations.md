---
layout:     post
title:      "Estimating PI using Monte Carlo Simulations"
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

<div style="margin: 0 auto; background-color: #eaeaea; padding: 20px;">

    <div style="float: left;">
        <br /><br /><br /><br /><br />
        <label for="mcpiSelect">Sample size:</label>
        <select id="mcpiSampleSize" class="mcpiSelect">
            <option value="500">500</option>
            <option value="1000" selected="selected">1000</option>
            <option value="2500">2500</option>
            <option value="5000">5000</option>
            <option value="7500">7500</option>
            <option value="10000">10000</option>
        </select>
        <br /><br />
        <label for="mcpiPointSize">Point size:</label>
        <select id="mcpiPointSize" class="mcpiSelect">
            <option value="1">1</option>
            <option value="2" selected="selected">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
        <br /><br />
        <label for="mcpiStart">&nbsp;</label>
        <button id="mcpiStart">START</button>
    </div>

    <div style="margin-left: 40px; float: left; padding: 0;">
        <p id="pi" style="display: block; height: 40px; margin: 0 auto; text-align: center;">\( \)</p>
        <canvas id="mcpi" style="margin: 0 auto; display: block;">
        Your browser does not support HTML5 Canvas!
        </canvas>
        <br />
        <div style="display: table-cell; text-align: center; margin: 0 auto; vertical-align: middle;">
            <svg height="24" width="24" style="vertical-align: middle; display: inline;">
                <circle cx="12" cy="12" r="12" fill="#46658C" />
            </svg><span style="height: 24px; margin: 0; padding: 0; font-size: 1.1em; vertical-align: middle;">
            <span id="inside" style="width: 40px; display: inline-block; text-align: left;">0</span></span>
            <svg height="24" width="24" style="display: inline; vertical-align: middle;">
                <circle cx="12" cy="12" r="12" fill="#BB2115" />
            </svg><span style="font-size: 1.1em; vertical-align: middle;">
            <span id="outside">0</span></span>
        </div>
    </div>

    <div style="clear: both;"></div>

</div>

<div style="clear: both;"></div>

Dots = <span id="all"></span><br />

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

<script src="/js/mc-pi.js"></script>


<!--
We created a program to estimate the value of PI using JavaScript. Why JavaScript? Simply because is
the best programming language for demos! If you look for a tutorial or demo about any algorithm or
technique you will find code in different programming languages that DO NOT run in a web browser,
videos, or even worse, Java applets! With JavaScript we can create a program with beautiful
interfaces that will load as you open a web page. No waiting for a video to load, or Java applets to
load!.
-->


