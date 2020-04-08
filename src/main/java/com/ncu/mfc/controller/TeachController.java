package com.ncu.mfc.controller;

import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.Teach;
import com.ncu.mfc.model.TeachClassKey;
import com.ncu.mfc.service.TeachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;

/**
 * @author 杨萌
 */

@RestController
@RequestMapping(value = "/teach")
public class TeachController {

    @Autowired
    private TeachService teachService;

    @RequestMapping(value = "/all",
    produces = "application/json",
    method = RequestMethod.GET)
    public ResponseData findAllTeach(@RequestParam("page") int pageNum){
        ResponseData responseData = new ResponseData();
        PageInfo<Teach> teach = teachService.findAllTeach(pageNum);
        if(teach.getList() != null) {
            responseData.setCode(0);
            responseData.setMsg("获取授课信息成功");
            responseData.getData().put("pageInfo",teach);
        } else {
            responseData.setCode(1);
            responseData.setMsg("未获取到授课信息");
        }
        return responseData;
    }

    @RequestMapping(value = "/btn",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findAllTeach(@RequestParam("page") int pageNum,@RequestBody Teach record){
        ResponseData responseData = new ResponseData();
        PageInfo<Teach> teach = teachService.findTeachBtn(pageNum,record);
        if(teach.getList() != null) {
            responseData.setCode(0);
            responseData.setMsg("获取授课信息成功");
            responseData.getData().put("pageInfo",teach);
        } else {
            responseData.setCode(1);
            responseData.setMsg("未获取到授课信息");
        }
        return responseData;
    }

    @RequestMapping(value = "/add",
    consumes = "application/json",
    produces = "application/json",
    method = RequestMethod.PUT)
    public ResponseData addTeach(@RequestBody TeachClassKey record){
        ResponseData responseData = new ResponseData();
        int num = teachService.addTeach(record);
        if(num == 1) {
            responseData.setCode(0);
            responseData.setMsg("添加授课成功");
        } else {
            responseData.setCode(1);
            responseData.setMsg("添加授课失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/delete",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.DELETE)
    public ResponseData delTeach(@RequestBody TeachClassKey record){
        ResponseData responseData = new ResponseData();
        int num = teachService.delTeach(record);
        if(num == 1) {
            responseData.setCode(0);
            responseData.setMsg("删除授课成功");
        } else {
            responseData.setCode(1);
            responseData.setMsg("删除授课失败");
        }
        return responseData;
    }

}
