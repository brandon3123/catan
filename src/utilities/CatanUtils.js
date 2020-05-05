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

export const showTargetLocationsForPlayerAndStage = (G, ctx) => {
    let player = getPlayer(G, ctx);


}

export const getAllTiles = (G) => {
   return G.board.tiles.values();
}