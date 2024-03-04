import axios from "axios";
import useSWR from "swr";

export const API = axios.create({
  baseURL: import.meta.env.VITE_APP_D_CORE_URL,
  headers: {
    Authorization: JSON.parse(localStorage.getItem('loggedInUser'))?.Access_Token,
  },
});

export const fetcher = async (path) => {
  return API.get(path)
    .then((res) => res.data)
    .catch((error) => {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred"
      );
    });
};

export const useFetcher = (pathname, opts) => {
  const { data, error, isLoading } = useSWR(pathname, fetcher, opts);
  return {
    data,
    isLoading: isLoading || (!error && !data),
    isError: error,
  };
};

//AUTHENTICATION
export const signUp = (formData) => API.post("/auth", formData);
export const signIn = (formData) => API.post("/auth/loginUser", formData);
export const loggedInUser = () => {
  return API.get(`/auth/loggedInUser`);
};
export const logoutUser = () => {
  return API.post(`/auth/logoutUser`);
};
export const googleAuth = (formData) => API.post("/auth/googleAuth", formData);
export const forgotPassword = (formData) =>
  API.post("/auth/forgotPassword", formData);
export const newPassword = (formData) => API.put("/auth/newPassword", formData, {
  headers: {
    ForgotPasswordToken: JSON.parse(localStorage.getItem('forgotPasswordToken')),
  },
});
export const updateUser = (formData) => API.put("/auth/updateUser", formData);
export const showCertificateMessage = (data) =>
  API.put("/auth/certificateMessageDisplayed", data);

//BLOGS
export const getBlogs = ({ keyword }) => {
  return API.get(`/posts/getAllPosts?keyword=${keyword}`);
};
export const getSingleProject = (slug) =>
  API.get(`/projects/getSingleProject?slug=${slug}`);

/* 
 LIKES, REPLIES AND COMMENTS
*/

//Liking or unliking
export const likePost = (blogId) => {
  return API.post("/posts/likePost/" + blogId);
};
//CRUD comments
export const addComment = (body, blogId) =>
  API.post("/posts/createComment/" + blogId, body);

export const getComments = (blogId) => API.get("/posts/comments/" + blogId);

export const deleteComment = (commentId) =>
  API.delete("/posts/deleteComment/" + commentId);

export const updateComment = (commentId, body) =>
  API.put("/posts/updateComment/" + commentId, body);

export const likeComment = (commentId) =>
  API.post("/posts/likeComment/" + commentId);

export const addReply = (commentId, body) =>
  API.post("/posts/commentReply/" + commentId, body);

export const getReplies = (commentId) =>
  API.get("/posts/getAllCommentReplies/" + commentId);

export const getFeaturedBlog = async () => {
  try {
    const result = await API.get("/posts/featured");
    if (result.data?.blog?.title) {
      return result.data?.blog;
    }
  } catch (error) {
    return false;
  }
};
