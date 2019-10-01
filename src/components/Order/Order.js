import React from 'react';
import classes from './Order.module.css';
import Aux from '../../hoc/Aux/Aux';
import Button from '../UI/Button/Button';

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
                    padding: '5px'
                }}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p className={classes.OrderIngredients}>Ingredients: {IngredientOutput}</p>
            <p className={classes.OrderPrice}>Price: <strong> USD {Number.parseFloat(props.price.toFixed(2))} </strong></p>
        </div>
    )
}

export default Order;
