import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Form
} from 'reactstrap';
import { signOutUser } from '../helpers/auth';

const NavBar = ({ coach, athlete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const signOutToHome = () => {
    signOutUser();
    history.push('/');
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/raceSchedule">Race Schedule</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/addrace">Add Race</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/workouts">Workouts</Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/addworkouts">Create Workouts</Link>
            </NavItem>
          </Nav>
            <div className='auth-btn-container'>
              <Form>
                <input
                  name='city'
                  type='text'
                  placeholder='Check Weather'
                />
              </Form>
            </div>
          { (coach !== null || athlete !== null)
            && <div className='auth-btn-container'>
                {
                  coach || athlete ? <Button color='secondary' onClick={signOutToHome}>SignOut?</Button>
                    : ''
                }
              </div>
            }
        </Collapse>
      </Navbar>
    </div>
  );
};
NavBar.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};
export default NavBar;
