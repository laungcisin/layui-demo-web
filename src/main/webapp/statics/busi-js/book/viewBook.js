layui.use(['form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer;
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
            layui.form.val("viewForm", {
                "id": data.id,
                "bookNo": data.bookNo,
                "name": data.name,
                "author": data.author,
                "price": data.price
            });
        }
    });
}