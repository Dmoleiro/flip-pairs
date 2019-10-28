import React, {Component} from 'react';
import styles from '../styles/card.module.css';
//

class Card extends Component {
    render() {
        return (
            <div className={styles.cardContainer}>
                <div className={styles.front}></div>
                <div className={styles.back}>
                    <img alt='image1' src='http://morestarwars.com/wp-content/uploads/2017/03/x-wing-gif.gif'></img>
                </div>
            </div>
        );
    }
}

export default Card;