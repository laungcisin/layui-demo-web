package com.laungcisin.layui.service;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.domain.Book;
import com.laungcisin.layui.vo.BookRequestParam;

public interface IBookService {

    /**
     * 添加书本
     *
     * @param book
     */
    int addBook(Book book);

    /**
     * 更新书本
     *
     * @param book
     */
    int updateBook(Book book);

    /**
     * 根据用户id获取书本
     *
     * @param id
     * @return
     */
    Book getBookById(Integer id);

    /**
     * 分页查询书本列表
     *
     * @param param
     * @return
     */
    PageData getBookList(BookRequestParam param);

    int deleteBook(Book book);
}