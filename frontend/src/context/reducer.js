import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  SET_USER,
  LOGOUT_USER,
  SET_LOADING,
  AUTH_CHECK_DONE,
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

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true}
  }
  if(action.type===AUTH_CHECK_DONE){
    return {...state,authChecking:false}
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload,
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      user: null,
    }
  }

  if (action.type === SET_USER) {
    return { ...state, user: action.payload }
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
    }
  }
  if(action.type===SUBMIT_SYMPTOMS_SUCCESS){
     return { 
      ...state, 
      isLoading: false,
      symptomResult: action.payload 
    }
  }
  if(action.type===SUBMIT_SYMPTOMS_ERROR){
     return { 
      ...state, 
      isLoading: false,
      symptomResult: null 
    }
  }
  if(action.type===SEND_CHAT_SUCCESS){
     return {
       ...state,
       isLoading:false,
       ChatResponse:action.payload
     }
  }
  if(action.type===SEND_CHAT_ERROR){
      return{
        ...state,
        isLoading:false,
        ChatResponse:null
      }
  }
  if(action.type===FETCH_PLACE_SUCCESS){
         return{
              ...state,
               isLoading:false,
               places:action.payload
         }
  }
  if(action.type===FETCH_PLACE_ERROR){
      return{
          ...state,
          isLoading:false,
          places:[],
      }
  }
  if(action.type===FETCH_ALL_CHAT_SUCESS){
      return{
         ...state,
         isLoading:false,
         allChats:action.payload.data
      }
  }
  if(action.type===FETCH_ALL_CHAT_ERROR){
         return{
         ...state,
         isLoading:false
      }
  }
  if(action.type===FETCH_ALL_SYMPTOM_SUCCESS){
          return{
         ...state,
         isLoading:false,
         allSymptom:action.payload.data
      }
  }
  if(action.type===FETCH_ALL_SYMPTOM_ERROR){
             return{
         ...state,
         isLoading:false
      }
  }
  if(action.type===FETCH_PROFILE_INFO_SUCESS){
        return{
             ...state,
             isLoading:false,
             userInfo:action.payload.user
        }
  }
  if(action.type===FETCH_PROFILE_INFO_ERROR){
        return{
          ...state,
          isLoading:false,
        }
  }
  if(action.type===CREATE_HEALTH_GOAL_SUCCESS){
      return{
          ...state,
          isLoading:false
      }
  }
  if(action.type===CREATE_HEALTH_GOAL_ERROR){
      return{
         ...state,
         isLoading:false
      }
  }
  if(action.type===FETCH_HEALTH_GOAL_SUCCESS){
       return{
         ...state,
         isLoading:false,
         healthGoal:action.payload.goals
       }
  }
  if(action.type===FETCH_HEALTH_GOAL_ERROR){
        return{
          ...state,
           isLoading:false
        }
  }
  throw new Error(`no such action : ${action}`)
}
export default reducer
