package com.laungcisin.layui.vo;


import com.laungcisin.layui.common.PageDataRequestParam;

public class BookRequestParam extends PageDataRequestParam {
    private String name;
    private String author;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
