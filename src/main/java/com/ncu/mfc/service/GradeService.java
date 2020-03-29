package com.ncu.mfc.service;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.GradeBtn;
import com.ncu.mfc.model.Degree;
import com.ncu.mfc.model.Grade;
import com.ncu.mfc.model.GradeKey;
import com.ncu.mfc.model.Level;

import java.util.List;

public interface GradeService {

    List<Degree> adminFindDegree();

    int updateDegree(Grade grade);

    int addDegree(Grade grade);

    int delDegree(GradeKey gradeKey);

    Degree findDegreeByCnoAndSno(GradeKey gradeKey);

    Level analyseAllGrade();

    Level analyseGrade(String cno);

    Level analyseGradeByTno(String tno);

    Level analyseByTnoAndCname(CnameAndTno record);

    List<Degree> findDegreeByTno(String tno);

    List<Degree> findDegreeByTnoBtn(GradeBtn record);

    List<Degree> findDegreeByStu(String sno);

    List<Degree> findDegreeByStuBtn(GradeBtn record);
}
