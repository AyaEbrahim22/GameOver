
import { Link, NavLink, useNavigate } from 'react-router-dom'

import logo from '../../Assets/logo-sm.png'

export default function Navbar() {

  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  return <>

    <nav className="navbar navbar-expand-lg NavStyle py-2">
      <div className="container">
        <Link className="navbar-brand logo" to={'/'}>
          <img src={logo} alt='logo' width={40} />GAME OVER
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/'}>MMORPG</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/shooter'}>SHOOTER</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/sailing'}>SAILING</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/permadeath'}>PERMADEATH</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/superhero'}>SUPERHERO</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/pixel'}>PIXEL</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/pvp'}>PVP</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link linkSize" to={'/categories/action'}>ACTION</NavLink>
            </li>

          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center d-flex align-items-center justify-content-center gap-2">

            <li className="nav-item">
              <Link to={'/search'}>
                <i className="fa-solid fa-magnifying-glass fa-lg" role='button'></i>
              </Link>
            </li>

            <li className="nav-item">
              <span onClick={() => logOut()} className="nav-link linkSize logOut" role='button'>LogOut</span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
}
