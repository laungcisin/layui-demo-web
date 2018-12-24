<#assign ctx=request.contextPath />
<!DOCTYPE html>
<html>

<head>
    <base id="ctx" href="${ctx}">
    <meta charset="utf-8">
    <title>用户管理</title>
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
        <label class="layui-form-label">用户名:</label>
        <div class="layui-input-inline">
            <input type="text" id="username" name="username" placeholder="请输入用户名" class="layui-input" autocomplete="off">
        </div>
        <label class="layui-form-label">手机号:</label>
        <div class="layui-input-inline">
            <input type="text" id="mobile" name="mobile" placeholder="请输入手机号" class="layui-input" autocomplete="off">
        </div>
        <div class="layui-input-inline">
            <button class="layui-btn search-btn" table-id="userTable" lay-submit="" lay-filter="search">
                <i class="fa fa-search">&nbsp;</i>查询
            </button>
            <button type="reset" class="layui-btn layui-btn-primary"><i class="fa fa-refresh">&nbsp;</i>重置</button>
        </div>
    </div>
</form>
<div class="layui-btn-group">
    <button class="layui-btn" onclick="addUserWindow()"
            style="margin-left: 5px!important;"><i class="fa fa-plus">&nbsp;</i>新增
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
    <table id="userListTable" lay-filter="tableFilter"></table>
</div>

<script src="${request.contextPath}/statics/lib/jquery/3.2.1/jquery.min.js"></script>
<script src="${request.contextPath}/statics/lib/layui/layui.js"></script>
<script src="${request.contextPath}/statics/busi-js/user/user.js" charset="utf-8"></script>

<script type="text/html" id="barDemo">
    <#--<a class="layui-btn ayui-btn-primary layui-btn-xs" lay-event="detail">查看</a>-->
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

</body>

</html>