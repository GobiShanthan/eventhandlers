
import {Link} from 'react-router-dom'





const Packages = () => {


  return (
    
    <div style={{marginTop:'10vh'}}>
      <ul>
        <li>list goes here........</li>
      </ul>
      <button>
        <Link to='/package/add'>Add Package</Link>
      </button>
    </div>
  )
}

export default Packages