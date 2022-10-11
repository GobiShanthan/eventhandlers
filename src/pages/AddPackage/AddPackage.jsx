import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlexContainer,
  Card,
  // Form,
  Input,
  TextArea,
  FormText,
  FormImage,
  Image,
  SButton,
} from "./AddPackage.styled";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  MyTextInput,
  MySelect,
} from "../../components/FormFields/FormFields";

import { Map } from "../../components/Map/Map";

//REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../../redux/apiCalls/package";

//FOR FIREBASE
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AddPackage = () => {
  //REACT-ROUTER- DOM
  const navigate = useNavigate();

  //REACT REDUX
  const dispatch = useDispatch();

  //GET USER STATE
  const { userInfo } = useSelector((state) => state.login);
  let userId = userInfo && userInfo._id ? userInfo._id : null;

  //FORM USESTATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    capacity: "",
    image: null,
  });

  //CHANGE FORMDATA STATE WITH ONCHANGE MULTI INPUTS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //CHANGE FORMDATA PHOTO INPUT WITH CUSTOM FILE ONCHANGE
  const handleChangePic = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // ONCHANGE TO RUN

  //----------------DONT CHANGE -------------------------
  const onSubmit = (e) => {
    //HANDLES IMAGE UPDATE WITH SUBMIT
    e.preventDefault();
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
              title: formData.title,
              description: formData.description,
              price: formData.price,
              capacity: formData.capacity,
              photo: downloadURL,
            };
            createPackage(data, dispatch);
            navigate(`/vendors/${userId && userId}`);
          });
        }
      );
    } else {
      createPackage(formData, dispatch);
    }
  };

  //-----------------DONT CHANGE------------------------

  return (
    <>
      <Formik
        initialValues={{
          vendorType: "",
          title: "",
          description: "",
          price: 0,
          capacity: "",
          menu: "",
          quantity: 0,
          hours: 0,
          items: "",
          image: null,
        }}
        validationSchema={Yup.object({
          vendorType: Yup.string().oneOf(
            ["venue", "caterer", "photographer", "decor"],
            "Invalid Vendor Type"
          ),
          title: Yup.string().required("Required"),
          description: Yup.string(),
          price: Yup.number().required("Required"),
          capacity: Yup.number(),
          menu: Yup.string(),
          quantity: Yup.number(),
          hours: Yup.number(),
          items: Yup.string()
        })}
        onSubmit={ async (values, { setSubmitting }) => {
          console.log(values);
          await createPackage(
            {
              vendorType: values.vendorType,
              title: values.title,
              description: values.description,
              price: values.price,
              capacity: values.capacity,
              menu: values.menu,
              quantity: values.quantity,
              hours: values.hours,
              items: values.items,
              image: values.image,
            },
            dispatch
          );
        }}
      >
        {(props) => (
          <Form>
            <FlexContainer>
              <Card>
                <FormText>
                  <h1>Create Package</h1>
                  <MySelect label="Vendor Type" name="vendorType">
                    <option value="venue">Venue</option>
                    <option value="caterer">Caterer</option>
                    <option value="photographer">Photographer</option>
                    <option value="decor">Decor</option>
                  </MySelect>

                  <MyTextInput
                    name="title"
                    type="text"
                    placeholder="Title"
                  />

                  <MyTextInput
                    name="description"
                    type="text"
                    placeholder="Description"
                  />

                  <MyTextInput
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="Price"
                  />
                  {props.values.vendorType === "venue" && (
                    <MyTextInput
                      name="capacity"
                      type="number"
                      placeholder="Capacity"
                    />
                  )}

                  {props.values.vendorType === "caterer" && (
                    <>
                      <MyTextInput name="menu" type="text" placeholder="Menu" />
                      <MyTextInput
                        name="quantity"
                        type="number"
                        placeholder="Number of people"
                      />
                    </>
                  )}
                  {props.values.vendorType === "photographer" && (
                    <MyTextInput
                      name="hours"
                      type="number"
                      placeholder="Hours"
                    />
                  )}

                  {props.values.vendorType === "decor" && (
                    <MyTextInput
                      name="items"
                      type="text"
                      placeholder="Items Included"
                    />
                  )}
                </FormText>

                <Map />

                <FormImage>
                  <Image
                    src={
                      "https://i.weddinghero.ca/gallery/1895/preview_1895_zpKtyJ1J.jpg"
                    }
                  />
                  {/* --------------------------------For mobile button for pic --------------------------------------*/}
                  {/* <IconButton color="primary" aria-label="upload picture" component="label">
  <input hidden accept="image/*" type="file" />
  <PhotoCamera />
</IconButton> */}
                  {/* --------------------------------For mobile button for pic --------------------------------------*/}

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
                </FormImage>
              </Card>
            </FlexContainer>
                <button type="submit">Save Package</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddPackage;
