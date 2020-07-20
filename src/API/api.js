import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "de8b1d88-4e27-4df6-918a-af2ad3f3c274"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data});//мы возвращаем не то, что нам вернул get-запрос,
        //а then, только то , что нам нужно(данные о пользователях)
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data;
            })
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            })
    }
};
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data});
    }
};
export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data});
    }
};


