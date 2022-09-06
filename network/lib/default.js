import axiosClient from "../apiClient";
import axiosAuthedClient from "../apiAuthedClient";

export function getTags() {
  return axiosClient.get(`/tags`);
}

export function getTagsAuthed() {
  return axiosAuthedClient.get(`/tags`);
}