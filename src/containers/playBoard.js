import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/playBoard.module.css';
// components
import Card from '../components/card';
import ControlPanel from '../components/controlPanel';
import Timer from '../components/timer';
//actions
import {toggleFlipTile, toggleControlPanelVisibility} from "../actions/layoutActions";
import Celebration from "../components/celebration";

const mapStateToProps = (state, ownProps) => {
    return {
        tileCount: state.fp.tileCount,
        selectedStateMatrix: state.fp.selectedStateMatrix,
        celebration: state.fp.celebration,
        showControlPanel: state.fp.showControlPanel,
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
            showControlPanel: storeData.fp.showControlPanel,
        });
    }

    static getDerivedStateFromProps(nextProps, state) {
        let store = nextProps.store;
        let storeData = store.getState();

        if (nextProps && storeData) {
            state.tileCount = storeData.fp.tileCount;
            state.selectedStateMatrix = storeData.fp.selectedStateMatrix;
            state.celebration = storeData.fp.celebration;
            state.showControlPanel = storeData.fp.showControlPanel;
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
        let controlPanel;
        if (this.state.showControlPanel) {
          controlPanel = (<ControlPanel store={this.props.store} />);
        }
        let celebrate;
        if (this.state.celebration) {
            celebrate = (<Celebration/>);
        }
        return (
            <div className={styles.container}>
                {celebrate}
                {controlPanel}
                <div className={styles.topBar}>
                  <Timer store={this.props.store}/>
                  <img className={styles.settingsCog} alt='cog' src={process.env.PUBLIC_URL + '/assets/settings.svg'} onClick={() => this.props.store.dispatch(toggleControlPanelVisibility())}/>
                </div>
                <div className={styles.cardsContainer}>
                    {cards}
                </div>
            </div>
        );
    }
}

export default  connect(mapStateToProps) (PlayBoard);
