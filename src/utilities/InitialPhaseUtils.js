import {showAllStructureBuildingLocations} from "./CatanUtils";
import {Stage} from "../enums/Stage";
import {setNextStage} from "./StageUtils";
import {
    buildLeftRoadAndEndStage,
    buildLeftStructureAndEndStage, buildTopLeftRoadAndEndStage, buildTopRightRoadAndEndStage,
    buildTopStructureAndEndStage,
    buildTopStructureAndSetNextStage,
    buildLeftStructureAndSetNextStage
} from "./MoveUtils";
import {currentPlayer, numberOfSettlementsForCurrentPlayer} from "./PlayerUtils";

export const beginInitialPhase = (G, ctx) => {
    showAllStructureBuildingLocations(G);
    setNextStage(ctx, Stage.BUILD_SETTLEMENT);
}

export const buildTopStructureAndGoToRoadStageIfPermitted = (G, ctx, id, type) => {
    buildTopStructureAndSetNextStage(G, ctx, id, type, Stage.BUILD_ROAD);
    if (numberOfSettlementsForCurrentPlayer(G, ctx) == 2) {
        ctx.events.endTurn();
    }
}

export const buildLeftStructureAndGoToRoadStageIfPermitted = (G, ctx, id, type) => {
    buildLeftStructureAndSetNextStage(G, ctx, id, type, Stage.BUILD_ROAD);
    if (numberOfSettlementsForCurrentPlayer(G, ctx) == 2) {
        ctx.events.endTurn();
    }
}