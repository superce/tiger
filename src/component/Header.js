import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';import TextField from 'material-ui/TextField';
import axios from 'axios'
class Header extends React.Component {
  constructor(){
  super();
  this.state = {
    open: false,
    action:'signin',
    username:'',
    password:''
  };
}
  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };
  handleUsername(e,username){
    this.setState({username:username.trim()})
  }
  handlePassword(e,password){
    this.setState({password:password.trim()})
  }
  handleSubmit(){
    let data = {username:this.state.username,password:this.state.password}
   axios.post(`http://api.duopingshidai.com/user/${this.state.action}`,data)
    .then(res => console.log(res)
  )
    .catch(err => {
      {
        alert(err.response.data.msg)
      }
    })
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];
   return(
     <div>
       <AppBar
       title="主页" iconElementLeft={<IconButton><ActionHome /></IconButton>}
       onRightIconButtonTouchTap={this.handleOpen.bind(this)}
       iconElementRight={<FlatButton label="登陆/注册" />}
       />
       <Dialog
       title="用户表单"
       actions={actions}
       open={this.state.open}
       onRequestClose={this.handleClose.bind(this)}>
       <FlatButton label='登录'
         primary={this.state.action=='signin' ? true : false}
         onTouchTap={() => this.setState({action:'signin'})}/>
       <FlatButton label='注册'
         primary={this.state.action=='signup' ? true : false}
         onTouchTap={() => this.setState({action:'signup'})}/>
       <br />
       <TextField hintText="username"
         onChange={this.handleUsername.bind(this)}/> <br />
       <TextField hintText="password" type='password'
         onChange={this.handlePassword.bind(this)}/>
       </Dialog>

    </div>
      //  <AppBar
      //   title="主页"
      //   iconElementRight={<FlatButton label="登录" />}
       //
      //   />

        // <RaisedButton label="Dialog" onTouchTap={this.handleOpen.bind(this)} />
        //  <Dialog
        //    title="用户表单"
        //    actions={actions}
        //    modal={false}
        //    open={this.state.open}
        //    onRequestClose={this.handleClose.bind(this)}
        //  >
        //    The actions in this window were passed in as an array of React objects.
        //  </Dialog>

   )
  }
}

export default Header;
