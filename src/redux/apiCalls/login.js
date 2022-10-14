import {
  loginPending,
  loginFulfilled,
  loginRejected,
} from "../reducers/LoginSlice";

export const loginUser = async ({ email, password }, dispatch) => {
  dispatch(loginPending());
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const fetchResponse = await fetch("/api/users/login", options);
    if (!fetchResponse.ok) return dispatch(loginRejected('invalid password'));
    let token = await fetchResponse.json();
    localStorage.setItem("token", token);
    let user = JSON.parse(window.atob(token.split(".")[1])).user;
    dispatch(loginFulfilled(user));
  } catch (err) {
    dispatch(
      loginRejected(
        err.response.data.message ? err.response.data.message : err.message
      )
    );
  }
};
