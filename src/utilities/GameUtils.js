import {Phase} from "../enums/Phase";

export const stageForCurrentPlayer = (ctx) => {
    return ctx.activePlayers[currentPlayer()];
}

export const nextUpPlayerPosition = (ctx) => {
    let nextPlayerPosition =
        ctx.playOrderPos == ctx.playOrder - 1
            ? ctx.playOrder[0]
            : ctx.playOrder[ctx.playOrderPos + 1];
    return nextPlayerPosition;
}

export const set = (ctx) => {
    let nextPlayer =
        ctx.playOrderPos == ctx.playOrder - 1
            ? ctx.playOrder[0]
            : ctx.playOrder[ctx.playOrderPos + 1];
    return nextPlayer;
}

export const currentPlayer = (ctx) => {
    return ctx.currentPlayer;
}

export const stageNameForCurrentPlayer = (ctx) => {
    return ctx.activePlayers[currentPlayer(ctx)];
}

export const currentPhase = (ctx) => {
    switch (ctx.phase) {
        case Phase.INITIAL_PLACEMENT:
            return Phase.INITIAL_PLACEMENT;
        default:
            return null;
    }
}

export const isFirstTurn = (ctx) => {
    return ctx.turn === 0;
}