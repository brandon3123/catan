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
import {
    beginInitialPhase,
    buildLeftStructureAndGoToRoadStageIfPermitted,
    buildTopStructureAndGoToRoadStageIfPermitted,
    buildLeftRoadAndGoToSettlementStage,
    buildTopLeftRoadAndGoToSettlementStage,
    buildTopRightRoadAndGoToSettlementStage,
    isInitialPhaseCompleted,
    beginInitialPhaseReversed,
    isInitialPhaseReversedCompleted, hideAvailableTargetLocationsAndDistributeResourcesForInitialReversedPhase
} from "./utilities/InitialPhaseUtils";
import {
    buildLeftRoadAndEndStage,
    buildLeftStructureAndEndStage, buildTopLeftRoadAndEndStage, buildTopRightRoadAndEndStage,
    buildTopStructureAndEndStage
} from "./utilities/MoveUtils";
import {endCurrentStage} from "./utilities/StageUtils";
import {Phase} from "./enums/Phase";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
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
                    buildLeftStructureAndEndStage,
                    buildTopStructureAndGoToRoadStageIfPermitted: {
                        move: buildTopStructureAndGoToRoadStageIfPermitted,
                        client: false
                    },
                    buildLeftStructureAndGoToRoadStageIfPermitted: {
                        move:buildLeftStructureAndGoToRoadStageIfPermitted,
                        client: false
                    }
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
                    buildLeftRoadAndEndStage: {
                        move: buildLeftRoadAndEndStage,
                        client: false
                    },
                    buildTopLeftRoadAndEndStage: {
                        move: buildTopLeftRoadAndEndStage,
                        client: false
                    },
                    buildTopRightRoadAndEndStage: {
                        move: buildTopRightRoadAndEndStage,
                        client: false
                    },
                    buildTopLeftRoadAndGoToSettlementStage: {
                        move: buildTopLeftRoadAndGoToSettlementStage,
                        client: false
                    },
                    buildLeftRoadAndGoToSettlementStage: {
                        move: buildLeftRoadAndGoToSettlementStage,
                        client: false
                    },
                    buildTopRightRoadAndGoToSettlementStage: {
                        move: buildTopRightRoadAndGoToSettlementStage,
                        client: false
                    }
                }
            },
            distributeResources: {
                moves: {

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
            onBegin: (G, ctx) => beginInitialPhase(G, ctx),
            onEnd: (G) => hideAllTargetLocations(G),
            moves: {
                buildTopStructureAndGoToRoadStageIfPermitted,
                buildLeftStructureAndGoToRoadStageIfPermitted,
                buildTopLeftRoadAndGoToSettlementStage,
                buildLeftRoadAndGoToSettlementStage,
                buildTopRightRoadAndGoToSettlementStage
            },
            endIf: (G) => isInitialPhaseCompleted(G),
            next: Phase.INITIAL_PLACEMENT_REVERSED,
            start: true
        },

        initialPiecePlacementReverse: {
            onBegin: (G, ctx) => beginInitialPhaseReversed(G, ctx),
            onEnd: (G) => hideAvailableTargetLocationsAndDistributeResourcesForInitialReversedPhase(G),
            moves: {
                buildTopStructureAndGoToRoadStageIfPermitted,
                buildLeftStructureAndGoToRoadStageIfPermitted,
                buildTopLeftRoadAndGoToSettlementStage,
                buildLeftRoadAndGoToSettlementStage,
                buildTopRightRoadAndGoToSettlementStage
            },
            endIf: (G) => isInitialPhaseReversedCompleted(G),
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
                    playOrder: (G, ctx) => ctx.playOrder.reverse(),
                }
            }
        }
    }

    // playerView: (G, ctx, playerID) =>
}

export default Catan;