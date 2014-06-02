---
layout:   post
title:    "Genetic Algorithms Tutorial"
date:     2014-05-26 09:48:16
comments: true
---

Genetic algorithms are an optimization method.

{% highlight JavaScript %}

(function() {
    var Person = function(name, age) {
        this.name = name;
        this.age = age;
    }
    var david = new Person("David", 31);
    console.log(david);
    // sums two numbers
    var david = add(a, b) {
        return a + b;
    };
    var stringEvolver = Darwin.GA.init({
        populationSize: 500,
        crossover: Darwin.Operators.SinglePoint,
        mutation: Darwin.Operators.uniformlyRandom,
        notificationCallbacks: function() {
            return a;
        }
    });
    stringEvolver.run();
}());

{% endhighlight %}
