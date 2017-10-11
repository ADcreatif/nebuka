<html>
    <head>
        <!--<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>-->
        <link rel="stylesheet" href="css/ui.css">
        <link rel="stylesheet" href="css/blocs.css">
        <link rel="stylesheet" href="css/style.css">

        <script src="jquery-3.2.1.min.js"></script>

        <script src="classes/Block.class.js"></script>
        <script src="classes/BlockFactory.class.js"></script>
        <script src="classes/Stock.class.js"></script>
        <script src="classes/Inventory.class.js"></script>

        <script src="classes/Board.class.js"></script>
        <script src="classes/RenderBoard.class.js"></script>
        <script src="classes/draggable.plugin.js"></script>
        <script src="script.js"></script>
    </head>
    <body>
        <main>
            <div id="board"></div>
            <div id="toolbox"></div>
            <!-- TODO : delete this temporary test -->
            <div>
                <p id="render">
                    <button id="export-board">Export Board</button>
                    <button id="start-render">Afficher Rendu</button>
                    <button id="stop-render">Masquer Rendu</button>
                </p>
                <p id="shitTest">
                    <label> quantity </label><input type="text" value="1" id="quantity">
                    <br>
                    <button data-material="1" data-type="1" data-increment> + WOOD </button>
                    <button data-material="1" data-type="1"> - WOOD </button>
                    <br>
                    <button data-material="2" data-type="1" data-increment> + STONE </button>
                    <button data-material="2" data-type="1"> - STONE </button>
                    <br>
                    <button data-material="1" data-type="2" data-increment> + TOWER </button>
                    <button data-material="1" data-type="2"> - TOWER </button>
                </br>
            </div>
        </main>
    </body>
</html>
