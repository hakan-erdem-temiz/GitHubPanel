import http from "./httpService";

const apiEndpoint = "/events";

export function getEvents() {
  return http.get(apiEndpoint);
}

export function fetchEventsbyNames() {
  return http.get(`${apiEndpoint}/byname`);
}

export function fetchEventsbyDate() {
  return http.get(`${apiEndpoint}/bydate`);
}
