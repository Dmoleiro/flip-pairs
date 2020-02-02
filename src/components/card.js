import React, {Component} from 'react';
import styles from '../styles/card.module.css';
//

class Card extends Component {
    render() {
        let imgUrl = this.props.url;
        return (
            <div id={`${this.props.row}-${this.props.col}`} className={styles.cardContainer} onClick={() => this.props.flip()}>
                <div className={styles.scene}>
                    <div className={`${styles.card}  ${this.props.isFlipped ? styles.isFlipped : ''}`}>
                        <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>
                        </div>
                        <div className={`${styles.cardFace} ${styles.cardFaceBack}`}>
                            <img className={styles.cardImg} alt={`${this.props.row}-${this.props.col}`} src={imgUrl}></img>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
