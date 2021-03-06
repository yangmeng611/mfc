package com.ncu.mfc.mapper;

import com.ncu.mfc.dto.CnameAndTno;
import com.ncu.mfc.dto.CourseBtn;
import com.ncu.mfc.model.Course;
import com.ncu.mfc.model.GradeKey;
import com.ncu.mfc.model.Learn;

import java.util.List;

public interface CourseMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(String cno);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    int insert(Course record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    int insertSelective(Course record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    Course selectByPrimaryKey(String cno);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Course record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table course
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Course record);

    List<Course> selectByType(String ctype);

    List<Course> selectByTno(String tno);

    Course selectByCname(String cname);

    List<Course> selectByTnoAndCname(CnameAndTno record);

    List<Course> selectByTnoAndCtype(String ctype,String tno);

    List<Course> selectCourses();

    List<Course> selectByBtn(CourseBtn record);

    List<Learn> selectLearn();

    List<Learn> selectLearnBtn(CourseBtn record);

    int insertLearn(CourseBtn record);

    int deleteLearn(GradeKey gradeKey);
}