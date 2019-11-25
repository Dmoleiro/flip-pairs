import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/playBoard.module.css';
// components
import Card from '../components/card';
import ControlPanel from '../components/controlPanel';
//actions
import {toggleFlipTile} from "../actions/layoutActions";
import Celebration from "../components/celebration";

const mapStateToProps = (state, ownProps) => {
    return {
        tileCount: state.fp.tileCount,
        selectedStateMatrix: state.fp.selectedStateMatrix,
        celebration: state.fp.celebration,
    };
};

class PlayBoard extends Component {
    constructor(props) {
        super(props);

        this.state={};
    }

    componentDidMount() {
        let store = this.props.store;
        let storeData = store.getState();

        this.setState({
            ...this.state,
            tileCount: storeData.fp.tileCount,
            selectedStateMatrix: storeData.fp.selectedStateMatrix,
            celebration: storeData.fp.celebration,
        });
    }

    static getDerivedStateFromProps(nextProps, state) {
        let store = nextProps.store;
        let storeData = store.getState();

        if (nextProps && storeData) {
            state.tileCount = storeData.fp.tileCount;
            state.selectedStateMatrix = storeData.fp.selectedStateMatrix;
            state.celebration = storeData.fp.celebration;
            return state;
        }
        return null;
    }

    _flipTile(row, col) {
        if (this.props.store !== undefined) {
            this.props.store.dispatch(toggleFlipTile(row, col));
        }
    }

    _generateMatrixDivs() {
        let store = this.props.store;
        let storeData = store.getState();
        let stateMatrix = storeData.fp.selectedStateMatrix;

        if (stateMatrix !== undefined) {
        return stateMatrix.map((line, indexRow) => {
            return (
                <div className={styles.matrixLine} key={indexRow}>
                    {
                        line.map((card, indexColumn) => {
                            let cardElm = (
                                <Card key={`${indexRow}-${indexColumn}`}
                                      row={indexRow}
                                      col={indexColumn}
                                      url={stateMatrix[indexRow][indexColumn].url}
                                      imgId={stateMatrix[indexRow][indexColumn].imgId}
                                      isFlipped={card.flipped}
                                      flip={() => this._flipTile(indexRow, indexColumn)}/>
                            );
                            return cardElm;
                        })
                    }
                </div>
            );
        });
        }
    }


    render() {
        let cards = this._generateMatrixDivs();
        let celebrate;
        if (this.state.celebration) {
            celebrate = (<Celebration/>);
        }
        return (
            <div className={styles.container}>
                {celebrate}
                <ControlPanel store={this.props.store} />
                <div className={styles.cardsContainer}>
                    {cards}
                </div>
            </div>
        );
    }
}

export default  connect(mapStateToProps) (PlayBoard);