package com.ncu.mfc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.TnoBtn;
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
    public PageInfo<Teacher> findAllTeacher(int pageNum) {

        PageHelper.startPage(pageNum, 7);
        List<Teacher> lists = teacherDao.selectTea();
        PageInfo<Teacher> pageInfo = new PageInfo<>(lists);
        return pageInfo;
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

    @Override
    public PageInfo<Teacher> findTeaBtn(int pageNum,TnoBtn record) {
        PageHelper.startPage(pageNum, 7);
        List<Teacher> lists = teacherDao.selectByBtn(record);
        PageInfo<Teacher> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }


}
