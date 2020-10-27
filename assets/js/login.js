$(function () {
  $('.regiHref').on('click', function () {
    $('.registerBox').show().prev().hide();
  });
  $('.loginHref').on('click', function () {
    $('.loginBox').show().next().hide();
  });

  var form = layui.form;
  form.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp('^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$').test(value)) {
        return '用户名不能有特殊字符';
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      // if(/^\d+\d+\d$/.test(value)){
      //   return '用户名不能全为数字';
      // }
    },
    repass: function (value, item) {
      // item是当前的确认密码框元素
      // value是当前确认密码框中输入的值
      // 2.1 获取密码框中的输入内容
      var passVal = $('.registerBox .myForm input[name=password]').val();
      // 2.2 判断两次输入的密码是否相同
      if (passVal !== value) {
        // 2.3 清空密码框并添加提示
        $('.registerBox .myForm .pass,.registerBox .myForm .repass').val('');
        return '两次密码不一致,请重新输入';
      }
    },
    pass: [/^[\d]{6,12}$/, '密码必须6到12位数字，且不能出现空格'],
  });

  //注册
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/reguser',
      data: $(this).serialize(),
      success: function (msg) {
        layer.msg(msg.message);
        $('.registerBox').hide().prev().show();
      },
    });
  });
  // 登陆
  $('.myForm').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        layer.msg(res.message);
        if (res.status == 0) {
          console.log(res);
          window.localStorage.setItem('token', res.token);
          location.href = './index.html';
        }
      },
    });
  });
});
