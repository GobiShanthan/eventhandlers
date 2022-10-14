import {
  signupPending,
  signupFulfilled,
  signupRejected,
} from "../reducers/SignupSlice";
import {
  loginFulfilled,
} from "../reducers/LoginSlice";

export const signupUser = async ({ name, email, password }, dispatch) => {
  dispatch(signupPending());

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  };
  try {
    const fetchResponse = await fetch('/api/users/signup',options)
    if(!fetchResponse.ok) return dispatch(signupRejected('Email invalid'));
    let token = await fetchResponse.json()
    localStorage.setItem('token',token)

    let user = JSON.parse(window.atob(token.split('.')[1])).user

    dispatch(signupFulfilled(user));
    dispatch(loginFulfilled(user))
  } catch (err) {
    dispatch(
      signupRejected(
        err.response.data.message ? err.response.data.message : err.message
      )
    );
  }
};
