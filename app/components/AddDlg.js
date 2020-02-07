// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './AddDlg.css';

const { ipcRenderer } = window.require('electron');


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: '',
            spent: 0,
            fees: 0,
            revenue: 0,
            profit: 0
        };
        this.save = this.save.bind(this);
    }
    save(){
        console.log(this.state)
        if(this.state.item !== '')
            this.props.save(this.state);
        else
            alert('Item name cannot be empty.');
    }
    render() {
        return (
            <div className={styles.container} >
                <div style={{display:'flex'}}>
                    <p className={styles.text}>Item:</p>
                    <input style={{marginLeft:'10px'}} 
                        value={this.state.item}
                        onChange={(e)=> this.setState({item: e.target.value})}/>
                </div>
                <div style={{display:'flex'}}>
                    <p className={styles.text}>Spent:</p>
                    <input  style={{marginLeft:'10px'}} type="number"
                        value={this.state.spent}
                        onChange={(e)=> this.setState({spent: parseFloat(e.target.value)})}/>
                </div>
                <div style={{display:'flex'}}>
                    <p className={styles.text}>Fees & Shipping:</p>
                    <input  style={{marginLeft:'10px'}} type="number"
                        value={this.state.fees}
                        onChange={(e)=> this.setState({fees: parseFloat(e.target.value)})}/>
                </div>
                <div style={{display:'flex'}}>
                    <p className={styles.text}>Revenue:</p>
                    <input  style={{marginLeft:'10px'}} type="number"
                        value={this.state.revenue}
                        onChange={(e)=> this.setState({revenue: parseFloat(e.target.value)})}/>
                </div>
                <div style={{display:'flex'}}>
                    <p className={styles.text}>Profit:</p>
                    <input style={{marginLeft:'10px'}} type="number"
                        value={this.state.profit}
                        onChange={(e)=> this.setState({profit: parseFloat(e.target.value)})}/>
                </div>

                <div style={{display:'flex',justifyContent: 'space-evenly', marginLeft: '200px'}}>
                    <p className={styles.button} onClick={this.save}> Save </p>
                    <p className={styles.button} onClick={this.props.closeDlg}> Cancel</p>          
                </div>
            </div>
        );
    }
}
