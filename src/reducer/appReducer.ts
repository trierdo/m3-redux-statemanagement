import { initial, IState } from '../state/appState'
import { IWindow } from '../framework/IWindow'
import { IAction, ActionType } from '../framework/IAction'
import { IProduct, IproductAction, IUserAction } from '../App';

declare let window: IWindow;

export const reducer = (state = initial, action: IAction) => {
    window.CS.log("2. ACTION:" + action.type);
    let newState: IState = state;
    newState = JSON.parse(JSON.stringify(state)) as IState;
    newState.UI.counter = state.UI.counter + 1;
    switch (action.type) {
        case ActionType.INIT:
            return newState;

        case ActionType.create_product:
            const createAction = action as IproductAction
            newState.BM.products.push(createAction.product);
            return newState;

        case ActionType.login:
            const loginAction = action as IUserAction;
            newState.UI.credentials.user = loginAction.credentials.user;
            newState.UI.credentials.password = loginAction.credentials.password;
            newState.UI.loggedIn = true;
            return newState;

            case ActionType.logout:
                    newState.UI.credentials.user = '';
                    newState.UI.credentials.password = '';
                    newState.UI.loggedIn = false;
                    return newState;

        case ActionType.update_product:
            let updateAction = action as IproductAction;
            let productToChange: IProduct[] = newState.BM.products.filter(product => product._id === updateAction.product._id)
            console.log(productToChange);
            productToChange[0].product_name = updateAction.product.product_name;
            productToChange[0].product_value = updateAction.product.product_value;
            productToChange[0].product_amount = updateAction.product.product_amount;
            productToChange[0].product_totalPrice = updateAction.product.product_totalPrice;
            productToChange[0].edit_mode = updateAction.product.edit_mode;
            return newState;

        case ActionType.delete_product:
            console.log("Delete Action");
            let deleteAction = action as IproductAction;
            let productsToKeep: IProduct[] = newState.BM.products.filter(product => product._id !== deleteAction.product._id)
            newState.BM.products = productsToKeep;
            return newState;

        default:
            window.CS.log("1. Error!!!!! no reducer defined");
            return newState;
    }
}

