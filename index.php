<html>
    <head>
        <link href="assets/css/blocks.less" rel="stylesheet/less"/>


        <script>
            less = {
                env: "development",
                async: false,
                fileAsync: false,
                poll: 1000,
                functions: {},
                dumpLineNumbers: "comments",
                //relativeUrls: false,
                //rootpath: ":/a.com/"
            };
        </script>
        <script src="assets/js/less.min.js" type="text/javascript"></script>
        <script>less.watch();</script>


        <link rel="stylesheet" href="assets/css/jquery-ui.min.css">
        <link rel="stylesheet" href="assets/css/ui.css">
        <!--link rel="stylesheet" href="assets/css/blocs.css"-->
        <link rel="stylesheet" href="assets/css/style.css">

        <script src="assets/js/jquery-3.2.1.min.js"></script>
        <script src="assets/js/jquery-ui.min.js"></script>

        <script src="datas.js"></script>
        <script src="tools.js"></script>

        <!-- autoloading js classes -->
        <?php include 'autoload.php' ?>

        <script src="plugin/jquery.collapse.js"></script>
    </head>
    <body>
    <main class="flex">
        <!-- BOARD -->
        <div id="board">
            <table id="edit-board"></table>
            <table id="render-board" class="hidden"></table>
        </div>


        <!-- TOOLBAR -->
        <div id="GUI">
            <h3>Inventaire
                <button class="fright button" id="start-night">START NIGHT(MARE)</button>
            </h3>
            <div id="inventory" class="collapse"></div>
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
            <h3>Personnages
                <button class="fright button" id="next-turn">Next Turn</button>
            </h3>
            <div id="characters">
                <div>
                    <p id="data"></p>
                    <p id="actions"></p>
                </div>
                <div id="character" class="flex"></div>
                </div>
            <h3>Debug</h3>
            <div id="debug">
                <input id="mousecell">
                <input id="mousecoord">
                <p>Renderer
                    <button class="button" id="export-board">Export</button>
                </p>
            </div>
        </div>
    </main>

    <script src="main.js"></script>
    </body>
</html>
