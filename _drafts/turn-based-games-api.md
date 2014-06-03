---
layout:   post
title:    "Turn-Based Games API"
date:     2014-01-18 09:48:16
comments: true
---

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

{% highlight python %}
class Game:

    def copy(self):
        """
        Returns a copy of the game.
        """
        pass

    def current_player(self):
        """
        Returns the player whose turn it is. (e.g. 1)
        """
        pass

    def is_over(self):
        """
        Returns true if the game is over, false otherwise.
        """
        pass

    def get_moves(self):
        """
        Returns the legal moves for the player in turn.
        """

    def move(self, move):
        """
        Makes a move for the player whose turn it is.
        """
        pass

    def new_game(self):
        """
        Returns a new game.
        """
        pass

    def num_moves(self):
        """
        Returns the number of legal moves for the player in turn.
        """
        pass

    def outcomes(self):
        """
        Returns a dictionary with the outcomes for each of the players.
        """
        pass

    def reset(self):
        """
        Restarts the game.
        """
        pass

{% endhighlight %}

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

<canvas id="canvas" width="150" height="150">
Your browser does not support the canvas element.
</canvas>

<script src="/js/tic-tac-toe.js"></script>

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
