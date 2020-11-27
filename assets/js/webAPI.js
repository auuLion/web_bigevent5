$(function () {
    //对路径进行统一的配置
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        //对有访问权限的地址进行统一配置请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }
        options.complete = function (res) {
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                location.href = '/login.html'
                localStorage.removeItem('token')
            }
        }
    })
})