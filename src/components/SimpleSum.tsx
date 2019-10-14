import React from 'react';
import { IProduct, IproductAction } from '../App';
import { ActionType, IAction } from '../framework/IAction';

import { IWindow } from '../framework/IWindow';
declare let window: IWindow;

interface IProps {
    products: IProduct[]
}

interface IState {
}

export default class SimpleSum extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.calculateTotalAmount = this.calculateTotalAmount.bind(this);
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this);
    }

    render() {
        return (
            <tr>
                <td>{this.props.products.length} Product(s)</td>
                <td></td>
                <td>Total Amount: {this.calculateTotalAmount()}</td>
                <td>Total Price: {this.calculateTotalPrice()} €</td>
                <td></td>
            </tr>
        )
    }


    calculateTotalAmount() {
        const productList: IProduct[] = window.CS.getBMState().products;
        return productList.reduce((acc, value) => {return acc+value.product_amount},0)
    }

    calculateTotalPrice() {
        const productList: IProduct[] = window.CS.getBMState().products;
        return productList.reduce((acc, value) => {return acc+value.product_totalPrice},0)
    }

}