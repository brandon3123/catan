import React, {useCallback} from 'react';

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
            return (
                <div className={this.props.topStructure + ' t ' + this.props.topStructureColor}
                     onClick={this.props.buildTopStructure}
                     style={{visibility: this.props.hideTopStructure ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    leftStructure() {
        if (this.props.leftStructure) {
            return (
                <div className={this.props.leftStructure + ' tl ' + this.props.leftStructureColor}
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
                <div className={'road tl ' + this.props.topLeftRoadColor}
                     onClick={this.props.buildTopStructure}
                     style={{visibility: this.props.hideTopLeftRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    topRightRoad() {
        if (this.props.topRightRoadColor) {
            return (
                <div className={'road tr ' + this.props.topRightRoadColor}
                     onClick={this.props.buildTopStructure}
                     style={{visibility: this.props.hideTopRightRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    leftRoad() {
        if (this.props.leftRoadColor) {
            return (
                <div className={'road l ' + this.props.leftRoadColor}
                     onClick={this.props.buildTopStructure}
                     style={{visibility: this.props.hideLeftRoad ? 'hidden' : 'visible'}}
                />
            )
        }
        return null;
    }

    harborType() {
        if (this.props.harborType && this.props.harborPiece) {
            return (
                <div className={'harbor ' + this.props.harborType}>
                    <div className={'harbor-piece ' + this.props.harborPiece}></div>
                </div>
            );
        } else {
            return null;
        }
    };
}

export default Tile;