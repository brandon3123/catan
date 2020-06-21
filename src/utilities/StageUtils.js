import {hideAllTargetLocations} from "./CatanUtils";

export const endCurrentStage = (G, ctx) => {
    hideAllTargetLocations(G);
    ctx.events.endStage();
}