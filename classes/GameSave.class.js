"use strict";

class GameSave {

    static loadDatas(part, slot) {
        slot = slot || 0;
        return JSON.parse(window.localStorage.getItem(part + slot)) || [];
    }

    static saveDatas(datas, part, slot) {
        slot = slot || 0;
        window.localStorage.setItem(part + slot, JSON.stringify(datas));
    }

    static saveGame(game) {
        GameSave.saveDatas(game.board.blocks, GameSave.BOARD);
    }
}

GameSave.BOARD = "nebuka_board_";
GameSave.INVENTORY = "nebuka_inventory_";
GameSave.PLAYERS = "nebuka_players_";

// TODO : save inventory