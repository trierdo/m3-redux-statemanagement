export interface IUI{
    counter: number;
    loggedIn: boolean;
    waitingForResponse:boolean;
    credentials: IUser;
}

interface IUser {
    user: string;
    password: string;
    }

interface IProduct {
    _id: string;
    product_name: string;
    product_value: number;
    product_amount: number;
    product_totalPrice: number;
    edit_mode: boolean;
  }

export interface IBM{
    products:IProduct[]
}


export interface IState{
    UI:IUI;
    BM:IBM;
}

// initial state 
export const initial:IState = {
	UI: {
		counter: 0,
		loggedIn: false,
        waitingForResponse: false,
        credentials: {
            user: '',
            password: ''
        }
	},
	BM: {
        products:[]
	}
};
