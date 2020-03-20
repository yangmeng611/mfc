package com.ncu.mfc.controller;

import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.Teacher;
import com.ncu.mfc.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/teacher")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @RequestMapping(value = "/{tno}",
            produces = "application/json",
            method = RequestMethod.GET
    )
    public ResponseData findTeaByTno(@PathVariable("tno") String tno){

        ResponseData responseData = new ResponseData();
         Teacher teacher = teacherService.findTeaByTno(tno);
         if(teacher != null) {
             responseData.setCode(0);
             responseData.setMsg("教师数据获取成功");
             responseData.getData().put("teacher",teacher);
         }else{
             responseData.setCode(1);
             responseData.setMsg("教师数据获取失败");
         }
         return responseData;
    }

    @RequestMapping(value = "",
    consumes = "application/json",
    produces = "application/json",
    method = RequestMethod.PUT)
    public ResponseData addTeacher(@RequestBody Teacher record){

        ResponseData responseData = new ResponseData();

        int num = teacherService.insertTeaByTno(record);
        if(num == 1) {
            responseData.setCode(0);
            responseData.setMsg("添加教师数据成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("添加教师数据失败");
        }
        return responseData;

    }

    @RequestMapping(value = "",
    consumes = "application/json",
    produces = "application/json",
    method = RequestMethod.POST)
    public ResponseData updateTeacher(@RequestBody Teacher record){

        ResponseData responseData = new ResponseData();
        int num = teacherService.updateTeaByTno(record);
        if(num == 1) {
            responseData.setCode(0);
            responseData.setMsg("更新教师数据成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("更新教师数据失败");
        }
        return responseData;

    }

    @RequestMapping(value = "/{tno}",
    consumes = "application/json",
    produces = "application/json",
    method = RequestMethod.DELETE)
    public ResponseData delTeacher(@PathVariable("tno") String tno){
        ResponseData responseData = new ResponseData();
        int num = teacherService.delTeaByTno(tno);
        if(num == 1) {
            responseData.setCode(0);
            responseData.setMsg("删除成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("删除失败");
        }
        return responseData;
    }
}
