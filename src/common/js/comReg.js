// 公共校验规则
let phoneReg = /^[1][0-9]{10}$/;
let emailReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([(a-zA-Z)|(\.)]{2,20})$/;
let numReg = /^[1-9]\d*$/;
let passReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
export default {
  phoneReg: phoneReg,
  emailReg: emailReg,
  numReg: numReg,
  passReg:passReg,
}

// 检测手机号
export function checkPhone(val) {
  if (val.length > 0) {
    if (phoneReg.test(val)) {
      return "";
    } else {
      return "请输入正确的手机号"
    }
  } else {
    return "请输入手机号"
  }
}
// 检测邮箱
export function checkEmail(val) {
  if (val.length > 0) {
    if (emailReg.test(val)) {
      return "";
    } else {
      return "请输入正确的邮箱"
    }
  } else {
    return "请输入邮箱"
  }
}

// 检测邮箱或手机号
export function checkEmailOrPhone(val) {
  if (val.length > 0) {
    if (emailReg.test(val) || phoneReg.test(val)) {
      return "";
    } else {
      return "请输入正确的邮箱或手机号"
    }
  } else {
    return "请输入邮箱或手机号"
  }
}

// 检测密码
export function checkPass(val) {
  if (val.length > 0) {
    if (passReg.test(val)) {
      return "";
    } else {
      return "请输入8~16位，由字母、数字、特殊符号组成的密码，必须包含数字+字母"
    }
  } else {
    return "请输入密码"
  }
}
