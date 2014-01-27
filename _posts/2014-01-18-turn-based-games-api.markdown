---
layout: post
title:  "Turn-Based Games API"
date:   2014-01-18 09:48:16
comments: true
---

We will define an API for turn-based players. This can be games of n-number of players, as long as
only one player can move per turn. A few examples of this games are Tic-Tac-Toe, Checkers, Chess,
etc. 

Here we define a simple API that will allow us to play basically any game with a generic algorithm:

- .copy(): returns a copy of the game.
- .curPlayer(): returns the player in turn. The player indices start from 0.
- .isOver(): returns true if the game is over.
- .makeMove(): makes a move for the player in turn. It can take the index of the move of a string of
               the move. Make a random move when no parameters given.
- .moves(): returns a list of the legal moves for the current game state. The
            moves are represented as strings using game specific representation.
- .newGame(): creates a new game.
- .numMoves(): returns the number of legal moves for the player in turn.
- .outcomes(): returns an array with the outcomes for each of the players.
- .reset(): restarts the game.

{% highlight ruby %}
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def to_s
    "My name is #{@name} and my age is #{@age}"
  end
end
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

A player only needs to be a function such as:

- .move(game). It takes a game state and returns the move to take. If it returns a number, it will
  be assumed it is the index of the list of moves. If is a string, it is the string representation.

You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

<canvas id="canvas" width="150" height="150">
Your browser does not support the canvas element.
</canvas>

<script src="/js/tic-tac-toe.js"></script>

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
