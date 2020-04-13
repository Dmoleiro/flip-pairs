import React, {Component} from 'react';
import styles from '../styles/card.module.css';
//

class Card extends Component {
    constructor(props) {
        super(props);

        this.state={
            isFlipped: this.props.isFlipped
        };
    }

    render() {
        let imgUrl = this.props.url;
        return (
            <div id={`${this.props.row}-${this.props.col}`} className={styles.cardContainer} onClick={() => this.props.flip()}>
                <div className={styles.scene}>
                    <div className={`${styles.card}  ${this.props.isFlipped ? styles.isFlipped : ''}`}>
                        <div className={`${styles.cardFace} ${styles.cardFaceFront}`}>
                            <img className={styles.logoSmall} alt='logo' src={process.env.PUBLIC_URL + '/assets/logo_small.svg'}/>
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
