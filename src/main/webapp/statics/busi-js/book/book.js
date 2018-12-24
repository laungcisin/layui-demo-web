var base = document.getElementById("ctx").href;

layui.use(['table', 'form'], function () {
    var table = layui.table;
    var form = layui.form;

    //第一个实例
    table.render({
        id: 'bookTableList',
        elem: '#bookListTable',
        height: 'full-200',
        cellMinWidth: 80,
        url: base + '/book/listBook', //数据接口
        page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ['prev', 'page', 'next', 'skip', 'limit', 'count'], //自定义分页布局
            curr: 1, //设定初始在第 1 页
            groups: 3, //只显示 3 个连续页码
            first: true, //显示首页
            last: true //显示尾页
        },
        cols: [[ //表头
            {
                type: 'radio'
            },
            {field: 'bookNo', title: '书号', width: 180},
            {field: 'name', title: '书名', width: 180},
            {field: 'author', title: '作者', width: 180},
            {field: 'price', title: '价格', width: 180},
            {fixed: 'right', width: 180, align: 'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
        ]]
    });

    //监听工具条
    table.on('tool(tableFilter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        debugger;
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'detail') { //查看
            viewBookWindow(data.id);
        } else if (layEvent === 'del') { //删除
            top.layui.layer.confirm('您确定要删除该记录？', function (index) {
                $.ajax({
                    url: base + '/book/deleteBook',
                    async: false,
                    type: "POST",
                    data: {id: data.id, "_method": "delete"},
                    success: function (data) {
                        if (data.code === 200) {
                            resetBookList();

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

                        return false;
                    }
                });

                // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                // layer.close(index);
                //向服务端发送删除指令
            });
        } else if (layEvent === 'edit') { //编辑
            updateBookWindow(data.id);
        }
    });
});

/**
 * 新增书本
 */
function addBookWindow() {
    top.layui.layer.open({
        title: '新增书本',
        content: base + '/book/addBookPage',
        type: 2,
        area: ['550px', '400px'],
        fix: true, //固定
        maxmin: false,
        move: false,
        resize: false,
        shadeClose: false,
        shade: [0.3, '#000'],
        // btnAlign: 'c',
        // btn: ['保存', '取消'],
        // yes: function (index, layero) {
        //     var body = layui.layer.getChildFrame('body', index);//建立父子联系
        //     var username = body.find('input[name="username"]').val();
        //     var mobilePhone = body.find('input[name="mobilePhone"]').val();
        //     var eMail = body.find('input[name="eMail"]').val();
        //     var password = body.find('input[name="password"]').val();
        //     var rePassword = body.find('input[name="rePassword"]').val();
        //
        //     if (username === '') {
        //         layui.layer.msg('请输入用户名');
        //         return;
        //     }
        //
        //     if (mobilePhone === '') {
        //         layui.layer.msg('请输入手机号');
        //         return;
        //     }
        //
        //     if (eMail === '') {
        //         layui.layer.msg('请输入电子邮箱');
        //         return;
        //     }
        //
        //     if (password === '') {
        //         layui.layer.msg('请输入密码');
        //         return;
        //     }
        //
        //     if (rePassword === '') {
        //         layui.layer.msg('请输入确认密码');
        //         return;
        //     }
        //
        //     if (password !== rePassword) {
        //         layui.layer.msg('两次密码不一致，请重新输入');
        //         return;
        //     }
        //
        //     var fomrData = {
        //         username: username,
        //         mobilePhone: mobilePhone,
        //         eMail: eMail,
        //         password: password
        //     };
        //
        //     $.ajax({
        //         url: '/user/addUser',
        //         async: false,
        //         type: "POST",
        //         data: fomrData,
        //         success: function (data) {
        //             if (data.code === 200) {
        //                 layui.layer.msg(data.message, {
        //                     icon: 1,
        //                     time: 2000
        //                 });
        //                 layui.layer.close(index);
        //             } else {
        //                 layui.layer.msg(data.message, {
        //                     icon: 2,
        //                     time: 2000
        //                 });
        //             }
        //
        //             layui.table.reload(
        //                 'bookTableList',
        //                 {
        //                     where: data,
        //                     page: {
        //                         curr: 1
        //                     }
        //                 });
        //         }
        //     });
        // },
        // btn2: function (index, layero) {
        //     // layui.layer.msg('hello');
        //     //按钮【按钮二】的回调
        //     //return false 开启该代码可禁止点击该按钮关闭
        // },
        // cancel: function (index, layero) {//右上角关闭回调
        //     layui.layer.close(index);
        //     return false;
        // },
        end: function () {
            // reloadUserList();
        }
    });
}

