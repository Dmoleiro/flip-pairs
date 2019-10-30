import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/playBoard.module.css';
// components
import Card from '../components/card';
import ControlPanel from '../components/controlPanel';
//actions
import {setTileCount, toggleFlipAllTiles} from "../actions/layoutActions";

const mapStateToProps = (state, ownProps) => {
    return {tileCount: state.fp.tileCount};
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
            tileCount: storeData.fp.tileCount
        });
    }

    static getDerivedStateFromProps(nextProps, state) {
        let store = nextProps.store;
        let storeData = store.getState();

        if (nextProps && storeData) {
            state.tileCount = storeData.fp.tileCount;
            return state;
        }
        return null;
    }
    _setTileCount(tileCount, store) {
        if (store !== undefined && tileCount > 0) {
            store.dispatch(setTileCount(tileCount));
        }
    }
    _flip() {
        if (this.props.store !== undefined) {
            this.props.store.dispatch(toggleFlipAllTiles());
        }
    }

    _generateMatrixDivs() {
        let store = this.props.store;
        let storeData = store.getState();
        let stateMatrix = storeData.fp.selectedStateMatrix;

        return stateMatrix.map((line, index) => {
           return (
               <div className={styles.matrixLine} key={index}>
                   {
                       line.map((card, index) => {
                       card = (
                           <Card idx={index} key={index} isFlipped={false} flip={() => this._flip()}/>
                       );
                       return card;
                    })
                   }
               </div>
           );
        });
    }


    render() {
        let cards = this._generateMatrixDivs();
        return (
            <div className={styles.container}>
                <ControlPanel store={this.props.store} />

                {cards}
            </div>
        );
    }
}

export default  connect(mapStateToProps) (PlayBoard);