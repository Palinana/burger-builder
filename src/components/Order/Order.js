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
                    border: '1px solid #ccc',
                    padding: '5px'
                }}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {IngredientOutput}</p>
            <p>Price: <strong> USD {Number.parseFloat(props.price.toFixed(2))} </strong></p>
        </div>
    )
}

export default Order;
