import axios from 'axios'
import '../axios'
import { toast } from 'react-toastify';
import React, { useContext, useEffect, useReducer } from 'react'
import {
  SET_LOADING,
  AUTH_CHECK_DONE,

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

  FETCH_ALL_CHAT_SUCESS,
  FETCH_ALL_CHAT_ERROR,

  FETCH_ALL_SYMPTOM_SUCCESS,
  FETCH_ALL_SYMPTOM_ERROR,

  FETCH_PROFILE_INFO_SUCESS,
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
  authChecking:true,
  symptomResult: '',
  ChatResponse: '',
  places: [],
  allSymptom: [],
  allChats: [],
  userInfo: null,
  healthGoal: [],
  
}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setLoading = () => {
    dispatch({ type: SET_LOADING })
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
      toast.success("Sign in succesfully!");
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
      toast.success("Logged in succesfully!");
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR })
      const msg = error?.response?.data?.msg || "Invalid email or password"; // backend msg or fallback
      toast.error(msg);
    }
  }
  const submitSymptom = async (symptoms) => {
    setLoading();
    try {
      const { data } = await axios.post(`/dash/symptom`, {
        symptoms
      })
      dispatch({ type: SUBMIT_SYMPTOMS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: SUBMIT_SYMPTOMS_ERROR })
      const msg = error?.response?.data?.msg || "Symtom Post Error"; // backend msg or fallback
      toast.error(msg);
    }
  }
  const SendMsg = async ({ message }) => {
    setLoading();
    try {
      const { data } = await axios.post(`/dash/chat`, { message })
      dispatch({ type: SEND_CHAT_SUCCESS, payload: data })
      return data;
    } catch (error) {
      dispatch({ type: SEND_CHAT_ERROR })
      
    }
  }
  const GetPlaces = async ({ place }) => {
    if (!place || place.trim() === '') {
      toast.error("Please enter a location to search");
      return;
    }
    setLoading();
    try {
      const { data } = await axios.get(`/dash/places?query=hospital in ${place}`)
      dispatch({ type: FETCH_PLACE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_PLACE_ERROR })
      const msg = error?.response?.data?.msg || "Places find Error"; // backend msg or fallback
      toast.error(msg);
    }
  }
  const getAllChat = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/dash/chat/`)
      dispatch({ type: FETCH_ALL_CHAT_SUCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ALL_CHAT_ERROR })
    }
  }
  const getAllSymptom = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/dash/symptom/`)
      dispatch({ type: FETCH_ALL_SYMPTOM_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_ALL_SYMPTOM_ERROR })
    }
  }
  const getProfileInfo = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`/dash/profile`)
      dispatch({ type: FETCH_PROFILE_INFO_SUCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_INFO_ERROR })
    }
  }
  const getHealthGoals = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`dash/health`)
      dispatch({ type: FETCH_HEALTH_GOAL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: FETCH_HEALTH_GOAL_ERROR })
    }
  }
  const creteHealthGoal = async ({ description, targetDate }) => {
    setLoading();
    try {
      const { data } = await axios.post(`dash/health`, { description: description, targetDate: targetDate })
      dispatch({ type: CREATE_HEALTH_GOAL_SUCCESS,payload:data })
    } catch (error) {
      dispatch({ type: CREATE_HEALTH_GOAL_ERROR })
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
        creteHealthGoal
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
