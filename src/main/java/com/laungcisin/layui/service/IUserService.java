package com.laungcisin.layui.service;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.common.PageDataRequestParam;
import com.laungcisin.layui.domain.User;

import java.util.List;

public interface IUserService {

    /**
     * 添加用户
     *
     * @param user
     */
    void addUser(User user);

    /**
     * 更新用户
     *
     * @param user
     */
    int updateUser(User user);

    /**
     * 根据用户id获取用户
     *
     * @param userId
     * @return
     */
    User getUserById(String userId);

    /**
     * 获取所有用户信息
     *
     * @return List<User>
     */
    List<User> getAllUser();

    /**
     * 分页查询user列表
     * @param param
     * @return
     */
    PageData getUserList(PageDataRequestParam param);

    Integer checkUsername(String username);

    int deleteUser(User user);
}