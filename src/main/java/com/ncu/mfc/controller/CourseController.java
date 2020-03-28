package com.ncu.mfc.controller;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.CtypeAndTno;
import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.Course;
import com.ncu.mfc.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/course")
public class CourseController {

    @Autowired
    CourseService courseService;

    @RequestMapping(value = "/cno",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findCouByCno(@RequestBody String cno){
        ResponseData responseData = new ResponseData();

        Course course = courseService.findCouByCno(cno);

        if(course != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("course",course);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/all",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData findAllCourses(){
        ResponseData responseData = new ResponseData();

        List<Course> courses = courseService.findAllCourse();

        if(courses != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("courses",courses);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/ctype",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findCouByType(@RequestBody String ctype){
        ResponseData responseData = new ResponseData();

        List<Course> courses = courseService.findCouByType(ctype);

        if(courses != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("courses",courses);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/cname",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findCouByCname(@RequestBody String cname){
        ResponseData responseData = new ResponseData();

        Course course = courseService.findCouByCname(cname);

        if(course != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("course",course);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }
    @RequestMapping(value = "/teacher/all",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData findCouByCnameAndTno(@RequestParam String tno){
        ResponseData responseData = new ResponseData();

        List<Course> courses = courseService.findCouByTno(tno);

        if(courses != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("courses",courses);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/cname",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findCouByCnameAndTno(@RequestBody CnameAndTno requestJson){
        ResponseData responseData = new ResponseData();

        List<Course> courses = courseService.findCouByCnameAndTno(requestJson);

        if(courses != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("courses",courses);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/ctype",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findCouByCtypeAndTno(@RequestBody CtypeAndTno requestJson){
        System.out.println(requestJson);
        ResponseData responseData = new ResponseData();

        List<Course> courses = courseService.findCouByCtypeAndTno(requestJson.getCtype(),requestJson.getTno());

        if(courses != null) {
            responseData.setCode(0);
            responseData.setMsg("获取课程数据成功");
            responseData.getData().put("courses",courses);
        }else {
            responseData.setCode(1);
            responseData.setMsg("获取课程数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData updateCourse(@RequestBody Course course){
        ResponseData responseData = new ResponseData();

        int num = courseService.updateCourse(course);

        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("课程数据更新成功");
        }else {
            responseData.setCode(1);
            responseData.setMsg("课程数据更新失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/add",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.PUT)
    public ResponseData addCourse(@RequestBody Course course){
        ResponseData responseData = new ResponseData();

        int num = courseService.insertCourse(course);

        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("添加课程成功");
        }else {
            responseData.setCode(1);
            responseData.setMsg("添加课程失败");
        }
        return responseData;
    }

    @RequestMapping(value = "delete/{cno}",
            consumes = "application/json",
            produces = "application/json",
            method = RequestMethod.DELETE)
    public ResponseData updateCourse(@PathVariable("cno") String cno){
        ResponseData responseData = new ResponseData();

        int num = courseService.delcourse(cno);

        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("删除课程成功");
        }else {
            responseData.setCode(1);
            responseData.setMsg("删除课程失败");
        }
        return responseData;
    }

}
