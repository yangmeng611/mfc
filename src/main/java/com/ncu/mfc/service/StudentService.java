package com.ncu.mfc.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.model.Student;

import java.util.List;

public interface StudentService {

    /**
     * @return 获取所有学生信息
     */
    PageInfo<Student> findAllStu(int pageNum);

    /**
     * @return 通过学号获取学生信息
     */
    Student getStuBySno(String sno);

    /**
     * @return 修改学生信息
     */
    int updateStuBySno(Student stu);

    /**
     * @return 添加学生
     */
    int insertStu(Student stu);

    /**
     * @return 删除学生
     */
    int delTeaByTno(String sno);

    PageInfo<Student> findStuByBtn(int pageNum,Student student);


}
