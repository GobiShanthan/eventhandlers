import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { FlexContainer, Card, Heading } from "./UpdateUserForm.styled";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  lightGold,
  darkGold,
  lightBlack,
  grey,
} from "../../components/Colors/colors";

//REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls/user";

//FOR FIREBASE
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { CenterFocusStrong } from "@mui/icons-material";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const UpdateUserForm = () => {
  //REACT-ROUTER- DOM
  const navigate = useNavigate();

  //REACT REDUX
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.login);
  let userId = userInfo && userInfo._id ? userInfo._id : null;

  const [formData, setFormData] = useState({
    image: null,
  });

  //CHANGE FORMDATA PHOTO INPUT WITH CUSTOM FILE ONCHANGE
  const handleChangePic = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const formik = useFormik({
    initialValues: {
      name: userInfo.name,
      email: userInfo.email,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (formData.image) {
        const imageRef = ref(storage, `images/${formData.image.name + v4()}`);
        const uploadTask = uploadBytesResumable(imageRef, formData.image);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const data = {
                name: values.name,
                email: values.email,
                image: downloadURL,
                userId,
              };
              updateUser({ data }, dispatch);
              navigate(`/users/${userId && userId}`);
            });
          }
        );
      } else {
        await updateUser(
          {
            name: values.name,
            email: values.email,
            userId,
          },
          dispatch
        );
      }
    },
  });

  return (
    <div style={{ backgroundColor: `${lightBlack}`, height: "100vh" }}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <FlexContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "& .MuiFormLabel-root": {
                color: `${lightGold}`,
              },
              "& .MuiFormLabel-root.Mui-focused": {
                color: `${grey}`,
              },

              "& label.Mui-focused": {
                color: `${darkGold}`,
              },
              "& .MuiOutlinedInput-root": {
                fieldset: {
                  borderColor: `${darkGold}`,
                },
                "&.Mui-focused fieldset": {
                  borderColor: `${grey}`,
                },
              },
            }}
          >
            <Card
              style={{
                border: "solid 5px",
                borderColor: `${darkGold}`,
                width: "80%",
                maxWidth: "500px",
              }}
            >
              <Heading>Update Profile</Heading>

              <div id="fields">
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="dense"
                  inputProps={{ style: { color: `${grey}` } }}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin="dense"
                  inputProps={{
                    style: { color: `${grey}`, justifySelf: "center" },
                  }}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: "20px", backgroundColor: `${lightGold}` }}
                >
                  UPDATE USER
                </Button>
              </div>
            </Card>
          </Box>
        </FlexContainer>
      </form>
    </div>
  );
};

export default UpdateUserForm;
