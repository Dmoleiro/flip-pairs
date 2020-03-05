import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/timer.module.css';
import {FINISHED, HALTED, STARTED, RESET} from '../constants/gameStates';

const mapStateToProps = (state, ownProps) => {
  return {
    gameState: state.fp.gameState,
    tileCount: state.fp.tileCount
  };
};
class Timer extends Component {
    constructor(props) {
        super(props);

        this.state={
          tileCount: this.props.store.getState().fp.tileCount
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            millis: 0,
            timer: undefined,
            running: false,
        });

    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.state.timer === undefined &&
            (this.props.store.getState().fp.gameState === STARTED || 
            this.props.store.getState().fp.gameState === RESET)) {
        this.toggleTimer();
      } else if (this.state.timer !== undefined && this.state.running &&
          (this.props.store.getState().fp.gameState === HALTED || 
          this.props.store.getState().fp.gameState === FINISHED)) {
          this.pauseTimer();
      } else if (this.state.timer !== undefined && this.state.running === false &&
          this.props.store.getState().fp.gameState === STARTED) {
          this.resumeTimer();
      } else if (this.state.timer !== undefined && this.state.running === false &&
          this.props.store.getState().fp.gameState === RESET) {
          this.resetTimer();
      }
    }

    static getDerivedStateFromProps(nextProps, state) {
        let nextStore = nextProps.store;
        let nextStoreData = nextStore.getState();

        if (state && nextStoreData) {
            state.gameState = nextProps.store.getState().fp.gameState;
            if (nextStoreData.fp.tileCount !== state.tileCount){
              state.resetTime = true;
              state.tileCount = nextStoreData.fp.tileCount;
            }
            
            return state;
        }
        return null;
    }

    resetTimer() {
      clearInterval(this.state.timer);
      this.setState({
        ...this.state,
        millis: 0,
        timer: undefined,
        running: false,
    });
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
        let interval = 100;
        timerFunc = setInterval(() => this.updateMillis(interval),interval);
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
        let millis = this.state.resetTime ? 0 : this.state.millis;
        this.setState({
            ...this.state,
            running: true,
            millis,
            resetTime: false,
        });
    }


    updateMillis(elapsedMs) {
        if (this.state.running){
            let millis = this.state.millis + elapsedMs;
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
