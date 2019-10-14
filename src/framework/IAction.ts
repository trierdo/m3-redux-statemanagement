export enum ActionType {
    INIT = "@@INIT",
    create_product = "create_product",
    update_product = "update_product",
    delete_product = "delete_product",
    render_test = "render_test" ,
    login = "login",
    logout = "logout"
}
export interface IAction {
    type: ActionType;
}
