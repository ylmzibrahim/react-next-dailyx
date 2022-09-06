import axiosClient from "../apiClient";
import axiosAuthedClient from "../apiAuthedClient";

export function getArticlesFeed(){
    return axiosAuthedClient.get('/articles/feed');
}

export function getArticlesGlobalFeed(query = ""){
    return axiosClient.get(`/articles${query}`);
}

export function getArticlesGlobalFeedAuthed(query = ""){
    return axiosAuthedClient.get(`/articles${query}`);
}

export function postCreateArticle(data){
    return axiosAuthedClient.post('/articles', JSON.stringify(data));
}

export function getAnArticle(slug){
    return axiosClient.get(`/articles/${slug}`);
}

export function getAnArticleAuthed(slug){
    return axiosAuthedClient.get(`/articles/${slug}`);
}

export function putAnArticle(slug, data){
    return axiosAuthedClient.put(`/articles/${slug}`, JSON.stringify(data));
}

export function deleteAnArticle(slug){
    return axiosAuthedClient.delete(`/articles/${slug}`);
}