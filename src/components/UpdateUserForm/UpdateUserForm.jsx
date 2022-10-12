import React,{useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../FormFields/FormFields"
import { FlexContainer, Card } from "./UpdateUserForm.styled";
import {useNavigate} from 'react-router-dom'
import Button from "@mui/material/Button";

//REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/apiCalls/user";


//FOR FIREBASE
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";







const UpdateUserForm = () => {
  //REACT-ROUTER- DOM
  const navigate = useNavigate();

  //REACT REDUX
  const dispatch = useDispatch();


  const { userInfo } = useSelector((state) => state.login);
  let userId = userInfo && userInfo._id ? userInfo._id : null;

  const [formData, setFormData] = useState({
    // title: "",
    // description: "",
    // price: 0,
    // capacity: "",
    image: null,
  });



  //CHANGE FORMDATA PHOTO INPUT WITH CUSTOM FILE ONCHANGE
  const handleChangePic = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };


  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={ async (values, { setSubmitting }) => {
       
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
                  };
            updateUser(data, dispatch);
                  navigate(`/vendors/${userId && userId}`);
                });
            }
              );
            }else{

          await updateUser(
            {
              name: values.name,
              email: values.email,
            },
            dispatch
          );
            }
        }}

      >
        <Form>
          <FlexContainer>
            <Card style={{display:'flex', flexDirection:'column'}}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder={userInfo.name}
                style={{backgroundColor:'white'}}
              />

              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                style={{backgroundColor:'white'}}
                placeholder={userInfo.email}
              />
                                <Button
                    variant="contained"
                    component="label"
                    style={{
                      justifySelf: "center",
                      width: "100px",
                      height: "50px",
                      marginTop: "100px",
                    }}
                  >
                    Upload
                    <input
                      hidden
                      type="file"
                      name="image"
                      onChange={handleChangePic}
                    />
                  </Button>
            </Card>
          </FlexContainer>
          <button type='submit' style={{marginTop:'20px'}}>UPDATE USER</button>
        </Form>
      </Formik>
    </>
  );
};

export default UpdateUserForm;