function updateBookWindow(id) {
    top.layui.layer.open({
        title: '更新书本信息',
        content: base + '/book/updateBookPage?id=' + id,
        type: 2,
        area: ['550px', '400px'],
        fix: true, //固定
        maxmin: false,
        move: false,
        resize: false,
        shadeClose: false,
        shade: [0.3, '#000'],
        // btnAlign: 'c',
        // btn: ['保存', '取消'],
        // yes: function (index, layero) {
        //     var body = layui.layer.getChildFrame('body', index);//建立父子联系
        //     var username = body.find('input[name="username"]').val();
        //     var mobilePhone = body.find('input[name="mobilePhone"]').val();
        //     var eMail = body.find('input[name="eMail"]').val();
        //     var password = body.find('input[name="password"]').val();
        //     var rePassword = body.find('input[name="rePassword"]').val();
        //
        //     if (username === '') {
        //         layui.layer.msg('请输入用户名');
        //         return;
        //     }
        //
        //     if (mobilePhone === '') {
        //         layui.layer.msg('请输入手机号');
        //         return;
        //     }
        //
        //     if (eMail === '') {
        //         layui.layer.msg('请输入电子邮箱');
        //         return;
        //     }
        //
        //     if (password === '') {
        //         layui.layer.msg('请输入密码');
        //         return;
        //     }
        //
        //     if (rePassword === '') {
        //         layui.layer.msg('请输入确认密码');
        //         return;
        //     }
        //
        //     if (password !== rePassword) {
        //         layui.layer.msg('两次密码不一致，请重新输入');
        //         return;
        //     }
        //
        //     var fomrData = {
        //         username: username,
        //         mobilePhone: mobilePhone,
        //         eMail: eMail,
        //         password: password
        //     };
        //
        //     $.ajax({
        //         url: '/user/addUser',
        //         async: false,
        //         type: "POST",
        //         data: fomrData,
        //         success: function (data) {
        //             if (data.code === 200) {
        //                 layui.layer.msg(data.message, {
        //                     icon: 1,
        //                     time: 2000
        //                 });
        //                 layui.layer.close(index);
        //             } else {
        //                 layui.layer.msg(data.message, {
        //                     icon: 2,
        //                     time: 2000
        //                 });
        //             }
        //
        //             layui.table.reload(
        //                 'bookTableList',
        //                 {
        //                     where: data,
        //                     page: {
        //                         curr: 1
        //                     }
        //                 });
        //         }
        //     });
        // },
        // btn2: function (index, layero) {
        //     // layui.layer.msg('hello');
        //     //按钮【按钮二】的回调
        //     //return false 开启该代码可禁止点击该按钮关闭
        // },
        // cancel: function (index, layero) {//右上角关闭回调
        //     layui.layer.close(index);
        //     return false;
        // },
        end: function () {
            // reloadUserList();
        }
    });
}

