package com.ncu.mfc.service.impl;

import com.ncu.mfc.mapper.TeacherMapper;
import com.ncu.mfc.model.Teacher;
import com.ncu.mfc.service.TeacherService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Resource
    private TeacherMapper teacherDao;

    @Override
    public List<Teacher> findAllTeacher() {
        return null;
    }

    @Override
    public Teacher findTeaByTno(String tno) {
        return teacherDao.selectByPrimaryKey(tno);
    }

    @Override
    public int updateTeaByTno(Teacher teacher) {
        return teacherDao.updateByPrimaryKeySelective(teacher);
    }

    @Override
    public int insertTeaByTno(Teacher teacher) {
        return teacherDao.insert(teacher);
    }

    @Override
    public int delTeaByTno(String tno) {
        return teacherDao.deleteByPrimaryKey(tno);
    }
}
