import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/timer.module.css';
import {FINISHED, HALTED, STARTED, RESET} from '../constants/gameStates';
import {startTimer} from '../actions/layoutActions';

const mapStateToProps = (state, ownProps) => {
  return {
    gameState: state.fp.gameState,
  };
};
class Timer extends Component {
    constructor(props) {
        super(props);

        this.state={};
    }

    componentDidMount() {
        let store = this.props.store;
        let storeData = store.getState();

        this.setState({
            ...this.state,
            gameState: storeData.fp.gameState,
            millis: 0,
            timer: undefined,
            running: false,
        });

    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.state.timer === undefined &&
            this.props.store.getState().fp.gameState === STARTED) {
        this.toggleTimer();
      } else if (this.state.timer !== undefined && this.state.running &&
          (this.props.store.getState().fp.gameState === HALTED || this.props.store.getState().fp.gameState === FINISHED)) {
          this.pauseTimer();
      } else if (this.state.timer !== undefined && this.state.running === false &&
          this.props.store.getState().fp.gameState === STARTED) {
          this.resumeTimer();
      } else if (this.state.timer !== undefined && this.state.running === true &&
          this.props.store.getState().fp.gameState === RESET) {
          this.setState({
              ...this.state,
              timer: undefined,
              running: false,
          });
          this.toggleTimer();
          this.props.store.dispatch(startTimer);
      }
    }

    static getDerivedStateFromProps(nextProps, state) {
        let store = nextProps.store;
        let storeData = store.getState();

        if (nextProps && storeData) {
            state.gameState = nextProps.store.getState().fp.gameState;
            return state;
        }
        return null;
    }

    toggleTimer() {
      let timerFunc = undefined;
      clearInterval(this.state.timer);
      if (this.state.timer) {
          this.setState({
              ...this.state,
              timer: undefined,
              running: false,
          });
      } else {
        let startTime = new Date();
        timerFunc = setInterval(() => this.updateMillis(startTime),1);
      }
      this.setState({
        ...this.state,
        timer: timerFunc,
        running: true,
      });
    }

    pauseTimer() {
        this.setState({
            ...this.state,
            running: false,
        });
    }

    resumeTimer() {
        this.setState({
            ...this.state,
            running: true,
        });
    }


    updateMillis(startTime) {
        if (this.state.running){
            let currTime = new Date();
            let millis = currTime - startTime;

            this.setState({
                ...this.state,
                millis,
            });
        }
    }

    msToTime(duration) {
      let seconds = duration === 0 ? 0 : parseInt((duration/1000)%60)
          , minutes = duration === 0 ? 0 : parseInt((duration/(1000*60))%60)
          , hours = duration === 0 ? 0 : parseInt((duration/(1000*60*60))%24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    }

    render() {
      return (
        <div className={styles.timer}>
          <div>{this.msToTime(this.state.millis)}</div>
        </div>
      );
    }
}
export default connect(mapStateToProps)(Timer);
