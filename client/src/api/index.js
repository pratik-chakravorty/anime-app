import axios from "axios";

export const fetchTopAnime = pageCount => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(`https://api.jikan.moe/v3/top/anime/${pageCount}`);
};

export const fetchAnimeDetails = id => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
};

export const fetchAnimeRecommendationsApi = id => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(`https://api.jikan.moe/v3/anime/${id}/recommendations`);
};

export const searchAnime = searchTerm => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(
    `https://api.jikan.moe/v3/search/anime?q=${searchTerm}&page=1`
  );
};

export const fetchStudioAnimesApi = (id, pageCount) => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(`https://api.jikan.moe/v3/producer/${id}/${pageCount}`);
};

export const fetchAnimeByGenreApi = (id, pageCount) => {
  delete axios.defaults.headers.common["x-auth-token"];
  return axios.get(`https://api.jikan.moe/v3/genre/anime/${id}/${pageCount}`);
};

export const loadUserApi = () => {
  return axios.get("/api/current");
};

export const registerUserApi = body => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post("/api/register", body, config);
};

export const loginUserApi = body => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post("/api/login", body, config);
};

export const getCurrentProfileApi = () => {
  return axios.get("/api/profile/me");
};

export const getAllProfilesApi = () => {
  return axios.get("/api/profile/all");
};

export const createProfileApi = body => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post("/api/profile", body, config);
};

export const addWatchListApi = body => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post("/api/profile/watchlist", body, config);
};

export const removeWatchlistApi = id => {
  return axios.delete(`/api/profile/watchlist/${id}`);
};

export const getProfileByIdApi = id => {
  return axios.get(`/api/profile/${id}`);
};

export const addPostApi = body => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post("api/posts", body, config);
};

export const getAllPostApi = () => {
  return axios.get("/api/posts");
};

export const getPostById = id => {
  return axios.get(`/api/posts/${id}`);
};
