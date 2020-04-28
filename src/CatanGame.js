import {Ctx} from "boardgame.io";
import React from 'react';
import {generateBoardJson} from "./utilities/CreateBoardUtils";

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
        place:[],
        boardData: generateBoardJson(),
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
        buildStructure: {
            move: (G, ctx, id) => {
                let tile = G.boardData.tiles.get(id);
                tile.structure = 'house';
                tile.structureColor = 'red';
                G.place[0] = {value: tile.value, type: tile.type};
            }
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