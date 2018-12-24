package com.laungcisin.layui.dao;

import com.laungcisin.layui.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(String userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    /**
     * 获取所有用户信息
     *
     * @return List<User>
     */
    List<User> getAllUser();

    Integer getAllUserCount();

    List<User> getUserList(@Param("start") Integer start, @Param("end") Integer end);

    Integer checkUsername(@Param("username") String username);
}