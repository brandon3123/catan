/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './css/board2.scss';

class CatanBoard extends React.Component {
    static propTypes = {
        G: PropTypes.any.isRequired,
        ctx: PropTypes.any.isRequired,
        moves: PropTypes.any.isRequired,
        playerID: PropTypes.string,
        isActive: PropTypes.bool,
        isMultiplayer: PropTypes.bool,
    };

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

    render() {
        let tbody = [];
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = 0; j < 3; j++) {
                const id = 3 * i + j;
                cells.push(
                    <td
                        key={id}
                        className={this.isActive(id) ? 'active' : ''}
                        onClick={() => this.onClick(id)}
                    >
                        {this.props.G.cells[id]}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        let winner = null;
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                    <div id="winner">Draw!</div>
                );
        }

        return (
            <div>
                <ol className="even">
                    <li className='hex spacer'></li>
                    <li className='hex water'></li>
                    <li className='hex water'>
                        <div className='harbor two-one wood'>
                            <div className='harbor-piece br'></div>
                        </div>
                    </li>
                    <li className='hex water'></li>
                    <li className='hex water'>
                        <div className='harbor three-one wood'>
                            <div className='harbor-piece bl'></div>
                        </div>
                    </li>
                </ol>

                <ol className="odd">
                    <li className='hex spacer'></li>
                    <li className='hex water'>
                        <div className='harbor three-one sheep'>
                            <div className='harbor-piece br'></div>
                        </div>
                    </li>
                    <li className='hex wheat'>
                        <div className='number two'></div>
                    </li>
                    <li className='hex wood'>
                        <div className='number three'></div>
                    </li>
                    <li className='hex wheat'>
                        <div className='number three'></div>

                    </li>
                    <li className='hex water'></li>
                </ol>

                <ol className="even">
                    <li className='hex water'></li>
                    <li className='hex coal'>
                        <div className='number four'></div>
                    </li>
                    <li className='hex sheep'>
                        <div className='number four'></div>
                    </li>
                    <li className='hex wood'>
                        <div className='number five'></div>
                    </li>
                    <li className='hex sheep'>
                        <div className='number five'></div>
                    </li>
                    <li className='hex water'>
                        <div className='harbor three-one brick'>
                            <div className='harbor-piece l'></div>
                        </div>
                    </li>
                </ol>

                <ol className="odd">
                    <li className='hex water'>
                        <div className='harbor three-one sheep'>
                            <div className='harbor-piece r'></div>
                        </div>
                    </li>
                    <li className='hex sheep'>
                        <div className='number six'></div>
                    </li>
                    <li className='hex wheat'>
                        <div className='number six'></div>
                    </li>
                    <li className='hex wood'>
                        <div className='number eight robber'></div>
                    </li>
                    <li className='hex brick'>
                        <div className='number eight'></div>
                    </li>
                    <li className='hex brick'>
                        <div className='number nine'></div>
                    </li>
                    <li className='hex water'>

                    </li>
                </ol>
                <ol className="even">
                    <li className='hex water'></li>
                    <li className='hex coal'>
                        <div className='number nine'></div>
                    </li>
                    <li className='hex brick'>
                        <div className='number ten'></div>
                    </li>
                    <li className='hex wood'>
                        <div className='house tl target'></div>
                        <div className='number ten'></div>
                    </li>
                    <li className='hex sheep'>
                        <div className='number eleven'></div>
                    </li>
                    <li className='hex water'>
                        <div className='harbor three-one brick'>
                            <div className='harbor-piece l'></div>
                        </div>
                    </li>
                </ol>
                <ol className="odd">
                    <li className='hex spacer'></li>
                    <li className='hex water'>
                        <div className='harbor two-one any'>
                            <div className='harbor-piece tr'></div>
                        </div>
                    </li>
                    <li className='hex sand'></li>
                    <li className='hex coal'>
                        <div className='number twelve'></div>
                    </li>
                    <li className='hex wheat'>
                        <div className='number eight'></div>
                    </li>
                    <li className='hex water'>
                    </li>
                </ol>
                <ol className="even">
                    <li className='hex spacer'></li>
                    <li className='hex water'></li>
                    <li className='hex water'>
                        <div className='harbor two-one any'>
                            <div className='harbor-piece tr'></div>
                        </div>
                    </li>
                    <li className='hex water'></li>
                    <li className='hex water'>
                        <div className='harbor three-one wood'>
                            <div className='harbor-piece tl'></div>
                        </div>
                    </li>
                </ol>
            </div>
        );
    }
}

export default CatanBoard;