import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlexContainer,
  Card,
AddPackageContainer,
  FormText,
  FormImage,
  AddPackageTitle
} from "./AddPackage.styled";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MyTextInput, MySelect } from "../../components/FormFields/FormFields";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import {
  lightGold,
  darkGold,
  lightBlack,
  grey,
} from "../../components/Colors/colors";

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
    image: null,
  });

  //CHANGE FORMDATA PHOTO INPUT WITH CUSTOM FILE ONCHANGE
  const handleChangePic = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  

  const formik = useFormik({
    initialValues: {
      vendorType: "",
      title: "",
      description: "",
      price: "",
      capacity: "",
      menu: "",
      quantity: "",
      hours: "",
      items: "",
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
                vendorType: values.vendorType,
                title: values.title,
                description: values.description,
                price: values.price,
                capacity: values.capacity,
                menu: values.menu,
                quantity: values.quantity,
                hours: values.hours,
                items: values.items,
                image: downloadURL,
              };
              createPackage(data, dispatch);
              navigate(`/vendors/${userId && userId}`);
            });
          }
        );
      } else {
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
          },
          dispatch
        );
      }
    },
  });

  return (
    <AddPackageContainer>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
  <FlexContainer>
        <Box
            sx={{
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
                "fieldset": {
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
                justifyContent: "center",
                border: "solid 5px",
                borderColor: `${darkGold}`,
                color: `${grey}`,
                maxWidth:'500px',
                marginTop:'15vh'
              }}
              >
            <FormText>
              <AddPackageTitle>Create Package</AddPackageTitle>
              
              <Select
                labelId="vendorType-label"
                id="vendorType"
                name="vendorType"
                value={formik.values.vendorType}
                displayEmpty
                // label="Vendor Type"
                placeholder="Vendor Type"
                onChange={formik.handleChange}
                margin="dense"
                sx={{'color': `${grey}`}}
              >
                <MenuItem disabled value="">
            <em>Vendor Type</em>
            </MenuItem>
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
                margin="dense"
                inputProps={{ style: { color: `${grey}`} }}
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
                margin="dense"
                inputProps={{ style: { color: `${grey}`} }}
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
                margin="dense"
                inputProps={{ style: { color: `${grey}`} }}
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
                  helperText={formik.touched.capacity && formik.errors.capacity}
                  margin="dense"
                  inputProps={{ style: { color: `${grey}`} }}
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
                    margin="dense"
                    inputProps={{ style: { color: `${grey}`} }}
                  />

                  <TextField
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantity && Boolean(formik.errors.quantity)
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                    margin="dense"
                    inputProps={{ style: { color: `${grey}`} }}
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
                  margin="dense"
                  inputProps={{ style: { color: `${grey}`} }}
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
                  margin="dense"
                  inputProps={{ style: { color: `${grey}`} }}
                />
              )}
            </FormText>

            <Map />

            <FormImage>

              <input
                // hidden
                type="file"
                name="image"
                onChange={handleChangePic}
              />
            </FormImage>
            <Button type="submit" style={{
                  justifySelf: "center",
                  margin: "20px",
                  backgroundColor: `${lightGold}`,
                  alignItems: 'center',
                }} variant="contained">
          Save Package
        </Button>
          </Card>
          </Box>
          </FlexContainer>
   
      </form>

    </AddPackageContainer>
  );
};

export default AddPackage;