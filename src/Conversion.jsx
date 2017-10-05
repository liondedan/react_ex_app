import React, { Component } from 'react';
import axios from 'axios';
var NumberFormat = require('react-number-format');
 
class Conversion extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	isReversed: false
    };

    this.requestData = this.requestData.bind(this);
  }

  componentDidMount() {
    this.requestData();
  }

  requestData() {
  	axios.all([this.getX(), this.getY()])
      .then(axios.spread( (xVal, yVal) => { 
        const x = xVal.data.rates.GBP;
        const y = yVal.data.bpi.USD.rate_float;
        const xOfy = this.xOfy(x, y);
        const yOfX = this.yOfX(y, x);
        const timeStamp = yVal.data.time.updateduk;
        this.setState({timeStamp, x, y, xOfy, yOfX});
      }));
  }

  getX() {
  	/* Currency/USD */
    return axios.get('https://openexchangerates.org/api/latest.json?app_id=c7b9b67bc887419eaf6b923ef492d216');
  }

  getY() {
  	/* Bitcoin/USD*/
    return axios.get('https://api.coindesk.com/v1/bpi/currentprice/XBT.json');
  }

  /* 1 unit of X: #Y can be bought */
	xOfy(unit, value) {
		return 1 / (unit * value);
	}

	/* 1 unit of Y: #X can be bought */
	yOfX(unit, value) {
	  return unit * value;
	}
 
  render() {
  	/* Format Values */
  	let xOfy = <NumberFormat value={this.state.xOfy} displayType={'text'} decimalPrecision={5} thousandSeparator={true}  />
  	let yOfX = <NumberFormat value={this.state.yOfX} displayType={'text'} decimalPrecision={2} thousandSeparator={true}  />

    return (	
    	<div>
	      <div className="xe">
          <div className="xe-inner">
						<p className="xe-inner-tstamp text-centre">{this.state.timeStamp} <a href="" onClick={this.requestData}>refresh</a></p>
            <h4 className="text-centre xe-inner-header">GBP/XBT:Cur</h4>
            <p className="text-centre xe-inner-info">1 GBP is worth:</p>
            <h1 className="text-centre xe-inner-val">{xOfy} BTC</h1>
            <p className="text-centre xe-inner-single">@ £{yOfX} per BTC</p>
          </div>
        </div>
	    </div>
    );
  }
};
 
export default Conversion;