import {Stage} from "../enums/Stage";
import {getTilesForPlayer} from "./PlayerUtils";

export const getPlayer = (G, ctx) => {
    return G.playerData[ctx.currentPlayer];
}

export const getTile = (G, id) => {
    return G.board.tiles.get(id);
}

export const hideAllTargetLocations = (G) => {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        if (tile.topStructureColor == 'target') {
            tile.hideTopStructure = true;
        }

        if (tile.leftStructureColor == 'target') {
            tile.hideLeftStructure = true;
        }

        if (tile.leftRoadColor == 'target') {
            tile.hideLeftRoad = true;
        }

        if (tile.topLeftRoadColor == 'target') {
            tile.hideTopLeftRoad = true;
        }

        if (tile.topRightRoadColor == 'target') {
            tile.hideTopRightRoad = true;
        }
    }
}

export const showAllRoadLocations = (G) => {
    let tiles = getAllTiles(G);
    for (let tile of tiles) {
        tile.hideLeftRoad = false;
        tile.hideTopLeftRoad = false;
        tile.hideTopRightRoad = false;
    }
}

export const showTargetLocationsForPlayerAndStage = (G, ctx, stage) => {
    let player = getPlayer(G, ctx);
    let playersTiles = getTilesForPlayer(G, player);
    switch (stage) {
        case Stage.BUILD_SETTLEMENT:
            if (player.roads < 2) {

            } else {

            }
            break;
        case Stage.BUILD_ROAD:
            for(let tile of playersTiles) {
                showRoadPlacementsForTileAndPlayer(tile, player);
            }
            break;
    }
}

export const showRoadPlacementsForTileAndPlayer = (tile, player) => {
    if (tile.topStructureColor === player.color) {
        showRoadPlacementsForTopStructure(tile, player);
    } else if (tile.leftStructureColor === player.color) {
        showRoadPlacementsForLeftStructure(tile, player);
    } else if (tile.topRightRoadColor == player.color) {
        showRoadPlacementsForTopStructure(tile, player);
        showRoadPlacementsForTopRightNeighbour(tile.topRightNeighbour, player);
    } else if (tile.leftRoadColor == player.color) {
        showRoadPlacementsForLeftNeighbour(tile.leftNeighbour, player);
    }  else if (tile.topLeftRoadColor == player.color) {
        showRoadPlacementsForLeftNeighbour(tile.leftNeighbour, player);
    }
}

export const showRoadPlacementsForTopStructure = (tile, player) => {
    if (tile.topLeftRoadColor === 'target') {
        tile.hideTopLeftRoad = false;
    } else if (tile.topLeftRoadColor === player.color) {
        showRoadPlacementsForLeftStructure(tile, player);
    }

    if (tile.topRightRoadColor === 'target') {
        tile.hideTopRightRoad = false;
    }
}

export const showRoadPlacementsForLeftStructure = (tile, player) => {
    if (tile.topLeftRoadColor === 'target') {
        tile.hideTopLeftRoad = false;
    }

    if (tile.leftRoadColor === 'target') {
        tile.hideLeftRoad = false;
    }

    showRoadPlacementsForLeftNeighbour(tile.leftNeighbour, player);
}

export const showRoadPlacementsForLeftNeighbour = (tile, player) => {
    if (tile.topRightRoadColor === 'target') {
        tile.hideTopRightRoad = false;
    } else if (tile.topRightRoadColor === player.color) {
        showRoadPlacementsForTileAndPlayer(tile, player);
    }
}

export const showRoadPlacementsTopRightRoad = (tile, player) => {
    if (tile.topRightRoadColor === 'target') {
        tile.hideTopRightRoad = false;
    } else if (tile.topRightRoadColor === player.color) {
        showRoadPlacementsForTileAndPlayer(tile, player);
    }
}

export const showRoadPlacementsForTopRightNeighbour = (tile, player) => {
    if (tile.leftRoadColor === 'target') {
        tile.hideLeftRoad = false;
    } else {
        showRoadPlacementsForTileAndPlayer(tile, player);
    }
}

export const getAllTiles = (G) => {
   return G.board.tiles.values();
}