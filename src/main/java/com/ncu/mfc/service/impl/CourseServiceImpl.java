package com.ncu.mfc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.CourseBtn;
import com.ncu.mfc.mapper.CourseMapper;
import com.ncu.mfc.mapper.TeacherMapper;
import com.ncu.mfc.model.Course;
import com.ncu.mfc.service.CourseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Resource
    CourseMapper courseDao;

    @Resource
    TeacherMapper teacherDao;

    @Override
    public PageInfo<Course> findAllCourse(int pageNum) {
        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectCourses();
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Course> findCouByType(int pageNum,String ctype) {
        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectByType(ctype);
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Course> findCouByTno(int pageNum,String tno) {
        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectByTno(tno);
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public Course findCouByCname(String cname) {
        return courseDao.selectByCname(cname);
    }

    @Override
    public Course findCouByCno(String cno) {
        return courseDao.selectByPrimaryKey(cno);
    }

    @Override
    public PageInfo<Course> findCouByCnameAndTno(int pageNum,CnameAndTno record) {
        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectByTnoAndCname(record);
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Course> findCouByCtypeAndTno(int pageNum,String ctype, String tno) {
        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectByTnoAndCtype(ctype,tno);
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public int insertCourse(Course course) {
        return courseDao.insert(course);
    }

    @Override
    public int updateCourse(Course course) {
        return courseDao.updateByPrimaryKeySelective(course);
    }

    @Override
    public int delcourse(String cno) {
        return courseDao.deleteByPrimaryKey(cno);
    }

    @Override
    public PageInfo<Course> findCouBtn(int pageNum,CourseBtn record) {

        PageHelper.startPage(pageNum, 7);
        List<Course> lists = courseDao.selectByBtn(record);
        PageInfo<Course> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

}
