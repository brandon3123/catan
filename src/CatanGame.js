import {Ctx} from "boardgame.io";
import React from 'react';
import {initializeBoardMetaData} from "./utilities/CreateBoardUtils";
import {initializePlayerData} from "./utilities/PlayerDataUtils";
import {Structure} from "./enums/Structure"
import {Stage} from "./enums/Stage";

/*
 Function to randomize the player turn order
 */
function determinePlayerOrder(ctx) {
    return ctx.playOrder.sort(() => Math.random() - 0.5);
}

function setupInitialPhase(G, ctx) {
    showAllPlacementLocations(G);
    ctx.events.setStage(Stage.BUILD_SETTLEMENT);
}

function showAllBuildingLocations(G) {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        tile.hideTopStructure = false;
        tile.hideLeftStructure = false;
    }
}

function initialPhaseIsCompleted(G) {
    for (let player in G.playerData) {
        if (player.settlements != 2 && player.roads != 2) {
            return false;
        }
    }

    return true;
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
    addStructureToPlayerData(player, type);
}

function buildLeftStructure(G, ctx, id, type) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.leftStructure = type;
    tile.leftStructureColor = player.color;
    addStructureToPlayerData(player, type);
}

function buildLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.leftRoadColor = player.color;
    addStructureToPlayerData(player, Structure.ROAD);
}

function buildTopLeftRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topLeftRoadColor = player.color;
    addStructureToPlayerData(player, Structure.ROAD);
}

function buildTopRightRoad(G, ctx, id) {
    let tile = getTile(G, id);
    let player = getPlayer(G, ctx);
    tile.topRightRoadColor = player.color;
    addStructureToPlayerData(player, Structure.ROAD);
}

function getPlayer(G, ctx) {
    return G.playerData[ctx.currentPlayer];
}

function getTile(G, id) {
    return G.board.tiles.get(id);
}

function addStructureToPlayerData(player, type) {
    switch (type) {
        case Structure.SETTLEMENT:
            player.victoryPoints += 1;
            player.settlements += 1;
            break;
        case Structure.CITY:
            player.victoryPoints += 2;
            player.cities += 1;
            break;
        case Structure.ROAD:
            player.roads += 1;
            break;
    }
}

function hideAllTargetLocations(G) {
    let tiles = G.board.tiles.values();
    for (let tile of tiles) {
        if (tile.topStructureColor == 'target') {
            tile.hideTopStructure = true;
        }

        if (tile.leftStructureColor == 'target') {
            tile.hideLeftStructure = true;
        }

        if (tile.leftRoadColor == 'target') {
            tile.hideLeftRoad = true;
        }

        if (tile.topLeftRoadColor == 'target') {
            tile.hideTopLeftRoad = true;
        }

        if (tile.topRightRoadColor == 'target') {
            tile.hideTopRightRoad = true;
        }
    }
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
            endIf: (G) => initialPhaseIsCompleted(G),
            // next: "distributeResources",
            start: true
        }
    }
}

export default Catan;