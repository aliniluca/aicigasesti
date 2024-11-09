

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Redux/store';
import { setLoggedIn, clearUser } from '../../Redux/authSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import { apiRequest } from '../../utils/axiosApiRequest'; // Import the apiRequest function
import { resetPendingMessageCount } from '@/Redux/pendingMessageSlice';
import styles from './styles/Navbar.module.css';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image'; // Add this import
import { AxiosError } from 'axios'; // Add this import

function NavScrollExample() {
  const { loggedIn, user } = useSelector((state: RootState) => state.auth);
  const receivedMessagesCount = useSelector((state: RootState) => state.message.pendingMessageCount); // Select receivedMessagesCount from Redux
  const router = useRouter(); 
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Make POST request to the logout endpoint
      await apiRequest({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_URL_BACKEND_LOGOUT}`, // Use the environment variable
        withCredentials: true,
      });
      // Update Redux state after successful logout
      dispatch(setLoggedIn(false));
      dispatch(clearUser());
      window.location.replace('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Logout failed:', error.message);
      } else {
        console.error('Logout failed:', error);
      }
    }
  };

  const handleMessagesClick = async () => {
    try {
      // Reset received messages count on the backend
      await apiRequest({
        method: 'PATCH',
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL_RESET_PENDING_MESSAGES_COUNT}`,
        withCredentials: true,
      });

      // Reset the pending message count in Redux
      dispatch(resetPendingMessageCount());
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Failed to reset pending message count:', error.message);
      } else if (error instanceof Error) {
        console.error('Failed to reset pending message count:', error.message);
      } else {
        console.error('Failed to reset pending message count:', error);
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
    // You might want to navigate to a search results page or update the current page with results
  };

  return (
    <Navbar expand="lg" className={styles.navbarContainer}>
      <Container fluid>
        <Navbar.Brand href="/" as={Link} className={styles.navbarBrand}>
          <Image src="/images/logo.png" alt="OpenAdClassify Logo" width={150} height={40} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link 
              href="/" 
              as={Link}
              className={pathname === '/' ? styles.activeLink : ''}
            >
              Home
            </Nav.Link>
            <Nav.Link href="/" as={Link} className={pathname === '/help' ? styles.activeLink : ''}>
              Help
            </Nav.Link>
            {
            loggedIn && user ?
            <Nav.Link 
            href="/messages" 
            as={Link} 
            onClick={handleMessagesClick}
            style={{
              color: receivedMessagesCount > 0 ? 'red' : 'inherit',
              fontWeight: receivedMessagesCount > 0 ? 'bold' : 'normal',
            }}
            className={`${styles.navbarLink} ${pathname === '/messages' ? styles.activeLink : ''}`}

          >
            Messages
            {receivedMessagesCount > 0 && (
              <span className={styles.messageCount}>({receivedMessagesCount})</span>
            )}
          </Nav.Link>
          : null
          }

<form className={`d-flex me-2 ${styles.searchForm}`} onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search"
              className={`form-control me-2 ${styles.searchInput}`}
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            {loggedIn && user ? (
              <>
                <NavDropdown align="end" title={`Welcome, ${user.username}`} id="user-dropdown">
                  <Link href="/ads-history" passHref legacyBehavior>
                    <NavDropdown.Item as="a">
                      📜 Ads History
                    </NavDropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    🔓 Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
              </>
            )}

            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-gray-800 border-0 ms-2">
                Create Ad
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} href="/createAd/sell">🛒 Sell</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} href="/createAd/donate">❤️ Donate</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
