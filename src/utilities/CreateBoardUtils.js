import Tile from "../components/Tile";
import uniqid from "uniqid";
import React from "react";
import {Structure} from "../enums/Structure";
import {Resource} from "../enums/Resource";

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
            {used: 0, max: 4, type: Resource.SHEEP},
            {used: 0, max: 4, type: Resource.WOOD},
            {used: 0, max: 4, type: Resource.WHEAT},
            {used: 0, max: 3, type: Resource.ORE},
            {used: 0, max: 3, type: Resource.BRICK},
            {used: 0, max: 1, type: Resource.SAND}
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
                Resource.WATER,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            let secondTile = createWaterTile(
                0,
                1,
                Resource.WATER,
                null,
                'two-one wood',
                'br',
                firstTile,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            let thirdTile = createWaterTile(
                0,
                2,
                Resource.WATER,
                null,
                secondTile,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            let fourthTile = createWaterTile(
                0,
                3,
                Resource.WATER,
                null,
                'three-one wood',
                'bl',
                thirdTile,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
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
                Resource.WATER,
                null,
                'three-one sheep',
                'br',
                null,
                null,
                lookupTileForId(layout[0][0]),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                false,
                 null,
                false,
                 null,
                false
                );

            let firstTopLeftNeighbour = lookupTileForId(layout[0][0]);
            let firstTopRightNeighbour = lookupTileForId(layout[0][1]);

            let firstTile = createResourceTile(
                1,
                1,
                tiles,
                tileValues,
                harborTile,
                firstTopLeftNeighbour,
                firstTopRightNeighbour);

            firstTopLeftNeighbour.bottomLeftNeighbour = harborTile;
            firstTopLeftNeighbour.bottomRightNeighbour = firstTile;
            firstTopRightNeighbour.bottomLeftNeighbour = firstTile

            let secondTopLeftNeighbour = lookupTileForId(layout[0][1]);
            let secondTopRightNeighbour = lookupTileForId(layout[0][2]);

            let secondTile = createResourceTile(
                1,
                2,
                tiles,
                tileValues,
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[0][2]);
            let thirdTopRightNeighbour = lookupTileForId(layout[0][3]);

            let thirdTile = createResourceTile(
                1,
                3,
                tiles,
                tileValues,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let fourthTopLeftNeighbour = lookupTileForId(layout[0][3]);

            let fourthTile = createWaterTile(
                1,
                4,
                Resource.WATER,
                null,
                null,
                null,
                thirdTile,
                fourthTopLeftNeighbour,
                null,
                null,
                null,
                'target',
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                null,
                true);

            fourthTopLeftNeighbour.bottomRightNeighbour = fourthTile;

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
            let waterTopRightNeighbour = lookupTileForId(layout[1][0]);
            let waterTile = createWaterTile(
                2,
                0,
                Resource.WATER,
                null,
                null,
                null,
                null,
                null,
                waterTopRightNeighbour,
                null,
                null,
                null,
                null,
                null,
                null);

            waterTopRightNeighbour.bottomLeftNeighbour = waterTile;

            let firstTopLeftNeighbour = lookupTileForId(layout[1][0]);
            let firstTopRightNeighbour = lookupTileForId(layout[1][1]);

            let firstTile = createResourceTile(
                2,
                1,
                tiles,
                tileValues,
                waterTile,
                firstTopLeftNeighbour,
                firstTopRightNeighbour);

            firstTopLeftNeighbour.bottomRightNeighbour = firstTile;
            firstTopRightNeighbour.bottomLeftNeighbour = firstTile;

            let secondTopLeftNeighbour = lookupTileForId(layout[1][1]);
            let secondTopRightNeighbour = lookupTileForId(layout[1][2]);

            let secondTile = createResourceTile(
                2,
                2,
                tiles,
                tileValues,
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[1][2]);
            let thirdTopRightNeighbour = lookupTileForId(layout[1][3]);

            let thirdTile = createResourceTile(
                2,
                3,
                tiles,
                tileValues,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let fourthTopLeftNeighbour = lookupTileForId(layout[1][3]);
            let fourthTopRightNeighbour = lookupTileForId(layout[1][4]);

            let fourthTile = createResourceTile(
                2,
                4,
                tiles,
                tileValues,
                thirdTile,
                fourthTopLeftNeighbour,
                fourthTopRightNeighbour);

            fourthTopLeftNeighbour.bottomRightNeighbour = fourthTile;
            fourthTopRightNeighbour.bottomLeftNeighbour = fourthTile;

            let harborTopLeftNeighbour = lookupTileForId(layout[1][4]);

            let harborTile = createWaterTile(
                2,
                5,
                Resource.WATER,
                null,
                'three-one brick',
                'l',
                fourthTile,
                harborTopLeftNeighbour,
                null,
                null,
                null,
                null,
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                null,
                null,
                null,
                null);

            harborTopLeftNeighbour.bottomRightNeighbour = harborTile;

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
            let harborTopRightNeighbour = lookupTileForId(layout[2][0]);

            let harborTile = createWaterTile(
                3,
                0,
                Resource.WATER,
                null,
                'three-one sheep',
                'r',
                null,
                null,
                harborTopRightNeighbour,
                null,
                null,
                null,
                null,
                null,
                true);

            harborTopRightNeighbour.bottomLeftNeighbour = harborTile;

            let firstTopLeftNeighbour = lookupTileForId(layout[2][0]);
            let firstTopRightNeighbour = lookupTileForId(layout[2][1]);

            let firstTile = createResourceTile(
                3,
                1,
                tiles,
                tileValues,
                harborTile,
                firstTopLeftNeighbour,
                firstTopRightNeighbour);

            firstTopLeftNeighbour.bottomRightNeighbour = firstTile;
            firstTopRightNeighbour.bottomLeftNeighbour = firstTile;

            let secondTopLeftNeighbour = lookupTileForId(layout[2][1]);
            let secondTopRightNeighbour = lookupTileForId(layout[2][2]);

            let secondTile = createResourceTile(
                3,
                2,
                tiles,
                tileValues,
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[2][2]);
            let thirdTopRightNeighbour = lookupTileForId(layout[2][3]);

            let thirdTile = createResourceTile(
                3,
                3,
                tiles,
                tileValues,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let fourthTopLeftNeighbour = lookupTileForId(layout[2][3]);
            let fourthTopRightNeighbour = lookupTileForId(layout[2][4]);

            let fourthTile = createResourceTile(
                3,
                4,
                tiles,
                tileValues,
                thirdTile,
                fourthTopLeftNeighbour,
                fourthTopRightNeighbour);

            fourthTopLeftNeighbour.bottomRightNeighbour = fourthTile;
            fourthTopRightNeighbour.bottomLeftNeighbour = fourthTile;

            let fifthTopLeftNeighbour = lookupTileForId(layout[2][4]);
            let fifthTopRightNeighbour = lookupTileForId(layout[2][5]);

            let fifthTile = createResourceTile(
                3,
                5,
                tiles,
                tileValues,
                fourthTile,
                fifthTopLeftNeighbour,
                fifthTopRightNeighbour);

            fifthTopLeftNeighbour.bottomRightNeighbour = fifthTile;
            fifthTopRightNeighbour.bottomLeftNeighbour = fifthTile;

            let waterTopLeftNeighbour = lookupTileForId(layout[2][5]);

            let waterTile = createWaterTile(
                3,
                6,
                Resource.WATER,
                null,
                null,
                null,
                fifthTile,
                waterTopLeftNeighbour,
                null,
                null,
                null,
                null,
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                null,
                null,
                null,
                null);

            waterTopLeftNeighbour.bottomRightNeighbour = waterTile;

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
            let waterTopLeftNeighbour = lookupTileForId(layout[3][0]);
            let waterTopRightNeighbour = lookupTileForId(layout[3][1]);

            let waterTile = createWaterTile(
                4,
                0,
                Resource.WATER,
                null,
                null,
                null,
                null,
                waterTopLeftNeighbour,
                waterTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                true,
                null,
                null,
                null,
                null,
                'target',
                true);

            waterTopLeftNeighbour.bottomRightNeighbour = waterTile;
            waterTopRightNeighbour.bottomLeftNeighbour = waterTile;

            let firstTopLeftNeighbour = lookupTileForId(layout[3][1]);
            let firstTopRightNeighbour = lookupTileForId(layout[3][2]);

            let firstTile = createResourceTile(
                4,
                1,
                tiles,
                tileValues,
                waterTile,
                firstTopLeftNeighbour,
                firstTopRightNeighbour);

            firstTopLeftNeighbour.bottomRightNeighbour = firstTile;
            firstTopRightNeighbour.bottomLeftNeighbour = firstTile;

            let secondTopLeftNeighbour = lookupTileForId(layout[3][2]);
            let secondTopRightNeighbour = lookupTileForId(layout[3][3]);

            let secondTile = createResourceTile(
                4,
                2,
                tiles,
                tileValues,
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[3][3]);
            let thirdTopRightNeighbour = lookupTileForId(layout[3][4]);

            let thirdTile = createResourceTile(
                4,
                3,
                tiles,
                tileValues,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let fourthTopLeftNeighbour = lookupTileForId(layout[3][4]);
            let fourthTopRightNeighbour = lookupTileForId(layout[3][5]);

            let fourthTile = createResourceTile(
                4,
                4,
                tiles,
                tileValues,
                thirdTile,
                fourthTopLeftNeighbour,
                fourthTopRightNeighbour);

            fourthTopLeftNeighbour.bottomRightNeighbour = fourthTile;
            fourthTopRightNeighbour.bottomLeftNeighbour = fourthTile;

            let harborTopLeftNeighbour = lookupTileForId(layout[3][5]);
            let harborTopRightNeighbour = lookupTileForId(layout[3][6]);

            let harborTile = createWaterTile(
                4,
                5,
                Resource.WATER,
                null,
                'three-one brick',
                'l',
                fourthTile,
                harborTopLeftNeighbour,
                harborTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                'target',
                true,
                null,
                true);

            harborTopLeftNeighbour.bottomRightNeighbour = harborTile;
            harborTopRightNeighbour.bottomLeftNeighbour = harborTile;

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
            let harborTopLeftNeighbour = lookupTileForId(layout[4][0]);
            let harborTopRightNeighbour = lookupTileForId(layout[4][1]);

            let harborTile = createWaterTile(
                5,
                0,
                Resource.WATER,
                null,
                'three-one sheep',
                'r',
                null,
                harborTopLeftNeighbour,
                harborTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                'target',
                true);

            harborTopLeftNeighbour.bottomRightNeighbour = harborTile;
            harborTopRightNeighbour.bottomLeftNeighbour = harborTile;

            let firstTopLeftNeighbour = lookupTileForId(layout[4][1]);
            let firstTopRightNeighbour = lookupTileForId(layout[4][2]);

            let firstTile = createResourceTile(
                5,
                1,
                tiles,
                tileValues,
                harborTile,
                firstTopLeftNeighbour,
                firstTopRightNeighbour);

            firstTopLeftNeighbour.bottomRightNeighbour = firstTile;
            firstTopRightNeighbour.bottomLeftNeighbour = firstTile;

            let secondTopLeftNeighbour = lookupTileForId(layout[4][2]);
            let secondTopRightNeighbour = lookupTileForId(layout[4][3]);

            let secondTile = createResourceTile(
                5,
                2,
                tiles,
                tileValues,
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[4][3]);
            let thirdTopRightNeighbour = lookupTileForId(layout[4][4]);

            let thirdTile = createResourceTile(
                5,
                3,
                tiles,
                tileValues,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let waterTopLeftNeighbour = lookupTileForId(layout[4][4]);
            let waterTopRightNeighbour = lookupTileForId(layout[4][5]);

            let waterTile = createWaterTile(
                5,
                4,
                Resource.WATER,
                null,
                null,
                null,
                thirdTile,
                waterTopLeftNeighbour,
                waterTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                'target',
                true,
                null,
                null);

            waterTopLeftNeighbour.bottomRightNeighbour = waterTile;
            waterTopRightNeighbour.bottomLeftNeighbour = waterTile;

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
            let topLeftNeighbour = lookupTileForId(layout[5][0]);
            let topRightNeighbour = lookupTileForId(layout[5][1]);

            let firstTile = createWaterTile(
                6,
                0,
                Resource.WATER,
                null,
                null,
                null,
                null,
                topLeftNeighbour,
                topRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                'target',
                true);

            topLeftNeighbour.bottomRightNeighbour = firstTile;
            topRightNeighbour.bottomLeftNeighbour = firstTile;

            let secondTopLeftNeighbour = lookupTileForId(layout[5][1]);
            let secondTopRightNeighbour = lookupTileForId(layout[5][2]);

            let secondTile = createWaterTile(
                6,
                1,
                Resource.WATER,
                null,
                'two-one any',
                'tr',
                firstTile,
                secondTopLeftNeighbour,
                secondTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                'target',
                true,
                'target',
                true);

            secondTopLeftNeighbour.bottomRightNeighbour = secondTile;
            secondTopRightNeighbour.bottomLeftNeighbour = secondTile;

            let thirdTopLeftNeighbour = lookupTileForId(layout[5][2]);
            let thirdTopRightNeighbour = lookupTileForId(layout[5][3]);

            let thirdTile = createWaterTile(
                6,
                2,
                Resource.WATER,
                null,
                null,
                null,
                secondTile,
                thirdTopLeftNeighbour,
                thirdTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                'target',
                true,
                'target',
                true);

            thirdTopLeftNeighbour.bottomRightNeighbour = thirdTile;
            thirdTopRightNeighbour.bottomLeftNeighbour = thirdTile;

            let fourthTopLeftNeighbour = lookupTileForId(layout[5][3]);
            let fourthTopRightNeighbour = lookupTileForId(layout[5][4]);

            let fourthTile = createWaterTile(
                6,
                3,
                Resource.WATER,
                null,
                'three-one wood',
                'tl',
                thirdTile,
                fourthTopLeftNeighbour,
                fourthTopRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                null,
                null,
                'target',
                true,
                null,
                true);

            fourthTopRightNeighbour.bottomLeftNeighbour = fourthTile;
            fourthTopLeftNeighbour.bottomRightNeighbour = fourthTile;

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
                                 type,
                                 value,
                                 harborType,
                                 harborPiece,
                                 leftNeighbour,
                                 topLeftNeighbour,
                                 topRightNeighbour,
                                 topStructure,
                                 topStructureColor,
                                 hideTopStructure,
                                 leftStructure,
                                 leftStructureColor,
                                 hideLeftStructure,
                                 leftRoadColor,
                                 hideLeftRoad,
                                 topLeftRoadColor,
                                 hideTopLeftRoad,
                                 topRightRoadColor,
                                 hideTopRightRoad) {

            let waterTile = tileJson(
                rowIndex,
                tileIndex,
                type,
                value,
                harborType,
                harborPiece,
                leftNeighbour,
                topLeftNeighbour,
                topRightNeighbour,
                topStructure,
                topStructureColor,
                hideTopStructure,
                leftStructure,
                leftStructureColor,
                hideLeftStructure,
                leftRoadColor,
                hideLeftRoad,
                topLeftRoadColor,
                hideTopLeftRoad,
                topRightRoadColor,
                hideTopRightRoad
            );

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

            let tile = tileJson(
                rowIndex,
                tileIndex,
                type,
                resolveTileValue(tiles, tileValues),
                null,
                null,
                leftNeighbour,
                topLeftNeighbour,
                topRightNeighbour,
                Structure.SETTLEMENT,
                'target',
                true,
                Structure.SETTLEMENT,
                'target',
                true,
                'target',
                true,
                'target',
                true,
                'target',
                true
            );

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

            return tileValue;
        }


        function placeTileOnBoard(tile) {
            layout[tile.rowIndex][tile.tileIndex] = tile.id;
            tiles.set(tile.id, tile);
        }

        function tileJson(rowIndex,
                          tileIndex,
                          type,
                          value,
                          harborType,
                          harborPiece,
                          leftNeighbour,
                          topLeftNeighbour,
                          topRightNeighbour,
                          topStructure,
                          topStructureColor,
                          hideTopStructure,
                          leftStructure,
                          leftStructureColor,
                          hideLeftStructure,
                          leftRoadColor,
                          hideLeftRoad,
                          topLeftRoadColor,
                          hideTopLeftRoad,
                          topRightRoadColor,
                          hideTopRightRoad) {
            return {
                id: uniqid(),
                type: type,
                value: type !== Resource.SAND ? value : null,
                rowIndex: rowIndex,
                tileIndex: tileIndex,
                harborType: harborType,
                harborPiece: harborPiece,
                topRightNeighbour: topRightNeighbour,
                topLeftNeighbour: topLeftNeighbour,
                leftNeighbour: leftNeighbour,
                topStructure: topStructure,
                topStructureColor: topStructureColor,
                hideTopStructure: hideTopStructure,
                leftStructure: leftStructure,
                leftStructureColor: leftStructureColor,
                hideLeftStructure: hideLeftStructure,
                leftRoadColor: leftRoadColor,
                hideLeftRoad: hideLeftRoad,
                topLeftRoadColor: topLeftRoadColor,
                hideTopLeftRoad: hideTopLeftRoad,
                topRightRoadColor: topRightRoadColor,
                hideTopRightRoad: hideTopRightRoad,
            }
        }
    }
}

