import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
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
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

//REDUX IMPORTS
import { useDispatch,useSelector } from "react-redux";
import {createPackage} from '../../redux/apiCalls/package'

//FOR FIREBASE
import {storage} from '../../firebase'
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'



const AddPackage = () => {
  //REACT-ROUTER- DOM 
  const navigate = useNavigate()

  //REACT REDUX
  const dispatch = useDispatch()

  //GET USER STATE 
  const {userInfo} = useSelector(state => state.login)
  let userId = userInfo && userInfo._id ?userInfo._id:null


  //FORM USESTATE 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    capacity: "",
    image:null
  });


  //CHANGE FORMDATA STATE WITH ONCHANGE MULTI INPUTS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //CHANGE FORMDATA PHOTO INPUT WITH CUSTOM FILE ONCHANGE
  const handleChangePic = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0]});
  };



// ONCHANGE TO RUN

//----------------DONT CHANGE -------------------------
  const onSubmit=(e)=>{
    //HANDLES IMAGE UPDATE WITH SUBMIT
    e.preventDefault();
    if(formData.image){
      const imageRef = ref(storage,`images/${formData.image.name +v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, formData.image);
      
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
      (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
          case 'paused':
              console.log('Upload is paused');
              break;
          case 'running':
              console.log('Upload is running');
              break;
          default:
          }
      }, 
      (error) => {
          // Handle unsuccessful uploads
          console.log(error)
      }, 
      () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            
            const data =({title:formData.title,description:formData.description,price:formData.price,capacity:formData.capacity,photo:downloadURL});
            createPackage(data,dispatch)
       navigate(`/vendors/${userId && userId}`)
          });
      }
        );
      }else{
      
          createPackage(formData,dispatch)
      }

    }

//-----------------DONT CHANGE------------------------

















  return (
    <FlexContainer>
      <Card>
        <Form onSubmit={onSubmit}>
          <FormText>
            <h1>Create Package</h1>
            <Input
              name="title"
              type="text"
              onChange={(e) => handleChange(e)}
              value={formData.title}
              placeholder={"Title"}
            />
            <TextArea
              name="description"
              rows="4"
              cols="50"
              onChange={handleChange}
              value={formData.description}
              placeholder={"Title"}
            />
            <Input
              name="price"
              type="Number"
              min={1}
              max={10000000}
              onChange={handleChange}
              value={formData.price}
              placeholder={"Title"}
            />
            <Input
              name="capacity"
              type="String"
              onChange={handleChange}
              value={formData.capacity}
              placeholder={"Title"}
            />
            
          </FormText>

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

          <Button variant="contained" component="label" style={{justifySelf: 'center',width:'100px',height:'50px',marginTop:'100px'}}>
        Upload
        <input hidden type='file' name='image' onChange={handleChangePic}/>
      </Button>
          </FormImage>
          <SButton type="submit">Save Package</SButton>
        </Form>
      </Card>
    </FlexContainer>
  );
};

export default AddPackage;
