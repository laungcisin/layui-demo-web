layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;

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
    form.on('submit(update)', function (data) {
        debugger;
        // console.log(data.elem);//被执行事件的元素DOM对象，一般为button对象
        // console.log(data.form);//被执行提交的form对象，一般在存在form标签时才会返回
        // console.log(data.field); //当前容器的全部表单字段，名值对形式：{name: value}

        $.ajax({
            url: CONTEXT_PATH + '/book/updateBook',
            async: false,
            type: "POST",
            data: data.field,
            success: function (data) {
                debugger;
                if (data.code === 200) {
                    top.layui.layer.msg(data.message, {
                        icon: 1,
                        time: 2000
                    });
                    // 获得frame索引
                    var index = parent.layer.getFrameIndex(window.name);
                    //关闭当前frame
                    top.layui.layer.close(index);
                } else {
                    top.layui.layer.msg(data.message, {
                        icon: 2,
                        time: 2000
                    });
                }

                top.layui.table.reload(
                    'bookTableList',
                    {
                        // where: data,
                        page: {
                            curr: 1
                        }
                    });

                return false;
            }
        });

        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    initForm();
});

function closeAll() {
    parent.layui.layer.closeAll();
    // var index = parent.layui.layer.getFrameIndex(window.name);
    //关闭当前frame
    // parent.layui.layer.close(index);
}

function initForm() {
    $.ajax({
        url: CONTEXT_PATH + '/book/getBookById?id=' + $('#id').val(),
        async: false,
        type: "Get",
        success: function (data) {
            // 表单初始化
            layui.form.val("updateForm", {
                "id": data.id,
                "bookNo": data.bookNo,
                "name": data.name,
                "author": data.author,
                "price": data.price
            });
        }
    });
}