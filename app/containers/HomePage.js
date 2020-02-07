// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { read } from '../actions';
import Popup from 'reactjs-popup';

import AddDlg from '../components/AddDlg';
import Footer from '../components/Footer';

const { ipcRenderer } = window.require('electron');

const currencies = ['usd','eur','gbp'];
const rating = [1,1 , 1];
class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      currency: 0,
      addDlg: false,
      data:[]
    }

    this.changeCurrency = this.changeCurrency.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }
  componentDidMount(){
    this.props.read();
 
  }
  componentWillReceiveProps(nextProp){
    this.setState({
      data: nextProp.data
    })
  }
  changeCurrency(){
    const curr = (this.state.currency + 1) % 3;
    this.setState({
      currency: curr
    });
  }
  save(data){
    ipcRenderer.send('addData', data);
    let dt = [...this.state.data];
    dt.push(data);
    this.setState({
      data: dt,
      addDlg: false
    })
  }
  delete(index){
    ipcRenderer.send('deleteData', index);
    var data = [...this.state.data]; 
    data.splice(index, 1);
    this.setState({data: data});
  }
  render() {
    const data = this.state.data;
    const currency = this.state.currency;
    let tSpent = 0,
        tFees = 0,
        tRevenue = 0,
        tProfit = 0;

    for(let i = 0 ; i < data.length; i ++){
      tSpent += data[i].spent;
      tFees += data[i].fees;
      tRevenue += data[i].revenue;
      tProfit += data[i].profit;
    }
    return (
      <div className='HomeContainer'>
       <table >
         <thead>
          <tr>
              <th style={{width:'35%'}}>Item:</th>
              <th style={{width:'15%'}}>Spent:</th>
              <th style={{width:'18%'}}>Fees & Shipping:</th>
              <th style={{width:'14%'}}>Revenue:</th>
              <th style={{width:'13%'}}>Profit:</th>
              <th style={{width:'5%'}}> </th>
          </tr>
         </thead>
         <tbody>
         {
            data.map((e,index)=>(
              <tr key={index}>
                <td style={{width: '35%'}}>
                   <div className='td-item'> {e.item } </div> 
                </td>
                <td style={{width:'15%'}}>
                  <div className='td-item'> {Math.floor(e.spent * rating[currency])} </div>
                </td>
                <td style={{width:'18%'}}> 
                  <div className='td-item'> {Math.floor(e.fees * rating[currency])} </div> 
                </td>
                <td style={{width:'14%'}}> 
                  <div className='td-item'>{Math.floor(e.revenue * rating[currency])} </div>
                </td>
                <td style={{width:'13%'}}> 
                  <div className='td-item'> {Math.floor(e.profit * rating[currency])} </div>
                </td>
                <td style={{width:'5%'}}>
                  <div className='td-item' style={{cursor:'pointer'}}
                    onClick={()=> this.delete(index)}>
                    X
                  </div>
                </td>
              </tr>
            ))
          }
         </tbody>
        </table>
        <div style={{display:'flex',float: 'right', paddingRight: '15px'}}>
          <p style={{marginRight:'10px', cursor:'pointer'}} onClick={this.changeCurrency}>Change Currency</p>
          <p style={{cursor:'pointer'}} onClick={()=>this.setState({addDlg: true})}>Add Item</p>
        </div>
        <Footer 
          currency = {this.state.currency}
          tSpent = {tSpent}
          tFees = {tFees}
          tRevenue = {tRevenue}
          tProfit = {tProfit}
        />
        <Popup open={this.state.addDlg} closeOnDocumentClick={false}>
          <AddDlg 
            closeDlg={()=>this.setState({addDlg: false})}
            save={(data) => this.save(data)}/>
				</Popup>
      </div>
      );
  }
}

const mapStateToProps = state => ({
  data: state.data.data
});

const mapDispatchToProps = dispatch => ({
  read: () => dispatch(read())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
