import {showAllStructureBuildingLocations} from "./CatanUtils";
import {Stage} from "../enums/Stage";

export const beginInitialPhase = (G, ctx) => {
    showAllStructureBuildingLocations(G);
    ctx.events.setStage(Stage.BUILD_SETTLEMENT);
}