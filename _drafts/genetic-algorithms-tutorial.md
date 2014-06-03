---
layout:     post
title:      "Genetic Algorithms Tutorial"
date:       2014-05-26 09:48:16
comments:   true
categories: [Evolutionary algorithms, Genetic Algorithms]
---

**Random search** is an extremely basic method. It only explores the search space by randomly
selecting solutions and evaluates their fitness. This is quite an unintelligente strategy, and is
rarely used by itself. Nevertheless, this method sometimes worth being tested.

Building a genetic algorithm, which performs no more than a random search happens more often than we
can can expect. If the reproduction operators are just producing new random solutions without any
concrete links to the ones selected from the **last generation**, the genetic algorithm is just
doing nothing else than a random search.

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
