package com.ncu.mfc.service;

import com.github.pagehelper.PageInfo;
import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.GradeBtn;
import com.ncu.mfc.model.Degree;
import com.ncu.mfc.model.Grade;
import com.ncu.mfc.model.GradeKey;
import com.ncu.mfc.model.Level;


public interface GradeService {


    PageInfo<Degree> adminFindDegreePage(int pageNum);

    int updateDegree(Grade grade);

    int addDegree(Grade grade);

    int delDegree(GradeKey gradeKey);

    Degree findDegreeByCnoAndSno(GradeKey gradeKey);

    Level analyseAllGrade();

    Level analyseGrade(String cno);

    Level analyseGradeByTno(String tno);

    Level analyseByTnoAndCname(CnameAndTno record);

    PageInfo<Degree> findDegreeByTno(int pageNum, String tno);

    PageInfo<Degree> findDegreeByTnoBtn(int pageNum, GradeBtn record);

    PageInfo<Degree> findDegreeByStu(int pageNum,String sno);

    PageInfo<Degree> findDegreeByStuBtn(int pageNum,GradeBtn record);

    PageInfo<Degree> findDegreeByAdminBtn(int pageNum, GradeBtn record);

    PageInfo<Degree> findByAdminBtn(int pageNum, GradeBtn record);
}
