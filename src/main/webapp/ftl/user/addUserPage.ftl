<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>新增用户</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8"/>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/statics/css/font.css">
    <link rel="stylesheet" href="/statics/css/xadmin.css">

    <link rel="stylesheet" href="/statics/lib/layui/css/layui.css">

    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<div style="padding-top: 30px; padding-left: 50px">
    <form class="layui-form" lay-filter="addForm">
        <div class="layui-form-item">
            <label for="username" class="layui-form-label">
                用户名<span class="x-red">*</span>
            </label>
            <div class="layui-input-inline">
                <input type="text" id="username" name="username" lay-verify="required|username" autocomplete="off" onblur="checkUsername(this)"
                       class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                将会成为您唯一的登入名
            </div>
        </div>
        <div class="layui-form-item">
            <label for="mobilePhone" class="layui-form-label">
                手机号码<span class="x-red">*</span>
            </label>
            <div class="layui-input-inline">
                <input type="text" id="mobilePhone" name="mobilePhone" lay-verify="required|phone" maxlength="11"
                       autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label for="eMail" class="layui-form-label">
                电子邮箱<span class="x-red">*</span>
            </label>
            <div class="layui-input-inline">
                <input type="text" id="eMail" name="eMail" lay-verify="required|email"
                       autocomplete="off" class="layui-input">
            </div>
            <!--<div class="layui-form-mid layui-word-aux">-->
                <!--<span class="x-red">*</span>-->
            <!--</div>-->
        </div>
        <div class="layui-form-item">
            <label for="password" class="layui-form-label">
                密码<span class="x-red">*</span>
            </label>
            <div class="layui-input-inline">
                <input type="password" id="password" name="password" lay-verify="required|pass" minlength="6" maxlength="16"
                       autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                6到16个字符
            </div>
        </div>
        <div class="layui-form-item">
            <label for="rePassword" class="layui-form-label">
                确认密码<span class="x-red">*</span>
            </label>
            <div class="layui-input-inline">
                <input type="password" id="rePassword" name="rePassword" lay-verify="required|pass|repass" minlength="6" maxlength="16"
                       autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid layui-word-aux">
                6到16个字符
            </div>
        </div>
        <!--<div class="layui-form-item">-->
            <!--<label class="layui-form-label"><span class="x-red">*</span>角色</label>-->
            <!--<div class="layui-input-block">-->
                <!--<input type="checkbox" name="like1[write]" lay-skin="primary" title="超级管理员" checked="">-->
                <!--<input type="checkbox" name="like1[read]" lay-skin="primary" title="编辑人员">-->
                <!--<input type="checkbox" name="like1[write]" lay-skin="primary" title="宣传人员" checked="">-->
            <!--</div>-->
        <!--</div>-->
        <div class="layui-form-item" style="text-align: center">
            <button class="layui-btn" lay-submit="" lay-filter="add">保存</button>
            <button class="layui-btn layui-btn-danger" onclick="closeAll()">关闭</button>
        </div>
    </form>
</div>

<script src="/statics/lib/jquery/3.2.1/jquery.min.js"></script>
<script src="/statics/lib/layui/layui.js"></script>
<!--<script src="/statics/js/utils.js"></script>-->
<script src="/statics/busi-js/user/addUser.js"></script>
</body>

</html>