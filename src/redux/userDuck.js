import { loginWithGoogle } from '../firebase'

// constants
let initialData = {
  loggedIn: false,
  fetching: false
}
let LOGIN = 'LOGIN'
let LOGIN_SUCCES = 'LOGIN_SUCCES'
let LOGIN_ERROR = 'LOGIN_ERROR'
// reducer
export default function reducer(state = initialData, action) {
  switch(action.type) {
    case LOGIN:
      return {
        ...state, fetching: true
      }
    case LOGIN_SUCCES:
      return {
        ...state,
        fetching: false,
        ...action.payload
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

export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN
  })
  return loginWithGoogle()
    .then(user => {
      saveStorage()
      dispatch({
        type: LOGIN_SUCCES,
        payload: {...user}
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