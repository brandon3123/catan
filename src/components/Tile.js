import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className={'hex ' + this.props.type}>
                {this.tileValue()}
                {this.harborType()}
            </li>
        )
    }

    tileValue() {
        if (this.props.value) {
            return (
                <div className={'number ' + this.props.value}/>
            );
        } else {
            return null;
        }
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
    }
}

export default Tile;