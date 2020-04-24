import {TurnOrder} from "boardgame.io/core";
import {Ctx} from "boardgame.io";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function rollDice(G, ctx) {
}

const Catan = {
    name: "Catan",

    // setup: (ctx) => ({
    //     rows: [],
    // }),

    turn: {
        order: {
            // Get the initial value of playOrderPos.
            // This is called at the beginning of the phase.
            first: (G, ctx) => 0,

            // Get the next value of playOrderPos.
            // This is called at the end of each turn.
            // The phase ends if this returns undefined.
            next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,

            // Override the initial value of playOrder.
            // This is called at the beginning of the game / phase.
            playOrder: (G, ctx) => determinePlayerOrder(ctx),
        }
    },

    // phases: {
    //     whoGoesFirst: {
    //         moves: {
    //             determinePlayerOrder: determinePlayerOrder
    //         },
    //         endIf: (G, ctx) => G.playerOrder.length > 0,
    //         next: "play",
    //         start: true
    //     },
    //
    //     play: {
    //         endIf: G => G.points == 10
    //     }
    // }
}

export default Catan;