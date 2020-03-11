package com.ncu.mfc.service;

import com.ncu.mfc.model.Classes;

import java.util.List;

/**
 * @author 杨萌
 */
public interface course {

    /**
     * @return 查询所有课程
     */
    List<Classes> findAllCourse();

    /**
     * @return 根据课程性质查询课程
     */
    List<Classes> findCouByType();

    /**
     * @return 查询某教师教授课程
     */
    List<Classes> findCouByTno();

    /**
     * @return 通过课程名称查找课程
     */
    Classes findCouByCname();

    /**
     * @return 通过课程编号查找课程
     */
    Classes findCouByCno();

    /**
     * @return 查询某教师教授的指定课程名称的课程
     */
    Classes findCouByCnameAndTno();

    /**
     * @return 添加课程
     */
    int insertCourse();

    /**
     * @return 修改课程信息
     */
    int updateCourse();

    /**
     * @return 删除课程信息
     */
    int delcourse();
}
