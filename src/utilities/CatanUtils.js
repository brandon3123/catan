import {Stage} from "../enums/Stage";
import {Structure} from "../enums/Structure";

import {
    currentPlayer,
    getTilesForPlayer
} from "./PlayerUtils";

export const getTile = (G, id) => {
    return G.board.tiles.get(id);
}

export const getAllTiles = (G) => {
    return G.board.tiles.values();
}

export const hideAllTargetLocations = (G) => {
    let tiles = getAllTiles(G);
    for (let tile of tiles) {
        if (isTopStructureAvailable(tile)) {
            tile.hideTopStructure = true;
        }

        if (isLeftStructureAvailable(tile)) {
            tile.hideLeftStructure = true;
        }

        if (isLeftRoadAvailable(tile)) {
            tile.hideLeftRoad = true;
        }

        if (isTopLeftRoadAvailable(tile)) {
            tile.hideTopLeftRoad = true;
        }

        if (isTopRightRoadAvailable(tile)) {
            tile.hideTopRightRoad = true;
        }
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
    let player = currentPlayer(G, ctx);
    switch (stage) {
        case Stage.BUILD_SETTLEMENT:
            showSettlementPlacementsForTileAndPlayer(G, player);
            break;
        case Stage.BUILD_ROAD:
            for (let tile of getAllTiles(G)) {
                showRoadPlacementsForTileAndPlayer(tile, player);
            }
            break;
        case Stage.BUILD_CITY:

            break;
    }
}

export const isLeftRoadAvailable = (tile) => {
    return tile && (!tile.leftRoadColor || tile.leftRoadColor === Structure.TARGET);
}

export const isTopLeftRoadAvailable = (tile) => {
    return tile && (!tile.topLeftRoadColor || tile.topLeftRoadColor === Structure.TARGET);
}

export const isTopRightRoadAvailable = (tile) => {
    return tile && (!tile.topRightRoadColor || tile.topRightRoadColor === Structure.TARGET);
}

export const isTopStructureAvailable = (tile) => {
    return tile && (!tile.topStructureColor || tile.topStructureColor === Structure.TARGET);
}

export const isLeftStructureAvailable = (tile) => {
    return tile && (!tile.leftStructureColor || tile.leftStructureColor === Structure.TARGET);
}

export const showSettlementPlacementsForTileAndPlayer = (G, player) => {
    for (let tile of getAllTiles(G)) {
        showTargetLocationForTopStructureAndPlayer(tile, player);
        showTargetLocationForLeftStructureAndPlayer(tile, player);
    }
}

export const showTargetLocationForTopStructureAndPlayer = (tile, player) => {
    if (canPlaceTopStructureForTile(tile)) {
        console.log("top");
        if (tileHasNoBuiltRoads(tile)) {
            console.log(tile.harborType);
            if (playerHasLeftRoadOnTile(tile.topRightNeighbour, player)
                || playerHasTopLeftRoadOnTile(tile, player)
                || playerHasTopRightRoadOnTile(tile, player)) {
                tile.hideTopStructure = false;
            }
        } else {
            if (playerHasTopLeftRoadOnTile(tile, player)) {
                if (playerHasLeftRoadOnTile(tile, player)
                    || playerHasTopRightRoadOnTile(tile.leftNeighbour, player)
                    || playerHasTopLeftRoadOnTile(tile.topRightNeighbour, player)) {
                    tile.hideTopStructure = false;
                }
            }

            if (playerHasTopRightRoadOnTile(tile, player)) {
                if (playerHasTopLeftRoadOnTile(tile, player)
                    || playerHasLeftRoadOnTile(tile.topRightNeighbour, player)
                    || playerHasTopLeftRoadOnTile(rightNeighbourForTile(tile), player)
                    || playerHasLeftRoadOnTile(rightNeighbourForTile(tile), player)) {
                    tile.hideTopStructure = false;
                }
            }
        }
    }
}

export const showTargetLocationForLeftStructureAndPlayer = (tile, player) => {
    if (canPlaceLeftStructureForTile(tile)) {
        if (tileHasNoBuiltRoads(tile)) {
            if (playerHasLeftRoadOnTile(tile, player)
                || playerHasTopLeftRoadOnTile(tile, player)
                || playerHasTopRightRoadOnTile(tile.leftNeighbour, player)) {
                tile.hideLeftStructure = false;
            }
        } else {
            if (playerHasLeftRoadOnTile(tile, player)) {
                if (playerHasTopLeftRoadOnTile(tile, player)
                    || playerHasTopRightRoadOnTile(tile.leftNeighbour, player)
                    || playerHasTopLeftRoadOnTile(tile.bottomLeftNeighbour, player)
                    || playerHasTopRightRoadOnTile(tile.bottomLeftNeighbour, player)) {
                    tile.hideLeftStructure = false;
                }
            } else if (playerHasTopLeftRoadOnTile(tile, player)) {
                if (playerHasLeftRoadOnTile(tile, player)
                    || playerHasTopRightRoadOnTile(tile, player)
                    || playerHasTopRightRoadOnTile(tile.leftNeighbour, player)
                    || playerHasLeftRoadOnTile(tile.topRightNeighbour, player)) {
                    tile.hideLeftStructure = false;
                }
            }
        }
    }
}

export const canPlaceTopStructureForTile = (tile) => {
    if (tile) {
        let topRightNeighbour = tile.topRightNeighbour;
        let rightNeighbour = rightNeighbourForTile(tile);

        return isLeftStructureAvailable(tile)
            && isLeftStructureAvailable(topRightNeighbour)
            && !rightNeighbour || isLeftStructureAvailable(rightNeighbour);
    }
    return false;
}

export const canPlaceLeftStructureForTile = (tile) => {
    if (tile) {
        let leftNeighbour = tile.leftNeighbour;
        let bottomLeftNeighbour = tile.bottomLeftNeighbour;

        return isTopStructureAvailable(tile)
            && isTopStructureAvailable(leftNeighbour)
            && isTopStructureAvailable(bottomLeftNeighbour);
    }
    return false;
}

export const rightNeighbourForTile = (tile) => {
    let topRightNeighbour = tile.topRightNeighbour;
    if (topRightNeighbour) {
        let trBrNeighbour = topRightNeighbour.bottomRightNeighbour;
        if (trBrNeighbour) {
            return trBrNeighbour;
        }
    }

    let bottomRightNeighbour = tile.bottomRightNeighbour;
    if (bottomRightNeighbour) {
        let bRtRNeighbour = bottomRightNeighbour.topRightNeighbour;
        if (bRtRNeighbour) {
            return bRtRNeighbour;
        }
    }

    return null;
}

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
        if (playerHasLeftRoadOnTile(tile, player)) {
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
    return tile && tile.leftRoadColor === player.color;
}

export const playerHasLeftRoadOnTile = (tile, player) => {
    return tile && tile.leftRoadColor === player.color;
}

export const playerHasTopLeftRoadOnTile = (tile, player) => {
    return tile && tile.topLeftRoadColor === player.color;
}

export const playerHasTopRightRoadOnTile = (tile, player) => {
    return tile && tile.topRightRoadColor === player.color;
}

export const playerHasTopStructure = (tile, player) => {
    return tile && tile.topStructureColor === player.color;
}

export const playerHasLeftStructure = (tile, player) => {
    return tile && tile.leftStructureColor === player.color;
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
    let tl = (!tile.topLeftRoadColor || tile.topLeftRoadColor === Structure.TARGET);
        let tr = (!tile.topRightRoadColor || tile.topRightRoadColor === Structure.TARGET);
        let left = (!tile.leftRoadColor || tile.leftRoadColor === Structure.TARGET);

    console.log(tile.harborType);
    console.log(tl);
    console.log(tr);
    console.log(left);


    return tl && tr && left;
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