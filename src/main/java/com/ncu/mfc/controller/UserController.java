package com.ncu.mfc.controller;

import com.ncu.mfc.dto.ResponseData;
import com.ncu.mfc.model.User;
import com.ncu.mfc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
    consumes = "application/json",
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
     consumes = "application/json",
    produces = "application/json",
    method = RequestMethod.POST)
    public ResponseData login(@RequestBody User record, HttpServletRequest request){

        ResponseData responseData = new ResponseData();
        User user = userService.login(record.getUid());
        if(user != null) {
            if(user.getUpwd().equals(record.getUpwd())) {
                responseData.setCode(0);
                responseData.setMsg("登录成功");
                responseData.getData().put("user",user);
                request.getSession().setAttribute("account", user);
                request.getSession().setMaxInactiveInterval(3600);

            } else {
                responseData.setCode(1);
                responseData.setMsg("密码错误");
            }
        } else {
            responseData.setCode(1);
            responseData.setMsg("用户名不存在，登录失败");
        }

        return responseData;

    }

    /**
     * 功能：退出登录
     * 权限：用户
     * 描述：将session中的值移出，完成退出登录
     */
    @GetMapping(
            value={"/logout"})
    public ResponseData logOut(HttpServletRequest request){
        ResponseData responseData = new ResponseData();
        HttpSession session = request.getSession();
        if(session!=null){
            User user = (User)session.getAttribute("account");
            session.invalidate();
            responseData.setCode(0);
            responseData.setMsg("成功退出");
        }


        return responseData;
    }

    @RequestMapping(value = "",
    consumes = "application/json",
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
