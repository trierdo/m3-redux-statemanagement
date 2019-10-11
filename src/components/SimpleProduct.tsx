import React from 'react';
import { IProduct, IproductAction } from '../App';
import { ActionType, IAction } from '../framework/IAction';

import { IWindow } from '../framework/IWindow';
declare let window: IWindow;

//this file defines the React component that renders a single product to the browser window
//it also contains the logic to change product properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
    edit: boolean;
    product: IProduct;
}

interface IState {
    edit_mode: boolean;
}


export default class SimpleProduct extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRerenderTest = this.handleRerenderTest.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            edit_mode: props.edit,
        }

    }

    render() {

        const currentIndex: number = 
        window.CS.getBMState().products.findIndex(product => this.props.product._id === product._id);
        //if the component is in edit mode, it will render different than if it just shows the data

        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.props.product.product_name} onChange={this.handleNameChange} /></td>
                    <td><input type="number" name="value" value={this.props.product.product_value} onChange={this.handleValueChange} /> €</td>
                    <td><input type="number" name="value" value={window.CS.getBMState().products[currentIndex].product_amount} onChange={this.handleAmountChange} /></td>
                    <td>{window.CS.getBMState().products[currentIndex].product_totalPrice} €</td>
                    <td>
                        <button onClick={this.handleSave} id={this.props.product._id}>save</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter</button>
                    </td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.props.product.product_name}</td>
                    <td>{this.props.product.product_value} €</td>
                    <td>{window.CS.getBMState().products[currentIndex].product_amount}</td>
                    <td>{window.CS.getBMState().products[currentIndex].product_totalPrice} €</td>
                    <td>
                        <button onClick={this.handleSwitchToEditMode}>edit</button>
                        <button onClick={this.handleDelete} id={this.props.product._id}>sell or dispose</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter {window.CS.getUIState().counter}</button>
                    </td>
                </tr>
            )
    }
    handleSwitchToEditMode() {
        this.setState({ edit_mode: true });
    }

    handleNameChange(event: any) {
        const newproduct = this.props.product;
        newproduct.product_name =  event.target.value
        const action: IproductAction = {
            type: ActionType.update_product,
            product: newproduct
        }
        window.CS.clientAction(action);
    }
    handleValueChange(event: any) {
        const newproduct = this.props.product;
        newproduct.product_value = event.target.value;
        const action: IproductAction = {
            type: ActionType.update_product,
            product: newproduct
        }
        window.CS.clientAction(action);
    }

    handleAmountChange(event: any) {

    }
    
    handleSave(event: any) {
        this.setState({ edit_mode: false });
    }
    handleDelete() {
        const action: IproductAction = {
            type: ActionType.delete_product,
            product:this.props.product
        }
        window.CS.clientAction(action)
    }
    handleRerenderTest(event: any) {
        const action: IAction = {
            type: ActionType.render_test,
        }
        window.CS.clientAction(action);
    }
}