import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
      state = {
        ingredients: null,
        totalPrice: 0
    };

    //before render child component will have access to the props and change data format
    componentWillMount() {
        //data that comes from Burger component through 'search'
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;

        for (let param of query.entries()) {
            //['Bacon', '1']
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        console.log('price ', price)

        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={`${this.props.match.url}/contact-data`}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        )
    }
}

export default Checkout;
