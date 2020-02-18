import React, { useReducer } from 'react'

import { getUserWorkplaceType } from 'utils/user'
import { login } from 'utils/auth'

import 'layouts/login/Login.scss'

const initialState = {
  username: '',
  password: '',
  isError: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      }
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      }
    case 'setError':
      return { ...action.payload }
    default:
      return state
  }
}

const handleSubmit = ({ username, password, dispatch }) => {
  return async () => {
    const response = await login({ username, password })
    if (response && response.status === 200) {
      window.location.assign(`/${getUserWorkplaceType()}`)
    } else {
      dispatch({
        type: 'setError',
        payload: {
          username,
          password: '',
          isError: true,
        },
      })
    }
  }
}

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { username, password, isError } = state

  return (
    <div className="app-login section">
      <div className="container">
        <div className="label is-large">Вход</div>
        <div className="field">
          <p className="control">
            <input
              className="input"
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={event =>
                dispatch({
                  type: 'setUsername',
                  payload: event.target.value,
                })
              }
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              className="input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={event =>
                dispatch({
                  type: 'setPassword',
                  payload: event.target.value,
                })
              }
            />
          </p>
        </div>

        <div className="field">
          <p className="control">
            <button
              type="button"
              className="button is-success is-fullwidth"
              onClick={handleSubmit({
                username,
                password,
                dispatch,
              })}
            >
              Login
            </button>
          </p>
        </div>
        {isError && (
          <article className="message is-danger">
            <div className="message-body">Неверный логин или пароль</div>
          </article>
        )}
      </div>
    </div>
  )
}

export default Login
