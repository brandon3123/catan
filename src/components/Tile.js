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
                <div className={this.props.structure + ' t ' + this.props.structureColor}
                     onClick={this.props.buildStructure}
                     style={{visibility: this.props.hideStructure ? 'hidden' : 'visible'}}
                />

                {/*<div className={this.props.structure + ' t ' + this.props.structureColor} onClick={this.props.buildStructure}></div>*/}
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