package com.ncu.mfc.model;

public class TeachClassKey {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column teach_class.teano
     *
     * @mbggenerated
     */
    private String teano;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column teach_class.cno
     *
     * @mbggenerated
     */
    private String cno;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column teach_class.teano
     *
     * @return the value of teach_class.teano
     *
     * @mbggenerated
     */
    public String getTeano() {
        return teano;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column teach_class.teano
     *
     * @param teano the value for teach_class.teano
     *
     * @mbggenerated
     */
    public void setTeano(String teano) {
        this.teano = teano == null ? null : teano.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column teach_class.cno
     *
     * @return the value of teach_class.cno
     *
     * @mbggenerated
     */
    public String getCno() {
        return cno;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column teach_class.cno
     *
     * @param cno the value for teach_class.cno
     *
     * @mbggenerated
     */
    public void setCno(String cno) {
        this.cno = cno == null ? null : cno.trim();
    }
}