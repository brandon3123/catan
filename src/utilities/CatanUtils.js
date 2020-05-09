import {Stage} from "../enums/Stage";
import {getTilesForPlayer} from "./PlayerUtils";
import {Structure} from "../enums/Structure";

export const getPlayer = (G, ctx) => {
    return G.playerData[ctx.currentPlayer];
}

export const getTile = (G, id) => {
    return G.board.tiles.get(id);
}

export const hideAllTargetLocations = (G) => {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        if (tile.topStructureColor == Structure.TARGET) {
            tile.hideTopStructure = true;
        }

        if (tile.leftStructureColor == Structure.TARGET) {
            tile.hideLeftStructure = true;
        }

        if (tile.leftRoadColor == Structure.TARGET) {
            tile.hideLeftRoad = true;
        }

        if (tile.topLeftRoadColor == Structure.TARGET) {
            tile.hideTopLeftRoad = true;
        }

        if (tile.topRightRoadColor == Structure.TARGET) {
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

export const showAllStructureBuildingLocations = (G) => {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        tile.hideTopStructure = false;
        tile.hideLeftStructure = false;
    }
}

export const showTargetLocationsForPlayerAndStage = (G, ctx, stage) => {
    let player = getPlayer(G, ctx);
    switch (stage) {
        case Stage.BUILD_SETTLEMENT:
            showAllStructureBuildingLocations(G);
            // showRoadPlacementsForTileAndPlayer(G, player);
            break;
        case Stage.BUILD_ROAD:
            for(let tile of getAllTiles(G)) {
                showRoadPlacementsForTileAndPlayer(tile, player);
            }
            break;
    }
}

export const isLeftRoadAvailable = (tile) => {
    console.log(tile && tile.leftRoadColor == Structure.TARGET);
    return tile && tile.leftRoadColor == Structure.TARGET;
}

export const isTopLeftRoadAvailable = (tile) => {
    return tile && tile.topLeftRoadColor === Structure.TARGET;
}

export const isTopRightRoadAvailable = (tile) => {
    return tile && tile.topRightRoadColor === Structure.TARGET;
}

export const showSettlementPlacementsForTileAndPlayer = (G, player) => {
    for(let tile of getTilesForPlayer(G, player)) {

    }
}
//top strc top road
//


export const showRoadPlacementsForTileAndPlayer = (tile, player) => {
    if (tileHasNoBuiltRoads(tile)) {
        if (playerOnlyHasTopStructure(tile, player)) {
            showTopLeftRoadTargetForTile(tile);
            showTopRightRoadTargetForTile(tile);
            showLeftRoadTargetForTile(tile.topRightNeighbour);
        } else if (playerOnlyHasLeftStructure(tile, player)) {
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

export const tileHasNoStructures = (tile, player) => {
    return tile.leftRoadColor === player.color;
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
    return (tile.topLeftRoadColor === Structure.TARGET || tile.topLeftRoadColor == null)
    && (tile.topRightRoadColor === Structure.TARGET || tile.topRightRoadColor == null)
    && (tile.leftRoadColor === Structure.TARGET || tile.leftRoadColor == null)
}

export const tileHasNoBuiltStructures = (tile) => {
    return tile.leftStructureColor === Structure.TARGET
        && tile.topStructureColor === Structure.TARGET;
}

export const playerOnlyHasTopStructure = (tile, player) => {
    return (tile.topStructureColor && tile.topStructureColor === player.color)
        && (!tile.leftStructureColor || tile.leftStructureColor === Structure.TARGET);
}

export const playerOnlyHasLeftStructure = (tile, player) => {
    return (tile.leftStructureColor && tile.leftStructureColor === player.color)
        && (!tile.topStructureColor || tile.topStructureColor === Structure.TARGET);
}

export const getAllTiles = (G) => {
   return G.board.tiles.values();
}