
// change to 'var' to make them kind of private

var MatchController = function(game, players) {

	var _this = this;
	this.game = game;
	this.players = players;
	this.currentBoardIndex = 0;
	this.observers = [];

	this.playToEnd = function() {
		while (this.isNext()) {
			this.next();
			notifyObservers();
		}
	}

	this.setChange = function(index) {
		this.currentBoardIndex = index;
		notifyObservers();
	}

	this.getSize = function() {
		return this.gameHistory.length;
	}

	this.getCurrentIndex = function() {
		return this.currentBoardIndex;
	}

	this.getGame = function(ply) {
		if (!ply) {
			return this.gameHistory[this.currentBoardIndex];
		}
		return this.gameHistory[ply];
	}

	this.getMove = function(gameIndex) {
		return this.moveHistory[gameIndex];
	}

	this.isStart = function() {
		return this.currentBoardIndex > 0;
	}

	this.isEnd = function() {
        return this.currentBoardIndex < this.gameHistory.length - 1;
	}

	this.isOver = function() {
		return this.gameHistory[this.gameHistory.length - 1].isOver();
	}

	this.isNext = function() {
		return this.currentBoardIndex !== this.gameHistory.length - 1 || !this.gameHistory[this.gameHistory.length - 1].isOver();
	}

	this.isPrev = function() {
		return this.currentBoardIndex > 0;
	}

	this.start = function() {
		if (_this.isStart()) {
			_this.currentBoardIndex = 0;
			_this.notifyObservers();
		}
	}

	this.prev = function() {
		if (_this.isPrev()) {
			_this.currentBoardIndex--;
			_this.notifyObservers();
		}
	}

	this.copy = function() {

	}

	this.next = function() {
		if (!_this.isNext()) {
			return;
		}
		var gameCopy = _this.gameHistory[_this.gameHistory.length - 1].copy();
		if (_this.currentBoardIndex === _this.gameHistory.length - 1) {
			var moveIndex = _this.players[gameCopy.curPlayer()].call(this, gameCopy);
			var moveString = gameCopy.moves()[moveIndex];
			gameCopy.move(moveIndex);
			if (!_this.gameHistory[_this.gameHistory.length - 1].equals(gameCopy)) {
				_this.gameHistory.push(gameCopy);
				_this.moveHistory.push(moveString);
				_this.currentBoardIndex++;
				_this.notifyObservers();
			}
		} else {
			_this.currentBoardIndex++;
			_this.notifyObservers();
		}
	}

	this.end = function() {
		if (_this.isEnd()) {
			_this.currentBoardIndex = _this.gameHistory.length - 1;
			_this.notifyObservers();
		}
	}

	this.registerObserver = function(observer) {
		this.observers.push(observer);
	}

	this.removeObserver = function(observer) {
		// this.observers.remove(observer);
	}

	this.notifyObservers = function(observer) {
		for (var i = 0; i < this.observers.length; i++) {
			this.observers[i](this, this);
		}
	}

	this.reset = function() {
		_this.currentBoardIndex = 0;
		_this.moveHistory = [];
		_this.gameHistory = [_this.game.newGame()];
		_this.notifyObservers();
	}

	this.reset();
}

var TicTacToe = function() {

	this.size = 3;
	this.winPatterns = [7, 56, 448, 73, 146, 292, 273, 84];
	this.crosses = 0;
	this.noughts = 0;

	this.equals = function(other) {
		return this.crosses === other.crosses && this.noughts === other.noughts;
	}

	this.cellIndex = function(cellIndex) {
		if ((this.crosses & (1 << cellIndex)) !== 0) {
			return "CROSS";
		}
		if ((this.noughts & (1 << cellIndex)) !== 0) {
			return "NOUGHT";
		}
		return "EMPTY";
	}

	this.cell = function(row, col) {
		return this.cellIndex(this.size * row + col);
	}

	// Turn-Based Game API methods
	
	this.copy = function() {
		var tic = new TicTacToe();
		tic.crosses = this.crosses;
		tic.noughts = this.noughts;
		return tic;
	}

	this.curPlayer = function() {
		return (this.emptyCells() + 1) % 2;
	}

	this.isOver = function() {
		return this.numMoves() == 0;
	}

	this.move = function(move) {
		// game is over
		if (this.isOver()) {
			throw RangeError("Can't make more moves, game is over.");
		}
		// make random move if no move given
		if (arguments.length === 0) {
			move = Math.floor(Math.random() * this.numMoves());
		}
		if (move < 0 || move >= this.numMoves()) {
			throw RangeError("Illegal move");
		}
		this.setCurBitboard(this.getCurBitboard() | (1 << this.legalMoves()[move]));
	}

	this.moves = function() {
		var mvs = [],
		    legal = this.legalMoves()
			letters = ['A', 'B', 'C'];
		for (var i = 0; i < legal.length; i++) {
			var row = Math.floor(i / 3);
			var col = (i % 3) + 1;
			mvs.push(letters[row] + col.toString());
		}
		return mvs
	}

	this.newGame = function() {
		return new TicTacToe();
	}

	this.numMoves = function() {
		return this.isWin() ? 0 : this.emptyCells();
	}

	this.numPlayers = function() {
		return 2;
	}

	this.outcomes = function() {
		if (!this.isOver()) {
			return ["NA", "NA"];
		}
		if (this.checkWin(this.crosses)) {
			return ["WIN", "LOSS"];
		}
		if (this.checkWin(this.noughts)) {
			return ["LOSS", "WIN"];
		}
		return ["DRAW", "DRAW"];
	}

	this.reset = function() {
		this.crosses = 0;
		this.noughts = 0;
	}

	this.toString = function() {
		var builder = "";
		if (!this.isOver()) {
			builder += "Player: " + this.curPlayer() + "\n";
			builder += "Moves: " + this.moves() + "\n";
		} else {
			builder += "Game Over!\n";
		}
		builder += "\n";
		for (var i = 0; i < 9; i++) {
			if ((this.crosses & (1 << i)) !== 0) {
				builder += " X ";
			} else if ((this.noughts & (1 << i)) !== 0) {
				builder += " O ";
			} else {
				builder += " - ";
			}
			if (i % 3 === 2) {
				builder += "\n";
			}
		}
		return builder;
	}

	// Tic-Tac-Toe methods
	this.isWin = function() {
		return this.checkWin(this.crosses) || this.checkWin(this.noughts);
	}

	this.emptyCells = function() {
		return 9 - this.bitCount(this.crosses | this.noughts);
	}

	this.bitCount = function(num) {
	   var count = 0;
	   for (var i = 0; i < 9; i++) {
		   if ((num & (1 << i)) > 0) {
			   count++;
		   }
		}
		return count;
	}
	
	this.legalMoves = function() {
		var moves = [];
		if (this.numMoves() > 0) {
			var legal = ~(this.crosses | this.noughts);
			for (var i = 0; i < 9; i++) {
				if ((legal & (1 << i)) !== 0) {
					moves.push(i);
				}
			}
		}
		return moves;
	}

	this.checkWin = function(board) {
		for (var i = 0; i < this.winPatterns.length; i++) {
			if ((board & this.winPatterns[i]) === this.winPatterns[i]) {
				return true;
			}
		}
		return false;
	}

	this.getCurBitboard = function() {
		return this.curPlayer() === 0 ? this.crosses : this.noughts;
	}
	
	this.setCurBitboard = function(bitboard) {
		if (this.curPlayer() === 0) {
			this.crosses = bitboard;
		} else {
			this.noughts = bitboard;
		}
	}
}

var playRandomGame = function(game) {
	console.log(game.toString());
	while (!game.isOver()) {
		game.move();
		console.log(game.toString());
	}
}

var drawTicTacToe = function(ctx, tic) {
	var width = ctx.canvas.width,
	    height = ctx.canvas.height,
		squareSize = canvas.width / 3,
		cellPer = 0.8;

	// background
	ctx.fillStyle = 'rgb(255, 203, 5)';
	ctx.fillRect(0, 0, width, height);
	
	// border
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.strokeRect(0, 0, width, height);

	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 3; col++) {
			if (tic.cell(row, col) === 'CROSS') {
				var x = col * squareSize + (squareSize * ((1 - cellPer) / 2)),
					y = row * squareSize + (squareSize * ((1 - cellPer) / 2)),
					pieceWidth = squareSize * cellPer,
					pieceHeight = squareSize * cellPer;
				ctx.fillStyle = 'rgb(0, 0, 255';
				ctx.fillRect(x, y, pieceWidth, pieceHeight);
			} else if (tic.cell(row, col) === 'NOUGHT') {
				ctx.beginPath();
				var centerX = col * squareSize + (squareSize / 2),
					centerY = row * squareSize + (squareSize / 2),
					radius = squareSize / 2 * cellPer, // 80% of the square size
					startAngle = 0,
					endAngle = 2 * Math.PI,
					counterClockwise = false;
				ctx.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);
				ctx.StrokeStyle = 'green';
				ctx.stroke();
			}
		}
	}
}



var randPlayer = function(game) {
	return Math.floor(Math.random() * game.numMoves());
}

var players = [randPlayer, randPlayer];

game = new TicTacToe();
match = new MatchController(game, players);

// playRandomGame(game);
var ctx = document.getElementById("canvas").getContext("2d");

var startButton = document.getElementById('startButton'),
	prevButton = document.getElementById('prevButton'),
	playButton = document.getElementById('playButton'),
	nextButton = document.getElementById('nextButton'),
	endButton = document.getElementById('endButton'),
	resetButton = document.getElementById('resetButton'),
	curPlayerDiv = document.getElementById('curPlayer'),
	index = document.getElementById('index');

startButton.addEventListener('click', match.start);
prevButton.addEventListener('click', match.prev);
playButton.addEventListener('click', match.play);
nextButton.addEventListener('click', match.next);
endButton.addEventListener('click', match.end);
curPlayerDiv.addEventListener('click', match.curPlayerDiv);
resetButton.addEventListener('click', match.reset);

var robles = function(matchController) {
	startButton.disabled = !matchController.isStart();
	prevButton.disabled = !matchController.isPrev();
	nextButton.disabled = !matchController.isNext();
	endButton.disabled = !matchController.isEnd();
	index.innerHTML = (matchController.getCurrentIndex() + 1) + ' / ' + matchController.getSize();
	curPlayerDiv.innerHTML = matchController.getGame().curPlayer() + 1;
	drawTicTacToe(ctx, matchController.getGame());
}

match.registerObserver(robles);
match.notifyObservers();










