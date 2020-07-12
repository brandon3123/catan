import React from 'react';
import { Local } from 'boardgame.io/multiplayer';
import { Client } from 'boardgame.io/react';
import CatanBoard from './CatanBoard';
import Catan from "./CatanGame";

const CatanClient = Client({
  game: Catan,
  board: CatanBoard,
  numPlayers:4,
  multiplayer: Local()
  // debug:false
});

const App = () => (
    <div>
      <CatanClient playerID="0"/>
      <CatanClient playerID="1"/>
      <CatanClient playerID="2"/>
      <CatanClient playerID="3"/>
    </div>
)

export default App;