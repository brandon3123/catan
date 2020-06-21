export const showAllRoadsForTile = (tile) => {
    showTopLeftRoadTargetForTile(tile);
    showTopRightRoadTargetForTile(tile);
    showLeftRoadTargetForTile(tile);
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