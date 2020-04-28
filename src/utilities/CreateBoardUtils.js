import Tile from "../components/Tile";
import uniqid from "uniqid";
import React from "react";

export const initializeBoardMetaData = () => {
    return createCatanBoard();

    function createCatanBoard() {
        let layout = [
            [[], [], [], []],
            [[], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], [], [], []],
            [[], [], [], [], [], []],
            [[], [], [], [], []],
            [[], [], [], []],
        ];
        let tiles = new Map();

        let tilesUsed = [
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

        renderFirstRow();
        renderSecondRow(tilesUsed, tileValues);
        renderThirdRow(tilesUsed, tileValues);
        renderMiddleRow(tilesUsed, tileValues);
        renderFifthRow(tilesUsed, tileValues);
        renderSixthRow(tilesUsed, tileValues);
        renderLastRow(tilesUsed, tileValues);

        return {
            layout: layout,
            tiles: tiles
        }

        function renderFirstRow() {
            let firstTile = createWaterTile(
                0,
                0,
                null,
                null,
                null,
                null,
                null
            );

            let secondTile = createWaterTile(
                0,
                1,
                'two-one wood',
                'br',
                firstTile,
                null,
                null
            );

            let thirdTile = createWaterTile(
                0,
                2,
                null,
                null,
                secondTile,
                null,
                null
            );

            let fourthTile = createWaterTile(
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

        function renderSecondRow(tiles, tileValues) {
            let harborTile = createWaterTile(
                1,
                0,
                'three-one sheep',
                'br',
                null,
                null,
                lookupTileForId(layout[0][0]));

            let firstTile = createResourceTile(
                1,
                1,
                tiles,
                tileValues,
                harborTile,
                lookupTileForId(layout[0][0]),
                lookupTileForId(layout[0][1]));

            let secondTile = createResourceTile(
                1,
                2,
                tiles,
                tileValues,
                firstTile,
                lookupTileForId(layout[0][1]),
                lookupTileForId(layout[0][2]));

            let thirdTile = createResourceTile(
                1,
                3,
                tiles,
                tileValues,
                secondTile,
                lookupTileForId(layout[0][3]),
                lookupTileForId(layout[0][4]));

            let fourthTile = createWaterTile(
                1,
                4,
                null,
                null,
                null,
                lookupTileForId(layout[0][4]),
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

        function renderThirdRow(tiles, tileValues) {
            let waterTile = createWaterTile(
                2,
                0,
                null,
                null,
                null,
                null,
                lookupTileForId(layout[1][0]));

            let firstTile = createResourceTile(
                2,
                1,
                tiles,
                tileValues,
                waterTile,
                lookupTileForId(layout[1][0]),
                lookupTileForId(layout[1][1]));

            let secondTile = createResourceTile(
                2,
                2,
                tiles,
                tileValues,
                firstTile,
                lookupTileForId(layout[1][1]),
                lookupTileForId(layout[1][2]));

            let thirdTile = createResourceTile(
                2,
                3,
                tiles,
                tileValues,
                secondTile,
                lookupTileForId(layout[1][2]),
                lookupTileForId(layout[1][3]));

            let fourthTile = createResourceTile(
                2,
                4,
                tiles,
                tileValues,
                thirdTile,
                lookupTileForId(layout[1][3]),
                lookupTileForId(layout[1][4]));

            let harborTile = createWaterTile(
                2,
                5,
                'three-one brick',
                'l',
                fourthTile,
                lookupTileForId(layout[1][4]),
                null);

            return <ol className="even">
                {waterTile}
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
                {harborTile}
            </ol>
        }

        function renderMiddleRow(tiles, tileValues) {
            let harborTile = createWaterTile(
                3,
                0,
                'three-one sheep',
                'r',
                null,
                null,
                lookupTileForId(layout[2][0]));

            let firstTile = createResourceTile(
                3,
                1,
                tiles,
                tileValues,
                harborTile,
                lookupTileForId(layout[2][0]),
                lookupTileForId(layout[2][1]));

            let secondTile = createResourceTile(
                3,
                2,
                tiles,
                tileValues,
                firstTile,
                lookupTileForId(layout[2][1]),
                lookupTileForId(layout[2][2]));

            let thirdTile = createResourceTile(
                3,
                3,
                tiles,
                tileValues,
                secondTile,
                lookupTileForId(layout[2][2]),
                lookupTileForId(layout[2][3]));

            let fourthTile = createResourceTile(
                3,
                4,
                tiles,
                tileValues,
                thirdTile,
                lookupTileForId(layout[2][3]),
                lookupTileForId(layout[2][4]));

            let fifthTile = createResourceTile(
                3,
                5,
                tiles,
                tileValues,
                fourthTile,
                lookupTileForId(layout[2][4]),
                lookupTileForId(layout[2][5]));

            let waterTile = createWaterTile(
                3,
                6,
                null,
                null,
                fifthTile,
                lookupTileForId(layout[2][5]),
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

        function renderFifthRow(tiles, tileValues) {
            let waterTile = createWaterTile(
                4,
                0,
                null,
                null,
                null,
                lookupTileForId(layout[3][0]),
                lookupTileForId(layout[3][1]));

            let firstTile = createResourceTile(
                4,
                1,
                tiles,
                tileValues,
                waterTile,
                lookupTileForId(layout[3][1]),
                lookupTileForId(layout[3][2]));

            let secondTile = createResourceTile(
                4,
                2,
                tiles,
                tileValues,
                firstTile,
                lookupTileForId(layout[3][2]),
                lookupTileForId(layout[3][3]));

            let thirdTile = createResourceTile(
                4,
                3,
                tiles,
                tileValues,
                secondTile,
                lookupTileForId(layout[3][3]),
                lookupTileForId(layout[1][4]));

            let fourthTile = createResourceTile(
                4,
                4,
                tiles,
                tileValues,
                thirdTile,
                lookupTileForId(layout[3][4]),
                lookupTileForId(layout[3][5]));

            let harborTile = createWaterTile(
                4,
                5,
                'three-one brick',
                'l',
                fourthTile,
                lookupTileForId(layout[3][5]),
                lookupTileForId(layout[3][6]));

            return <ol className="even">
                {waterTile}
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
                {harborTile}
            </ol>
        }

        function renderSixthRow(tiles, tileValues) {
            let harborTile = createWaterTile(
                5,
                0,
                'three-one sheep',
                'r',
                null,
                lookupTileForId(layout[4][0]),
                lookupTileForId(layout[4][1]));

            let firstTile = createResourceTile(
                5,
                1,
                tiles,
                tileValues,
                harborTile,
                lookupTileForId(layout[4][1]),
                lookupTileForId(layout[4][2]));

            let secondTile = createResourceTile(
                5,
                2,
                tiles,
                tileValues,
                firstTile,
                lookupTileForId(layout[4][2]),
                lookupTileForId(layout[4][3]));

            let thirdTile = createResourceTile(
                5,
                3,
                tiles,
                tileValues,
                secondTile,
                lookupTileForId(layout[4][3]),
                lookupTileForId(layout[4][4]));

            let waterTile = createWaterTile(
                5,
                4,
                null,
                null,
                thirdTile,
                lookupTileForId(layout[4][4]),
                lookupTileForId(layout[4][5]));

            return <ol className="odd">
                <Tile type={'spacer'}/>
                {harborTile}
                {firstTile}
                {secondTile}
                {thirdTile}
                {waterTile}
            </ol>
        }

        function renderLastRow() {
            let firstTile = createWaterTile(
                6,
                0,
                null,
                null,
                null,
                lookupTileForId(layout[5][0]),
                lookupTileForId(layout[5][1])
            );

            let secondTile = createWaterTile(
                6,
                1,
                'two-one any',
                'tr',
                firstTile,
                lookupTileForId(layout[5][1]),
                lookupTileForId(layout[5][2])
            );

            let thirdTile = createWaterTile(
                6,
                2,
                null,
                null,
                secondTile,
                lookupTileForId(layout[5][2]),
                lookupTileForId(layout[5][3])
            );

            let fourthTile = createWaterTile(
                6,
                3,
                'three-one wood',
                'tl',
                thirdTile,
                lookupTileForId(layout[5][3]),
                lookupTileForId(layout[5][5])
            );

            return <ol className="even">
                <Tile type={'spacer'}/>
                {firstTile}
                {secondTile}
                {thirdTile}
                {fourthTile}
            </ol>
        }

        function lookupTileForId(id) {
            return tiles.get(id);
        }

        function createWaterTile(rowIndex,
                                 tileIndex,
                                 harborType,
                                 harborPiece,
                                 leftNeighbour,
                                 topLeftNeighbour,
                                 topRightNeighbour) {


            let waterTile = {
                id: uniqid(),
                type: 'water',
                value: null,
                rowIndex: rowIndex,
                tileIndex: tileIndex,
                harborType: harborType,
                harborPiece: harborPiece,
                topRightNeighbour: topRightNeighbour,
                topLeftNeighbour: topLeftNeighbour,
                leftNeighbour: leftNeighbour,
                structure: 'house',
                structureColor: 'target',
                hideStructure: true
            }

            placeTileOnBoard(waterTile);

            return waterTile;
        }

        function createResourceTile(rowIndex,
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

            let tile = {
                id: uniqid(),
                type: type,
                value: type !== 'sand' ? resolveTileValue(tiles, tileValues) : null,
                rowIndex: rowIndex,
                tileIndex: tileIndex,
                topRightNeighbour: topRightNeighbour,
                topLeftNeighbour: topLeftNeighbour,
                leftNeighbour: leftNeighbour,
                structure: 'house',
                structureColor: 'target',
                hideStructure: true
            }

            placeTileOnBoard(tile);

            return tile;
        }

        function resolveTileValue(tiles, tileValues) {
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


        function placeTileOnBoard(tile) {
            layout[tile.rowIndex][tile.tileIndex] = tile.id;
            tiles.set(tile.id, tile);
        }

    }
}

