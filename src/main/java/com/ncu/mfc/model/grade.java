package com.ncu.mfc.model;

public class Grade extends GradeKey {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column grade.degree
     *
     * @mbggenerated
     */
    private String degree;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column grade.degree
     *
     * @return the value of grade.degree
     *
     * @mbggenerated
     */
    public String getDegree() {
        return degree;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column grade.degree
     *
     * @param degree the value for grade.degree
     *
     * @mbggenerated
     */
    public void setDegree(String degree) {
        this.degree = degree == null ? null : degree.trim();
    }
}