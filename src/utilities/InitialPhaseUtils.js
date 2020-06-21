import {
    canPlaceLeftStructureForTile,
    canPlaceTopStructureForTile,
    getAllTiles, getTile,
    hideAllTargetLocations,
    showAllStructureBuildingLocations, showRoadPlacementsForPlayer, showRoadPlacementsForTileAndPlayer
} from "./CatanUtils";
import {Stage} from "../enums/Stage";
import {setNextStage} from "./StageUtils";
import {
    buildTopStructureAndSetNextStage,
    buildLeftStructureAndSetNextStage,
    buildTopLeftRoadAndSetNextStage,
    buildLeftRoadAndSetNextStage,
    buildTopRightRoadAndSetNextStage
} from "./MoveUtils";
import {
    currentPlayer,
    numberOfRoadsForSelectedPlayer,
    numberOfSettlementsForCurrentPlayer,
    numberOfSettlementsForSelectedPlayer
} from "./PlayerUtils";

export const beginInitialPhase = (G, ctx) => {
    showAllStructureBuildingLocations(G);
    setNextStage(ctx, Stage.BUILD_SETTLEMENT);
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
    let player = currentPlayer(G, ctx);
    showAvailableStructureLocationsForPlayer(G);
    if (numberOfRoadsForSelectedPlayer(player) == 2 && numberOfSettlementsForSelectedPlayer(player) == 2) {
        let nextPlayer =
            ctx.playOrderPos == ctx.playOrder - 1
            ? ctx.playOrder[0]
            : ctx.playOrder[ctx.playOrderPos + 1];

        ctx.events.endTurn();
        let value = {};
        value[nextPlayer] = Stage.BUILD_SETTLEMENT
        ctx.events.setActivePlayers(
            {
                value:value
            }
        );
        // setNextStage(ctx, Stage.BUILD_SETTLEMENT);

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
