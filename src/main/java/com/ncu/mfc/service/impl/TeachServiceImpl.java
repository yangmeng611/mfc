package com.ncu.mfc.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.mapper.TeachClassMapper;
import com.ncu.mfc.model.Teach;
import com.ncu.mfc.model.TeachClassKey;
import com.ncu.mfc.service.TeachService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;


@Service
public class TeachServiceImpl implements TeachService {

    @Resource
    private TeachClassMapper teachClassMapper;

    @Override
    public PageInfo<Teach> findAllTeach(int pageNum) {
        PageHelper.startPage(pageNum,7);
        List<Teach> lists = teachClassMapper.selectAllTeach();
        PageInfo<Teach> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }


    @Override
    public int addTeach(TeachClassKey record) {
        return teachClassMapper.insert(record);
    }

    @Override
    public int delTeach(TeachClassKey record) {
        return teachClassMapper.deleteByPrimaryKey(record);
    }

    @Override
    public PageInfo<Teach> findTeachBtn(int pageNum,Teach record) {
        PageHelper.startPage(pageNum,7);
        List<Teach> lists = teachClassMapper.selectTeachBtn(record);
        PageInfo<Teach> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }
}
