import {
    packageCreatePending,
    packageCreateFulfilled,
    packageCreateRejected,
  } from "../reducers/PackageSlice";




  
  export const createPackage = async (formData , dispatch) => {


    dispatch(packageCreatePending());
  
    let jwt = localStorage.getItem("token");
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(formData), // <-- send this object to server
    };
    try {
    let fetchResponse = await fetch("/api/packages/create",options)
    let serverResponse = await fetchResponse.json();
      dispatch(packageCreateFulfilled(serverResponse));
    } catch (err) {
      dispatch(
        packageCreateRejected(
          err.response.data.message ? err.response.data.message : err.message
        )
      );
    }
  };
  


