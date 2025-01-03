import { Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import Card from "../../../components/Card";
// img

import user15 from "../../../assets/images/user/15.jpg";
//Sweet alert
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FriendReqest = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(searchQuery);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/user/");

        // Filter users based on search query
        const filteredUsers = response.data.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(filteredUsers);
        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchUsers();
    }
  }, [searchQuery]);

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-5 text-danger">
          <p>Error: {error}</p>
        </div>
      </Container>
    );
  }

  const questionAlert = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-outline-primary btn-lg ms-2",
        confirmButton: "btn btn-primary btn-lg",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "cancel",
        confirmButtonText: "Yes, delete it!",

        reverseButtons: false,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your Request has been deleted.",
            icon: "success",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Your Request is safe!",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          });
        }
      });
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">People You May Know</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="request-list m-0 p-0">
                    {users.map((user, index) => (
                      <li
                        className="d-flex align-items-center justify-content-between flex-wrap"
                        key={index}
                      >
                        <Link to={`/users/${user.id}`} className="d-flex">
                          <div className="user-img img-fluid flex-shrink-0">
                            <img
                              src={user15}
                              alt="story-img"
                              className="rounded-circle avatar-40"
                            />
                          </div>

                          <div className="flex-grow-1 ms-3">
                            <h6>{user.username}</h6>
                            <p className="mb-0">{user.email}</p>
                          </div>
                        </Link>
                        <div className="d-flex align-items-center mt-2 mt-md-0">
                          <Link to="#" className="me-3 btn btn-primary rounded">
                            <i className="ri-user-add-line me-1"></i>Follow
                          </Link>
                          <Link
                            to="#"
                            onClick={questionAlert}
                            className="btn btn-secondary rounded"
                            data-extra-toggle="delete"
                            data-closest-elem=".item"
                          >
                            Remove
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FriendReqest;
