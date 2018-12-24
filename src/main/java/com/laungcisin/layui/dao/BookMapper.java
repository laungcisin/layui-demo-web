package com.laungcisin.layui.dao;

import com.laungcisin.layui.domain.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Book record);

    int insertSelective(Book record);

    Book selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Book record);

    int updateByPrimaryKey(Book record);

    Integer getAllBookCount();

    List<Book> getBookList(@Param("name") String name, @Param("author") String author, @Param("start") Integer start, @Param("end") Integer end);
}