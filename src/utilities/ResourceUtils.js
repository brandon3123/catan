import {playerHasLeftStructure, playerHasTopStructure} from "./CatanUtils";
import {tileResourceType, tileValue} from "./TileUtils";
import {Structure} from "../enums/Structure";
import {Resource} from "../enums/Resource";

export const addResourcesToPlayerForTile = (tile, player) => {
    if (playerHasLeftStructure(tile, player)) {
        addResourcesToPlayerForLeftStructureOnTileAndNeighbours(tile, player);
    } else if (playerHasTopStructure(tile, player)) {
        addResourcesToPlayerForTopStructureOnTileAndNeighbours(tile, player);
    }
}

export const logPlayersResourcesAmount = (player) => {
    for (const [key, value] of player.resources.entries()) {
        console.log("player: " + player.color + " Resource: " + key + " - " + value);
    }
}

function addResourcesToPlayerForLeftStructureOnTileAndNeighbours(tile, player) {
    let amountToAdd = tile.leftStructure === Structure.SETTLEMENT ? 1 : 2;

    let leftNeighbour = tile.leftNeighbour;
    let topLeftNeighbour = tile.topLeftNeighbour;

    addTileResourceAmountToPlayer(tile, player, amountToAdd);
    addTileResourceAmountToPlayer(leftNeighbour, player, amountToAdd);
    addTileResourceAmountToPlayer(topLeftNeighbour, player, amountToAdd);
}

function addResourcesToPlayerForTopStructureOnTileAndNeighbours(tile, player) {
    let amountToAdd = tile.topStructure === Structure.SETTLEMENT ? 1 : 2;

    let topRightNeighbour = tile.topRightNeighbour;
    let topLeftNeighbour = tile.topLeftNeighbour;

    addTileResourceAmountToPlayer(tile, player, amountToAdd);
    addTileResourceAmountToPlayer(topRightNeighbour, player, amountToAdd);
    addTileResourceAmountToPlayer(topLeftNeighbour, player, amountToAdd);
}

function addTileResourceAmountToPlayer(tile, player, amountToAdd) {
    if (tile) {
        console.log("tile for " + player.color + " " + tile.value);
        let resourceType = tileResourceType(tile);
        console.log("type for " + player.color + " " + resourceType);

        if (resourceTypeCanBeAdded(resourceType)) {
            console.log("allowed for " + player.color + " " + resourceType);
            let resourceAmountForPlayer = player.resources.get(resourceType);
            resourceAmountForPlayer += amountToAdd;
            player.resources.set(resourceType, resourceAmountForPlayer);
        }
    }
}

function resourceTypeCanBeAdded(resourceType) {
    return resourceType !== Resource.WATER && resourceType !== Resource.SAND;
}


