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

        Course course = courseService.findCouByCnameAndTno(requestJson.getCname(),requestJson.getTno());

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
}
