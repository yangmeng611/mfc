package com.ncu.mfc.service;

import com.ncu.mfc.model.User;

public interface UserService {

    /**
     * @return 添加用户
     */
    int addUser(User record);

    /**
     * @return 删除用户
     */
    int delUser(String uid);

    /**
     * @return 用户登录
     */
    User login(String uid);

    /**
     * @param user
     * @return 更新密码
     */
    int updateUser(User user);
}
