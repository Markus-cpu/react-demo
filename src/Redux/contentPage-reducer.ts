import {profileAPI} from '../API/api'
import {PhotosType, PostType, ProfileType} from '../types/types'
import {ThunkAction} from 'redux-thunk'
import {AppStateType} from './redux-store'

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'
const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        {id: 1, post: 'React изначально был спроектирован так, чтобы его можно было внедрять постепенно.'},
        {id: 2, post: 'Но раньше, в старые времена, прямого доступа к прототипу объекта не было.'},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    addNewPostText: ''
}

export type InitialStateType = typeof initialState
// Actions Types
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
type UpdateUserStatusAT = {
    type: typeof UPDATE_USER_STATUS
    status: string
}
type AddPostAT = {
    type: typeof ADD_POST
    addNewPostText: string
    postId: number
}
type DeletePostAT = {
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuccessAT = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType | null
}

type ActionsTypes = SetUserProfileActionType | SetUserStatusActionType | UpdateUserStatusAT |
    AddPostAT | DeletePostAT | SavePhotoSuccessAT

//здесь принимаем тот state, который необходим данному reducer
const contentPageReducer =(state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: action.postId,
                post: action.addNewPostText
            };
            return {//сразу возвращаем данный обьект, и не нужно создавать stateCopy(переменную)
                ...state,
                posts: [...state.posts, newPost],
                addNewPostText: ' '
                //слева закидываем старый массив с данными
                //а справа записываем новый элемент
            };//создание копии объекта state поверхностно
            /*stateCopy.mypostData = [...state.mypostData]; //копируем отдельно массив mypostData
            stateCopy.mypostData.push(newPost);//
            stateCopy.myNewPost = '';*/
            /*state.mypostData.push(newPost);//я обращаюсь к contentPage  по имени параметра
            state.myNewPost = '';*/
            //return stateCopy;//возвращаем измененный state
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case UPDATE_USER_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            debugger
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos} as ProfileType | null
            }
        }
        default:
            return state;
    }
}

const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
const setUserStatus = (status: string): SetUserStatusActionType => ({type: SET_USER_STATUS, status})
const updateUserStatus = (status: string): UpdateUserStatusAT => ({type: UPDATE_USER_STATUS, status})
export const addPost = (addNewPostText: string, postId: number): AddPostAT => ({type: ADD_POST, addNewPostText, postId})
export const deletePost = (postId: number): DeletePostAT => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos: PhotosType | null): SavePhotoSuccessAT => ({type: SAVE_PHOTO_SUCCESS, photos})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

//Function Thunk
export const getProfile = (userId: number): ThunkType => async (dispatch: any) => {
    try {
        const data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data));
    } catch(e) {
        console.error(e.message)
    }
}

//санка для получения статуса
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch)=> {
        try {
            let data = await profileAPI.getStatus(userId)
            dispatch(setUserStatus(data.status))
        } catch (e) {
            console.error(e.message)
        }
    }
}

//перезагрузка статуса
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if(data.resultCode === 0) {
            dispatch(updateUserStatus(data.status));
        }
    } catch(e) {
        console.error(e.message);
    }
}

//санка для отправки фото пользователя
export const savePhoto = (file: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.savePhoto(file)
        if(data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.photos));
        }
    } catch(e) {
        console.error(e.message);
    }
}

export default  contentPageReducer;