package com.github.diosa.web4.db;

import com.github.diosa.web4.models.User;

import javax.ejb.Stateless;
import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Stateless
public class UserDB implements Serializable {

  private final String PERSISTENCE_UNIT_NAME = "persistenceUnitName";

  private EntityTransaction transaction;
  private EntityManagerFactory entityManagerFactory;
  private EntityManager entityManager;

  public UserDB() {
    connection();
  }

  private void connection() {
    entityManagerFactory = Persistence.createEntityManagerFactory("persistenceUnitName");
    entityManager = entityManagerFactory.createEntityManager();
    transaction = entityManager.getTransaction();
  }

  public boolean addUser(User newUser) {
    if (!this.registerCheck(newUser)) {
      if (addUserToDB(newUser)) {
        newUser.setRegistered(true);
        newUser.setAuthorized(false);
        return true;
      }
      return false;
    }
    return false;
  }

  public User loginUser(User user){
    if (this.registerCheck(user)) {
      user.setRegistered(true);
      user = this.loadUserFromDB(user.getLogin(), user.getPassword()).get(0);
      user.setAuthorized(true);
      return user;
    }
    return null;
  }

  private boolean addUserToDB(User user){
    try {
      transaction.begin();
      entityManager.persist(user);
      transaction.commit();
      return true;
    } catch (Exception exception) {
      System.out.println(exception.getMessage());
      return false;
    }
  }

  private List<User> loadUserFromDB(String login, String password) {
    List<User> users;
    try {
      transaction.begin();
      Query query = entityManager.createQuery("SELECT e FROM User e WHERE e.login LIKE :login AND e.password LIKE :password")
        .setParameter("login", login).setParameter("password", password);
      users = query.getResultList();
      transaction.commit();
    } catch (RuntimeException exception) {
      if (transaction.isActive()) {
        transaction.rollback();
      }
      throw exception;
    }
    return users;
  }

  private boolean registerCheck(User user) {
    return !loadUserFromDB(user.getLogin(), user.getPassword()).isEmpty();
  }
}
