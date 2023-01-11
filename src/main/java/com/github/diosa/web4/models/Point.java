package com.github.diosa.web4.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import static java.lang.Math.pow;

// поле name = X задает имя таблицы как Х, а не аналогичное названию класса
@Entity
public class Point {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private double x;
  private double y;
  private double r;
  private String res;
  private double exec = 0;
  private LocalDateTime current = LocalDateTime.now();
  private User user;

  public Point() {
  }

  public Point(double x, double y, double r, User user) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.res = "Didn't check";
    this.user = user;
  }

  public double getExec() {
    return exec;
  }

  public void setExec(double exec) {
    this.exec = exec;
  }

  public String getCurrent() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    return current.format(formatter);
  }

  public void setCurrent(LocalDateTime current) {
    this.current = current;
  }

  public String getRes() {
    return this.res;
  }

  public void setRes(String res) {
    this.res = res;
  }

  public double getX() {
    return this.x;
  }

  public void setX(double x) {
    this.x = x;
  }

  public double getY() {
    String strY = String.valueOf(this.y);
    int minus = strY.charAt(0) == '-' ? 1 : 0;
    return Double.parseDouble(strY.replace(",", "."));
  }

  public void setY(double y) {
    this.y = y;
  }

  public double getR() {
    return this.r;
  }

  public void setR(double r) {
    this.r = r;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  private boolean rectangle(double x, double y, double r) {
    return (x >= 0) && (y >= 0) && (x <= r) && (y <= r/2 );
  }

  private boolean circle(double x, double y, double r) {
    return (x < 0) && (y < 0) && (pow(x, 2) + pow(y, 2) <= (pow(r/2, 2)));
  }

  private boolean triangle(double x, double y, double r) {
    return (x < 0) && (y > 0) && (y < x + r);
  }

  public void checkHit() {
    if (circle(this.x, this.y, this.r)) {
      setRes("Точка попала в четверть круга");;
      return;
    }
    if (rectangle(this.x, this.y, this.r)) {
      setRes("Точка попала в прямоугольник");
      return;
    }
    if (triangle(this.x, this.y, this.r)) {
      setRes("Точка попала в треугольник");
      return;
    }
    setRes("Точка не попала в область");
  }
}
