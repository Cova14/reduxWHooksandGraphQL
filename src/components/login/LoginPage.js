import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/userDuck'

function LoginPage({fetching, loggedIn, doGoogleLoginAction, logOutAction}) {

  function doLogin() {
    doGoogleLoginAction()
  }

  function doLogout() {
    logOutAction()
  }

  if(fetching) return <h2>Cargando...</h2>

  return (
    <div className={styles.container}>
      {loggedIn ?
        <>
          <h1>
            Cierra tu sesión
          </h1>
          <button onClick={doLogout}>
            Cerrar Sesión
          </button>
        </>
      :
        <>
          <h1>
            Inicia Sesión con Google
          </h1>
          <button onClick={doLogin}>
            Iniciar
          </button>
        </>
      }
    </div>
  )
}

function mapState({user:{fetching, loggedIn}}) {
	return {
    fetching,
    loggedIn
  }
}

export default connect(mapState, { doGoogleLoginAction, logOutAction })(LoginPage)