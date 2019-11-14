import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/controlPanel.module.css';
import {setTileCount} from "../actions/layoutActions";
import {SIX_BY_SIX, TWO_BY_TWO, FOUR_BY_FOUR} from "../constants/gameComplexities";

const mapStateToProps = (state, ownProps) => {
    return {tileCount: state.fp.tileCount};
};

class ControlPanel extends Component {
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

    render() {
        let store = this.props.store;
        let storeData = store.getState();
        let tileCount = storeData.fp.tileCount;

        return (
            <div className={styles.controlPanelContainer}>
                <div className={styles.box}>
                    <div className={styles.title}>Choose Game Complexity</div>
                    <input type="radio" id="radio1" name="radio1" onClick={() => this._setTileCount(TWO_BY_TWO, this.props.store)} defaultChecked={tileCount === TWO_BY_TWO}/>
                    <label htmlFor="radio1">{TWO_BY_TWO}</label>
                    <input type="radio" id="radio2" name="radio1" onClick={() => this._setTileCount(FOUR_BY_FOUR, this.props.store)} defaultChecked={tileCount === FOUR_BY_FOUR}/>
                    <label htmlFor="radio2">{FOUR_BY_FOUR}</label>
                    <input type="radio" id="radio3" name="radio1" onClick={() => this._setTileCount(SIX_BY_SIX, this.props.store)} defaultChecked={tileCount === SIX_BY_SIX}/>
                    <label htmlFor="radio3">{SIX_BY_SIX}</label>
                    <div className={styles.reload}>reload</div>
                </div>
            </div>
        );
    }
}

export default  connect(mapStateToProps) (ControlPanel);