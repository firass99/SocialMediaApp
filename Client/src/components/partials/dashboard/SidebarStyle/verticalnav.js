import React, { useContext, useEffect, useState } from "react";

//router
import { Link, useLocation } from "react-router-dom";

//react-bootstrap
import {
  Accordion,
  AccordionContext,
  OverlayTrigger,
  Tooltip,
  useAccordionButton,
} from "react-bootstrap";

import user1 from "../../../../assets/images/user/1.jpg";

//components
import axios from "axios";
import { Image } from "react-bootstrap";

function CustomToggle({ children, eventKey, onClick }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(eventKey, (active) =>
    onClick({ state: !active, eventKey: eventKey })
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      aria-expanded={isCurrentEventKey ? "true" : "false"}
      className="nav-link"
      role="button"
      onClick={(e) => {
        decoratedOnClick(isCurrentEventKey);
      }}
    >
      {children}
    </Link>
  );
}

const VerticalNav = React.memo(() => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState("");
  //location
  let location = useLocation();
  // console.log(document);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
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
  return (
    <React.Fragment>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li className="nav-item static-item">
          <div className="d-flex align-items-center justify-content-center mt-3">
            <Image
              src={user1}
              className="img-fluid rounded-circle me-3 avatar-50"
              alt="user"
              loading="lazy"
            />
            <div className="caption d-none d-lg-block">
              <h6 className="mb-0 line-height">
                {" "}
                {isLoadingProfile ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  currentUser?.username || "User"
                )}
              </h6>
            </div>
          </div>
        </li>
        <li
          className={`${location.pathname === "/" ? "active" : ""} nav-item `}
        >
          <Link
            className={`${location.pathname === "/" ? "active" : ""} nav-link `}
            aria-current="page"
            to="/"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Newsfeed</Tooltip>}
            >
              <i className="icon material-symbols-outlined">newspaper</i>
            </OverlayTrigger>
            <span className="item-name">Newsfeed</span>
          </Link>
        </li>
        <li
          className={`${
            location.pathname === "profile" ? "active" : ""
          } nav-item `}
        >
          <Link
            className={`${
              location.pathname === "profile" ? "active" : ""
            } nav-link `}
            aria-current="page"
            to="profile"
          >
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>profile</Tooltip>}
            >
              <i className="icon material-symbols-outlined">person</i>
            </OverlayTrigger>
            <span className="item-name">My Profile</span>
          </Link>
        </li>
      </Accordion>
    </React.Fragment>
  );
});

export default VerticalNav;
