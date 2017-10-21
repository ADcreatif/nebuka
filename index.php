<html>
    <head>
        <!--<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>-->
        <link rel="stylesheet" href="css/ui.css">
        <link rel="stylesheet" href="css/blocs.css">
        <link rel="stylesheet" href="css/style.css">

        <script src="jquery-3.2.1.min.js"></script>

        <script src="classes/Resource.class.js"></script>
        <script src="classes/ResourceStock.class.js"></script>

        <script src="classes/Block.class.js"></script>
        <script src="classes/BlockFactory.class.js"></script>
        <script src="classes/Stock.class.js"></script>
        <script src="classes/Inventory.class.js"></script>

        <script src="classes/Board.class.js"></script>
        <script src="classes/RenderBoard.class.js"></script>
        <script src="classes/draggable.plugin.js"></script>
        <script src="sources/jQuery.plugin.collapse.js"></script>
        <script src="script.js"></script>
    </head>
    <body>
        <main>
            <div id="edit-board"></div>
            <div id="render-board"></div>
            <div id="toolbox" class="collapse">

            </div>
            
            <!-- TODO : delete this temporary test -->
            <div>
                <div id="resources"></div>
                <p id="render">
                    Renderer : <button id="export-board">Export</button><button id="toggle-render">Start</button>
                </p>
                <p id="shitTest">
                    <label> quantity </label><input type="text" value="1" id="quantity">
                    <br>
                    <button data-material="1" data-type="1" data-increment> + WOOD BLOCK </button>
                    <button data-material="1" data-type="1"> - WOOD BLOCK </button>
                    <br>
                    <button data-material="2" data-type="1" data-increment> + STONE BLOCK </button>
                    <button data-material="2" data-type="1"> - STONE BLOCK </button>
                    <br>
                    <button data-material="1" data-type="2" data-increment> + TOWER BLOCK</button>
                    <button data-material="1" data-type="2"> - TOWER BLOCK</button>
                </p>
                <h2> resource </h2>
                <p id="shitTest2">
                    <label> quantity </label><input type="text" value="1" id="resource_quantity">
                    <br>
                    <button data-type="1" data-increment> + WOOD </button>
                    <button data-type="1"> - WOOD </button>
                    <br>
                    <button data-type="2" data-increment> + STONE </button>
                    <button data-type="2"> - STONE </button>
                    <br>
                    <button data-type="3" data-increment> + STEEL </button>
                    <button data-type="3"> - STEEL </button>
                </p>
            </div>
        </main>
    </body>
</html>
