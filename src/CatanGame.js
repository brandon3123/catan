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

function showAllPlacementLocations(G) {
    showAllBuildingLocations(G);
    showAllRoadLocations(G);
}

function showAllRoadLocations(G) {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        tile.hideLeftRoad = false;
        tile.hideTopLeftRoad = false;
        tile.hideTopRightRoad = false;
    }
}

function buildTopStructure(G, ctx, id, type){
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topStructure = type;
    tile.topStructureColor = player.color;
    addStructureToPlayerData(G, ctx, type);
}

function buildLeftStructure(G, ctx, id, type){
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.leftStructure = type;
    tile.leftStructureColor = player.color;
    addStructureToPlayerData(G, ctx, type);
}

function getPlayer(G, ctx) {
    return G.playerData[ctx.currentPlayer];
}

function getTile(G, id) {
    return G.board.tiles.get(id);
}

function addStructureToPlayerData(G, ctx, type) {
    let player = getPlayer(G, ctx);
    if (type == 'house') {
        player.victoryPoints += 1;
        player.settlements += 1;
    } else {
        player.victoryPoints -= 1;
        player.victoryPoints += 2;
        player.cities += 1;
    }
}

function hideAllBuildingLocations(G, ctx) {
}

const Catan = {
    name: "Catan",

    setup: (ctx) => ({
        playerData: initializePlayerData(ctx.numPlayers),
        action: {
            build: {
                type: null
            }
        },
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
                buildLeftStructure
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