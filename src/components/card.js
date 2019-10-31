import React, {Component} from 'react';
import styles from '../styles/card.module.css';
//

class Card extends Component {
    render() {
        return (
            <div id={`${this.props.row}-${this.props.col}`} className={styles.cardContainer} onClick={() => this.props.flip()}>
                <div className={`${this.props.isFlipped ? styles.frontFlipped : styles.front}`}></div>
                <div className={`${this.props.isFlipped ? styles.backFlipped : styles.back}`}>
                    <img alt='image1' src='http://morestarwars.com/wp-content/uploads/2017/03/x-wing-gif.gif' ></img>
                </div>
            </div>
        );
    }
}

export default Card;