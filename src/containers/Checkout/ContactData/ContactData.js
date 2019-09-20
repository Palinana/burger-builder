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
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your mail'
                },
                value: '',
                validation: {
                    required: true,
                    touched: false
                },
                valid: false,
                touched: false
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
                validation: {},
                valid: true
            }
        },
        loading: false
    }

    orderHandler = e => {
        e.preventDefault();
        
        this.setState({ loading: true });
        const formData = {};
        /*email, name, country and so on... -> [country]: USA */
        for (let formElIdentifier  in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (e, inputIdentifier) => {
        //deep cloning of the state

        //clone of the original state and not refering to it anymore
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //cloning nested objects - just field names(keys), not deeper
        const updatedFormEl = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormEl.value = e.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation)

        updatedOrderForm[inputIdentifier] = updatedFormEl;
        console.log('updatedOrderForm ', updatedOrderForm)
        this.setState({
            orderForm: updatedOrderForm
        });
    }

    checkValidity(value, rules) {
        //in order to not override validation result with every check as going down
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formEl => (
                    <Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={e => this.inputChangedHandler(e, formEl.id)}
                        // invalid={!formEl.config.valid}
                        // shouldValidate={formEl.config.validation}
                        // touched={formEl.config.touched}
                    />
                ))}
                <Button btnType="Success">ORDER</Button>
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
