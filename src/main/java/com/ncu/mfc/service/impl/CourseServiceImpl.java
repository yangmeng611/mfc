package com.ncu.mfc.service.impl;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.mapper.CourseMapper;
import com.ncu.mfc.mapper.TeacherMapper;
import com.ncu.mfc.model.Course;
import com.ncu.mfc.model.Teacher;
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
    public List<Course> findAllCourse() {
        return courseDao.selectCourses();
    }

    @Override
    public List<Course> findCouByType(String ctype) {

        return courseDao.selectByType(ctype);
    }

    @Override
    public List<Course> findCouByTno(String tno) {
        return courseDao.selectByTno(tno);
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
    public List<Course> findCouByCnameAndTno(CnameAndTno record) {

        return courseDao.selectByTnoAndCname(record);
    }

    @Override
    public List<Course> findCouByCtypeAndTno(String ctype, String tno) {
        return courseDao.selectByTnoAndCtype(ctype,tno);
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

}
