import React, {Component} from 'react';
import styles from '../styles/celebration2.module.css';
import Particles from 'react-particles-js';
import { resetGame } from '../actions/layoutActions';

class Celebration2 extends Component {
    _resetGame(store) {
        if (store !== undefined) {
            store.dispatch(resetGame());
        }
    }
    
    render() {
        return (
            <div className={styles.celebrationContainer}>
                <Particles width='100vw' height='100vh'/>
                <div className={styles.celebrationText}>
                    Good Job
                </div>
                <div className={styles.reset} onClick={() => this._resetGame(this.props.store)}>Play Again</div>
            </div>
        );
    }
}

export default Celebration2;