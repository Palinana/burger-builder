import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'ZIP CODE'
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Your mail'
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                  options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                  ]
                },
                value: 'fastest',
            }
        },
        loading: false
    }

    orderHandler = e => {
        e.preventDefault();
        
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'John',
                street: 'Main st 123',
                email: 'jojo@gmail.com'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formEl => (
                    <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        // changed={e => this.inputChangedHandler(e, formEl.id)}
                        // invalid={!formEl.config.valid}
                        // shouldValidate={formEl.config.validation}
                        // touched={formEl.config.touched}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Please Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
