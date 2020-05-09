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

export const isTopStructureAvailable = (tile) => {
    return tile && tile.topStructureColor === Structure.TARGET;
}

export const isLeftStructureAvailable = (tile) => {
    return tile && tile.leftStructureColor === Structure.TARGET;
}

export const showSettlementPlacementsForTileAndPlayer = (G, player) => {
    let playersTiles = getTilesForPlayer(G, player);
    if (playersTiles && playersTiles.length > 0) {
        for (let tile of playersTiles) {
            if (playerHasTopStructure(tile, player)) {
                showPotentialStructureTargetsForClaimedTopStructure(tile, player);
            } else if (playerHasLeftStructure(tile, player)) {
                showPotentialStructureTargetsForClaimedLeftStructure(tile, player);
            }
        }
    } else {
        showAllStructureBuildingLocations(G);
    }
}

export const showPotentialStructureTargetsForClaimedLeftStructure = (tile, player) => {
    showPotentialLeftNeighbourStructureForLeftStructure(tile, player);
    showPotentialRightNeighbourStructureForLeftStructure(tile, player);
    showPotentialBottomLeftNeighbourForLeftStructure(tile, player);
    showPotentialBottomRightNeighbourForLeftStructure(tile, player);
    showPotentialTopLeftNeighbourForLeftStructure(tile, player);
    showPotentialTopRightNeighbourForLeftStructure(tile, player);

    function showPotentialLeftNeighbourStructureForLeftStructure(tile, player) {
        let leftNeighbour = tile.leftNeighbour;
        if (leftNeighbour) {
            if (playerHasTopLeftRoadOnTile(leftNeighbour, player)
                && playerHasTopRightRoadOnTile(leftNeighbour, player)) {
                leftNeighbour.hideLeftStructure = false;
            }
        }
    }

    function showPotentialBottomLeftNeighbourForLeftStructure(tile, player) {
        let bottomLeftNeighbour = tile.bottomLeftNeighbour;
        if (bottomLeftNeighbour) {
            if (playerHasTopLeftRoadOnTile(bottomLeftNeighbour, player)
                && playerHasLeftRoadOnTile(tile, player)) {
                bottomLeftNeighbour.hideLeftStructure = false;
            }
        }
    }

    function showPotentialBottomRightNeighbourForLeftStructure(tile, player) {
        let bottomRightNeighbour = tile.bottomRightNeighbour;
        if (bottomRightNeighbour) {
            if (playerHasLeftRoadOnTile(tile, player)) {
                let bRNLeftNeighbour = bottomRightNeighbour.leftNeighbour;
                if (bRNLeftNeighbour) {
                    if (playerHasTopRightRoadOnTile(bRNLeftNeighbour, player)) {
                        bottomRightNeighbour.hideLeftStructure = false;
                    }
                }
            }
        }
    }

    function showPotentialTopLeftNeighbourForLeftStructure(tile, player) {
        let leftNeighbour = tile.leftNeighbour;
        if (leftNeighbour) {
            if (playerHasTopRightRoadOnTile(leftNeighbour, player)) {
                let topLeftNeighbour = tile.topLeftNeighbour;
                if (playerHasLeftRoadOnTile(topLeftNeighbour, player)) {
                    topLeftNeighbour.hideLeftStructure = false;
                }
            }
        }
    }

    function showPotentialTopRightNeighbourForLeftStructure(tile, player) {
        if (playerHasTopLeftRoadOnTile(tile, player)) {
            let topRightNeighbour = tile.topRightNeighbour;
            if (topRightNeighbour) {
                if (playerHasLeftRoadOnTile(topRightNeighbour, player)) {
                    topRightNeighbour.hideLeftStructure = false;
                }
            }
        }
    }

    function showPotentialRightNeighbourStructureForLeftStructure(tile, player) {
        if (playerHasTopLeftRoadOnTile(tile, player)
            && playerHasTopRightRoadOnTile(tile, player)) {
            let topRightNeighbour = tile.topRightNeighbour;
            let bottomRightNeighbour = tile.bottomRightNeighbour;

            if (topRightNeighbour) {
                let tRBottomNeighbour = topRightNeighbour.bottomRightNeighbour;
                if (tRBottomNeighbour) {
                    tRBottomNeighbour.hideLeftStructure = false;
                }
            } else if (bottomRightNeighbour) {
                let tRRightNeighbour = bottomRightNeighbour.topRightNeighbour;
                if (tRRightNeighbour) {
                    tRRightNeighbour.hideLeftStructure = false;
                }
            }
        }
    }
}

