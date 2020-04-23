import { Client } from 'boardgame.io/react';
import CatanBoard from './CatanBoard';
import Catan from "./CatanGame";

const App = Client({
  game: Catan,
  board: CatanBoard,
  numPlayers:4
});

export default App;