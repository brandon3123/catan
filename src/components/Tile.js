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
                {/*<div className='house tl target'></div>*/}
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