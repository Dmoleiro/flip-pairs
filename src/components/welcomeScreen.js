import React, {Component} from 'react';
import styles from '../styles/welcomeScreen.module.css';

class WelcomeScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            let doc = window.document;
            if (doc !== null && doc !== undefined) {
                doc.body.style.overflowY = 'auto'
            }
        }, 2100);
    }

    render() {
        return (
            <div className={styles.welcomeContainer} id="welcomeScreen">
                <section>
                    <img className={styles.logo} alt='logo' src={process.env.PUBLIC_URL + '/assets/logo.svg'}/>
                </section>
            </div>
        );
    }
}

export default WelcomeScreen;