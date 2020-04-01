package com.ncu.mfc.dto;

/**
 * @author 杨萌
 */
public class TnoBtn {

    private String Tno;
    private String Tname;
    private String tdepart;
    private String cname;

    public String getTno() {
        return Tno;
    }

    public void setTno(String tno) {
        Tno = tno;
    }

    public String getTname() {
        return Tname;
    }

    public void setTname(String tname) {
        Tname = tname;
    }

    public String getTdepart() {
        return tdepart;
    }

    public void setTdepart(String tdepart) {
        this.tdepart = tdepart;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }
}
