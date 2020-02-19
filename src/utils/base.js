const base = {
	//表单错误信息
	FormError(el, str) {
		$(el).find('span').html(str);
    $(el).show();
  },
  //清除错误信息
  FormErrorHide(el) {
    $(el).parents('.ant-form-item-children').find('p span').html('');
    $(el).parents('.ant-form-item-children').find('p').hide();
	},
  // input提示移动
  MoveInputTips(inputs) {
    $(inputs).focus(function() {
      $(this).siblings("label").stop().animate({"top": "-35px","fontSize":"13px"}, 300);
    });
    $(inputs).blur(function() {
      if($(this)[0].value.trim().length>0)
        return;
      $(this).siblings("label").stop().animate({"top": "-15px","fontSize":"14px"}, 300);
    });
  },
  //发送验证码
  SendCode(code,timmer,interval) {
    // let code = this.$refs.code;
    $(code).addClass('disabled').html('重新发送 (' + interval + ')')
    $(code).prop('disabled', true);
    timmer = setTimeout(()=>{
      if (interval > 0) {
        interval--;
        $(code).innerHTML = '重发 ' + interval + '秒';
        timmer = setTimeout(base.SendCode(code,timmer,interval), 1000);
      } else {
        clearTimeout(timmer);
        $(code).removeClass('disabled').html('获取验证码')
        $(code).prop('disabled', false);
      }
    },1000)
  }
}

 export default base;
