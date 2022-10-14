
import {useEffect} from 'react'
import { Link,useNavigate } from "react-router-dom";
import { PackageContainer } from "../Packages/Packages.styled";
import {useSelector} from 'react-redux'




const Packages = () => {

  const {userInfo} = useSelector(state => state.login)
  const navigate = useNavigate()


  useEffect(() => {
    if (!userInfo ) {
      navigate("/")
    } 
  }, [userInfo])





  return (
    <PackageContainer style={{ backgroundColor: "#231f20" }}>
      <ul>
        <li>list goes here...</li>
      </ul>
      <button>
        <Link
          style={{ color: "#eaeaea", textDecoration: "none" }}
          to="/package/add"
        >
          Add Package
        </Link>
      </button>
    </PackageContainer>
  );
};

export default Packages;
