import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

//import { visibleButtonsLogged } from '../../states/Menu/menuAcitons';
import { getFirstName } from '../../helpers/formatHelpers';
import { logout } from '../../states/Auth/authActions';

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const menuState = useSelector((state) => state.menu);
  const customer = useSelector((state) => state.customerState.customer);
  const dispatch = useDispatch();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const handleChangeLogin = () => {
    dispatch(logout());
    closeMobileMenu();
  };

  const styleUser = {
    display: 'flex',
    wordWrap: 'wrap',
    color: 'white',
    fontSize: '0.7rem',
  };

  return (
    <>
      {/* {console.log(menuState.labelButtonSignIn)} */}
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          My Invest
          <i className="fas fa-seedling" />
          {/* <i class="fas fa-hand-holding-usd" /> */}
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link
              to={menuState.navegateHomeTo}
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Minha conta
            </Link>
          </li>
          {menuState.linkPerfil ? (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Investimentos <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </li>
          ) : (
            ''
          )}

          {menuState.linkPerfil ? (
            <li className="nav-item">
              <Link
                to="/cadastro"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Cadastro
              </Link>
            </li>
          ) : (
            ''
          )}
          {menuState.linkPerfil ? (
            <li className="nav-item">
              <Link
                to="/perfil"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Perfil investidor
              </Link>
            </li>
          ) : (
            ''
          )}
          <li className="nav-item">
            <Link
              to={menuState.navegateTo}
              className="nav-links-box"
              onClick={handleChangeLogin}
            >
              {menuState.labelButtonSignIn}
            </Link>
          </li>
          {/* <li>
            <Link
              to="/cadastre-se"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Cadastre-se
            </Link>
          </li> */}
        </ul>
        {menuState.visibleButtonSignUp ? (
          <Button />
        ) : (
          <div className="user-menu">
            <span style={styleUser}>
              Bem vindo, {getFirstName(customer.name)}!
            </span>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
