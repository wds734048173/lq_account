export default {
  //接口代理配置
  createtoken: '/api/outer/createtoken',// 创建token

  register: '/api/user/reg',//注册

  login: '/api/user/login',//登录
  loginbycode: '/api/user/loginbycode',//验证码登录
  getloginurl: '/api/user/getloginurl',//获取微信登录地址
  wxlogin: '/api/user/wxlogin',//微信登录
  wxloginnext: '/api/user/wxloginnext',//微信登录


  validsmscode: '/api/user/validsmscode',// 忘记密码1
  resetpwd: '/api/user/resetpwd',//忘记密码2

  userinfo: '/api/account/userinfo ',  //个人中心
  bindphone: '/api/account/bindphone ',  //绑定手机号
  bindwx: '/api/account/bindwx ',  //绑定微信
  bindemail: '/api/account/bindemail ',  //绑定邮箱

  unbindweixin: '/api/account/unbindweixin ',  //解绑微信
  unbindemail: '/api/account/unbindemail ',  //解绑邮箱
  getwxurl: '/api/account/getwxurl ',  //获取绑定微信跳转地址

  updatepwd: '/api/account/updatepwd ',  //修改密码


  updatelinkman: '/api/account/updatelinkman ',  //修改企业账户联系人

  // 发送短信验证码
  sendcode: '/api/user/sendcode',
  // 防刷图
  imagecode: '/api/imagecode',
  // 防刷图验证
  imagecodecheck: 'api/imagecodecheck',
}
