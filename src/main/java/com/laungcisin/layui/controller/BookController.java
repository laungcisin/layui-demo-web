package com.laungcisin.layui.controller;

import com.laungcisin.layui.common.PageData;
import com.laungcisin.layui.common.ResponseData;
import com.laungcisin.layui.domain.Book;
import com.laungcisin.layui.service.IBookService;
import com.laungcisin.layui.vo.BookRequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@RequestMapping("/book")
@Controller
public class BookController {
    @Autowired
    private IBookService bookService;

    @RequestMapping("/index")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("book/index");
        return modelAndView;
    }

    @RequestMapping("/listBook")
    @ResponseBody
    public PageData listBook(BookRequestParam param) {
        String name = param.getName();
        String author = param.getAuthor();
        if (name != null && !"".equals(name)) {
            try {
                param.setName(URLDecoder.decode(name, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }

        if (author != null && !"".equals(author)) {
            try {
                param.setAuthor(URLDecoder.decode(author, "UTF-8"));
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
        }
        return bookService.getBookList(param);
    }

    @RequestMapping("/getBookById")
    @ResponseBody
    public Book getBookById(Integer id) {
        return bookService.getBookById(id);
    }

    @RequestMapping("/addBookPage")
    public String addBookPage() {
        return "book/addBookPage";
    }

    @PostMapping("/addBook")
    @ResponseBody
    public ResponseData addBook(Book book) {
        ResponseData responseData = new ResponseData(-1, "新增失败");
        try {
            bookService.addBook(book);
            responseData.setCode(200);
            responseData.setMessage("新增成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @PostMapping("/updateBook")
    @ResponseBody
    public ResponseData updateBook(Book book) {
        ResponseData responseData = new ResponseData(-1, "更新失败");
        try {
            bookService.updateBook(book);
            responseData.setCode(200);
            responseData.setMessage("更新成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @PostMapping("/deleteBook")
    @ResponseBody
    public ResponseData deleteBook(Book book) {
        ResponseData responseData = new ResponseData(-1, "删除失败");
        try {
            bookService.deleteBook(book);
            responseData.setCode(200);
            responseData.setMessage("删除成功");
        } catch (Exception e) {
            e.printStackTrace();
            return responseData;
        }
        return responseData;
    }

    @RequestMapping("/updateBookPage")
    public ModelAndView updateBookPage(String id) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("id", id);
        modelAndView.setViewName("/book/updateBookPage");
        return modelAndView;
    }

    @RequestMapping("/viewBookPage")
    public ModelAndView viewBookPage(Integer id) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("id", id);
        modelAndView.setViewName("/book/viewBookPage");
        return modelAndView;
    }
}
