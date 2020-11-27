$(function () {
    //获取layui变量声明
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入1~6位字符'
            }
        }
    })
    var layer = layui.layer
    initUserInfo()
    //将用户信息渲染到页面上
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //监听重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改用户信息失败！')
                }
                layui.layer.msg('修改成功！')
                window.parent.getUserInfo()
            }
        })
    })
});