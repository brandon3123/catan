import { Client } from 'boardgame.io/react';
import CatanBoard from './CatanBoard';

const Catan = {
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell: (G, ctx, id) => {
      G.cells[id] = ctx.currentPlayer;
    },
  },
};

const App = Client({
  game: Catan,
  board: CatanBoard});

export default App;