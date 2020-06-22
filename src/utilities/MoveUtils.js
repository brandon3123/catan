import {
    getTile,
    isLeftRoadAvailable,
    isLeftStructureAvailable, isTopLeftRoadAvailable,
    isTopRightRoadAvailable,
    isTopStructureAvailable
} from "./CatanUtils";
import {addStructureToPlayer, currentPlayer} from "./PlayerUtils";
import {Structure} from "../enums/Structure";
import {endCurrentStage, setStage} from "./StageUtils";

export const buildTopCity = (G, ctx, id) => {
    buildTopStructure(G, ctx, id, Structure.CITY);
}

export const buildLeftCity = (G, ctx, id) => {
    buildLeftStructure(G, ctx, id, Structure.CITY);
}

export const buildTopHouse = (G, ctx, id) => {
    buildTopStructure(G, ctx, id, Structure.SETTLEMENT);
}

export const buildLeftHouse = (G, ctx, id) => {
    buildLeftStructure(G, ctx, id, Structure.SETTLEMENT);
}

export const buildTopLeftRoadAndSetNextStage = (G, ctx, id, nextStage) => {
    buildTopLeftRoad(G, ctx, id);
    setStage(ctx, nextStage);
}

export const buildLeftRoadAndSetNextStage = (G, ctx, id, nextStage) => {
    buildLeftRoad(G, ctx, id);
    setStage(ctx, nextStage);
}

export const buildTopRightRoadAndSetNextStage = (G, ctx, id, nextStage) => {
    buildTopRightRoad(G, ctx, id);
    setStage(ctx, nextStage);
}

export const buildTopStructureAndSetNextStage = (G, ctx, id, type, nextStage) => {
    buildTopStructure(G, ctx, id, type);
    setStage(ctx, nextStage);
}

export const buildLeftStructureAndSetNextStage = (G, ctx, id, type, nextStage) => {
    buildLeftStructure(G, ctx, id, type);
    setStage(ctx, nextStage);
}

export const buildTopStructureAndEndStage = (G, ctx, id, type) => {
    buildTopStructure(G, ctx, id, type);
    endCurrentStage(G, ctx);
}

export const buildLeftStructureAndEndStage = (G, ctx, id, type) => {
    buildLeftStructure(G, ctx, id, type);
    endCurrentStage(G, ctx);
}

export const buildTopRightRoadAndEndStage = (G, ctx, id) => {
    buildTopRightRoad(G, ctx, id);
    endCurrentStage(G, ctx);
}

export const buildLeftRoadAndEndStage = (G, ctx, id) => {
    buildLeftRoad(G, ctx, id);
    endCurrentStage(G, ctx);
}

export const buildTopLeftRoadAndEndStage = (G, ctx, id) => {
    buildTopLeftRoad(G, ctx, id);
    endCurrentStage(G, ctx);
}

function buildTopStructure(G, ctx, id, type) {
    let tile = getTile(G, id);
    if (isTopStructureAvailable(tile)) {
        let player = currentPlayer(G, ctx);
        tile.topStructure = type;
        tile.topStructureColor = player.color;
        tile.isTopStructureAvailable = false;
        addStructureToPlayer(player, type, id);
    }
}

function buildLeftStructure(G, ctx, id, type) {
    let tile = getTile(G, id);
    if (isLeftStructureAvailable(tile)) {
        let player = currentPlayer(G, ctx);
        tile.leftStructure = type;
        tile.leftStructureColor = player.color;
        tile.isLeftStructureAvailable = false;
        addStructureToPlayer(player, type, id);
    }
}

function buildTopRightRoad(G, ctx, id) {
    let tile = getTile(G, id);
    if (isTopRightRoadAvailable(tile)) {
        let player = currentPlayer(G, ctx);
        tile.topRightRoadColor = player.color;
        player.roads += 1;
    }
}

function buildLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    if (isLeftRoadAvailable(tile)) {
        let player = currentPlayer(G, ctx);
        tile.leftRoadColor = player.color;
        player.roads += 1;
    }
}

function buildTopLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    if (isTopLeftRoadAvailable(tile)) {
        let player = currentPlayer(G, ctx);
        tile.topLeftRoadColor = player.color;
        player.roads += 1;
    }
}