import axiosClient from "../apiClient";
import axiosAuthedClient from "../apiAuthedClient";

export function getAProfile(username) {
  return axiosClient.get(`/profiles/${username}`);
}

export function getAProfileAuthed(username) {
  return axiosAuthedClient.get(`/profiles/${username}`);
}

export function postFollowUser(username) {
  return axiosAuthedClient.post(`/profiles/${username}/follow`);
}

export function deleteUnfollowUser(username) {
  return axiosAuthedClient.delete(`/profiles/${username}/follow`);
}
