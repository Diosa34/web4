package com.github.diosa.web4.adapters;

import com.github.diosa.web4.db.PointDB;
import com.github.diosa.web4.models.Point;
import com.github.diosa.web4.models.User;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;

@Stateless
public class PointAdapter {
  @Inject
  private Point point;

  @EJB
  private PointDB pointDB;

  public void addPoint(double x, double y, double r, User user) {
    this.point = new Point(x, y, r, user);
    this.pointDB.addPoint(this.point);
  }

  public List<Point> loadPoints() {
    return this.pointDB.loadPointsFromDB();
  }
}
