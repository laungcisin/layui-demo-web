var base = document.getElementById("ctx").href;

layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;

    //自定义验证规则
    // form.verify({
    //     name: function (value, item) { //value：表单的值、item：表单的DOM对象
    //         if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
    //             return '书名不能有特殊字符';
    //         }
    //         if (/(^\_)|(\__)|(\_+$)/.test(value)) {
    //             return '书名首尾不能出现下划线\'_\'';
    //         }
    //         if (/^\d+\d+\d$/.test(value)) {
    //             return '书名不能全为数字';
    //         }
    //     }
    // });

    //监听提交
    form.on('submit(add)', function (data) {
        $.ajax({
            url: base + '/book/addBook',
            async: false,
            type: "POST",
            data: data.field,
            success: function (r) {
                debugger;
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
});

function closeAll() {
    parent.layui.layer.closeAll();
    // var index = parent.layui.layer.getFrameIndex(window.name);
    //关闭当前frame
    // parent.layui.layer.close(index);
}