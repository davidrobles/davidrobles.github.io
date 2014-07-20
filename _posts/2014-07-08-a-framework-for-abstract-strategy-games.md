---
layout:     post
title:      "A Framework for Abstract Strategy Games"
date:       2014-07-08 16:48:16
comments:   true
excerpt:    "Monte Carlo simulations are a class of computational algorithms
            that involve multiple computational trials driven by random
            sampling to approximate the optimal solution. In this post we
            describe how Monte Carlo simulations work and demo with a
            JavaScript program how to use this method to estimate the value of
            &pi;."
img:        "tic-tac-toe.png"
style:      ["framework-games/styles.css"]
js:         ["lib/jquery-2.1.1.js", "lib/underscore.js", "lib/backbone.js",
             "lib/mauler-0.0.1.js", framework-games/tic-play.js]
---

One topic in which I've been very interested and studied for the last few years is games. I think
games are the perfect testbed for Artificial Intelligence. Games provide a perfect framework
with well defined rules and outcomes.

Add comment about render();

mention that we call rows and cols as a's and numbers.

I'm going to number the squares in Tic-tac-toe board this way

1 2 3
4 5 6
7 8 9

I think that before going to complex games like 3D shooters, we know know to understand games in
their simplest form, which I think are turn-based games (or abstract strategy games). I don't
necessarily refer to games to two players, but also to one player games such as 8-queens.

The types of games that I want to cover with this framework is

One-player: 8 queens puzzle

Two player: [Tic-Tac-Toe](http://en.wikipedia.org/wiki/Tic-tac-toe),
            [Checkers](http://en.wikipedia.org/wiki/Checkers),
            [Chess](http://en.wikipedia.org/wiki/Chess),
            [Reversi](http://en.wikipedia.org/wiki/Reversi).
            
Multi-player: Find a few examples

## Example: Tic-Tac-Toe

Here is a simple example of the most basic game we can create with this framework:

<div id="info-view"></div>

<canvas id="tic-canvas" width="150" height="150">
    Your browser does not support the canvas element.
</canvas>

<button id="restart-button">Reset</button>

### Game Interface

<span class="code" style="font-weight: bold">.move(move)</span>

Makes a move for the player whose turn it is.

{% highlight javascript %}
var tic = new TicTacToe();
render(tic);
{% endhighlight %}

<canvas id="moves-board-move-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-move-1")
    });
    }());
</script>

{% highlight javascript %}
tic.move("5");
render(tic);
{% endhighlight %}

<canvas id="moves-board-move-2" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-move-2")
    });
    }());
</script>

---

<span class="code" style="font-weight: bold">.copy()</span>

Returns a copy of the game.

{% highlight javascript %}
var tic = new TicTacToe();
tic.move(5);
tic.move(4);
console.log(tic);
tic_copy = tic.copy()
print tic_copy
print id(tic)
print id(tic_copy)
{% endhighlight %}

---

<span class="code" style="font-weight: bold">.currentPlayer()</span>

Returns the player whose turn it is.

**Example**

{% highlight javascript %}
var tic = new TicTacToe();
render(tic);
{% endhighlight %}

<canvas id="moves-board-current-player-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-current-player-1")
    });
    }());
</script>

{% highlight javascript %}
tic.currentPlayer();    // "1"
tic.move("5");
render(tic);
{% endhighlight %}

<canvas id="moves-board-current-player-2" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-current-player-2")
    });
    }());
</script>

{% highlight javascript %}
tic.currentPlayer();    // "2"
{% endhighlight %}

---

<span class="code" style="font-weight: bold">.isOver()</span>

Returns true if the game is over, false otherwise.

**Example**

{% highlight javascript %}
var tic = new TicTacToe();
render(tic);
{% endhighlight %}

<canvas id="moves-board-over-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-over-1")
    });
    }());
</script>

{% highlight javascript %}
tic.isOver();    // false;
tic.move("5");
tic.move("4");
tic.move("1");
tic.move("9");
tic.move("3");
tic.move("2");
tic.move("7");
render(tic);
{% endhighlight %}

