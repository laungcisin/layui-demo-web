layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;

    // $('#username').val('username');
    // $('#mobilePhone').val('13455555555');
    // $('#eMail').val('test@qq.com');
    // $('#password').val('11111111');
    // $('#rePassword').val('11111111');

    // 表单初始化
    form.val("addForm", {
        "username": "贤心",
        "mobilePhone": "13455555555",
        "eMail": "test@qq.com",
        "password": "11111111",
        "rePassword": "11111111"
    });

    //自定义验证规则
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        repass: function (value, item) { //value：表单的值、item：表单的DOM对象
            if ($('#password').val() != $('#rePassword').val()) {
                return '两次密码不一致';
            }
        }
    });

    //监听提交
    form.on('submit(add)', function (data) {
        // console.log(data.elem);//被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}

        $.ajax({
            url: '/user/checkUsername',
            async: false,
            type: "POST",
            data: {username: data.field.username},
            success: function (result) {
                if (result.code === 200 && result.count > 0) {
                    top.layui.layer.alert(result.message);
                    return false;
                }

                if (result.code < -1) {
                    top.layui.layer.alert(result.message);
                    return false;
                }

                $.ajax({
                    url: '/user/addUser',
                    async: false,
                    type: "POST",
                    data: data.field,
                    success: function (r) {
                        if (r.code === 200) {
                            top.layui.layer.msg(r.message, {
                                icon: 1,
                                time: 2000
                            });
                            // 获得frame索引
                            var index = parent.layer.getFrameIndex(window.name);
                            //关闭当前frame
                            top.layui.layer.close(index);
                        } else {
                            top.layui.layer.msg(r.message, {
                                icon: 2,
                                time: 2000
                            });
                        }

                        // layui.table.reload(
                        //     'pageTableList',
                        //     {
                        //         where: data,
                        //         page: {
                        //             curr: 1
                        //         }
                        //     });

                        return false;
                    }
                });
            }
        });

        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});

function closeAll() {
    parent.layui.layer.closeAll();
    // var index = parent.layui.layer.getFrameIndex(window.name);
    //关闭当前frame
    // parent.layui.layer.close(index);
}

function checkUsername() {
    $.ajax({
        url: '/user/checkUsername',
        async: false,
        type: "POST",
        data: {username: $('#username').val()},
        success: function (data) {
            if (data.code === 200 && data.count > 0) {
                layui.layer.alert(data.message);
                return false;
            }

            if (data.code < -1) {
                layui.layer.alert(data.message);
                return false;
            }
        }
    });
}