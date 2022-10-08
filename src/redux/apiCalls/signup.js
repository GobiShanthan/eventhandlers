import {
  signupPending,
  signupFulfilled,
  signupRejected,
} from "../reducers/SignupSlice";

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
    const fetchResponse = await fetch("/api/users/signup", options);
    if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
    let token = await fetchResponse.json();
    localStorage.setItem("token", token);
    let user = JSON.parse(window.atob(token.split(".")[1])).user;
    dispatch(signupFulfilled(user));
  } catch (err) {
    dispatch(
      signupRejected(
        err.response.data.message ? err.response.data.message : err.message
      )
    );
  }
};
