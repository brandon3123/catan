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
    let playersTiles = getAllTiles(G);
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
    if (tileHasNoBuiltRoads(tile)) {
        if (tileHasOnlyTopStructure(tile)) {
            showTopLeftRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile);
            showLeftRoadTargetForTile(tile.topRightNeighbour);
        } else if (tileHasOnlyLeftStructure(tile)) {
            showTopLeftRoadTargetForTile(tile);
            showLeftRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile.leftNeighbour);
        }
    } else {
        if (playerLeftRoadOnTile(tile, player)) {
            showTopLeftRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile.leftNeighbour);
            showTopRightRoadTargetForTile(tile.bottomLeftNeighbour);
            showTopLeftRoadTargetForTile(tile.bottomLeftNeighbour);
        }

        if (playerHasTopLeftRoadOnTile(tile, player)) {
            showLeftRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile.leftNeighbour);
            showLeftRoadTargetForTile(tile.topRightNeighbour);
        }

        if (playerHasTopRightRoadOnTile(tile, player)) {
            showTopLeftRoadTargetForTile(tile);
            showLeftRoadTargetForTile(tile.topRightNeighbour);
            showTopLeftRoadTargetForTile(tile.topRightNeighbour.bottomRightNeighbour);
            showLeftRoadTargetForTile(tile.topRightNeighbour.bottomRightNeighbour);
        }
    }
}

export const playerLeftRoadOnTile = (tile, player) => {
    return tile.leftRoadColor === player.color;
}

export const playerHasTopLeftRoadOnTile = (tile, player) => {
    return tile.topLeftRoadColor === player.color;
}

export const playerHasTopRightRoadOnTile = (tile, player) => {
    return tile.topRightRoadColor === player.color;
}

export const showTopLeftRoadTargetForTile = (tile) => {
    if (tile && tile.hideTopLeftRoad != null) {
        tile.hideTopLeftRoad = false;
    }
}

export const showTopRightRoadTargetForTile = (tile) => {
    if (tile && tile.hideTopRightRoad != null) {
        tile.hideTopRightRoad = false;
    }
}

export const showLeftRoadTargetForTile = (tile) => {
    if (tile && tile.hideLeftRoad != null) {
        tile.hideLeftRoad = false;
    }
}

export const tileHasNoBuiltRoads = (tile) => {
    return (tile.topLeftRoadColor === 'target' || tile.topLeftRoadColor == null)
    && (tile.topRightRoadColor === 'target' || tile.topRightRoadColor == null)
    && (tile.leftRoadColor === 'target' || tile.leftRoadColor == null)
}

export const tileHasNoBuiltStructures = (tile) => {
    return tile.leftStructureColor === 'target'
        && tile.topStructureColor === 'target';
}

export const tileHasOnlyTopStructure = (tile) => {
    return (tile.topStructureColor && tile.topStructureColor !== 'target')
        && (!tile.leftStructureColor || tile.leftStructureColor === 'target');
}

export const tileHasOnlyLeftStructure = (tile) => {
    return (tile.leftStructureColor && tile.leftStructureColor !== 'target')
        && (!tile.topStructureColor || tile.topStructureColor === 'target');
}

export const getAllTiles = (G) => {
   return G.board.tiles.values();
}