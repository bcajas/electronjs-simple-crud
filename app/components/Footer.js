// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Footer.css';

type Props = {};

const rating = [1,0.91,0.77];
export default class Footer extends Component<Props> {
  props: Props;

  render() {
    const currency = this.props.currency;
    let curr= '$';
    switch(currency){
      case 0:
        curr='$';
        break;
      case 1:
        curr='€';
        break;
      case 2:
        curr='£';
        break;
      default:
        break;
    }
    return (
      <div className={styles.container} >
        <div className={styles.imgContainer}>
            <div className={styles.imgBlock}>
                <h4 style={{textAlign:'center'}}>IMAGE HERE</h4>
            </div>
            <div className={styles.imgBlock}>
                <h4 style={{textAlign:'center'}}>IMAGE HERE</h4>
            </div>
        </div>
        <div className={styles.staticContainer}>
            <div className={styles.staticBlock}>
                <h6>SPENT:</h6>
                <h2>{curr}{(this.props.tSpent * rating[currency])}</h2>
            </div>
            <div className={styles.staticBlock}>
                <h6>FEES & SHIPPING:</h6>
                <h2>{curr}{Math.floor(this.props.tFees * rating[currency])}</h2>
            </div>
            <div className={styles.staticBlock}>
                <h6>TOTAL REVENUE:</h6>
                <h2>{curr}{(this.props.tRevenue * rating[currency])}</h2>
            </div>
            <div className={styles.staticBlock}>
                <h6>TOTAL PROFIT:</h6>
                <h2>{curr}{ (this.props.tProfit * rating[currency]).toFixed(0)}</h2>
            </div>
        </div>
    
      </div>
    );
  }
}
