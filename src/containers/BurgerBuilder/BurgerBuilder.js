import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }    

    //checks if the order button should be disabled
    updatePurchaseState(ingredients) {
        //if sum === 0 -> disable
        const sum = Object.keys(ingredients)
          .map(igKey => {
            return ingredients[igKey];
          })
          .reduce((sum, el) => {
            return sum + el;
          }, 0);
        return sum > 0;
    }

    // triggered whenever order now button is clicked
    purchaseHandler = () => {
          this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout'
        });
    };

    render() {
        console.log('props ', this.props)
        //copy of the original ingred list (to disable buttons if ingred are === 0)
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            //what button should be disabled
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? (
            <p>Ingredients couldn't be loaded</p>
            ) : (
            <Spinner />
        );

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        error: state.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.fetchIngredients()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(
    WithErrorHandler(BurgerBuilder, axios)
);