function toolbarDeleteBookWindow() {
    var checkStatusV = layui.table.checkStatus('bookTableList');
    var length = checkStatusV.data.length;
    if (length < 1) {
        layer.alert('请选择一条记录进行删除！');
        return;
    }

    top.layui.layer.confirm('您确定要删除该记录？', function (index) {
        $.ajax({
            url: base + '/book/deleteBook',
            async: false,
            type: "POST",
            data: {id: checkStatusV.data[0].id, "_method": "delete"},
            success: function (data) {
                if (data.code === 200) {
                    resetBookList();

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

                return false;
            }
        });

        // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        // layer.close(index);
        //向服务端发送删除指令
    });
}

function toolbarUpdateBookWindow() {
    var checkStatusV = layui.table.checkStatus('bookTableList');
    var length = checkStatusV.data.length;
    if (length < 1) {
        layer.alert('请选择一条记录进行修改！');
        return;
    }

    var id = checkStatusV.data[0].id;

    top.layui.layer.open({
        title: '更新书本信息',
        content: base + '/book/updateBookPage?id=' + id,
        type: 2,
        area: ['550px', '400px'],
        fix: true, //固定
        maxmin: false,
        move: false,
        resize: false,
        shadeClose: false,
        shade: [0.3, '#000'],
        // btnAlign: 'c',
        // btn: ['保存', '取消'],
        // yes: function (index, layero) {
        //     var body = layui.layer.getChildFrame('body', index);//建立父子联系
        //     var username = body.find('input[name="username"]').val();
        //     var mobilePhone = body.find('input[name="mobilePhone"]').val();
        //     var eMail = body.find('input[name="eMail"]').val();
        //     var password = body.find('input[name="password"]').val();
        //     var rePassword = body.find('input[name="rePassword"]').val();
        //
        //     if (username === '') {
        //         layui.layer.msg('请输入用户名');
        //         return;
        //     }
        //
        //     if (mobilePhone === '') {
        //         layui.layer.msg('请输入手机号');
        //         return;
        //     }
        //
        //     if (eMail === '') {
        //         layui.layer.msg('请输入电子邮箱');
        //         return;
        //     }
        //
        //     if (password === '') {
        //         layui.layer.msg('请输入密码');
        //         return;
        //     }
        //
        //     if (rePassword === '') {
        //         layui.layer.msg('请输入确认密码');
        //         return;
        //     }
        //
        //     if (password !== rePassword) {
        //         layui.layer.msg('两次密码不一致，请重新输入');
        //         return;
        //     }
        //
        //     var fomrData = {
        //         username: username,
        //         mobilePhone: mobilePhone,
        //         eMail: eMail,
        //         password: password
        //     };
        //
        //     $.ajax({
        //         url: '/user/addUser',
        //         async: false,
        //         type: "POST",
        //         data: fomrData,
        //         success: function (data) {
        //             if (data.code === 200) {
        //                 layui.layer.msg(data.message, {
        //                     icon: 1,
        //                     time: 2000
        //                 });
        //                 layui.layer.close(index);
        //             } else {
        //                 layui.layer.msg(data.message, {
        //                     icon: 2,
        //                     time: 2000
        //                 });
        //             }
        //
        //             layui.table.reload(
        //                 'bookTableList',
        //                 {
        //                     where: data,
        //                     page: {
        //                         curr: 1
        //                     }
        //                 });
        //         }
        //     });
        // },
        // btn2: function (index, layero) {
        //     // layui.layer.msg('hello');
        //     //按钮【按钮二】的回调
        //     //return false 开启该代码可禁止点击该按钮关闭
        // },
        // cancel: function (index, layero) {//右上角关闭回调
        //     layui.layer.close(index);
        //     return false;
        // },
        end: function () {
            // reloadUserList();
        }
    });
}

function viewBookWindow(id) {
    top.layui.layer.open({
        title: '查看书本信息',
        content: base + '/book/viewBookPage?id=' + id,
        type: 2,
        area: ['550px', '400px'],
        fix: true, //固定
        maxmin: false,
        move: false,
        resize: false,
        shadeClose: false,
        shade: [0.3, '#000'],
        // btnAlign: 'c',
        // btn: ['保存', '取消'],
        // yes: function (index, layero) {
        //     var body = layui.layer.getChildFrame('body', index);//建立父子联系
        //     var username = body.find('input[name="username"]').val();
        //     var mobilePhone = body.find('input[name="mobilePhone"]').val();
        //     var eMail = body.find('input[name="eMail"]').val();
        //     var password = body.find('input[name="password"]').val();
        //     var rePassword = body.find('input[name="rePassword"]').val();
        //
        //     if (username === '') {
        //         layui.layer.msg('请输入用户名');
        //         return;
        //     }
        //
        //     if (mobilePhone === '') {
        //         layui.layer.msg('请输入手机号');
        //         return;
        //     }
        //
        //     if (eMail === '') {
        //         layui.layer.msg('请输入电子邮箱');
        //         return;
        //     }
        //
        //     if (password === '') {
        //         layui.layer.msg('请输入密码');
        //         return;
        //     }
        //
        //     if (rePassword === '') {
        //         layui.layer.msg('请输入确认密码');
        //         return;
        //     }
        //
        //     if (password !== rePassword) {
        //         layui.layer.msg('两次密码不一致，请重新输入');
        //         return;
        //     }
        //
        //     var fomrData = {
        //         username: username,
        //         mobilePhone: mobilePhone,
        //         eMail: eMail,
        //         password: password
        //     };
        //
        //     $.ajax({
        //         url: '/user/addUser',
        //         async: false,
        //         type: "POST",
        //         data: fomrData,
        //         success: function (data) {
        //             if (data.code === 200) {
        //                 layui.layer.msg(data.message, {
        //                     icon: 1,
        //                     time: 2000
        //                 });
        //                 layui.layer.close(index);
        //             } else {
        //                 layui.layer.msg(data.message, {
        //                     icon: 2,
        //                     time: 2000
        //                 });
        //             }
        //
        //             layui.table.reload(
        //                 'bookTableList',
        //                 {
        //                     where: data,
        //                     page: {
        //                         curr: 1
        //                     }
        //                 });
        //         }
        //     });
        // },
        // btn2: function (index, layero) {
        //     // layui.layer.msg('hello');
        //     //按钮【按钮二】的回调
        //     //return false 开启该代码可禁止点击该按钮关闭
        // },
        // cancel: function (index, layero) {//右上角关闭回调
        //     layui.layer.close(index);
        //     return false;
        // },
        end: function () {
            // reloadUserList();
        }
    });
}

function reloadBookList() {
    layui.table.reload(
        'bookTableList',
        {
            where: {name: encodeURI($('#name').val()), author: encodeURI($('#author').val())},
            page: {
                curr: 1
            }
        });
}


function resetBookList() {
    $('#name').val('');
    $('#author').val('');
    layui.table.reload(
        'bookTableList',
        {
            where: {name: $('#name').val(), author: $('#author').val()},
            page: {
                curr: 1
            }
        });
}

