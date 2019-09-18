import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    onion: 0.4,
    tomato: 0.5
}

class BurgerBuilder extends Component {
    state = {
        purchaseable: false,
        ingredients: null,
        // ingredients: {
        //     tomato: 0,
        //     onion: 0,
        //     cheese: 0,
        //     meat: 0,    
        //     salad: 0,
        // },
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://burger-builder-c8bc7.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(err => {
                this.setState({ error: true });
            })
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
        this.setState({ purchasable: sum > 0 });
        // return sum > 0;
      }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
        ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        //passing updated state for order button check
        this.updatePurchaseState(updatedIngredients);
    };
    
    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
        ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        //passing updated state for order button check
        this.updatePurchaseState(updatedIngredients);
    };
    
    // triggered whenever order now button is clicked
    purchaseHandler = () => {
          this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'John'
            }
        }
        axios.post('/orders', order)
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false });
            })
    };

    render() {
        //copy of the original ingred list (to disable buttons if ingred are === 0)
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            //what button should be disabled
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        // checking for data to load
        let orderSummary = null;
        let burger = this.state.error ? (
            <p>Ingredients Couldn't Be Loaded</p>
            ) : (
            <Spinner />
        );

        if (this.state.ingredients) {
            orderSummary = (
                <Order
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
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

export default WithErrorHandler(BurgerBuilder, axios);
