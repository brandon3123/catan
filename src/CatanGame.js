import {Ctx} from "boardgame.io";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function placeSettlement(G, ctx) {
}

function placeRoad(G, ctx) {
}

function showAllBuildingLocations(G, ctx) {
}

function hideAllBuildingLocations(G, ctx) {
}

const Catan = {
    name: "Catan",

    setup: () => ({
        place: [],
        board: [
            [[],[],[],[]],
            [[],[],[],[],[]],
            [[],[],[],[],[],[]],
            [[],[],[],[],[],[],[]],
            [[],[],[],[],[],[]],
            [[],[],[],[],[]],
            [[],[],[],[]],
        ],
        tiles: new Map()
    }),

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

    moves: {
      test(G, ctx, id) {
          G.place[0] = G.tiles.get(id).props.value;
      }
    }

    // phases: {
    //     initialPiecePlacement: {
    //         onBegin: showAllBuildingLocations,
    //         onEnd: hideAllBuildingLocations,
    //         moves: {
    //             placeSettlement: placeSettlement,
    //             placeRoad: placeRoad,
    //         },
    //         // endIf: (G, ctx) => G.playerOrder.length > 0,
    //         next: "collectResources",
    //         start: true
    //     },
    //
    //     collectResources: {
    //         endIf: G => G.points == 10
    //     }
    // }
}

export default Catan;