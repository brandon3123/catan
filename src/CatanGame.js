import {Ctx} from "boardgame.io";
import React from 'react';
import {initializeBoardMetaData} from "./utilities/CreateBoardUtils";
import {initializePlayerData} from "./utilities/PlayerDataUtils";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function clearTurnData(G) {
    G.structureType = 'asd';
}

function showAllBuildingLocations(G) {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        tile.hideTopStructure = false;
        tile.hideLeftStructure = false;
    }
}

function buildTopStructure(G, ctx, id, type){
    let tile = G.board.tiles.get(id);
    tile.topStructure = type;
    tile.topStructureColor = 'red';
    G.place[0] = {value: tile.value, type: tile.type};
}

function buildLeftStructure(G, ctx, id, type){
    let tile = G.board.tiles.get(id);
    tile.leftStructure = type;
    tile.leftStructureColor = 'red';
    G.place[0] = {value: tile.value, type: tile.type};
}

function hideAllBuildingLocations(G, ctx) {
}

const Catan = {
    name: "Catan",

    setup: (ctx) => ({
        playerData: initializePlayerData(ctx.numPlayers),
        board: initializeBoardMetaData(),
    }),

    turn: {
        stages: {
            build: {
                moves: {
                    buildTopStructure,
                    buildLeftStructure
                }
            }
        },
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
        buildTopStructure: buildTopStructure,
        buildLeftStructure: buildLeftStructure
    },

    phases: {
        initialPiecePlacement: {
            onBegin: (G) => showAllBuildingLocations(G),
            onEnd: hideAllBuildingLocations,
            moves:{
                buildTopStructure,
                buildLeftStructure,
                clearTurnData:clearTurnData
            },
            // endIf: (G, ctx) => G.playerOrder.length > 0,
            next: "distributeResources",
            start: true
        },

        distributeResources: {
        }
    }
}

export default Catan;