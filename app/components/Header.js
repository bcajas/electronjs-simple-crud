// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Header.css';

const { ipcRenderer } = window.require('electron');


export default class Header extends Component {

  minimize(){
    ipcRenderer.send('minimizeWindow');
  }
  close(){
    ipcRenderer.send('closeWindow');
  }

  render() {
    return (
      <div className={styles.container} >
        <p> LOGO HERE</p>
        <div className={styles.btnContainer}>
          <p onClick={this.minimize} style={{marginRight:'10px', fontSize:'30px', marginTop: '-10px'}}> - </p>
          <p onClick={this.close} style={{fontWeight:'bold'}}> X </p>
        </div>
      </div>
    );
  }
}