<canvas id="moves-board-over-2" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [['X', 'O', 'X'],
                ['O', 'X', ' '],
                ['X', ' ', 'O']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-over-2")
    });
    }());
</script>

{% highlight javascript %}
tic.isOver();    // true
{% endhighlight %}

---

<span class="code" style="font-weight: bold">.moves()</span>

Returns a list of legal moves for the player in turn.

**Examples**

**Example: new game**

{% highlight javascript %}
var tic = new TicTacToe();
render(tic);
{% endhighlight %}

<canvas id="moves-board-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe();
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-1")
    });
    }());
</script>

{% highlight javascript %}
tic.moves();    // ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
{% endhighlight %}

**Example: Some moves**

{% highlight javascript %}
var tic = new TicTacToe();
tic.move("5");
tic.move("4");
tic.move("1");
render(tic);
{% endhighlight %}

<canvas id="moves-board-some" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [['X', ' ', ' '],
                ['O', 'X', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-some")
    });
    }());
</script>

{% highlight javascript %}
tic.moves();    // ["2", "3", "6", "7", "8", "9"]
{% endhighlight %}

**Example: Game is over**

{% highlight javascript %}
var tic = new TicTacToe();
tic.move("5");
tic.move("4");
tic.move("1");
tic.move("9");
tic.move("3");
tic.move("2");
tic.move("7");
render(tic);
{% endhighlight %}

<canvas id="moves-board-over" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [['X', 'O', 'X'],
                ['O', 'X', ' '],
                ['X', ' ', 'O']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-over")
    });
    }());
</script>

{% highlight javascript %}
tic.moves();    // []
{% endhighlight %}

---

<span class="code" style="font-weight: bold">.newGame()</span>

Returns a new game.

**Example: new game**

{% highlight javascript %}
var tic = new TicTacToe();
tic.move("5");
tic.move("9");
render(tic);
{% endhighlight %}

<canvas id="moves-new-game-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', 'O']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-new-game-1")
    });
    }());
</script>

{% highlight javascript %}
var newGame = tic.newGame();
render(newGame);
{% endhighlight %}

<canvas id="moves-new-game-2" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-new-game-2")
    });
    }());
</script>

{% highlight javascript %}
render(tic);
{% endhighlight %}

<canvas id="moves-new-game-3" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', 'O']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-new-game-3")
    });
    }());
</script>

---

<span class="code" style="font-weight: bold">.outcomes()</span>

Returns a dictionary with the outcomes for each of the players.

---

<span class="code" style="font-weight: bold">.restart()</span>

Restarts the game.

**Example**

{% highlight javascript %}
var tic = new TicTacToe();
tic.move("5");
tic.move("9");
render(tic);
{% endhighlight %}

<canvas id="moves-board-restart-1" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', 'X', ' '],
                [' ', ' ', 'O']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-restart-1")
    });
    }());
</script>

{% highlight javascript %}
tic.restart();
render(tic);
{% endhighlight %}

<canvas id="moves-board-restart-2" class="small-board">
</canvas>

