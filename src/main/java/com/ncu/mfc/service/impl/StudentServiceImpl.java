package com.ncu.mfc.service.impl;

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
    public List<Student> findAllStu() {
        return studentDao.selectStu();
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
    public List<Student> findStuByBtn(Student student) {
        return studentDao.selectStuByBtn(student);
    }

}
