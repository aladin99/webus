import React, {useState} from 'react';
import '../resources/layout.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../resources/webuslogo.png'

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false); // collapse bar
  const {user} = useSelector(state => state.users);
  
  // Korisnik - navigacija
  const userMenu = [
    {
      name: 'Početna',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Rezervacije',
      icon: 'ri-file-list-line',
      path: '/bookings',
    },
    {
      name: 'Profil',
      path: `/profile/${user?._id}`,
      icon: 'ri-profile-line',
    },
    {
      name: 'Kontakt',
      icon: 'ri-information-line',
      path: '/contact',
    },
    {
      name: 'Odjava',
      icon: 'ri-logout-box-line',
      path: '/logout',
    }
  ];

  // Moderator - navigacija
  const adminMenu = [
    {
      name: 'Početna',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Autobusi',
      path: '/admin/buses',
      icon: 'ri-bus-fill',
    },
    {
      name: 'Rezervacije',
      path: '/bookings',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Kontakt',
      icon: 'ri-information-line',
      path: '/contact',
    },
    {
      name: 'Profil',
      path: `/profile/${user?._id}`,
      icon: 'ri-profile-line',
    },
    {
      name: 'Odjavi se',
      path: '/logout',
      icon: 'ri-logout-box-line',
    }
  ];

  // Administrator - navigacija
  const administratorMenu = [
    {
      name: 'Početna',
      path: '/',
      icon: 'ri-home-2-line',
    },
    {
      name: 'Autobusi',
      path: '/admin/buses',
      icon: 'ri-bus-fill',
    },
    {
      name: 'Rezervacije',
      path: '/bookings',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Profil',
      path: `/profile/${user?._id}`,
      icon: 'ri-profile-line',
    },
    {
      name: 'Panel',
      path: '/admin/users',
      icon: 'ri-user-settings-line',
    },
    {
      name: 'Odjavi se',
      path: '/logout',
      icon: 'ri-logout-box-line',
    }
  ];

  const menuToBeRendered = user?.isAdministrator ? administratorMenu : user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if(window.location.pathname.includes('book-now'))
  {
    activeRoute = "/";
  }
  else{} 
  return (

    // glavni div
    <div className='layout-parent'>

      {/* div od sidebara */}
      <div className='sidebar'>
        {/* Sidebar header */}

        <div className='sidebar-header'>
          {/* Koji je korisnik i njegov status - moderator ili obican korisnik */}
            <p className='role'>{user?.user} <br /> <i title='Uloga na sajtu' className="ri-user-settings-line"></i> <br/>{ user?.isAdministrator ? 'Administrator' : user?.isAdmin ? 'Admin' : 'Korisnik'}</p>
        </div>

        {/* div za iteme */}
        <div className='d-flex flex-column gap-3 justify-content-start menu'>
          {menuToBeRendered.map((item, index) => {
            return (
              <div key={item.path} className={`${activeRoute === item.path && 'active-menu-item'} menu-item`}>
                <i className={item.icon}></i>

                {/* Sidebar se umanjuje i uvecava */}
                {!collapsed && <span onClick={ () => {
                  if (item.path === "/logout")
                  {
                    localStorage.removeItem("token");
                    navigate("/login");
                  } else {
                    navigate(item.path);
                  }

                } }>{item.name}</span>}
              </div>
            );
          })}
        </div>


      </div>
      <div className='body'>

        {/* HEADER */}
        <div className='header d-flex justify-content-center'>         
          <Link title='Webus logo' to='/'><img className='logo m-1 p-0' src={logo} alt='Webus logo' /></Link>
        </div>

        {/* Kartice */}
        <div className='content'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout