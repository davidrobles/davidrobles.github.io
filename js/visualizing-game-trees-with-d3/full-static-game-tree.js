var generateSVGTree = function(tic, mysel, options) {

    var margin = { top: 50, right: 30, bottom: 60, left: 30 },
        width = (options.width || 675) - margin.left - margin.right,
        height = (options.height || 400) - margin.top - margin.bottom,
        nodeSize = options.nodeSize || 85,
        edgeWidth = options.edgeWidth || 2;

    var root = {
        game: tic
    };

    var svgView = new ma.views.TicTacToeSVG({
        model: tic,
        sideLength: nodeSize
    });

    var depthFirstTreeGenerator = function(node) {
        var moves = node.game.moves();
        if (moves.length > 0) {
            node.children = [];
            for (var i = 0; i < moves.length; i++) {
                var newGameNode = { game: node.game.copy().move(i) };
                node.children.push(newGameNode);
                depthFirstTreeGenerator(newGameNode);
            }
        }
    };

    depthFirstTreeGenerator(root);

    var diagonal = d3.svg.diagonal().projection(function(d) { return [d.x, d.y]; });

    var svg = d3.select(mysel)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("style", "background-color: #eeeeee")
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var tree = d3.layout.tree().size([width, height]);

    tree.separation(function() {
        return 2;
    });

    var nodes = tree(root);

    var drawNodes = function() {

        var nodeMargin = nodeSize / 3.4;

        svg.selectAll("path")
            .data(tree.links(nodes))
            .enter().append("path")
            .attr("d", diagonal)
            .attr("fill", "none")
            .attr("stroke", "#666666")
            .attr("stroke-width", edgeWidth);

        svg.selectAll("g.node-group")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node-group")
            .attr("transform", function(d) {
                return "translate(" + (d.x - nodeMargin) + ", " + (d.y - nodeMargin) + ")"
            });

        // Draw nodes
        svg.selectAll(".node-group")
            .each(function(node) {
                svgView.model = node.game;
                svgView.svg = d3.select(this);
                svgView.render();
            });

        // Resize game nodes
        svg.selectAll(".node-group")
            .attr("transform", function() {
                return this.getAttribute("transform") + " scale(0.6)";
            });

    };

    drawNodes();
    return svg;
};

(function() {
    var tic = new ma.games.TicTacToe({
        board: [['O', 'X', 'O'],
                ['O', 'X', ' '],
                [' ', ' ', 'X']]
    });
    generateSVGTree(tic, "#full-static-game-tree", {
        nodeSize: 85
    });

    // Two ply

    var tic = new ma.games.TicTacToe({
        board: [['O', 'X', 'O'],
                ['X', ' ', ' '],
                ['O', 'X', 'X']]
    });

    generateSVGTree(tic, "#final-game-tree-2-ply", {
        height: 300,
        nodeSize: 80
    });

    // Three ply

    var tic = new ma.games.TicTacToe({
        board: [['O', 'X', 'O'],
                [' ', 'X', ' '],
                ['X', 'O', ' ']]
    });
    generateSVGTree(tic, "#final-game-tree-3-ply", {
        nodeSize: 80
    });

    // Four ply

    var tic = new ma.games.TicTacToe({
        board: [['O', 'X', 'O'],
                [' ', 'X', ' '],
                ['X', ' ', ' ']]
    });
    generateSVGTree(tic, "#final-game-tree-4-ply", {
        nodeSize: 40
    });

    var tic = new ma.games.TicTacToe({
        board: [['O', 'X', 'O'],
                [' ', 'X', ' '],
                [' ', ' ', ' ']]
    });
    generateSVGTree(tic, "#final-game-tree-5-ply", {
        nodeSize: 12,
        edgeWidth: 1
    });

}());
