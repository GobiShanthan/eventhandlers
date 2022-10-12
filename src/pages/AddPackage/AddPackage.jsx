import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlexContainer,
  Card,
  Form,
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyTextInput, MySelect } from "../../components/FormFields/FormFields";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { Map } from "../../components/Map/Map";

//REDUX IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../../redux/apiCalls/package";

//FOR FIREBASE
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const validationSchema = Yup.object({
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
  items: Yup.string(),
});

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

  const formik = useFormik({
    initialValues: {
      vendorType: "venue",
      title: "",
      description: "",
      price: 0,
      capacity: "",
      menu: "",
      quantity: 0,
      hours: 0,
      items: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
    },
  });

  return (
    <>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <FlexContainer>
            <Card>
              <FormText>
                <h1>Create Package</h1>

                {/* <InputLabel id="vendorType-label">Vendor Type</InputLabel> */}
                <Select
                  labelId="vendorType-label"
                  id="vendorType"
                  name="vendorType"
                  value={formik.values.vendorType}
                  label="Vendor Type"
                  // onChange={handleChange}
                  // onChange={(nextValue) => formik.setFieldValue('vendorType', nextValue)}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="venue">Venue</MenuItem>
                  <MenuItem value="caterer">Caterer</MenuItem>
                  <MenuItem value="photographer">Photographer</MenuItem>
                  <MenuItem value="decor">Decor</MenuItem>
                </Select>

                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />

                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />

                <TextField
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />

                {formik.values.vendorType === "venue" && (
                  <TextField
                    id="capacity"
                    name="capacity"
                    label="Capacity"
                    type="number"
                    value={formik.values.capacity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.capacity && Boolean(formik.errors.capacity)
                    }
                    helperText={
                      formik.touched.capacity && formik.errors.capacity
                    }
                  />
                )}

                {formik.values.vendorType === "caterer" && (
                  <>
                    <TextField
                      id="menu"
                      name="menu"
                      label="Menu"
                      value={formik.values.menu}
                      onChange={formik.handleChange}
                      error={formik.touched.menu && Boolean(formik.errors.menu)}
                      helperText={formik.touched.menu && formik.errors.menu}
                    />

                    <TextField
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      type="number"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                    />
                  </>
                )}
                {formik.values.vendorType === "photographer" && (
                  <TextField
                    id="hours"
                    name="hours"
                    label="Hours"
                    type="number"
                    value={formik.values.hours}
                    onChange={formik.handleChange}
                    error={formik.touched.hours && Boolean(formik.errors.hours)}
                    helperText={formik.touched.hours && formik.errors.hours}
                  />
                )}

                {formik.values.vendorType === "decor" && (
                  <TextField
                    id="items"
                    name="items"
                    label="Items"
                    value={formik.values.items}
                    onChange={formik.handleChange}
                    error={formik.touched.items && Boolean(formik.errors.items)}
                    helperText={formik.touched.items && formik.errors.items}
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
            <Button type="submit">Save Package</Button>
          </FlexContainer>
        </form>
    </>
  );
};

export default AddPackage;
