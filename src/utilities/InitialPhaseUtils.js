import {
    canPlaceLeftStructureForTile,
    canPlaceTopStructureForTile,
    getAllTiles, getTile,
    hideAllTargetLocations,
    showAllStructureBuildingLocations, showRoadPlacementsForPlayer, showRoadPlacementsForTileAndPlayer
} from "./CatanUtils";
import {Stage} from "../enums/Stage";
import {setStage} from "./StageUtils";
import {
    buildTopStructureAndSetNextStage,
    buildLeftStructureAndSetNextStage,
    buildTopLeftRoadAndSetNextStage,
    buildLeftRoadAndSetNextStage,
    buildTopRightRoadAndSetNextStage
} from "./MoveUtils";
import {
    currentPlayer, getTilesWithSettlementsFromPlayer,
    numberOfRoadsForSelectedPlayer,
    numberOfSettlementsForCurrentPlayer,
    numberOfSettlementsForSelectedPlayer, playerDataForGame
} from "./PlayerUtils";
import {nextUpPlayerPosition} from "./GameUtils";
import {addResourcesToPlayerForTile, logPlayersResourcesAmount} from "./ResourceUtils";

export const beginInitialPhase = (G, ctx) => {
    showAllStructureBuildingLocations(G);
    setStage(ctx, Stage.BUILD_SETTLEMENT);
}

export const isInitialPhaseCompleted = (G) => {
    return doAllPlayersHaveRoadAndSettlementCount(G, 1);
}

export const isInitialPhaseReversedCompleted = (G) => {
    return doAllPlayersHaveRoadAndSettlementCount(G, 2);
}

export const hideAvailableTargetLocationsAndDistributeResourcesForInitialReversedPhase = (G) => {
    hideAllTargetLocations(G);
    let players = playerDataForGame(G);
    for (let player of players) {
        let playersTiles = getTilesWithSettlementsFromPlayer(G, player);
        let lastTileOccupied = playersTiles[playersTiles.length -1];
        addResourcesToPlayerForTile(lastTileOccupied, player);
    }
}

export const beginInitialPhaseReversed = (G, ctx) => {
    showAvailableStructureLocationsForPlayer(G);
    setStage(ctx, Stage.BUILD_SETTLEMENT);
}

export const buildTopLeftRoadAndGoToSettlementStage = (G, ctx, id) => {
    buildTopLeftRoadAndSetNextStage(G, ctx, id, Stage.BUILD_SETTLEMENT);
    nextCourseOfActionFollowingRoadBuild(G, ctx);
}

export const buildLeftRoadAndGoToSettlementStage = (G, ctx, id) => {
    buildLeftRoadAndSetNextStage(G, ctx, id, Stage.BUILD_SETTLEMENT);
    nextCourseOfActionFollowingRoadBuild(G, ctx);
}

export const buildTopRightRoadAndGoToSettlementStage = (G, ctx, id) => {
    buildTopRightRoadAndSetNextStage(G, ctx, id, Stage.BUILD_SETTLEMENT);
    nextCourseOfActionFollowingRoadBuild(G, ctx);
}

export const buildTopStructureAndGoToRoadStageIfPermitted = (G, ctx, id, type) => {
    buildTopStructureAndSetNextStage(G, ctx, id, type, Stage.BUILD_ROAD);
    nextCourseOfActionFollowingStructureBuild(G, id, ctx);
}

export const buildLeftStructureAndGoToRoadStageIfPermitted = (G, ctx, id, type) => {
    buildLeftStructureAndSetNextStage(G, ctx, id, type, Stage.BUILD_ROAD);
    nextCourseOfActionFollowingStructureBuild(G, id, ctx);
}

function nextCourseOfActionFollowingStructureBuild(G, id, ctx) {
    let player = currentPlayer(G, ctx);
    hideAllTargetLocations(G);
    showRoadPlacementsForTileAndPlayer(getTile(G, id), player);
}

function nextCourseOfActionFollowingRoadBuild(G, ctx) {
    hideAllTargetLocations(G);
    showAvailableStructureLocationsForPlayer(G);
    let nextPlayerPosition = nextUpPlayerPosition(ctx);
    if (nextPlayerPosition) {
        let value = {};

        value[nextPlayerPosition] = Stage.BUILD_SETTLEMENT;
        ctx.events.endTurn();

        ctx.events.setActivePlayers(
            {
                value: value
            }
        );

    }
}

function showAvailableStructureLocationsForPlayer(G) {
    for(let tile of getAllTiles(G)) {
        showTargetLocationForTopStructureAndPlayer(tile);
        showTargetLocationForLeftStructureAndPlayer(tile);
    }
}

function showTargetLocationForTopStructureAndPlayer(tile) {
    if (canPlaceTopStructureForTile(tile)) {
        tile.isTopStructureAvailable = true;
        tile.hideTopStructure = false;
    }
}

function showTargetLocationForLeftStructureAndPlayer(tile) {
    if (canPlaceLeftStructureForTile(tile)) {
        tile.isLeftStructureAvailable = true;
        tile.hideLeftStructure = false;
    }
}

function doAllPlayersHaveRoadAndSettlementCount(G, buildingCount) {
    for (let player of G.playerData) {
        if (player.settlements != buildingCount && player.roads != buildingCount) {
            return false;
        }
    }
    return true;
}