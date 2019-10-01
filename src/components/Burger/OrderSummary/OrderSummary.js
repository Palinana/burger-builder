import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

class OrderSummary extends Component {
  //This could be a functional component, does not have to be a class

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
            {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
            <h3 className={classes.OrderSummaryTitle}>Your Order</h3>
            <p className={classes.OrderSummarySubTitle}>A delicious burger with the following ingredients:</p>
            <ul className={classes.OrderSummaryList}>{ingredientSummary}</ul>
            <p>
                <strong className={classes.OrderSummaryTotal}>Total Price: {this.props.price.toFixed(2)}</strong>
            </p>
            <p  className={classes.OrderSummaryText}>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>
                CONTINUE
            </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
