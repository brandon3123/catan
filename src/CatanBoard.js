import React from 'react';
import PropTypes from 'prop-types';
import Tile from './components/Tile';
import './css/catan-board.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ButtonGroup } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import {getStages, buildSettlementStageName} from "./utilities/GameDataUtils";
import {Stage} from "./enums/Stage";


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
            <div className="container">
                <div className="actionMenu">
                    <div className="action1">
                        <Card variant="outlined">
                            <CardContent className="buildContainer">
                                <Typography color="textSecondary" gutterBottom>
                                    Build
                                </Typography>
                                <Chip
                                    label="Settlement"
                                    color="primary"
                                    onClick={() => this.setBuildingStage(Stage.BUILD_SETTLEMENT)}
                                    variant="outlined"
                                />
                                <Chip
                                    label="City"
                                    // color={red}
                                    onClick={() => this.setBuildingStage(Stage.BUILD_CITY)}                                    variant="outlined"
                                />
                                <Chip
                                    label="Road"
                                    color="primary"
                                    // onClick={handleClick}
                                    variant="outlined"
                                />

                                <br/>
                                <br/>

                                <Typography color="textSecondary" gutterBottom>
                                    End
                                </Typography>

                                <Chip
                                    label="End Turn"
                                    color="primary"
                                    onClick={() => this.endTurn()}
                                    variant="outlined"
                                />

                                <br/>
                                <br/>

                                <Typography className="text-center" color="textSecondary" gutterBottom>
                                    Resources
                                </Typography>
                                <Chip
                                    label="Brick"
                                    variant="outlined"
                                    color={red[500]}
                                />
                                <Chip label="Sheep" variant="outlined" />
                                <Chip label="Ore" variant="outlined" />
                                <Chip label="Wheat" variant="outlined" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="board">
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
            </div>
        );
    }

    lookupTileForId(id) {
        return this.props.G.board.tiles.get(id);
    }

    setBuildingStage(stage) {
        this.props.events.setStage(stage);
    }

    buildLeftStructure = (id) => {
        let stageName = this.stageNameForCurrentPlayer();
        switch (stageName) {
            case Stage.BUILD_SETTLEMENT:
                this.props.moves.buildLeftHouse(id);
                break;
            case Stage.BUILD_CITY:
                this.props.moves.buildLeftCity(id);
                break;
        }
    }

    buildTopStructure = (id) => {
        let stageName = this.stageNameForCurrentPlayer();
        switch (stageName) {
            case Stage.BUILD_SETTLEMENT:
                this.props.moves.buildTopHouse(id);
                break;
            case Stage.BUILD_CITY:
                this.props.moves.buildTopCity(id);
                break;
        }
    };

    currentPlayer() {
        return this.props.ctx.currentPlayer;
    }

    stageNameForCurrentPlayer() {
        return this.props.ctx.activePlayers[this.currentPlayer()];
    }

    endTurn() {
        this.props.events.endTurn();
    }

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
            topStructure={tileMetaData.topStructure}
            topStructureColor={tileMetaData.topStructureColor}
            hideTopStructure={tileMetaData.hideTopStructure}
            leftStructure={tileMetaData.leftStructure}
            leftStructureColor={tileMetaData.leftStructureColor}
            hideLeftStructure={tileMetaData.hideLeftStructure}
            buildTopStructure={() => this.buildTopStructure(tileMetaData.id)}
            buildLeftStructure={() => this.buildLeftStructure(tileMetaData.id)}
            leftRoadColor={tileMetaData.leftRoadColor}
            hideLeftRoad={tileMetaData.hideLeftRoad}
            topLeftRoadColor={tileMetaData.topLeftRoadColor}
            hideTopLeftRoad={tileMetaData.hideTopLeftRoad}
            topRightRoadColor={tileMetaData.topRightRoadColor}
            hideTopRightRoad={tileMetaData.hideTopRightRoad}
        />
    }
}

export default CatanBoard;