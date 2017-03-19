import React, { PropTypes } from 'react'
import axios from 'axios'


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';import TextField from 'material-ui/TextField';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Snackbar from 'material-ui/Snackbar';
class Header extends React.Component {
  constructor(){
  super();
  this.state = {
    open: false,
    action:'signin', //登录注册表单的选项
    isLogin:false,   //表单用户名的value
    username:'',     //表单密码的value
    password:'',     //是否登录
    user:'',         //登陆后后台返回的用户名
    userId:'',      //登陆后后台返回的userid
    openMenu:false,  //登录后右上角弹出式菜单的开关
    snackbar:false   //登出式弹出的提示框开关
  };
}
  componentWillMount(){
    if (localStorage.user && localStorage.userId){
      this.setState({isLogin:true,user:localStorage.user,userId:localStorage.userId})
    }
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
    .then(res =>
    {this.setState({open:false,isLogin:true,user:res.data.user,userId:res.data.userId})
    localStorage.setItem('user',res.data.user);
    localStorage.setItem('userId',res.data.userId);
    })


    .catch(err => {
      {
        alert(err.response.data.msg)
      }
    })
  }
  handleOnRequestChange(value){
   this.setState({
     openMenu:value
   })
  }
  handleMeunItem(e,child){
    console.log('qwe');
    if(child.props.value==='3') this.logout()
  }
  logout(){
    axios.get("http://api.duopingshidai.com/user/logout")
    .then(res => {
      this.setState({isLogin:false,user:'',userId:'',SnackBar:true})
      localStorage.user='',
      localStorage.userId=''
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
    let rightIcon = this.state.isLogin ?


        <IconMenu
           iconButtonElement={<IconButton><AccountCircle /></IconButton>}
           anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
           targetOrigin={{horizontal: 'right', vertical: 'top'}}
           open={this.state.openMenu}
           onRequestChange={this.handleOnRequestChange.bind(this)}
           onItemTouchTap={this.handleMeunItem.bind(this)}
         >
           <MenuItem value="1" primaryText={this.state.user} />
           <MenuItem value="2" primaryText="个人资料" />
           <MenuItem value="3" primaryText="登出"/>
         </IconMenu> :
         <FlatButton label='登录/注册' onTouchTap={this.handleOpen.bind(this)}/>

 return(
     <div>
       <AppBar
       title="主页" iconElementLeft={<IconButton><ActionHome /></IconButton>}

       iconElementRight={rightIcon}
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
       <Snackbar
          open={this.state.SnackBar}
          message="登出成功"
          autoHideDuration={2000}
          onRequestClose={() => this.setState({SnackBar: false})}
          bodyStyle={{textAlign:'center'}}
        />

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
