package com.github.diosa.web4.db;

import com.github.diosa.web4.models.Point;

import javax.ejb.Stateless;
import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Stateless
public class PointDB implements Serializable {

  private final String PERSISTENCE_UNIT_NAME = "persistenceUnitName";

  private EntityTransaction transaction;
  private EntityManagerFactory entityManagerFactory;
  private EntityManager entityManager;

  public PointDB() {
    connection();
  }

  private void connection() {
    entityManagerFactory = Persistence.createEntityManagerFactory("persistenceUnitName");
    entityManager = entityManagerFactory.createEntityManager();
    transaction = entityManager.getTransaction();
  }

  public List<Point> loadPointsFromDB() {
    List<Point> points;
    try {
      transaction.begin();
      Query query = entityManager.createQuery("SELECT e FROM Point e");
      points = query.getResultList();
      transaction.commit();
    } catch (RuntimeException exception) {
      if (transaction.isActive()) {
        transaction.rollback();
      }
      throw exception;
    }
    return points;
  }

  public void addPoint(Point newPoint) {
    long startTime = System.nanoTime();
    newPoint.checkHit();
    newPoint.setCurrent(LocalDateTime.now());
    newPoint.setExec((System.nanoTime() - startTime) / 1000000d);
    try {
      addPointToDB(newPoint);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private void addPointToDB(Point point){
    try {
      transaction.begin();
      entityManager.persist(point);
      transaction.commit();
    } catch (Exception exception) {
      System.out.println(exception.getMessage());
    }
  }
}
