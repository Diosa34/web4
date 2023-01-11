package com.github.diosa.web4;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class RouterRecorder extends Application {
  private Set<Class> classes = new HashSet<Class>();

  public RouterRecorder() {
    this.classes.add(Router.class);
  }

  @Override
  public Set<Class<?>> getClasses() {
    return super.getClasses();
  }
}
