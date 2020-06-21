import {hideAllTargetLocations} from "./CatanUtils";

export const endCurrentStage = (G, ctx) => {
    hideAllTargetLocations(G);
    ctx.events.endStage();
}

export const setNextStage = (ctx, nextStage) => {
    ctx.events.setStage(nextStage);
}