package com.laungcisin.layui.service.impl;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.dao.BookMapper;
import com.laungcisin.layui.domain.Book;
import com.laungcisin.layui.service.IBookService;
import com.laungcisin.layui.vo.BookRequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("bookService")
public class BookServiceImpl implements IBookService {
    @Autowired
    private BookMapper bookMapper;

    @Override
    public int addBook(Book book) {
        return bookMapper.insert(book);
    }

    @Override
    public int updateBook(Book book) {
        return bookMapper.updateByPrimaryKeySelective(book);
    }

    @Override
    public Book getBookById(Integer id) {
        return bookMapper.selectByPrimaryKey(id);
    }

    @Override
    public PageData getBookList(BookRequestParam param) {
        PageData pageData = new PageData();
        try {
            pageData.setCount(bookMapper.getAllBookCount());

            Integer page = param.getPage();
            Integer limit = param.getLimit();
            Integer start = (page - 1) * limit;
            Integer end = page * limit;
            List<Book> list = bookMapper.getBookList(param.getName(), param.getAuthor(), start, end);
            pageData.setData(list);
        } catch (Exception e) {
            e.printStackTrace();
            pageData.setCode(200);
            pageData.setMsg("查询数据出错");
            System.out.println("BookServiceImpl.getBookList()查询数据出错");
        }

        return pageData;
    }

    @Override
    public int deleteBook(Book book) {
        return bookMapper.deleteByPrimaryKey(book.getId());
    }
}