<script>
    (function() {
    var tic = new mauler.games.tic.TicTacToe({
        board: [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
    });
    var canvasView = new mauler.games.tic.CanvasView({
        model: tic,
        width: 100,
        height: 100,
        canvas: document.getElementById("moves-board-restart-2")
    });
    }());
</script>

---

### Old code

We will define an API for turn-based players. This can be games of n-number of players, as long as
only one player can move per turn. A few examples of this games are
[Tic-Tac-Toe](http://en.wikipedia.org/wiki/Tic-tac-toe), Checkers, Chess, etc. 

Here we define a simple API that will allow us to play basically any game with a generic algorithm:

A player only needs to be a function such as:

- .move(game). It takes a game state and returns the move to take. If it returns a number, it will
  be assumed it is the index of the list of moves. If is a string, it is the string representation.

### Game

A game is a description of strategic interaction that includes the constraints on the actions that
the players can take and the players’ interests, but does not specify the actions that the players
do take (Rasmusen, 2006).

We can define the basic interface of a turn-based games as,

Now let's put an example of what the implementation of Tic Tac Toe would return with the given API.

#### Copy

{% highlight python %}
tic = TicTacToe()
tic.move(5)
tic.move(4)
print tic
tic_copy = tic.copy()
print tic_copy
print id(tic)
print id(tic_copy)
{% endhighlight %}

#### Current player

{% highlight python %}
tic = TicTacToe()
print tic.current_player()
tic.move(1)
print tic.current_player()
tic.move(2)
print tic.current_player()
{% endhighlight %}

Note: Of course, the efficiency of the game is not the priority, because well, we wouldn't be using
Python in the first place. But for illustrative purposes I think Python is a great prototyping
programming language. All the examples presented here are 

### Players

Players are the individuals who make decisions. A player can be defined as a class that has a
*move()* method that takes that current state of the game and returns the move to take for the
player in turn.

{% highlight python %}
class Player:

    def move(self, game, time_due=0):
        return "Move 1"
{% endhighlight %}

As we can see, we also have an optional "timedue" argument that contains the time the player has to
computation.

For example, we can create a player that makes a random move,

{% highlight python %}
import random

class RandomPlayer:

    def move(self, game, time_due=0):
        return random.choice(game.get_moves())
{% endhighlight %}

Let's start a Tic-tac-toe game as an example:

{% highlight python %}
tic = TicTacToe()
print tic
#=> Player in turn: 1
#=> Legal moves: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
#=> - - -
#=> - - -
#=> - - -
{% endhighlight %}

We can use the random player to take a random move,

{% highlight python %}
rand_player = RandomPlayer()
move = rand_player.move(tic) # e.g. move = '4'
tic.move(move)
print tic
#=> Player in turn: 2
#=> Legal moves: ['1', '2', '3', '5', '6', '7', '8', '9']
#=> - - -
#=> X - -
#=> - - -
{% endhighlight %}

This simple framework allows us 

### Match

The game interface that we previously defined represent the current state of the game, which is the
only thing needed to take a game. For simplicity, we will define a *match* class to play games until
the end.

<canvas id="david">
</canvas>

<script>
var tic = new mauler.games.tic.TicTacToe({
    board: [['X', ' ', 'O'],
            ['O', 'X', 'O'],
            [' ', ' ', ' ']]
});
var canvasView = new mauler.games.tic.CanvasView({
    model: tic,
    width: 100,
    height: 100,
    canvas: document.getElementById("david")
});
</script>

{% highlight python %}
game = TicTacToe()
players = [RandomPlayer(), RandomPlayer()]
match = Match(game, players)
match.play()
print game

#=> Player 1 wins!
#=> O O X
#=> - X O
#=> X - X
{% endhighlight %}

We can pass the verbose option in the play() method,

{% highlight python %}
game = TicTacToe()
players = [RandomPlayer(), RandomPlayer()]
match = Match(game, players)
match.play(verbose=true)

#=> Player in turn: 1
#=> Legal moves: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
#=> - - -
#=> - - -
#=> - - -
#=>
#=> Player in turn: 2
#=> Legal moves: ['2', '3', '4', '5', '6', '7', '8', '9']
#=> X - -
#=> - - -
#=> - - -
#=>
#=> Player in turn: 1
#=> Legal moves: ['2', '3', '4', '6', '7', '8', '9']
#=> X - -
#=> - O -
#=> - - -
#=>
#=> Player in turn: 2
#=> Legal moves: ['2', '4', '6', '7', '8', '9']
#=> X - X
#=> - O -
#=> - - -
#=>
#=> Player in turn: 1
#=> Legal moves: ['2', '4', '7', '8', '9']
#=> X - X
#=> - O O
#=> - - -
#=>
#=> Player 1 wins!
#=> X X X
#=> - O O
#=> - - -
{% endhighlight %}