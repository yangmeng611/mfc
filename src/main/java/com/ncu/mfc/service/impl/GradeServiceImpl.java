package com.ncu.mfc.service.impl;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.GradeBtn;
import com.ncu.mfc.mapper.GradeMapper;
import com.ncu.mfc.model.Degree;
import com.ncu.mfc.model.Grade;
import com.ncu.mfc.model.GradeKey;
import com.ncu.mfc.model.Level;
import com.ncu.mfc.service.GradeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class GradeServiceImpl implements GradeService {

    @Resource
    private GradeMapper gradeDao;

    @Override
    public PageInfo<Degree> adminFindDegreePage(int pageNum) {
        // TODO Auto-generated method stub
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectDegree();
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;

    }


    @Override
    public int updateDegree(Grade grade) {
        return gradeDao.updateByPrimaryKeySelective(grade);
    }

    @Override
    public int addDegree(Grade grade) {
        return gradeDao.insert(grade);
    }

    @Override
    public int delDegree(GradeKey gradeKey) {
        return gradeDao.deleteByPrimaryKey(gradeKey);
    }

    @Override
    public Degree findDegreeByCnoAndSno(GradeKey gradeKey) {
        return gradeDao.selectGraByCnoAndSno(gradeKey);
    }

    @Override
    public Level analyseAllGrade() {
        return gradeDao.analyseAllGrade();
    }

    @Override
    public Level analyseGrade(String cno) {
        return gradeDao.analyseGrade(cno);
    }

    @Override
    public Level analyseGradeByTno(String tno) {
        return gradeDao.analyseGradeByTno(tno);
    }

    @Override
    public Level analyseByTnoAndCname(CnameAndTno record) {
        return gradeDao.analyseGradeByTnoAndCname(record);
    }

    @Override
    public PageInfo<Degree> findDegreeByTno(int pageNum,String tno)
    {
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectGraByTno(tno);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Degree> findDegreeByTnoBtn(int pageNum,GradeBtn record) {
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectGraByTnoBtn(record);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Degree> findDegreeByStu(int pageNum,String sno) {
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectGraByStu(sno);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Degree> findDegreeByStuBtn(int pageNum,GradeBtn record) {
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectGraByStuBtn(record);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Degree> findDegreeByAdminBtn(int pageNum,GradeBtn record) {
        PageHelper.startPage(pageNum, 7);
        List<Degree> lists = gradeDao.selectGraByAdminBtn(record);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }

    @Override
    public PageInfo<Degree> findByAdminBtn(int pageNum, GradeBtn record) {
        PageHelper.startPage(pageNum,7);
        List<Degree> lists = gradeDao.selectByAdminBtn(record);
        PageInfo<Degree> pageInfo = new PageInfo<>(lists);
        return pageInfo;
    }
}
