import React, { Component } from 'react'

export default class CurrencyDiv extends Component {
    changeBtnBack=(event)=>{
        event.target.className==="currencyDivDown" ? event.target.className="currencyDiv" : event.target.className="currencyDivDown";
    }
    onClickHandler=()=>{
        this.props.changeVisibility();
        this.props.currencyUpdate(this.props.currencyLabel, this.props.currencySymbol);
    }
  render() {
    return (
      <div className="currencyDiv" onMouseDown={this.changeBtnBack} onMouseUp={this.changeBtnBack} onClick={this.onClickHandler}>
          {`${this.props.currencySymbol} ${this.props.currencyLabel} `}
      </div>
    )
  }
}
