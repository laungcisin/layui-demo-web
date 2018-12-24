package com.laungcisin.layui.service.impl;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.common.PageDataRequestParam;
import com.laungcisin.layui.dao.UserMapper;
import com.laungcisin.layui.domain.User;
import com.laungcisin.layui.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author gacl
 * 使用@Service注解将UserServiceImpl类标注为一个service
 * service的id是userService
 */
@Service("userService")
public class UserServiceImpl implements IUserService {

    /**
     * 使用@Autowired注解标注userMapper变量，
     * 当需要使用UserMapper时，Spring就会自动注入UserMapper
     */
    @Autowired
    private UserMapper userMapper;//注入dao

    @Override
    public void addUser(User user) {
        userMapper.insert(user);
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public User getUserById(String userId) {
        return userMapper.selectByPrimaryKey(userId);
    }

    @Override
    public List<User> getAllUser() {
        return userMapper.getAllUser();
    }

    @Override
    public PageData getUserList(PageDataRequestParam param) {
        PageData pageData = new PageData();
        try {
            pageData.setCount(userMapper.getAllUserCount());

            Integer page = param.getPage();
            Integer limit = param.getLimit();
            Integer start = (page - 1) * limit;
            Integer end = page * limit;
            List<User> list = userMapper.getUserList(start, end);
            pageData.setData(list);
        } catch (Exception e) {
            pageData.setCode(200);
            pageData.setMsg("查询数据出错");
            System.out.println("UserServiceImpl.getUserList()查询数据出错");
        }

        return pageData;
    }

    @Override
    public Integer checkUsername(String username) {
        return userMapper.checkUsername(username);
    }

    @Override
    public int deleteUser(User user) {
        return userMapper.deleteByPrimaryKey(user.getUserId());
    }
}