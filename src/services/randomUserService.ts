import http from "k6/http";

export function getRandomUsers(count: number) {

  const url = `https://randomuser.me/api/?results=${count}`;

  return http.get(url);

}