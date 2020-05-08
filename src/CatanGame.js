import React from 'react';
import {initializeBoardMetaData} from "./utilities/CreateBoardUtils";
import {initializePlayerData} from "./utilities/PlayerDataUtils";

import {
    getStages,
    buildSettlementStageName,
    currentPlayer,
    stageForCurrentPlayer
} from "./utilities/GameDataUtils";

import {
    getAllTiles,
    getPlayer,
    getTile,
    hideAllTargetLocations
} from "./utilities/CatanUtils";

import {
    addStructureToPlayer
} from "./utilities/PlayerUtils";

import {Structure} from "./enums/Structure"
import {Stage} from "./enums/Stage";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function setupInitialPhase(G, ctx) {
    showAllBuildingLocations(G);
    ctx.events.setStage(Stage.BUILD_SETTLEMENT);
}

function showAllBuildingLocations(G) {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        tile.hideTopStructure = false;
        tile.hideLeftStructure = false;
    }
}

function initialPhaseIsCompleted(G, buildCount) {
    for (let player in G.playerData) {
        if (player.settlements != buildCount && player.roads != buildCount) {
            return false;
        }
    }
    return true;
}

function buildTopCity(G, ctx, id) {
    buildTopStructure(G, ctx, id, Structure.CITY);
}

function buildLeftCity(G, ctx, id) {
    buildLeftStructure(G, ctx, id, Structure.CITY);
}

function buildTopHouse(G, ctx, id) {
    buildTopStructure(G, ctx, id, Structure.SETTLEMENT);
}

function buildLeftHouse(G, ctx, id) {
    buildLeftStructure(G, ctx, id, Structure.SETTLEMENT);
}

function buildTopStructure(G, ctx, id, type) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topStructure = type;
    tile.topStructureColor = player.color;
    // console.log(JSON.stringify(tile, null, 2));
    addStructureToPlayer(player, type, id);
    endCurrentStage(G, ctx);
}

function endCurrentStage(G, ctx) {
    hideAllTargetLocations(G);
    ctx.events.endStage();
}

function buildLeftStructure(G, ctx, id, type) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.leftStructure = type;
    tile.leftStructureColor = player.color;
    addStructureToPlayer(player, type, id);
    endCurrentStage(G, ctx);
}

function buildLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.leftRoadColor = player.color;
    player.roads += 1;
    endCurrentStage(G, ctx);
}

function buildTopLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topLeftRoadColor = player.color;
    player.roads += 1;
    endCurrentStage(G, ctx);
}

function buildTopRightRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topRightRoadColor = player.color;
    player.roads += 1;
    endCurrentStage(G, ctx);
}

const Catan = {
    name: "Catan",

    setup: (ctx) => ({
        playerData: initializePlayerData(ctx.numPlayers),
        board: initializeBoardMetaData(),
    }),

    turn: {
        stages: {
            buildSettlement: {
                moves: {
                    buildTopHouse,
                    buildLeftHouse
                }
            },
            buildCity: {
                moves: {
                    buildTopCity,
                    buildLeftCity
                }
            },
            buildRoad: {
                moves: {
                    buildLeftRoad,
                    buildTopLeftRoad,
                    buildTopRightRoad
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
        buildTopHouse: buildTopHouse,
        buildLeftHouse: buildLeftHouse,
        buildTopCity: buildTopCity,
        buildLeftCity: buildLeftCity,
        buildLeftRoad,
        buildTopLeftRoad,
        buildTopRightRoad
    },

    phases: {
        initialPiecePlacement: {
            onBegin: (G, ctx) => setupInitialPhase(G, ctx),
            onEnd: (G) => hideAllTargetLocations(G),
            moves: {
                buildTopHouse,
                buildLeftHouse,
                buildLeftRoad,
                buildTopLeftRoad,
                buildTopRightRoad
            },
            endIf: (G) => initialPhaseIsCompleted(G, 1),
            // next: "initialPiecePlacementReverse",
            start: true
        },
        //
        // initialPiecePlacementReverse: {
        //     onBegin: (G, ctx) => setupInitialPhase(G, ctx),
        //     onEnd: (G) => hideAllTargetLocations(G),
        //     moves: {
        //         buildTopHouse,
        //         buildLeftHouse,
        //         buildLeftRoad,
        //         buildTopLeftRoad,
        //         buildTopRightRoad
        //     },
        //     endIf: (G) => initialPhaseIsCompleted(G, 2),
        //     turn: {
        //         order: {
        //             // Get the initial value of playOrderPos.
        //             // This is called at the beginning of the phase.
        //             first: (G, ctx) => ctx.currentPlayer,
        //
        //             // Get the next value of playOrderPos.
        //             // This is called at the end of each turn.
        //             // The phase ends if this returns undefined.
        //             next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        //
        //             // Override the initial value of playOrder.
        //             // This is called at the beginning of the game / phase.
        //             playOrder: (G, ctx) => ctx.playOrder.reverse(),
        //         }
        //     }
        // }
    }
}

export default Catan;