package com.ncu.mfc;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.ncu.mfc.mapper")
public class MfcApplication {

    public static void main(String[] args) {
        SpringApplication.run(MfcApplication.class, args);
    }

}
