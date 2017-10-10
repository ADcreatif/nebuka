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

        <script src="classes/Bloc.model.js"></script>
        <script src="classes/Board.class.js"></script>
        <script src="classes/Toolbox.class.js"></script>
        <script src="classes/draggable.plugin.js"></script>
        <script src="script.js"></script>
    </head>
    <body>
        <main>
            <div id="board"></div>
            <div id="toolbox"></div>
            <!-- TODO : delete this temporary test -->
            <div>
                    <label> quantity </label><input type="text" value="1" id="quantity">
                    <br /><br />
                    <button id="plusWood"> + WOOD </button>  
                    <button id="minusWood"> - WOOD </button>  
                    <br /><br />
                    <button id="plusStone"> + STONE </button>  
                    <button id="minusStone"> - STONE </button>  
                    <br /><br />

                    <button id="plusTower"> + TOWER </button>  
                    <button id="minusTower"> - TOWER </button>  
                    <br /><br />


            </div>
        </main>
    </body>
</html>
