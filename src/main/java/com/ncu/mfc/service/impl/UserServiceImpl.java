package com.ncu.mfc.service.impl;

import com.ncu.mfc.mapper.UserMapper;
import com.ncu.mfc.service.UserService;
import com.ncu.mfc.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userDao;

    @Override
    public int addUser(User user) {
        return userDao.insert(user);
    }

    @Override
    public int delUser(String uid) {
        return userDao.deleteByPrimaryKey(uid);
    }

    @Override
    public User login(String uid) {
        return userDao.selectByPrimaryKey(uid);
    }

    @Override
    public int updateUser(User user) {
        return userDao.updateByPrimaryKeySelective(user);
    }
}
