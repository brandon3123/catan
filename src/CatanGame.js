import React from 'react';
import {initializeBoardMetaData} from "./utilities/CreateBoardUtils";
import {initializePlayerData} from "./utilities/PlayerDataUtils";

import {
    getTile,
    hideAllTargetLocations,
    showAllStructureBuildingLocations,
    isLeftRoadAvailable,
    isTopLeftRoadAvailable,
    isTopRightRoadAvailable,
    isTopStructureAvailable,
    isLeftStructureAvailable
} from "./utilities/CatanUtils";

import {
    addStructureToPlayer,
    currentPlayer
} from "./utilities/PlayerUtils";

import {Structure} from "./enums/Structure"
import {Stage} from "./enums/Stage";
import {beginInitialPhase} from "./utilities/InitialPhaseUtils";
import {
    buildLeftRoadAndEndStage,
    buildLeftStructureAndEndStage, buildTopLeftRoadAndEndStage, buildTopRightRoadAndEndStage,
    buildTopStructureAndEndStage
} from "./utilities/MoveUtils";
import {endCurrentStage} from "./utilities/StageUtils";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function initialPhaseIsCompleted(G, buildCount) {
    for (let player of G.playerData) {
        if (player.settlements != buildCount && player.roads != buildCount) {
            return false;
        }
    }
    return true;
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
                    buildTopStructureAndEndStage,
                    buildLeftStructureAndEndStage
                }
            },
            buildCity: {
                moves: {
                    buildTopStructureAndEndStage,
                    buildLeftStructureAndEndStage
                }
            },
            buildRoad: {
                moves: {
                    buildLeftRoadAndEndStage,
                    buildTopLeftRoadAndEndStage,
                    buildTopRightRoadAndEndStage
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
        buildTopStructureAndEndTurn: buildTopStructureAndEndStage,
        buildLeftStructureAndEndTurn: buildLeftStructureAndEndStage,
        buildLeftRoadAndEndStage: buildLeftRoadAndEndStage,
        buildTopLeftRoadAndEndStage: buildTopLeftRoadAndEndStage,
        buildTopRightRoadAndEndStage: buildTopRightRoadAndEndStage
    },

    phases: {
        initialPiecePlacement: {
            onBegin: (G, ctx) => (beginInitialPhase(G, ctx)),
            onEnd: (G) => hideAllTargetLocations(G),
            moves: {
                buildTopStructureAndEndTurn: buildTopStructureAndEndStage,
                buildLeftStructureAndEndTurn: buildLeftStructureAndEndStage,
                buildLeftRoadAndEndStage,
                buildTopLeftRoadAndEndStage,
                buildTopRightRoadAndEndStage
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