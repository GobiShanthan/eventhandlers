import {
  updateUserPending,
  updateUserFulfilled,
  updateUserRejected,
} from "../reducers/updateUserSlice";

export const updateUser = async (formData, dispatch) => {
  dispatch(updateUserPending());

  let jwt = localStorage.getItem("token");
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(formData), // <-- send this object to server
  };
  try {
    let fetchResponse = await fetch("/api/users/update", options);
    let serverResponse = await fetchResponse.json();
    dispatch(updateUserFulfilled(serverResponse));
  } catch (err) {
    dispatch(
      updateUserRejected(
        err.response.data.message ? err.response.data.message : err.message
      )
    );
  }
};
