import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/controlPanel.module.css';
import {resetTiles, setTileCount, toggleControlPanelVisibility} from "../actions/layoutActions";
import {SIX_BY_SIX, TWO_BY_TWO, FOUR_BY_FOUR, NOT_BY_NOT} from "../constants/gameComplexities";

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

    _resetMatrix(store) {
        if (store !== undefined) {
            store.dispatch(resetTiles());
        }
    }

    render() {
        let store = this.props.store;
        let storeData = store.getState();
        let tileCount = storeData.fp.tileCount;

        return (
            <div className={styles.modalBackground} onClick={() => this.props.store.dispatch(toggleControlPanelVisibility())}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.controlPanelContainer}>
                        <div className={styles.controlElement}>
                            <div className={styles.title}>Choose Game Complexity</div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.controlElement}>
                                <input type="radio" id="radio1" name="radio1" onClick={() => this._setTileCount(TWO_BY_TWO, this.props.store)} defaultChecked={tileCount === TWO_BY_TWO}/>
                                <label htmlFor="radio1">{TWO_BY_TWO}</label>
                            </div>

                            <div className={styles.controlElement}>
                                <input type="radio" id="radio2" name="radio1" onClick={() => this._setTileCount(FOUR_BY_FOUR, this.props.store)} defaultChecked={tileCount === FOUR_BY_FOUR}/>
                                <label htmlFor="radio2">{FOUR_BY_FOUR}</label>
                            </div>

                            <div className={styles.controlElement}>
                                <input type="radio" id="radio3" name="radio1" onClick={() => this._setTileCount(SIX_BY_SIX, this.props.store)} defaultChecked={tileCount === SIX_BY_SIX}/>
                                <label htmlFor="radio3">{SIX_BY_SIX}</label>
                            </div>
                        </div>
                        <div className={`${styles.controlElement} ${tileCount === NOT_BY_NOT ? styles.hidden : ''}`}>
                            <div className={styles.reset} onClick={() => this._resetMatrix(this.props.store)}>reset tiles</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect(mapStateToProps) (ControlPanel);
