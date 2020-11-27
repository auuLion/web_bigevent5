$(function () {
    //1.给注册和登录模块设置隐藏和显示
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //2.自定义校验规则
    //获取layui的表单元素
    var form = layui.form
    var layer = layui.layer
    //定义pwd规则
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6到16位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box input[name=password]').val()
            if (value !== pwd) {
                return '两次密码输入不一致'
            }
        }
    })
    //3.监听注册事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                    $('#form_reg')[0].reset()
                    $('#link_login').click()
                }

            }
        })
    })
    //4.监听登录事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html'
                }
            }

        })
    })
})