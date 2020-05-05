import {Structure} from "../enums/Structure";

export const addStructureToPlayer = (player, type, id) => {
    switch (type) {
        case Structure.SETTLEMENT:
            player.settlements.push(id);
            break;
        case Structure.CITY:
            player.cities.push(id);
            break;
    }
    player.victoryPoints = calculateVictoryPoints(player);
}

export const calculateVictoryPoints = (player) => {
    let victoryPoints = 0;
    victoryPoints += player.settlements.length;
    victoryPoints += (player.cities.length * 2);
    return victoryPoints;
}