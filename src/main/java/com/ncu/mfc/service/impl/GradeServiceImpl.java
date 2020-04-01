package com.ncu.mfc.service.impl;


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
    public List<Degree> adminFindDegree() {
        return gradeDao.selectDegree();
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
    public List<Degree> findDegreeByTno(String tno) {
        return gradeDao.selectGraByTno(tno);
    }

    @Override
    public List<Degree> findDegreeByTnoBtn(GradeBtn record) {
        return gradeDao.selectGraByTnoBtn(record);
    }

    @Override
    public List<Degree> findDegreeByStu(String sno) {
        return gradeDao.selectGraByStu(sno);
    }

    @Override
    public List<Degree> findDegreeByStuBtn(GradeBtn record) {
        return gradeDao.selectGraByStuBtn(record);
    }

    @Override
    public List<Degree> findDegreeByAdminBtn(GradeBtn record) {
        return gradeDao.selectGraByAdminBtn(record);
    }
}
