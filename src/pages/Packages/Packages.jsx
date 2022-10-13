import {Link} from 'react-router-dom'
import { PackageContainer } from '../Packages/Packages.styled'

const Packages = () => {


  return (
    
    <PackageContainer style={{ backgroundColor: '#231f20' }}>
      <ul>
        <li>list goes here...</li>
      </ul>
      <button>
        <Link style={{ color: '#eaeaea', textDecoration: 'none'}} to='/package/add'>Add Package</Link>
      </button>
    </PackageContainer>
  )
}

export default Packages