export const showPotentialStructureTargetsForClaimedTopStructure = (tile, player) => {
    showPotentialRightNeighbourStructureForTopStructure(tile, player);
    showPotentialLeftNeighbourStructureForTopStructure(tile, player);
    showPotentialBottomLeftNeighbourForTopStructure(tile, player);
    showPotentialBottomRightNeighbourForTopStructure(tile, player);
    showPotentialTopLeftNeighbourForTopStructure(tile, player);
    showPotentialTopRightNeighbourForTopStructure(tile, player);

    function showPotentialLeftNeighbourStructureForTopStructure(tile, player) {
        let leftNeighbour = tile.leftNeighbour;
        if (leftNeighbour) {
            if (playerHasTopLeftRoadOnTile(tile, player)
                && playerHasTopRightRoadOnTile(leftNeighbour, player)) {
                leftNeighbour.hideTopStructure = false;
            }
        }
    }

    function showPotentialBottomLeftNeighbourForTopStructure(tile, player) {
        let bottomLeftNeighbour = tile.bottomLeftNeighbour;
        if (bottomLeftNeighbour) {
            if (playerHasTopLeftRoadOnTile(tile, player)
                && playerHasLeftRoadOnTile(tile, player)) {
                bottomLeftNeighbour.hideTopStructure = false;
            }
        }
    }

    function showPotentialBottomRightNeighbourForTopStructure(tile, player) {
        let bottomRightNeighbour = tile.bottomRightNeighbour;
        if (bottomRightNeighbour) {
            if (playerHasTopRightRoadOnTile(tile, player)) {
                let bNTopRightNeighbour = bottomRightNeighbour.topRightNeighbour;
                if (bNTopRightNeighbour) {
                    if (playerHasLeftRoadOnTile(bNTopRightNeighbour, player)) {
                        bottomRightNeighbour.hideTopStructure = false;
                    }
                }
            }
        }
    }

    function showPotentialTopLeftNeighbourForTopStructure(tile, player) {
        let topLeftNeighbour = tile.topLeftNeighbour;
        if (topLeftNeighbour) {
            let topRightNeighbour = tile.topRightNeighbour;
            if (topRightNeighbour) {
                if (playerHasLeftRoadOnTile(topRightNeighbour, player)
                    && playerHasTopRightRoadOnTile(topLeftNeighbour, player)) {
                    topLeftNeighbour.hideTopStructure = false;
                }
            }
        }
    }

    function showPotentialTopRightNeighbourForTopStructure(tile, player) {
        let topRightNeighbour = tile.topRightNeighbour;
        if (topRightNeighbour) {
            if (playerHasLeftRoadOnTile(topRightNeighbour, player)
                && playerHasTopLeftRoadOnTile(topRightNeighbour, player)) {
                topRightNeighbour.hideTopStructure = false;
            }
        }
    }

    function showPotentialRightNeighbourStructureForTopStructure(tile, player) {
        if (playerHasTopRightRoadOnTile(tile, player)) {
            let topRightNeighbour = tile.topRightNeighbour;
            if (topRightNeighbour) {
                let rightNeighbour = topRightNeighbour.bottomRightNeighbour;
                if (playerHasTopLeftRoadOnTile(rightNeighbour, player)) {
                    rightNeighbour.hideTopStructure = false;
                }
            }
        }
    }
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
    return tile.leftRoadColor === player.color;
}

export const playerHasLeftRoadOnTile = (tile, player) => {
    return tile.leftRoadColor === player.color;
}

export const playerHasTopLeftRoadOnTile = (tile, player) => {
    return tile.topLeftRoadColor === player.color;
}

export const playerHasTopRightRoadOnTile = (tile, player) => {
    return tile.topRightRoadColor === player.color;
}

export const playerHasTopStructure = (tile, player) => {
    return tile.topStructureColor === player.color;
}

export const playerHasLeftStructure = (tile, player) => {
    return tile.leftStructureColor === player.color;
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