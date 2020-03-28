package com.ncu.mfc.service;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.model.Course;

import java.util.List;

/**
 * @author 杨萌
 */
public interface CourseService {

    /**
     * @return 查询所有课程
     */
    List<Course> findAllCourse();

    /**
     * @return 根据课程性质查询课程
     */
    List<Course> findCouByType(String ctype);

    /**
     * @return 查询某教师教授课程
     */
    List<Course> findCouByTno(String tno);

    /**
     * @return 通过课程名称查找课程
     */
    Course findCouByCname(String cname);

    /**
     * @return 通过课程编号查找课程
     */
    Course findCouByCno(String cno);

    /**
     * @return 查询某教师教授的指定课程名称的课程
     */
    List<Course> findCouByCnameAndTno(CnameAndTno record);
    /**
     * @return 查询某教师教授的指定课程性质的课程
     */
    List<Course> findCouByCtypeAndTno(String ctype,String tno);
    /**
     * @return 添加课程
     */
    int insertCourse(Course course);

    /**
     * @return 修改课程信息
     */
    int updateCourse(Course course);

    /**
     * @return 删除课程信息
     */
    int delcourse(String cno);
}
