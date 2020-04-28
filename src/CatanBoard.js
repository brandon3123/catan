import React from 'react';
import PropTypes from 'prop-types';
import Tile from './components/Tile';
import './css/catan-board.scss';

class CatanBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

    render() {
        return (
            <div>
                <ol className="even">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[0][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[0][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[0][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[0][3]))}
                </ol>
                <ol className="odd">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[1][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[1][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[1][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[1][3]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[1][4]))}
                </ol>
                <ol className="even">
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][3]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][4]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[2][5]))}
                </ol>
                <ol className="odd">
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][3]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][4]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][5]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[3][6]))}
                </ol>
                <ol className="even">)
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][3]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][4]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[4][5]))}
                </ol>
                <ol className="odd">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[5][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[5][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[5][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[5][3]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[5][4]))}
                </ol>
                <ol className="even">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[6][0]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[6][1]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[6][2]))}
                    {this.createTileComponentFromTileMetaData(this.lookupTileForId(this.props.G.boardData.board[6][3]))}
                </ol>
            </div>
        );
    }

    lookupTileForId(id) {
        return this.props.G.boardData.tiles.get(id);
    }


    buildStructure = (id) => {
        this.props.moves.buildStructure(id);
    };

    createTileComponentFromTileMetaData(tileMetaData) {
        return <Tile
            id={tileMetaData.id}
            type={tileMetaData.type}
            value={tileMetaData.value}
            rowIndex={tileMetaData.rowIndex}
            tileIndex={tileMetaData.tileIndex}
            harborType={tileMetaData.harborType}
            harborPiece={tileMetaData.harborPiece}
            topRightNeighbour={tileMetaData.topRightNeighbour}
            topLeftNeighbour={tileMetaData.topLeftNeighbour}
            leftNeighbour={tileMetaData.leftNeighbour}
            structure={tileMetaData.structure}
            structureColor={tileMetaData.structureColor}
            buildStructure={() => this.buildStructure(tileMetaData.id)}/>
    }
}

export default CatanBoard;