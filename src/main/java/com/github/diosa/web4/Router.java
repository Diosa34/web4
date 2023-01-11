package com.github.diosa.web4;

import com.github.diosa.web4.adapters.PointAdapter;
import com.github.diosa.web4.adapters.UserAdapter;
import com.github.diosa.web4.models.User;

import javax.ejb.EJB;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.json.Json;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Path("/")
public class Router extends Application {
  @EJB
  private UserAdapter userAdapter;

  @EJB
  private PointAdapter pointAdapter;

  @Inject
  User user;

  @POST
  @Path("login/submit")
  public Response login(String json) {
    //TODO();
    return null;
  }

  @POST
  @Path("sign-up/submit")
  public Response signUp(Json json) {
    //TODO();
    return null;
  }

  //Принимает одну точку и возвращает все точки из БД
  @POST
  @Path("main-page/submit")
  public Response addPoint(Json json) {
    //TODO();
    return null;
  }

  @GET
  @Path("main-page/table-init")
  public Response getPoints() {
    //TODO();
    return null;
  }
}
