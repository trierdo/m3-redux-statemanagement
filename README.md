# TypeScript & Redux Lab

### Prepare your project:

1. Fork the repo
2. Clone the repo
3. Reinstall the modules using `npm install`
4. Start the app using `npm start`

### iteration 1: Let's change it to a product management tool

- change the headline to: simple product management application

- adapt filename & import path for the child component   
    src/components/SimpleAsset.tsx => SimpleProduct.tsx

- rename the class name in SimpleProduct.tsx to SimpleProduct

- within the App.tsx adapt component name  in import def & component call    
    SimpleAsset => SimpleProduct

- Use the Replace in Files function of VSCode to replace...
    IAssetData =>  IProduct   
    asset => product (but make sure, you do not touch the package.json or serviceworker.js)

### iteration 2: Extend the product model

#### Add new properties to the model: 

App.tsx / AppState.ts /index.tsx / appReducer (update_product)
- product_amount: number; 
- product_totalPrice: number;
	
#### At the handleCreateProduct() method for the newProduct;
- product_amount: 1,
- product_totalPrice: 0
	
	
####  At the app, create new rows, replace the th tags:
    <tr>  
        <th>description</th>
        <th>value</th>
	    <th>amount</th>
	    <th>total Price</th>
	    <th>action</th>
    </tr>
	
####  At the SimpleProduct component render with e.g.

const currentIndex: number = window.CS.getBMState().products.findIndex(product => this.props.product._id === product._id);
	
	replace:  
	`this.state.product` => `window.CS.getBMState().products[currentIndex]`

####  Create empty method and bind it in SimpleProduct: 

	`this.handleAmountChange = this.handleAmountChange.bind(this);`
	`handleAmountChange(event: any) { }`

####  At the SimpleProduct.tsx … add input fields for active edit.mode:
	
	<td><input type="number" name="value" value={window.CS.getBMState().products[0].product_amount}
	onChange={this.handleAmountChange} /></td>
	
	<td>{window.CS.getBMState().products[0].product_totalPrice} €</td>
	 
#### for inactive edit.mode:
	
	`<td>{window.CS.getBMState().products[0].product_amount}</td>`
	<td>{window.CS.getBMState().products[0].product_totalPrice} €</td>  
 
#### for active edit mode, define two more methods to increase or decrease the amount: 

within the amount cell of the simple product table, add two buttons to increase and decrease the amount:  
    `<button onClick={this.handleAmountIncrease}>+</button>`
    `<button onClick={this.handleAmountDecrease}>-</button>`

define and bind these two new event based methods.  
Make the onchange method for the amount field innecessary by moving the logic of handleAmountChange to those two buttons.  
disable the amount field for editing.  


#### move edit_mode to the product:

extend the product model, insert edit_mode and read it where needed. 
remove it from this.state, IState.

#### Create a new component SimpleSum.

- call it from below the product list of the app and hand over the list of all products
- use the same imports as for SimpleProduct
- let it render another line of the table
- below the description row show the count of all products
- below the amount row show the total amount of all products
- below the total Price row show the total Price for all products
- use two methods in the SimpleSum component to calculate the sums