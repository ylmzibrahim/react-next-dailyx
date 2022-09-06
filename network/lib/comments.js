import axiosClient from "../apiClient";
import axiosAuthedClient from "../apiAuthedClient";

export function getComments(slug) {
  return axiosClient.get(`/articles/${slug}/comments`);
}

export function getCommentsAuthed(slug) {
  return axiosAuthedClient.get(`/articles/${slug}/comments`);
}

export function postCreateComment(slug, data) {
  return axiosAuthedClient.post(`/articles/${slug}/comments`, JSON.stringify(data));
}

export function deleteAComment(slug, id) {
  return axiosAuthedClient.delete(`/articles/${slug}/comments/${id}`);
}
