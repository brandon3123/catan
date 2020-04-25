import React from 'react';
import PropTypes from 'prop-types';
import Tile from './components/Tile';
import './css/catan-board.scss';
import uniqid from 'uniqid'

class CatanBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

    renderFirstRow() {
        let firstTile = this.createWaterTile(
            0,
            0,
            null,
            null,
            null,
            null,
            null
        );

        let secondTile = this.createWaterTile(
            0,
            1,
            'two-one wood',
            'br',
            firstTile,
            null,
            null
        );

        let thirdTile = this.createWaterTile(
            0,
            2,
            null,
            null,
            secondTile,
            null,
            null
        );

        let fourthTile = this.createWaterTile(
            0,
            3,
            'three-one wood',
            'bl',
            thirdTile,
            null,
            null
        );

        return <ol className="even">
            <Tile type={'spacer'}/>
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
        </ol>
    };

    renderSecondRow(tiles, tileValues) {
        let harborTile = this.createWaterTile(
            1,
            0,
            'three-one sheep',
            'br',
            null,
            null,
            this.lookupTileForId(this.props.G.board[0][0]));

        let firstTile = this.createResourceTile(
            1,
            1,
            tiles,
            tileValues,
            harborTile,
            this.lookupTileForId(this.props.G.board[0][0]),
            this.lookupTileForId(this.props.G.board[0][1]));

        let secondTile = this.createResourceTile(
            1,
            2,
            tiles,
            tileValues,
            firstTile,
            this.lookupTileForId(this.props.G.board[0][1]),
            this.lookupTileForId(this.props.G.board[0][2]));

        let thirdTile = this.createResourceTile(
            1,
            3,
            tiles,
            tileValues,
            secondTile,
            this.lookupTileForId(this.props.G.board[0][3]),
            this.lookupTileForId(this.props.G.board[0][4]));

        let fourthTile = this.createWaterTile(
            1,
            4,
            null,
            null,
            null,
            this.lookupTileForId(this.props.G.board[0][4]),
            thirdTile);

        return <ol className="odd">
            <Tile type={'spacer'}/>
            {harborTile}
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
        </ol>
    }

    renderThirdRow(tiles, tileValues) {
        let waterTile = this.createWaterTile(
            2,
            0,
            null,
            null,
            null,
            null,
            this.lookupTileForId(this.props.G.board[1][0]));

        let firstTile = this.createResourceTile(
            2,
            1,
            tiles,
            tileValues,
            waterTile,
            this.lookupTileForId(this.props.G.board[1][0]),
            this.lookupTileForId(this.props.G.board[1][1]));

        let secondTile = this.createResourceTile(
            2,
            2,
            tiles,
            tileValues,
            firstTile,
            this.lookupTileForId(this.props.G.board[1][1]),
            this.lookupTileForId(this.props.G.board[1][2]));

        let thirdTile = this.createResourceTile(
            2,
            3,
            tiles,
            tileValues,
            secondTile,
            this.lookupTileForId(this.props.G.board[1][2]),
            this.lookupTileForId(this.props.G.board[1][3]));

        let fourthTile = this.createResourceTile(
            2,
            4,
            tiles,
            tileValues,
            thirdTile,
            this.lookupTileForId(this.props.G.board[1][3]),
            this.lookupTileForId(this.props.G.board[1][4]));

        let harborTile = this.createWaterTile(
            2,
            5,
            'three-one brick',
            'l',
            fourthTile,
            this.lookupTileForId(this.props.G.board[1][4]),
            null);

        return <ol className="even">
            <Tile type={'water'}/>
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
            {harborTile}
        </ol>
    }

    renderMiddleRow(tiles, tileValues) {
        let harborTile = this.createWaterTile(
            3,
            0,
            'three-one sheep',
            'r',
            null,
            null,
            this.lookupTileForId(this.props.G.board[2][0]));

        let firstTile = this.createResourceTile(
            3,
            1,
            tiles,
            tileValues,
            harborTile,
            this.lookupTileForId(this.props.G.board[2][0]),
            this.lookupTileForId(this.props.G.board[2][1]));

        let secondTile = this.createResourceTile(
            3,
            2,
            tiles,
            tileValues,
            firstTile,
            this.lookupTileForId(this.props.G.board[2][1]),
            this.lookupTileForId(this.props.G.board[2][2]));

        let thirdTile = this.createResourceTile(
            3,
            3,
            tiles,
            tileValues,
            secondTile,
            this.lookupTileForId(this.props.G.board[2][2]),
            this.lookupTileForId(this.props.G.board[2][3]));

        let fourthTile = this.createResourceTile(
            3,
            4,
            tiles,
            tileValues,
            thirdTile,
            this.lookupTileForId(this.props.G.board[2][3]),
            this.lookupTileForId(this.props.G.board[2][4]));

        let fifthTile = this.createResourceTile(
            3,
            5,
            tiles,
            tileValues,
            fourthTile,
            this.lookupTileForId(this.props.G.board[2][4]),
            this.lookupTileForId(this.props.G.board[2][5]));

        let waterTile = this.createWaterTile(
            3,
            6,
            null,
            null,
            fifthTile,
            this.lookupTileForId(this.props.G.board[2][5]),
            null);

        return (
            <ol className="odd">
                {harborTile}
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
                {fifthTile}
                {waterTile}
            </ol>
        )
    }

    renderFifthRow(tiles, tileValues) {
        let waterTile = this.createWaterTile(
            4,
            0,
            null,
            null,
            null,
            this.lookupTileForId(this.props.G.board[3][0]),
            this.lookupTileForId(this.props.G.board[3][1]));

        let firstTile = this.createResourceTile(
            4,
            1,
            tiles,
            tileValues,
            waterTile,
            this.lookupTileForId(this.props.G.board[3][1]),
            this.lookupTileForId(this.props.G.board[3][2]));

        let secondTile = this.createResourceTile(
            4,
            2,
            tiles,
            tileValues,
            firstTile,
            this.lookupTileForId(this.props.G.board[3][2]),
            this.lookupTileForId(this.props.G.board[3][3]));

        let thirdTile = this.createResourceTile(
            4,
            3,
            tiles,
            tileValues,
            secondTile,
            this.lookupTileForId(this.props.G.board[3][3]),
            this.lookupTileForId(this.props.G.board[1][4]));

        let fourthTile = this.createResourceTile(
            4,
            4,
            tiles,
            tileValues,
            thirdTile,
            this.lookupTileForId(this.props.G.board[3][4]),
            this.lookupTileForId(this.props.G.board[3][5]));

        let harborTile = this.createWaterTile(
            4,
            5,
            'three-one brick',
            'l',
            fourthTile,
            this.lookupTileForId(this.props.G.board[3][5]),
            this.lookupTileForId(this.props.G.board[3][6]));

        return <ol className="even">
            {waterTile}
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
            {harborTile}
        </ol>
    }

    renderSixthRow(tiles, tileValues) {
        let harborTile = this.createWaterTile(
            5,
            0,
            'three-one sheep',
            'r',
            null,
            this.lookupTileForId(this.props.G.board[4][0]),
            this.lookupTileForId(this.props.G.board[4][1]));

        let firstTile = this.createResourceTile(
            5,
            1,
            tiles,
            tileValues,
            harborTile,
            this.lookupTileForId(this.props.G.board[4][1]),
            this.lookupTileForId(this.props.G.board[4][2]));

        let secondTile = this.createResourceTile(
            5,
            2,
            tiles,
            tileValues,
            firstTile,
            this.lookupTileForId(this.props.G.board[4][2]),
            this.lookupTileForId(this.props.G.board[4][3]));

        let thirdTile = this.createResourceTile(
            5,
            3,
            tiles,
            tileValues,
            secondTile,
            this.lookupTileForId(this.props.G.board[4][3]),
            this.lookupTileForId(this.props.G.board[4][4]));

        let waterTile = this.createWaterTile(
            5,
            4,
            null,
            null,
            thirdTile,
            this.lookupTileForId(this.props.G.board[4][4]),
            this.lookupTileForId(this.props.G.board[4][5]));

        return <ol className="odd">
            <Tile type={'spacer'}/>
            {harborTile}
            {firstTile}
            {secondTile}
            {thirdTile}
            {waterTile}
        </ol>
    }

    renderLastRow() {
        let firstTile = this.createWaterTile(
            6,
            0,
            null,
            null,
            null,
            this.lookupTileForId(this.props.G.board[5][0]),
            this.lookupTileForId(this.props.G.board[5][1])
        );

        let secondTile = this.createWaterTile(
            6,
            1,
            'two-one any',
            'tr',
            firstTile,
            this.lookupTileForId(this.props.G.board[5][1]),
            this.lookupTileForId(this.props.G.board[5][2])
        );

        let thirdTile = this.createWaterTile(
            6,
            2,
            null,
            null,
            secondTile,
            this.lookupTileForId(this.props.G.board[5][2]),
            this.lookupTileForId(this.props.G.board[5][3])
        );

        let fourthTile = this.createWaterTile(
            6,
            3,
            'three-one wood',
            'tl',
            thirdTile,
            this.lookupTileForId(this.props.G.board[5][3]),
            this.lookupTileForId(this.props.G.board[5][5])
        );

        return <ol className="even">
            <Tile type={'spacer'}/>
            {firstTile}
            {secondTile}
            {thirdTile}
            {fourthTile}
        </ol>
    }

    lookupTileForId(id) {
        return this.props.G.tiles.get(id);
    }

    createWaterTile(rowIndex,
                    tileIndex,
                    harborType,
                    harborPiece,
                    leftNeighbour,
                    topLeftNeighbour,
                    topRightNeighbour) {

        let waterTile = <Tile
            id={uniqid()}
            type={'water'}
            rowIndex={rowIndex}
            tileIndex={tileIndex}
            harborType={harborType}
            harborPiece={harborPiece}
            topRightNeighbour={topRightNeighbour}
            topLeftNeighbour={topLeftNeighbour}
            leftNeighbour={leftNeighbour}/>

        this.placeTileOnBoard(waterTile);

        return waterTile;
    }

    createResourceTile(rowIndex,
                       tileIndex,
                       tiles,
                       tileValues,
                       leftNeighbour,
                       topLeftNeighbour,
                       topRightNeighbour) {
        let index = Math.floor(Math.random() * tiles.length);
        let tileData = tiles[index];

        let type;

        while (!type) {
            if (tileData.used < tileData.max) {
                type = tileData.type;
                tileData.used++;
            } else {
                index = Math.floor(Math.random() * tiles.length);
                tileData = tiles[index];
            }
        }

        let tile;

        if (type === ('sand')) {
            tile = <Tile
                id={uniqid()}
                type={type}
                rowIndex={rowIndex}
                tileIndex={tileIndex}
                topRightNeighbour={topRightNeighbour}
                topLeftNeighbour={topLeftNeighbour}
                leftNeighbour={leftNeighbour}/>

        } else {
            let id = uniqid();
            tile = <Tile
                id={id}
                type={type}
                value={this.resolveTileValue(tiles, tileValues)}
                rowIndex={rowIndex}
                tileIndex={tileIndex}
                topRightNeighbour={topRightNeighbour}
                topLeftNeighbour={topLeftNeighbour}
                leftNeighbour={leftNeighbour}
                click={() => this.test(id)}/>
        }

        this.placeTileOnBoard(tile);

        return tile;
    }

    resolveTileValue(tiles, tileValues) {
        let index = Math.floor(Math.random() * tileValues.length);
        let valueData = tileValues[index];

        let tileValue;

        while (!tileValue) {
            if (valueData.used < valueData.max) {
                tileValue = valueData.value;
                valueData.used++;
            } else {
                index = Math.floor(Math.random() * tileValues.length);
                valueData = tileValues[index];
            }
        }

        console.log(tileValue);
        return tileValue;
    }

    onClick = id => {
        if (this.isActive(id)) {
            this.props.moves.clickCell(id);
        }
    };

    isActive(id) {
        if (!this.props.isActive) return false;
        if (this.props.G.cells[id] !== null) return false;
        return true;
    }

    placeTileOnBoard(tile) {
        this.props.G.board[tile.props.rowIndex][tile.props.tileIndex] = tile.props.id;
        this.props.G.tiles.set(tile.props.id, tile);
    }

    render() {
        let tiles = [
            {used: 0, max: 4, type: 'sheep'},
            {used: 0, max: 4, type: 'wood'},
            {used: 0, max: 4, type: 'wheat'},
            {used: 0, max: 4, type: 'coal'},
            {used: 0, max: 4, type: 'brick'},
            {used: 0, max: 1, type: 'sand'}
        ]

        let tileValues = [
            {used: 0, max: 2, value: 'two'},
            {used: 0, max: 2, value: 'three'},
            {used: 0, max: 2, value: 'four'},
            {used: 0, max: 2, value: 'five'},
            {used: 0, max: 2, value: 'six'},
            {used: 0, max: 2, value: 'eight'},
            {used: 0, max: 2, value: 'nine'},
            {used: 0, max: 2, value: 'ten'},
            {used: 0, max: 2, value: 'eleven'},
            {used: 0, max: 2, value: 'twelve'}
        ]

        let firstRow = this.renderFirstRow();
        let secondRow = this.renderSecondRow(tiles, tileValues);
        let thirdRow = this.renderThirdRow(tiles, tileValues);
        let middleRow = this.renderMiddleRow(tiles, tileValues);
        let fifthRow = this.renderFifthRow(tiles, tileValues);
        let sixthRow = this.renderSixthRow(tiles, tileValues);
        let lastRow = this.renderLastRow(tiles, tileValues);

        return (
            <div>
                {firstRow}
                {secondRow}
                {thirdRow}
                {middleRow}
                {fifthRow}
                {sixthRow}
                {lastRow}
            </div>
        );
    }

    test = id => {
        this.props.moves.test(id);
    };

}

export default CatanBoard;