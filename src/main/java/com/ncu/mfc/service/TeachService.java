package com.ncu.mfc.service;

import com.github.pagehelper.PageInfo;
import com.ncu.mfc.model.Teach;
import com.ncu.mfc.model.TeachClassKey;

/**
 * @author 杨萌
 */
public interface TeachService {

    PageInfo<Teach> findAllTeach(int pageNum);

    int addTeach(TeachClassKey record);

    int delTeach(TeachClassKey record);

    PageInfo<Teach> findTeachBtn(int pageNum,Teach record);
}
