<html>
    <head>
        <link rel="stylesheet" href="asset/css/jquery-ui.min.css">
        <link rel="stylesheet" href="asset/css/ui.css">
        <link rel="stylesheet" href="asset/css/blocs.css">
        <link rel="stylesheet" href="asset/css/style.css">

        <script src="asset/js/jquery-3.2.1.min.js"></script>
        <script src="asset/js/jquery-ui.min.js"></script>

        <script src="datas.js"></script>

        <script src="class/Resource.class.js"></script>
        <script src="class/ResourceStock.class.js"></script>

        <script src="class/SkillTree.class.js"></script>
        <script src="class/Skill.class.js"></script>
        <script src="class/Character.class.js"></script>
        <script src="class/Game.class.js"></script>

        <script src="class/Block.class.js"></script>
        <script src="class/BlockFactory.class.js"></script>
        <script src="class/Stock.class.js"></script>
        <script src="class/Inventory.class.js"></script>

        <script src="class/Board.class.js"></script>
        <script src="class/RenderBoard.class.js"></script>
        <script src="class/Draggable.js"></script>
        <script src="plugin/jquery.collapse.js"></script>
        <script src="main.js"></script>
    </head>
    <body>
    <main class="flex">
            <div id="edit-board"></div>
            <div id="render-board"></div>
        <div id="GUI">
            <h3>Inventaire <span id="render" class="fright">Renderer<button id="export-board">Export</button><button
                            id="toggle-render">Start</button></span></h3>
            <div id="toolbox" class="collapse"></div>
            <h3>Boutique</h3>
            <div id="stock">
                <ul id="blocks">
                    <li>
                        <i class="bloc wall wood_wall"></i>
                        <input id="wall_wood_inv" type="number" data-type="1">
                    </li>
                    <li>
                        <i class="bloc wall stone_wall"></i>
                        <input id="wall_stone_inv" type="number" data-type="2">
                    </li>
                    <li>
                        <i class="bloc tower wood_tower"></i>
                        <input id="tower_wood_inv" type="number" data-type="11">
                    </li>
                </ul>
                <ul id="ressources">
                    <li>
                        <i class="bloc resource wood"></i>
                        <input id="wood_inv" type="number" data-type="1">
                    </li>
                    <li>
                        <i class="bloc resource stone"></i>
                        <input id="stone_inv" type="number" data-type="2">
                    </li>
                    <li>
                        <i class="bloc resource steel"></i>
                        <input id="steel_inv" type="number" data-type="3">
                    </li>
                </ul>
            </div>
            <h3>Personnages</h3>
            <div id="characters">
                <div>
                    <p id="data"></p>
                    <p id="actions"></p>
                </div>
                <div id="character" class="flex"></div>
                </div>
            </div>
        </main>
    </body>
</html>
