package com.ncu.mfc.controller;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.GradeTnoBtn;
import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.Degree;
import com.ncu.mfc.model.Grade;
import com.ncu.mfc.model.GradeKey;
import com.ncu.mfc.model.Level;
import com.ncu.mfc.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/grade")
public class GradeController {

    @Autowired
    private GradeService gradeService;

    @RequestMapping(value = "/all",
    produces = "application/json",
    method = RequestMethod.GET)
    public ResponseData findAllDegree() {
        ResponseData responseData = new ResponseData();
        List<Degree> grades = gradeService.adminFindDegree();
        if(grades != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩数据成功");
            responseData.getData().put("grades",grades);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/new",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findGraBySnoAndCno(@RequestBody GradeKey record) {
        ResponseData responseData = new ResponseData();
        Degree grade = gradeService.findDegreeByCnoAndSno(record);
        if(grade != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩数据成功");
            responseData.getData().put("grade",grade);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/analyse/all",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData analyseGrade() {
        ResponseData responseData = new ResponseData();
        Level levels = gradeService.analyseAllGrade();
        if(levels != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩分析数据成功");
            responseData.getData().put("levels",levels);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩分析数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/analyse",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData analyse(@RequestParam("cname") String cname) {
        ResponseData responseData = new ResponseData();
        Level levels = gradeService.analyseGrade(cname);
        if(levels != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩分析数据成功");
            responseData.getData().put("levels",levels);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩分析数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/all",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData findDegreeByTno(@RequestParam("tno") String tno) {
        ResponseData responseData = new ResponseData();
        List<Degree> grades = gradeService.findDegreeByTno(tno);
        if(grades != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩数据成功");
            responseData.getData().put("grades",grades);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/btn",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData findDegreeByTno(@RequestBody GradeTnoBtn record) {
        ResponseData responseData = new ResponseData();
        List<Degree> grades = gradeService.findDegreeByTnoBtn(record);
        if(grades != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩数据成功");
            responseData.getData().put("grades",grades);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/analyse",
            produces = "application/json",
            method = RequestMethod.GET)
    public ResponseData analyseByTno(@RequestParam("tno") String tno) {
        ResponseData responseData = new ResponseData();
        Level levels = gradeService.analyseGradeByTno(tno);
        if(levels != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩分析数据成功");
            responseData.getData().put("levels",levels);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩分析数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/teacher/analyse",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData analyseByTno(@RequestBody CnameAndTno record) {
        ResponseData responseData = new ResponseData();
        Level levels = gradeService.analyseByTnoAndCname(record);
        if(levels != null) {
            responseData.setCode(0);
            responseData.setMsg("获取成绩分析数据成功");
            responseData.getData().put("levels",levels);
        }else{
            responseData.setCode(1);
            responseData.setMsg("获取成绩分析数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/add",
            produces = "application/json",
            method = RequestMethod.PUT)
    public ResponseData addDegree(@RequestBody Grade record) {
        ResponseData responseData = new ResponseData();
        int num = gradeService.addDegree(record);
        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("添加成绩数据成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("添加成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "",
            produces = "application/json",
            method = RequestMethod.POST)
    public ResponseData updateDegree(@RequestBody Grade record) {
        ResponseData responseData = new ResponseData();
        int num = gradeService.updateDegree(record);
        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("更新成绩数据成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("更新成绩数据失败");
        }
        return responseData;
    }

    @RequestMapping(value = "/delete",
            produces = "application/json",
            method = RequestMethod.DELETE)
    public ResponseData updateDegree(@RequestBody GradeKey record) {
        ResponseData responseData = new ResponseData();
        int num = gradeService.delDegree(record);
        if(num != 0) {
            responseData.setCode(0);
            responseData.setMsg("删除成绩数据成功");
        }else{
            responseData.setCode(1);
            responseData.setMsg("删除成绩数据失败");
        }
        return responseData;
    }
}
