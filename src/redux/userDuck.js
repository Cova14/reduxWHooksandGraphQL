import { loginWithGoogle, signOutGoogle } from '../firebase'

// constants
let initialData = {
  loggedIn: false,
  fetching: false
}
let LOGIN = 'LOGIN'
let LOGIN_SUCCESS = 'LOGIN_SUCCESS'
let LOGIN_ERROR = 'LOGIN_ERROR'
let LOGOUT = 'LOGOUT'
// reducer
export default function reducer(state = initialData, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state, fetching: true
      }
    case LOGOUT:
      return {
        ...initialData
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true
      }
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
}

// aux function
function saveStorage(storage) {
localStorage.storage = JSON.stringify(storage)
}

// action (action creator)
export let logOutAction = () => (dispatch, getState) => {
  signOutGoogle()
  dispatch({
    type: LOGOUT
  })
  localStorage.removeItem('storage')
}

export let restoreSessionAction = () => dispatch => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    })
  }
}

export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle()
    .then(user => {
      saveStorage()
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }
      })
      saveStorage(getState())
    })
    .catch(e => {
      console.log(e)
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message
      })
    })
}