import React from 'react';
import SimpleProduct from './components/SimpleProduct'
import mongoose from 'mongoose';
import { IAction, ActionType } from './framework/IAction';
import { IWindow } from './framework/IWindow'
declare let window: IWindow;

interface IProps {
  stateCounter: number
}
export interface IProduct {
  _id: string;
  product_name: string;
  product_value: number;
  product_amount: number;
  product_totalPrice: number;
}

interface IState {
}

export interface IproductAction extends IAction {
  product: IProduct
}

export default class App extends React.PureComponent<IProps, IState> {

  constructor(props: any) {
    console.log("new App component will be initialized");
    super(props);

    this.handleCreateproduct = this.handleCreateproduct.bind(this);
  }

  render() {
    window.CS.log("App --> render()")
    return (
      <div>
        <p> {window.CS.getUIState().counter}</p>
        <h1>simple product management application</h1>
        <p>to create a new product click this button:&nbsp;
          <button onClick={this.handleCreateproduct}>create product</button>
        </p>
        <table>
          <tbody>
            <tr>	
              <th>description</th>
              <th>value</th>
              <th>amount</th>
              <th>total Price</th>
              <th>action</th>
            </tr>
            {window.CS.getBMState().products.map(product => <SimpleProduct key={product._id} product={product} edit={false} />)}
          </tbody>
        </table>
      </div>
    );
  }

  handleCreateproduct() {
    console.log("handleCreateproduct invoked");
    const newproduct: IProduct = {
      _id: mongoose.Types.ObjectId().toString(),
      product_name: "",
      product_value: 0,
      product_amount: 1,
      product_totalPrice: 0
    }
    const action: IproductAction = {
      type: ActionType.create_product,
      product: newproduct
    }
    window.CS.clientAction(action);
  }
}
