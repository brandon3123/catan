import React, {useCallback} from 'react';
import {Structure} from "../enums/Structure";

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li tileId={this.props.id}
                className={'hex ' + this.props.type}>
                {this.tileValue()}
                {this.harborType()}
                {this.topStructure()}
                {this.leftStructure()}
                {this.leftRoad()}
                {this.topLeftRoad()}
                {this.topRightRoad()}
            </li>
        )
    };

    tileValue() {
        if (this.props.value) {
            return (
                <div className={'number ' + this.props.value}/>
            );
        } else {
            return null;
        }
    };

    topStructure() {
        if (this.props.topStructure) {
            let className =
                this.props.isTopStructureAvailable
                    ? 'build t target2'
                    : this.props.topStructure + ' t ' + this.props.topStructureColor;
                return (
                    <div className={className}
                         onClick={this.props.buildTopStructure}
                         style={{visibility: this.props.hideTopStructure ? 'hidden' : 'visible'}}
                    />
                )

        }
        return null;
    }

    leftStructure() {
        if (this.props.leftStructure) {
            let className =
                this.props.isLeftStructureAvailable
                ? 'build tl target2'
                : this.props.leftStructure + ' tl ' + this.props.leftStructureColor;
                return (
                    <div className={className}
                         onClick={this.props.buildLeftStructure}
                         style={{visibility: this.props.hideLeftStructure ? 'hidden' : 'visible'}}
                    />
                )

        }
        return null;
    }

    topLeftRoad() {
        if (this.props.topLeftRoadColor) {
            return (
                <div className={Structure.ROAD + ' tl ' + this.props.topLeftRoadColor}
                     onClick={this.props.buildTopLeftRoad}
                     style={{visibility: this.props.hideTopLeftRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    topRightRoad() {
        if (this.props.topRightRoadColor) {
            return (
                <div className={Structure.ROAD + ' tr ' + this.props.topRightRoadColor}
                     onClick={this.props.buildTopRightRoad}
                     style={{visibility: this.props.hideTopRightRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    leftRoad() {
        if (this.props.leftRoadColor) {
            return (
                <div className={Structure.ROAD + ' l ' + this.props.leftRoadColor}
                     onClick={this.props.buildLeftRoad}
                     style={{visibility: this.props.hideLeftRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    harborType() {
        if (this.props.harborType && this.props.harborPiece) {
            return (
                <div className={Structure.HARBOR + ' ' + this.props.harborType}>
                    <div className={'harbor-piece ' + this.props.harborPiece}></div>
                </div>
            );
        } else {
            return null;
        }
    };
}

export default Tile;