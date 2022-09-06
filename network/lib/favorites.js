import axiosAuthedClient from "../apiAuthedClient";

export function postFavorite(slug) {
  return axiosAuthedClient.post(`/articles/${slug}/favorite`);
}

export function deleteUnFavorite(slug) {
  return axiosAuthedClient.delete(`/articles/${slug}/favorite`);
}
