import {React , useEffect} from 'react'
import { Link,useLocation } from 'react-router-dom'
const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.path)
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">My Note Book</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.path==="/"? "active":"" }`} active aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.path==="/about"? "active":"" }`} to="/About">About</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar