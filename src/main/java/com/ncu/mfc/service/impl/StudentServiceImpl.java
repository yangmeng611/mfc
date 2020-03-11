package com.ncu.mfc.service.impl;

import com.ncu.mfc.mapper.StudentMapper;
import com.ncu.mfc.model.Student;
import com.ncu.mfc.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 杨萌
 */
@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentMapper studentDao;

    @Override
    public List<Student> findAllStudent() {
        return null;
    }

    @Override
    public Student getStuBySno(String sno) {
        return studentDao.selectByPrimaryKey(sno);
    }

    @Override
    public int updateStuBySno(Student stu) {
        return studentDao.updateByPrimaryKey(stu);
    }

    @Override
    public int insertStu(Student stu) {
        return studentDao.insert(stu);
    }

    @Override
    public int delTeaByTno(String sno) {
        return studentDao.deleteByPrimaryKey(sno);
    }
}
