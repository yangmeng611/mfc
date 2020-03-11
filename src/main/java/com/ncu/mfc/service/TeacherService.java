package com.ncu.mfc.service;

import com.ncu.mfc.model.Teacher;

import java.util.List;

/**
 * @author 杨萌
 */
public interface TeacherService {

    /**
     * @return 查询所有教师
     */
    List<Teacher> findAllTeacher();

    /**
     * @return 查询指定教师信息
     */
    Teacher findTeaByTno();

    /**
     * @return 修改教师信息
     */
    int updateTeaByTno();

    /**
     * @return 添加教师信息
     */
    int insertTeaByTno();

    /**
     * @return 删除教师信息
     */
    int delTeaByTno();
}
