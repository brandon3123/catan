import {Structure} from "../enums/Structure";
import {getTile} from "./CatanUtils";

export const addStructureToPlayer = (player, type, id) => {
    switch (type) {
        case Structure.SETTLEMENT:
            player.settlements.push(id);
            break;
        case Structure.CITY:
            player.cities.push(id);
            break;
    }
    player.victoryPoints = calculateVictoryPoints(player);
}

export const getTilesForPlayer = (G, player) => {
    let playersTiles = [];
    for (let tileId of player.settlements) {
        let tile = getTile(G, tileId);
        playersTiles.push(tile);
    }
    return playersTiles;
}

export const currentPlayer = (G, ctx) => {
    return G.playerData[ctx.currentPlayer];
}

export const calculateVictoryPoints = (player) => {
    let victoryPoints = 0;
    victoryPoints += player.settlements.length;
    victoryPoints += (player.cities.length * 2);
    return victoryPoints;
}