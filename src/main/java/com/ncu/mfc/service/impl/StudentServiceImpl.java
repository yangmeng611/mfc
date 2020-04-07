package com.ncu.mfc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.mapper.StudentMapper;
import com.ncu.mfc.model.Student;
import com.ncu.mfc.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author 杨萌
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper studentDao;

    @Override
    public PageInfo<Student> findAllStu(int pageNum) {
        PageHelper.startPage(pageNum,7);
        List<Student> lists = studentDao.selectStu();
        PageInfo<Student> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public Student getStuBySno(String sno) {
        return studentDao.selectByPrimaryKey(sno);
    }

    @Override
    public int updateStuBySno(Student stu) {
        return studentDao.updateByPrimaryKeySelective(stu);
    }

    @Override
    public int insertStu(Student stu) {
        return studentDao.insert(stu);
    }

    @Override
    public int delTeaByTno(String sno) {
        return studentDao.deleteByPrimaryKey(sno);
    }

    @Override
    public PageInfo<Student> findStuByBtn(int pageNum,Student student) {
        PageHelper.startPage(pageNum,7);
        List<Student> lists = studentDao.selectStuByBtn(student);
        PageInfo<Student> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

}
