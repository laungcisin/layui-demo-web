<#assign ctx=request.contextPath />
<!DOCTYPE html>
<html>

<head>
    <base id="ctx" href="${ctx}">
    <meta charset="utf-8">
    <title>书本管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">

    <link rel="stylesheet" href="${request.contextPath}/statics/lib/layui/css/layui.css">
</head>

<body style="padding: 20px 20px">

<form class="layui-form " action="">
    <div class="layui-form-item">
        <label class="layui-form-label">书名:</label>
        <div class="layui-input-inline">
            <input type="text" id="name" name="name" placeholder="请输入书名" class="layui-input" autocomplete="off">
        </div>
        <label class="layui-form-label">作者:</label>
        <div class="layui-input-inline">
            <input type="text" id="author" name="author" placeholder="请输入作者" class="layui-input" autocomplete="off">
        </div>
        <div class="layui-input-inline">
            <button class="layui-btn search-btn" table-id="bookTableList" onclick="reloadBookList();return false;">
                <i class="fa fa-search">&nbsp;</i>查询
            </button>
            <button type="reset" class="layui-btn layui-btn-primary" onclick="resetBookList(); return false;"><i class="fa fa-refresh">&nbsp;</i>重置</button>
        </div>
    </div>
</form>
<div class="layui-btn-group">
    <button class="layui-btn layui-btn-normal" onclick="addBookWindow()"
            style="margin-left: 5px!important;"><i class="fa fa-plus">&nbsp;</i>新增
    </button>


    <button class="layui-btn layui-btn-default" onclick="toolbarUpdateBookWindow()"
            style="margin-left: 5px!important;">
        <i class="fa fa-pencil-square-o">&nbsp;</i>编辑
    </button>
    <button class="layui-btn layui-btn-danger" onclick="toolbarDeleteBookWindow()"
            style="margin-left: 5px!important;">
        <i class="fa fa-trash-o">&nbsp;</i>删除
    </button>
<!--

    <button class="layui-btn" onclick="showWindows('修改用户','/user/addPage', '600', '500')"
            style="margin-left: 5px!important;">
        <i class="fa fa-pencil-square-o">&nbsp;</i>修改
    </button>
    <button class="layui-btn" onclick="showWindows('删除用户','/user/addPage', '600', '500')"
            style="margin-left: 5px!important;">
        <i class="fa fa-trash-o">&nbsp;</i>删除
    </button>
    <button class="layui-btn" onclick="showWindows('初始化用户密码','/user/addPage')" style="margin-left: 5px!important;">
        <i class="fa fa-refresh">&nbsp;</i>初始化密码为123456
    </button>
-->

</div>
<div class="layui-form ">
    <table id="bookListTable" lay-filter="tableFilter"></table>
</div>

<script src="${request.contextPath}/statics/lib/jquery/3.2.1/jquery.min.js"></script>
<script src="${request.contextPath}/statics/lib/layui/layui.js"></script>
<script src="${request.contextPath}/statics/busi-js/book/book.js" charset="utf-8"></script>

<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="detail">查看</a>
    <a class="layui-btn layui-btn-default layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

</body>

</html>