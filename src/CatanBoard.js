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
import {Stage} from "./enums/Stage";
import {Phase} from "./enums/Phase";

import {
    stageNameForCurrentPlayer,
    currentPhase
} from "./utilities/GameUtils";

import {
    getTile, hideAllTargetLocations,
    showTargetLocationsForPlayerAndStage
} from "./utilities/CatanUtils";
import {currentPlayer, numberOfSettlementsForCurrentPlayer} from "./utilities/PlayerUtils";
import {Structure} from "./enums/Structure";

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
                                    disabled={this.isStageDisabledForPhase()}
                                    variant="outlined"
                                />
                                <Chip
                                    label="City"
                                    color="primary"
                                    // color={red}
                                    onClick={() => this.setBuildingStage(Stage.BUILD_CITY)}
                                    disabled={this.isStageDisabledForPhase()}
                                    variant="outlined"
                                />
                                <Chip
                                    label="Road"
                                    color="primary"
                                    onClick={() => this.setBuildingStage(Stage.BUILD_ROAD)}
                                    disabled={this.isStageDisabledForPhase()}
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
                                    disabled={this.isEndTurnButtonDisabled()}
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
                        {this.createTileComponent(this.props.G.board.layout[0][0])}
                        {this.createTileComponent(this.props.G.board.layout[0][1])}
                        {this.createTileComponent(this.props.G.board.layout[0][2])}
                        {this.createTileComponent(this.props.G.board.layout[0][3])}
                    </ol>
                    <ol className="odd">
                        <Tile type={'spacer'}/>
                        {this.createTileComponent(this.props.G.board.layout[1][0])}
                        {this.createTileComponent(this.props.G.board.layout[1][1])}
                        {this.createTileComponent(this.props.G.board.layout[1][2])}
                        {this.createTileComponent(this.props.G.board.layout[1][3])}
                        {this.createTileComponent(this.props.G.board.layout[1][4])}
                    </ol>
                    <ol className="even">
                        {this.createTileComponent(this.props.G.board.layout[2][0])}
                        {this.createTileComponent(this.props.G.board.layout[2][1])}
                        {this.createTileComponent(this.props.G.board.layout[2][2])}
                        {this.createTileComponent(this.props.G.board.layout[2][3])}
                        {this.createTileComponent(this.props.G.board.layout[2][4])}
                        {this.createTileComponent(this.props.G.board.layout[2][5])}
                    </ol>
                    <ol className="odd">
                        {this.createTileComponent(this.props.G.board.layout[3][0])}
                        {this.createTileComponent(this.props.G.board.layout[3][1])}
                        {this.createTileComponent(this.props.G.board.layout[3][2])}
                        {this.createTileComponent(this.props.G.board.layout[3][3])}
                        {this.createTileComponent(this.props.G.board.layout[3][4])}
                        {this.createTileComponent(this.props.G.board.layout[3][5])}
                        {this.createTileComponent(this.props.G.board.layout[3][6])}
                    </ol>
                    <ol className="even">)
                        {this.createTileComponent(this.props.G.board.layout[4][0])}
                        {this.createTileComponent(this.props.G.board.layout[4][1])}
                        {this.createTileComponent(this.props.G.board.layout[4][2])}
                        {this.createTileComponent(this.props.G.board.layout[4][3])}
                        {this.createTileComponent(this.props.G.board.layout[4][4])}
                        {this.createTileComponent(this.props.G.board.layout[4][5])}
                    </ol>
                    <ol className="odd">
                        <Tile type={'spacer'}/>
                        {this.createTileComponent(this.props.G.board.layout[5][0])}
                        {this.createTileComponent(this.props.G.board.layout[5][1])}
                        {this.createTileComponent(this.props.G.board.layout[5][2])}
                        {this.createTileComponent(this.props.G.board.layout[5][3])}
                        {this.createTileComponent(this.props.G.board.layout[5][4])}
                    </ol>
                    <ol className="even">
                        <Tile type={'spacer'}/>
                        {this.createTileComponent(this.props.G.board.layout[6][0])}
                        {this.createTileComponent(this.props.G.board.layout[6][1])}
                        {this.createTileComponent(this.props.G.board.layout[6][2])}
                        {this.createTileComponent(this.props.G.board.layout[6][3])}
                    </ol>
                </div>
            </div>
        );
    }

    setBuildingStage(stage) {
        hideAllTargetLocations(this.props.G);
        this.props.events.setStage(stage);
        showTargetLocationsForPlayerAndStage(this.props.G, this.props.ctx, stage);
    }

    isEndTurnButtonDisabled() {
        return this.isStageDisabledForPhase();
    }

    isStageDisabledForPhase() {
        let currentPhaseName = currentPhase(this.props.ctx);

        console.log(currentPhaseName);

        switch (currentPhaseName) {
            case Phase.INITIAL_PLACEMENT:
            case Phase.INITIAL_PLACEMENT_REVERSED:
                return true;
        }

        return false;
    }

    buildLeftStructure = (id) => {
        let stageName = stageNameForCurrentPlayer(this.props.ctx);
        switch (stageName) {
            case Stage.BUILD_SETTLEMENT:
                this.props.moves.buildLeftStructureAndGoToRoadStageIfPermitted(id, Structure.SETTLEMENT);
                break;
            case Stage.BUILD_CITY:
                this.props.moves.buildLeftStructureAndGoToRoadStageIfPermitted(id, Structure.CITY);
                break;
        }
    }

    buildLeftRoad = (id) => {
        this.props.moves.buildLeftRoadAndGoToSettlementStage(id);
    }

    buildTopLeftRoad = (id) => {
        this.props.moves.buildTopLeftRoadAndGoToSettlementStage(id);
    }

    buildTopRightRoad = (id) => {
        this.props.moves.buildTopRightRoadAndGoToSettlementStage(id);
    }

    buildTopStructure = (id) => {
        let stageName = stageNameForCurrentPlayer(this.props.ctx);
        console.log(stageName);
        switch (stageName) {
            case Stage.BUILD_SETTLEMENT:
                this.props.moves.buildTopStructureAndGoToRoadStageIfPermitted(id, Structure.SETTLEMENT);
                break;
            case Stage.BUILD_CITY:
                this.props.moves.buildTopStructureAndGoToRoadStageIfPermitted(id, Structure.CITY);
                break;
        }
    };

    endTurn() {
        this.props.events.endTurn();
    }

    createTileComponent(tileId) {
        let tileMetaData = getTile(this.props.G, tileId);
        let buildTopStructureMove = () => this.buildTopStructure(tileMetaData.id);

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
            isTopStructureAvailable={tileMetaData.isTopStructureAvailable}
            hideTopStructure={tileMetaData.hideTopStructure}
            leftStructure={tileMetaData.leftStructure}
            leftStructureColor={tileMetaData.leftStructureColor}
            isLeftStructureAvailable={tileMetaData.isLeftStructureAvailable}
            hideLeftStructure={tileMetaData.hideLeftStructure}
            buildTopStructure={buildTopStructureMove}
            buildLeftStructure={() => this.buildLeftStructure(tileMetaData.id)}
            leftRoadColor={tileMetaData.leftRoadColor}
            hideLeftRoad={tileMetaData.hideLeftRoad}
            buildLeftRoad={() => this.buildLeftRoad(tileMetaData.id)}
            topLeftRoadColor={tileMetaData.topLeftRoadColor}
            hideTopLeftRoad={tileMetaData.hideTopLeftRoad}
            buildTopLeftRoad={() => this.buildTopLeftRoad(tileMetaData.id)}
            topRightRoadColor={tileMetaData.topRightRoadColor}
            hideTopRightRoad={tileMetaData.hideTopRightRoad}
            buildTopRightRoad={() => this.buildTopRightRoad(tileMetaData.id)}
        />
    }
}

export default CatanBoard;