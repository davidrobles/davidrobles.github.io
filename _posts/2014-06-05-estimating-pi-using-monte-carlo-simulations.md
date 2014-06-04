---
layout:     post
title:      "Estimating PI using Monte Carlo Simulations"
date:       2014-05-26 09:48:16
comments:   true
categories: [Evolutionary algorithms, Genetic Algorithms]
---

<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

### Monte Carlo Simulations

Monte Carlo simulations are a broad class of computational algorithms that rely on repeated random
sampling to obtain numerical results; typically one runs simulations many times over in order to
obtain the distribution of an unknown probabilistic entity.

### Estimating PI

Probably the most basic and popular example of monte carlo simulations is estimating the value of
\\( \pi \\). So how can we do that? Well, we know that the **area of the circle** is \\( A\_{circle}
= \pi r^2 \\) and the **area of the square** is \\( A\_{square} = (2r)^2 \\). Then, the ratio of
both areas is:

$$ \frac{A\_{circle}}{A\_{square}} = \frac{\pi r^2}{(2r)^2} = \frac{\pi r^2}{4 r^2} = \frac{\pi}{4} $$

Solving for \\( \pi \\) yields:

$${ \pi = 4 * \frac{A\_{circle}}{A\_{square}} }$$

Knowing this we can run a simulation in which we randomly place \\( n \\) number of dots, with the
idea of approximating the value of \\( \pi \\) by counting dots **inside** the circle, \\(
A\_{circle} \\), and **outside**, \\( A\_{square} \\).

### Demo

Here is a full demo that you can play with it:

<div text-align="center; display: block;">&pi; = <span id="pi"></span></div>

<canvas id="pi-mc" height="300px" width="300px" style="margin: 20px auto; display: block;">
Your browser does not support HTML5 Canvas!
</canvas>

Dots = <span id="all"></span><br />
Inside = <span id="inside"></span><br />
Outside = <span id="outside"></span><br />

### View on Github

The code for this tutorial is in [Github](http://www.github.com/davidrobles/mcpi.js). To run it just
include the JavaScript file:

{% highlight html %}
<script src="/js/mc-pi.js"></script>
{% endhighlight html %}

This is how we can configure and run this example:

{% highlight javascript %}
var model = new MCPI.Model(10000);
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


