import { useEffect, useState } from "react";
import { Button, Container, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//image
//Componets
import axios from "axios";
import Swal from "sweetalert2";
// import DropdownMenu from "react-bootstrap/esm/DropdownMenu";

const Header = () => {
  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/users?search=${encodeURIComponent(searchQuery.trim())}`);
      handleClose();
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setError(null);
      try {
        const userId = localStorage.getItem("userRef");
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!userId) {
          setIsLoadingProfile(false);
          setError("No user ID found");
          return;
        }

        if (!token) {
          setIsLoadingProfile(false);
          setError("No authentication token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/user/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to request headers
              "Content-Type": "application/json",
            },
          }
        );

        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError(error.response?.data?.message || "Failed to load profile");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("userRef");
      localStorage.removeItem("refreshToken");

      Swal.fire({
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to logout. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="iq-top-navbar">
        <Nav
          expand="lg"
          variant="light"
          className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0"
        >
          <Container fluid className="navbar-inner">
            <div className="d-flex align-items-center gap-3  pb-2 pb-lg-0">
              <Link
                to="/"
                className="d-flex align-items-center gap-2 iq-header-logo"
              >
                <svg
                  width="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.67733 9.50001L7.88976 20.2602C9.81426 23.5936 14.6255 23.5936 16.55 20.2602L22.7624 9.5C24.6869 6.16666 22.2813 2 18.4323 2H6.00746C2.15845 2 -0.247164 6.16668 1.67733 9.50001ZM14.818 19.2602C13.6633 21.2602 10.7765 21.2602 9.62181 19.2602L9.46165 18.9828L9.46597 18.7275C9.48329 17.7026 9.76288 16.6993 10.2781 15.8131L12.0767 12.7195L14.1092 16.2155C14.4957 16.8803 14.7508 17.6132 14.8607 18.3743L14.9544 19.0239L14.818 19.2602ZM16.4299 16.4683L19.3673 11.3806C18.7773 11.5172 18.172 11.5868 17.5629 11.5868H13.7316L15.8382 15.2102C16.0721 15.6125 16.2699 16.0335 16.4299 16.4683ZM20.9542 8.63193L21.0304 8.5C22.1851 6.5 20.7417 4 18.4323 4H17.8353L17.1846 4.56727C16.6902 4.99824 16.2698 5.50736 15.9402 6.07437L13.8981 9.58676H17.5629C18.4271 9.58676 19.281 9.40011 20.0663 9.03957L20.9542 8.63193ZM14.9554 4C14.6791 4.33499 14.4301 4.69248 14.2111 5.06912L12.0767 8.74038L10.0324 5.22419C9.77912 4.78855 9.48582 4.37881 9.15689 4H14.9554ZM6.15405 4H6.00746C3.69806 4 2.25468 6.50001 3.40938 8.50001L3.4915 8.64223L4.37838 9.04644C5.15962 9.40251 6.00817 9.58676 6.86672 9.58676H10.2553L8.30338 6.22943C7.9234 5.57587 7.42333 5.00001 6.8295 4.53215L6.15405 4ZM5.07407 11.3833L7.88909 16.2591C8.05955 15.7565 8.28025 15.2702 8.54905 14.8079L10.4218 11.5868H6.86672C6.26169 11.5868 5.66037 11.5181 5.07407 11.3833Z"
                    fill="currentColor"
                  />
                </svg>

                <h3
                  className="logo-title d-none d-sm-block"
                  data-setting="app_name"
                >
                  SocialApp
                </h3>
              </Link>
              <Link
                to="#"
                className="sidebar-toggle"
                data-toggle="sidebar"
                data-active="true"
                onClick={minisidebar}
              >
                <div className="icon material-symbols-outlined iq-burger-menu">
                  menu
                </div>
              </Link>
            </div>

            <div className="iq-search-bar device-search  position-relative">
              <form
                action="#"
                className="searchbox"
                onSubmit={handleSubmit}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalFullscreenSm"
              >
                <Link className="search-link d-none d-lg-block" to="/">
                  <span className="material-symbols-outlined">search</span>
                </Link>
                <Form.Control
                  type="text"
                  value={searchQuery}
                  onChange={handleChange}
                  className="text search-input form-control bg-soft-primary  d-none d-lg-block"
                  placeholder="Search here..."
                />
                <Button
                  className="d-lg-none d-flex d-none d-lg-block"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalFullscreenSm"
                >
                  <span className="material-symbols-outlined">search</span>
                </Button>
              </form>
            </div>

            <ul className="navbar-nav navbar-list">
              <Nav.Item as="li">
                <Link to="/" className="d-flex align-items-center">
                  <i className="material-symbols-outlined">home</i>
                  <span className="mobile-text d-none ms-3">Home</span>
                </Link>
              </Nav.Item>
              <Nav.Item as="li" className="d-lg-none">
                <div className="iq-search-bar device-search  position-relative">
                  <form
                    action="#"
                    className="searchbox"
                    onChange={handleChange}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalFullscreenSm"
                  >
                    <Link className="search-link d-none d-lg-block" to="/">
                      <span className="material-symbols-outlined">search</span>
                    </Link>
                    <Form.Control
                      type="text"
                      className="text search-input form-control bg-soft-primary  d-none d-lg-block"
                      placeholder="Search here..."
                    />
                    <Link
                      className="d-lg-none d-flex"
                      to="/"
                      onClick={handleShow}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalFullscreenSm"
                    >
                      <span className="material-symbols-outlined">search</span>
                    </Link>
                  </form>
                </div>
              </Nav.Item>
              <Nav.Item as="li">
                <Link
                  to="#"
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                  style={{ opacity: isLoggingOut ? 0.5 : 1 }}
                >
                  {isLoggingOut ? (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <i className="material-symbols-outlined">logout</i>
                  )}
                  <span className="mobile-text d-none ms-3">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </Link>
              </Nav.Item>
            </ul>
          </Container>
        </Nav>
      </div>
    </>
  );
};

export default Header;
