import axios from 'axios'
import '../axios'
import { getErrorMessage } from '../utils/Error'
import { toast } from 'react-toastify';
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  AUTH_CHECK_DONE,
  SET_ERROR,

  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,

  LOGOUT_USER,
  SET_USER,

  SUBMIT_SYMPTOMS_SUCCESS,
  SUBMIT_SYMPTOMS_ERROR,

  SEND_CHAT_SUCCESS,
  SEND_CHAT_ERROR,

  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_ERROR,

  FETCH_ALL_CHAT_SUCCESS,
  FETCH_ALL_CHAT_ERROR,

  FETCH_ALL_SYMPTOM_SUCCESS,
  FETCH_ALL_SYMPTOM_ERROR,

  FETCH_PROFILE_INFO_SUCCESS,
  FETCH_PROFILE_INFO_ERROR,

  CREATE_HEALTH_GOAL_SUCCESS,
  CREATE_HEALTH_GOAL_ERROR,

  FETCH_HEALTH_GOAL_SUCCESS,
  FETCH_HEALTH_GOAL_ERROR

} from './action'
import reducer from './reducer'
const initialState = {
  user: null,
  isLoading: false,
  authChecking: true,
  symptomResult: '',
  ChatResponse: '',
  places: [],
  allSymptom: [],
  allChats: [],
  userInfo: null,
  healthGoal: [],
  errorMsg: null
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }
  const setError = () => {
    dispatch({ type: SET_ERROR })
  }
  // register
  const register = async ({ name, email, password }) => {
    setLoading()
    try {
      const { data } = await axios.post
        (`/auth/signup`,
          {
            name: name, email: email, password: password
          })
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
      toast.success("Sign in succcesfully!");
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
      const msg = error?.response?.data?.msg || "Invalid Credentials"; // backend msg or fallback
      toast.error(msg);
    }
  }

  // login
  const login = async ({ email, password }) => {
    setLoading()
    try {
      const { data } = await axios.post(`/auth/login`, {
        email: email, password: password
      })
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user.name })
      localStorage.setItem(
        'user',
        JSON.stringify({ name: data.user.name, token: data.token })
      )
      toast.success("Logged in succcesfully!");
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
      const msg = error?.response?.data?.message || "Invalid email or password"; // backend msg or fallback
      toast.error(msg);
    }
  }
  const submitSymptom = async (symptoms) => {
    setLoading();
    setError();
    try {
      const { data } = await axios.post(`/dash/symptom`, {
        symptoms
      })
      dispatch({ type: SUBMIT_SYMPTOMS_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = error.response?.data?.message || 'We couldn\'t save your symptom report right now. Please try again in a moment.';
      dispatch({ type: SUBMIT_SYMPTOMS_ERROR, payload: errMsg })
      toast.error(errMsg);
    }
  }
  const SendMsg = async ({ message }) => {
    setLoading();
    setError();
    try {
      const { data } = await axios.post(`/dash/chat`, { message })
      dispatch({ type: SEND_CHAT_SUCCESS, payload: data })
      return data;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Your message could not be sent at the moment. Please try again shortly.';
      dispatch({ type: SEND_CHAT_ERROR, payload: errMsg })
      toast.error(errMsg)
    }
  }
  const GetPlaces = async ({ place }) => {
    if (!place || place.trim() === '') {
      toast.error("Please enter a location to search");
      return;
    }
    setLoading();
    setError();
    try {
      const { data } = await axios.get(`/dash/places?query=hospital in ${place}`)
      dispatch({ type: FETCH_PLACE_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      dispatch({ type: FETCH_PLACE_ERROR, payload: errMsg })
    }
  }
  const getAllChat = async () => {
    setLoading();
    setError();
    try {
      const { data } = await axios.get(`/dash/chat/`)
      dispatch({ type: FETCH_ALL_CHAT_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = getErrorMessage(error, "Failed to fetch Chats information.");
      dispatch({ type: FETCH_ALL_CHAT_ERROR, payload: errMsg })
    }
  }
  const getAllSymptom = async () => {
    setLoading();
    setError();
    try {
      const { data } = await axios.get(`/dash/symptom/`)
      dispatch({ type: FETCH_ALL_SYMPTOM_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = getErrorMessage(error, "Failed to fetch Symptom information.");
      dispatch({ type: FETCH_ALL_SYMPTOM_ERROR, payload: errMsg })
    }
  }
  const getProfileInfo = async () => {
    setLoading();
    setError();
    try {
      const { data } = await axios.get(`/dash/profile`)
      dispatch({ type: FETCH_PROFILE_INFO_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = getErrorMessage(error, "Failed to fetch profile information.");
      dispatch({ type: FETCH_PROFILE_INFO_ERROR, payload: errMsg });
    }
  }
  const getHealthGoals = async () => {
    setLoading();
    setError();
    try {
      const { data } = await axios.get(`/dash/health`)
      dispatch({ type: FETCH_HEALTH_GOAL_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = getErrorMessage(error, "Failed to fetch HealthGoal information.");
      dispatch({ type: FETCH_HEALTH_GOAL_ERROR, payload: errMsg })
    }
  }
  const createHealthGoal = async ({ description, targetDate }) => {
    setLoading();
    setError();
    try {
      const { data } = await axios.post(`/dash/health`, { description: description, targetDate: targetDate })
      dispatch({ type: CREATE_HEALTH_GOAL_SUCCESS, payload: data })
    } catch (error) {
      const errMsg = getErrorMessage(error, "Failed to Create HealthGoal .");
      dispatch({ type: CREATE_HEALTH_GOAL_ERROR, payload: errMsg })
    }
  }
  // logout
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: LOGOUT_USER })
  }
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const newUser = JSON.parse(user)
      dispatch({ type: SET_USER, payload: newUser.name })
    }
    dispatch({ type: AUTH_CHECK_DONE })
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        register,
        login,
        logout,
        submitSymptom,
        SendMsg,
        GetPlaces,
        getAllChat,
        getAllSymptom,
        getProfileInfo,
        getHealthGoals,
        createHealthGoal
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
