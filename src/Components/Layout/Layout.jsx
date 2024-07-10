
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom'

export default function Layout() {

  function changeTheme() {

    if (document.querySelector('#mode i').classList.contains('fa-sun')) {
      document.querySelector('[data-theme]').setAttribute('data-theme', 'light');
      document.querySelector('#mode i').classList.replace('fa-sun', 'fa-moon')
      localStorage.setItem('theme', 'light')

    } else {
      document.querySelector('[data-theme]').setAttribute('data-theme', 'dark');
      document.querySelector('#mode i').classList.replace('fa-moon', 'fa-sun')
      localStorage.setItem('theme', 'dark')
    }

  }

  useEffect(() => {
    if (localStorage.getItem('theme')) {
      document.querySelector('[data-theme]').setAttribute('data-theme', localStorage.getItem('theme'));
      if (localStorage.getItem('theme') === 'light') {
        document.querySelector('#mode i').classList.replace('fa-sun', 'fa-moon')
      } else {
        document.querySelector('#mode i').classList.replace('fa-moon', 'fa-sun')
      }
    }
    else {
      document.querySelector('[data-theme]').setAttribute('data-theme', 'dark');
    }

  }, [])
  return <>

    <div className='position-relative min-vh-100'>
      <Outlet />
      <div onClick={() => changeTheme()} id='mode'>
        <i className="fa-regular fa-sun fa-xl" role='button'></i>

      </div>
    </div>

  </>
}
