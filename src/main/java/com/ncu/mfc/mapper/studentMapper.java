package com.ncu.mfc.mapper;

import com.ncu.mfc.model.student;

public interface studentMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(String sno);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    int insert(student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    int insertSelective(student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    student selectByPrimaryKey(String sno);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(student record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table student
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(student record);
}