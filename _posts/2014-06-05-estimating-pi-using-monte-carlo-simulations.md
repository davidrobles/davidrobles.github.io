---
layout:     post
title:      "Estimating PI using Monte Carlo Simulations"
date:       2014-05-26 09:48:16
comments:   true
categories: [Evolutionary algorithms, Genetic Algorithms]
---

### Monte Carlo Simulations

Monte Carlo simulations are a broad class of computational algorithms that rely on repeated random
sampling to obtain numerical results; typically one runs simulations many times over in order to
obtain the distribution of an unknown probabilistic entity.

### Estimating PI

We created a program to estimate the value of PI using JavaScript. Why JavaScript? Simply because is
the best programming language for demos! If you look for a tutorial or demo about any algorithm or
technique you will find code in different programming languages that DO NOT run in a web browser,
videos, or even worse, Java applets! With JavaScript we can create a program with beautiful
interfaces that will load as you open a web page. No waiting for a video to load, or Java applets to
load!.

### Demo

Here is a full demo that you can play with it:

<canvas id="pi-mc" height="300px" width="300px" style="margin: 20px auto; display: block;">
Your browser does not support HTML5 Canvas!
</canvas>

<div id="pi"></div>

<script src="/js/mc-pi.js"></script>
