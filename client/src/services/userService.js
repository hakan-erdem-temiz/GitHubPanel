import http from "./httpService";

const apiEndpoint = "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUser(id) {
  return http.get("/users/" + id);
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export function UpdateUser(user) {
  //create
  const body = { ...user };
  delete body._userId;
  console.log("ms:" + user);

  if (user._id) {
    //update
    body.skill_id = body._id;
    delete body._id;
    return http.put(apiEndpoint + "/update/" + user._userId, body);
  } else {
    //create
    delete body._id;
    return http.put(userUrl(user._userId), body);
  }
}

export function deleteUserSkill(skillId, userId) {
  const body = { userId: userId };
  http.put(apiEndpoint + "/deleteSkill/" + skillId, body);
}
