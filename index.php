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
        <script src="classes/draggable.plugin.js"></script>
        <script src="script.js"></script>
    </head>
    <body>
        <main>
            <div id="board"></div>
            <div id="toolbox"></div>
            <!-- TODO : delete this temporary test -->
            <div id="shitTest">
                <label> quantity </label><input type="text" value="1" id="quantity">
                <p>
                <button data-material="1" data-type="1" data-increment> + WOOD </button>
                <button data-material="1" data-type="1"> - WOOD </button>
                <p>
                <button data-material="2" data-type="1" data-increment> + STONE </button>
                <button data-material="2" data-type="1"> - STONE </button>
                <p>
                <button data-material="1" data-type="2" data-increment> + TOWER </button>
                <button data-material="1" data-type="2"> - TOWER </button>
            </div>
        </main>
    </body>
</html>
