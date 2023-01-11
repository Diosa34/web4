package com.github.diosa.web4.adapters;


import com.github.diosa.web4.db.UserDB;
import com.github.diosa.web4.models.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class UserAdapter {
  @Inject
  private User user;

  @EJB
  private UserDB userDB;

  public boolean addUser(String name, String login, String password){
    this.user = new User(name, login, password, false, false);
    return userDB.addUser(this.user);
  }

  public User loginUser(String login, String password) {
    this.user = new User(null, login, password, false, false);
    return userDB.loginUser(this.user);
  }

  public void logoutUser(User user) {
    user.setAuthorized(false);
  }
}
