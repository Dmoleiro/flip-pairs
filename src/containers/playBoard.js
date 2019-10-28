import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from '../styles/playBoard.module.css';
// components
import Card from '../components/card';
import ControlPanel from '../components/controlPanel';
//actions
import {setTileCount} from "../actions/layoutActions";

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

    render() {
        let store = this.props.store;
        let storeData = store.getState();
        let tileCount = storeData.fp.tileCount;

        let cards = new Array(tileCount);
        cards.fill('');

        cards = cards.map((card, index) => {
            card = (
                <Card idx={index} key={index}/>
            );
            return card;
        });

        for (let i =0; i < cards.length; i++) {

        }
        return (
            <div className={styles.container}>
                <ControlPanel store={this.props.store} />

                {cards}
            </div>
        );
    }
}

export default  connect(mapStateToProps) (PlayBoard);