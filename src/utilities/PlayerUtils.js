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

export const getTilesWithSettlementsFromPlayer = (G, player) => {
    let playersTiles = [];

    for (let tileId of player.settlements) {
        let tile = getTile(G, tileId);
        playersTiles.push(tile);
    }

    return playersTiles;
}

export const getTilesWithCitiesFromPlayer = (G, player) => {
    let playersTiles = [];

    for (let tileId of player.cities) {
        let tile = getTile(G, tileId);
        playersTiles.push(tile);
    }

    return playersTiles;
}

export const getTilesForPlayer = (G, player) => {
    let playersTiles = [];
    playersTiles = playersTiles.concat(getTilesWithSettlementsFromPlayer(G, player));
    playersTiles = playersTiles.concat(getTilesWithCitiesFromPlayer(G, player));
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

export const numberOfSettlementsForCurrentPlayer = (G, ctx) => {
    return currentPlayer(G, ctx).settlements.length;
}

export const numberOfSettlementsForSelectedPlayer = (player) => {
    return player.settlements.length;
}

export const numberOfRoadsForSelectedPlayer = (player) => {
    return player.roads;
}

export const playerDataForGame = (G) => {
    return G.playerData;
}