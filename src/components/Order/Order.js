import React from 'react';
import classes from './Order.module.css';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';
import burgerLogo from '../../assets/images/burger-logo.png';

const Order = props => {
    const ingredients = [];

    //formating the received data
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const IngredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 7px ',
                    padding: '5px',
                    color: '#EB9F31',
                    fontSize: '0.7rem',
                    fontWeight: '400'
                }}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <div className={classes.OrderLogo}>
                <img src={burgerLogo} alt="BurgerBuilder" />
            </div>

            <div className={classes.OrderInfo}>
                {/* <p className={classes.OrderIngredients}>Ingredients: {IngredientOutput}</p> */}
                    <p className={classes.OrderIngredients}>Ingredients:</p>
                        {IngredientOutput}


                
                <p className={classes.OrderPrice}>Price: <strong> USD {Number.parseFloat(props.price.toFixed(2))} </strong></p>
            </div>
        </div>
    )
}

export default Order;
