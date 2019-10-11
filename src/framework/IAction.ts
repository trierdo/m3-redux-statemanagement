export enum ActionType {
    INIT = "@@INIT",
    create_product = "create_product",
    update_product = "update_product",
    delete_product = "delete_product",
    render_test = "render_test" 
}
export interface IAction {
    type: ActionType;
}
