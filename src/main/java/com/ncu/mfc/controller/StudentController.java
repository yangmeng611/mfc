package com.ncu.mfc.controller;

import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.Student;
import com.ncu.mfc.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = {"/student"})
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private HttpSession session;

    @RequestMapping(value = "/{sno}",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData getStuById(@PathVariable("sno") String sno) {

        ResponseData responseData = new ResponseData();
        Student student = studentService.getStuBySno(sno);
        if(student != null) {
            responseData.setCode(0);
            responseData.setMsg("学生数据获取成功");
            responseData.getData().put("student",student);
        }else{
            responseData.setCode(1);
            responseData.setMsg("学生数据获取失败");
        }
        return responseData;

    }

    @RequestMapping(value = "/all",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData getAllStu(@RequestParam("page") int pageNum) {

        ResponseData responseData = new ResponseData();
        PageInfo<Student> students = studentService.findAllStu(pageNum);
        if(students != null) {
            responseData.setCode(0);
            responseData.setMsg("学生数据获取成功");
            responseData.getData().put("pageInfo",students);
        }else{
            responseData.setCode(1);
            responseData.setMsg("学生数据获取失败");
        }
        return responseData;

    }

    @RequestMapping(value = "/btn",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData getStuByBtn(@RequestParam("page") int pageNum,@RequestBody Student student) {

        ResponseData responseData = new ResponseData();
        PageInfo<Student> students = studentService.findStuByBtn(pageNum,student);
        if(students != null) {
            responseData.setCode(0);
            responseData.setMsg("学生数据获取成功");
            responseData.getData().put("pageInfo",students);
        }else{
            responseData.setCode(1);
            responseData.setMsg("学生数据获取失败");
        }
        return responseData;

    }

    @RequestMapping(value = "",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData updateStu(@RequestBody Student record) throws IOException {
        ResponseData responseData = new ResponseData();
        int num = studentService.updateStuBySno(record);
        if (num == 0) {
            responseData.setCode(1);
            responseData.setMsg("更新失败");
        } else {
            responseData.setCode(0);
            responseData.setMsg("更新成功");
        }
        return responseData;
    }

    @RequestMapping(value = "/delete/{sno}",
    produces = "application/json",
    method = RequestMethod.DELETE)
    public ResponseData deleteStu(@PathVariable("sno") String sno) {
        ResponseData responseData = new ResponseData();
        int num = studentService.delTeaByTno(sno);
        if(num==0) {
            responseData.setCode(1);
            responseData.setMsg("删除失败");
        } else{
            responseData.setCode(0);
            responseData.setMsg("删除成功");
        }
        return responseData;
    }

    @RequestMapping(value = "/add",
    produces = "application/json",
    method = RequestMethod.PUT)
    public ResponseData addStu(@RequestBody Student student) {
        ResponseData responseData = new ResponseData();
        int num = studentService.insertStu(student);
        if(num == 0){
            responseData.setCode(1);
            responseData.setMsg("添加失败");
        }else{
            responseData.setCode(0);
            responseData.setMsg("添加成功");
        }
        return responseData;
    }
}
