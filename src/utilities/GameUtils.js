
export const stageForCurrentPlayer = (ctx) => {
    return ctx.activePlayers[currentPlayer()];
}

export const currentPlayer = (ctx) => {
    return ctx.currentPlayer;
}

export const stageNameForCurrentPlayer = (ctx) => {
    return ctx.activePlayers[currentPlayer(ctx)];
}