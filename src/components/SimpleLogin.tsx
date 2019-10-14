import React from 'react';
import { IProduct, IproductAction, IUser, IUserAction} from '../App';
import { ActionType, IAction } from '../framework/IAction';

import { IWindow } from '../framework/IWindow';
import { userInfo } from 'os';
declare let window: IWindow;

interface IProps {
    isLoggedIn: boolean
}

interface IState {
    tempUser: '',
    tempPass: '';
}

export default class SimpleLogin extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

this.handleLogin = this.handleLogin.bind(this);
this.handleLogout = this.handleLogout.bind(this);
this.tempSaveUser = this.tempSaveUser.bind(this);
this.tempSavePass = this.tempSavePass.bind(this);

    }

    render() {

        if (!this.props.isLoggedIn) {
            return (
                <div>
                    <br/>
                    <p>Log in with your account: &nbsp;
                    <input type="text" name="username" onChange={this.tempSaveUser}/> &nbsp;
                    <input type="password" name="password" onChange={this.tempSavePass}/> &nbsp;
                    <button onClick={this.handleLogin}>log in</button> <br/><br/>
                    </p>
                </div>   
        )
        }
        else {
            return (
                <div>
                <p>Welcome back {window.CS.getUIState().credentials.user} &nbsp;
                <button onClick={this.handleLogout}>log out</button>
                </p>
                </div>
        )

        }

    }

tempSaveUser(event: any) {
    this.setState({tempUser: event.target.value});
}

tempSavePass(event: any) {
    this.setState({tempPass: event.target.value});
  }

handleLogin(event: any){
  const newUser: string = this.state.tempUser;
  const newPassword: string = this.state.tempPass;
  const action: IUserAction = {
      type: ActionType.login,
        credentials: {
      user: newUser, 
      password: newPassword}
    }
window.CS.clientAction(action);
}

handleLogout(event: any){
    const action: IUserAction = {
        type: ActionType.logout,
          credentials: {
        user: '', 
        password: ''}
      }
  window.CS.clientAction(action);
}



}