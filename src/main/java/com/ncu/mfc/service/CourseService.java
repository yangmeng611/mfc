package com.ncu.mfc.service;

import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.CourseBtn;
import com.ncu.mfc.model.Course;


/**
 * @author 杨萌
 */
public interface CourseService {

    /**
     * @return 查询所有课程
     */
    PageInfo<Course> findAllCourse(int pageNum);

    /**
     * @return 根据课程性质查询课程
     */
    PageInfo<Course> findCouByType(int pageNum,String ctype);

    /**
     * @return 查询某教师教授课程
     */
    PageInfo<Course> findCouByTno(int pageNum,String tno);

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
    PageInfo<Course> findCouByCnameAndTno(int pageNum,CnameAndTno record);
    /**
     * @return 查询某教师教授的指定课程性质的课程
     */
    PageInfo<Course> findCouByCtypeAndTno(int pageNum,String ctype,String tno);
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

    PageInfo<Course> findCouBtn(int pageNum,CourseBtn record);
}
