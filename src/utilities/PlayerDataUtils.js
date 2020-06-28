import {Resource} from "../enums/Resource";

export const initializePlayerData = (numPlayers) => {

    let colors = [
        {used: false, color: 'red'},
        {used: false, color: 'blue'},
        {used: false, color: 'orange'},
        {used: false, color: 'purple'},
    ]

  let playerData = [];

  for(let i = 0; i < numPlayers; i++) {
      playerData[i] = playerDataJson(i);
  }

  return playerData;

  function playerDataJson(playerId) {
    return {
        playerId: playerId,
        victoryPoints: 0,
        settlements: [],
        cities: [],
        roads: 0,
        longestRoad: false,
        largestArmy: false,
        color: getColor(),
        resources:initializeResourceMap()
    }
  }

  function initializeResourceMap() {
      let resourceMap = new Map();
      resourceMap.set(Resource.ORE, 0);
      resourceMap.set(Resource.WOOD, 0);
      resourceMap.set(Resource.SHEEP, 0);
      resourceMap.set(Resource.WHEAT, 0);
      resourceMap.set(Resource.BRICK, 0);
      return resourceMap;
  }

  function getColor() {
      let index = Math.floor(Math.random() * colors.length);

      let color;

      while (!color) {
          let found = colors[index];
          if (!found.used) {
              color = found.color;
              found.used = true;
          } else {
              index = Math.floor(Math.random() * colors.length);
          }
      }

      return color;
  }
}