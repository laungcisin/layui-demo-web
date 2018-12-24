package com.laungcisin.layui.test;

import java.util.Date;
import java.util.UUID;
import com.laungcisin.layui.domain.User;
import com.laungcisin.layui.service.IUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
//配置了@ContextConfiguration注解并使用该注解的locations属性指明spring和配置文件之后，
@ContextConfiguration(locations = {"classpath:spring/spring.xml", "classpath:spring/spring-mybatis.xml"})
public class MyBatisTestBySpringTestFramework {

    //注入userService
    @Autowired
    private IUserService userService;
    
    @Test
    public void testAddUser(){
        User user = new User();
        user.setUserId(UUID.randomUUID().toString().replaceAll("-", ""));
        user.setUsername("xdp_gacl_白虎神皇");
        user.setUserBirthday(new Date());
        user.setUserSalary(10000D);
        userService.addUser(user);
    }
    
    @Test
    public void testGetUserById(){
        String userId = "fb1c5941094e400b975f10d9a9d602a3";
        User user = userService.getUserById(userId);
        System.out.println(user.getUsername());
    }
}