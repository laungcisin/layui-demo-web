package com.laungcisin.layui.controller;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.common.PageDataRequestParam;
import com.laungcisin.layui.common.ResponseData;
import com.laungcisin.layui.domain.User;
import com.laungcisin.layui.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.UUID;

@RequestMapping("/user")
@Controller
public class UserController {
    @Autowired
    private IUserService userService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("test", "1111");
        List<User> userList = userService.getAllUser();
        modelAndView.addObject("lstUsers", userList);
        modelAndView.setViewName("user/index");

        return modelAndView;
    }

    @RequestMapping("/listUser")
    @ResponseBody
    public PageData listUser(PageDataRequestParam param) {
        return userService.getUserList(param);
    }

    @RequestMapping("/getUserById")
    @ResponseBody
    public User getUserById(String userId) {
        return userService.getUserById(userId);
    }

    @RequestMapping("/addUserPage")
    public String addUserPage() {
        return "user/addUserPage";
    }

    @PostMapping("/addUser")
    @ResponseBody
    public ResponseData addUser(User user) {
        ResponseData responseData = new ResponseData(-1, "新增失败");
        try {
            user.setUserId(UUID.randomUUID().toString().replaceAll("-", ""));
            userService.addUser(user);
            responseData.setCode(200);
            responseData.setMessage("新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @PostMapping("/updateUser")
    @ResponseBody
    public ResponseData updateUser(User user) {
        ResponseData responseData = new ResponseData(-1, "更新失败");
        try {
            userService.updateUser(user);
            responseData.setCode(200);
            responseData.setMessage("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @PostMapping("/deleteUser")
    @ResponseBody
    public ResponseData deleteUser(User user) {
        ResponseData responseData = new ResponseData(-1, "删除失败");
        try {
            userService.deleteUser(user);
            responseData.setCode(200);
            responseData.setMessage("删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @PostMapping("/checkUsername")
    @ResponseBody
    public ResponseData checkUsername(String username) {
        ResponseData responseData = new ResponseData(200, "用户名不存在", -1);
        try {
            Integer count = userService.checkUsername(username);
            if (count > 0) {
                responseData = new ResponseData(200, "用户名已存在，请重新填写！", 1);
            }
        } catch (Exception e) {
            e.printStackTrace();
            responseData = new ResponseData(-1, "系统错误!", -1);
            return responseData;
        }

        return responseData;
    }

    @RequestMapping("/updateUserPage")
    public ModelAndView updateUserPage(String userId) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("userId", userId);
        modelAndView.setViewName("/user/updateUserPage");
        return modelAndView;
    }
}
