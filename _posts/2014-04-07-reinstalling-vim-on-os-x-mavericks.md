---
layout:     post
title:      "Reinstalling Vim on OS X Mavericks"
date:       2014-04-07 13:03:45
comments:   true
categories: [Evolutionary algorithms, Genetic Algorithms]
---

1. brew install mercurial
2. hg clone https://code.google.com/p/vim/
3. cd vim
4. ./configure --enable-pythoninterp --enable-rubyinterp --prefix=/usr
5. make
6. sudo make install
7. restart the terminal
8. and vim --version
