import {TurnOrder} from "boardgame.io/core";
import {Ctx} from "boardgame.io";

//Phases
function determinePlayerOrder(G, ctx) {
    G.playerOrder = ['0', '1'];
    ctx.playerOrder = G.playerOrder;
    ctx.currentPlayer = ctx.playerOrder[0];
}

function rollDice(G, ctx) {
}

const Catan = {
    name: "Catan",

    setup: () => ({
        playerOrder:[],
        numPlayers: 3,
        rows: []
    }),

    turn: {
        order: TurnOrder.CUSTOM_FROM("playerOrder")
    },

    phases: {
        whoGoesFirst: {
            moves: {
                determinePlayerOrder: determinePlayerOrder
            },
            endIf: G => G.playerOrder.length != 0,
            next: "play",
            start: true
        },

        play: {
            endIf: G => G.points == 10
        }
    }
}

export default Catan;