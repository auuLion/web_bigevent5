$(function () {

    getUserInfo()

})
//获取layui变量
var layer = layui.layer
//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderUserInfo(res.data)
        }
    })
}
//将用户信息进行UI渲染
function renderUserInfo(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
        $('.layui-nav-img').hide()
    }
    //退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('是否要退出？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            location.href = '/login.html'
            localStorage.removeItem('token')
            layer.close(index);
        });
    })
}