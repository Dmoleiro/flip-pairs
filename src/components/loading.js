import React, {Component} from 'react';
import styles from '../styles/loading.module.css';
//

class Loading extends Component {
    render() {
        let imgUrl = this.props.url;
        return (
            <div>
                loading
            </div>
        );
    }
}

export default Loading;