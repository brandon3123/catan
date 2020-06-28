export const tileValue = (tile) => {
    return tile.value;
}

export const tileResourceType = (tile) => {
    return tile.type;
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