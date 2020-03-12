package com.ncu.mfc.controller;

import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.User;
import com.ncu.mfc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.cert.CertPathValidatorException;

/**
 * @author 杨萌
 */
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/add",
    produces = "application/json",
    method = RequestMethod.PUT)
    public ResponseData addUser(@RequestBody User record) throws IOException {

        ResponseData responseData = new ResponseData();
        int num = userService.addUser(record);
        if(num == 0) {
            responseData.setCode(1);
            responseData.setMsg("添加用户失败");
        } else {
            responseData.setCode(0);
            responseData.setMsg("添加用户成功");
        }
        return responseData;
    }

    @RequestMapping(value = "/delete/{uid}",
    produces = "application/json",
    method = RequestMethod.DELETE)
    public ResponseData delUser(@PathVariable("uid") String uid) {

        ResponseData responseData = new ResponseData();
        int num = userService.delUser(uid);
        if(num == 0) {
            responseData.setCode(1);
            responseData.setMsg("删除用户失败");
        } else {
            responseData.setCode(0);
            responseData.setMsg("删除用户成功");
        }
        return responseData;
    }

    @RequestMapping(value = "/login",
    produces = "appication/json",
    method = RequestMethod.GET)
    public ResponseData login(@RequestBody User record){

        ResponseData responseData = new ResponseData();
        User user = userService.login(record.getUid());
        if(user != null) {
            if(user.equals(record)) {
                responseData.setCode(0);
                responseData.setMsg("登录成功");
                responseData.getData().put("user",user);

            } else {
                responseData.setCode(1);
                responseData.setMsg("密码错误，登录失败");
            }
        } else {
            responseData.setCode(1);
            responseData.setMsg("用户名不存在，登录失败");
        }

        return responseData;

    }

    @RequestMapping(value = "",
    produces = "application/json",
    method = RequestMethod.POST)
    public ResponseData updateUser(@RequestBody User record) {
         ResponseData responseData = new ResponseData();
         int num = userService.updateUser(record);
         if(num == 0) {
             responseData.setCode(1);
             responseData.setMsg("修改失败");
         }else{
             responseData.setCode(0);
             responseData.setMsg("修改成功");
         }
         return responseData;
    }
}
