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
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[0][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[0][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[0][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[0][3])}
                </ol>
                <ol className="odd">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[1][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[1][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[1][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[1][3])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[1][4])}
                </ol>
                <ol className="even">
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][3])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][4])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[2][5])}
                </ol>
                <ol className="odd">
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][3])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][4])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][5])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[3][6])}
                </ol>
                <ol className="even">)
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][3])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][4])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[4][5])}
                </ol>
                <ol className="odd">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[5][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[5][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[5][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[5][3])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[5][4])}
                </ol>
                <ol className="even">
                    <Tile type={'spacer'}/>
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[6][0])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[6][1])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[6][2])}
                    {this.createTileComponentFromTileMetaData(this.props.G.board.layout[6][3])}
                </ol>
            </div>
        );
    }

    lookupTileForId(id) {
        return this.props.G.board.tiles.get(id);
    }


    buildStructure = (id) => {
        this.props.moves.buildStructure(id);
    };

    createTileComponentFromTileMetaData(tileId) {
        let tileMetaData = this.lookupTileForId(tileId);

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
            buildStructure={() => this.buildStructure(tileMetaData.id)}
            hideStructure={tileMetaData.hideStructure}
        />
    }
}

export default CatanBoard;