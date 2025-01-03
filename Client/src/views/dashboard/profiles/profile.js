import ReactFsLightbox from "fslightbox-react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import Card from "../../../components/Card";

import axios from "axios";
import Swal from "sweetalert2";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";
import { default as imgp1 } from "../../../assets/images/user/1.jpg";

// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  let { id } = useParams();
  const [comments, setComments] = useState({});
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  let location = useLocation();
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
        let response;
        // If id exists in params, fetch that user's profile, otherwise fetch current user's profile
        const endpoint = id
          ? `http://localhost:5000/user/${id}`
          : `http://localhost:5000/user/profile`;

        response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const fetchPosts = async () => {
          setIsLoadingPosts(true);
          try {
            const token = localStorage.getItem("token");
            if (!token) {
              throw new Error("No authentication token found");
            }

            const response = await axios.get("http://localhost:5000/post", {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });

            setPosts(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
            Swal.fire({
              title: "Error!",
              text: error.response?.data?.message || "Failed to load posts",
              icon: "error",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
            });
          } finally {
            setIsLoadingPosts(false);
          }
        };

        fetchPosts();
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
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!postContent.title.trim() || !postContent.content.trim()) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in both title and content",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        "http://localhost:5000/post",
        {
          title: postContent.title,
          content: postContent.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // Clear the input by resetting to initial state
        setPostContent({
          title: "",
          content: "",
        });

        // Show success message
        Swal.fire({
          title: "Success!",
          text: "Your post has been created successfully",
          icon: "success",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create post",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateComment = async (postId, content) => {
    if (!content.trim()) return;

    setIsLoadingComment(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        `http://localhost:5000/comment`,
        {
          postId,
          content, // Changed from message to content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Clear the comment input
      setComments((prev) => ({
        ...prev,
        [postId]: "",
      }));

      Swal.fire({
        title: "Success!",
        text: "Comment posted successfully",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    } catch (error) {
      console.error("Error creating comment:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to post comment",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    } finally {
      setIsLoadingComment(false);
    }
  };
  return (
    <>
      <FsLightbox
        toggler={imageController.toggler}
        sources={[g1, g2, g3, g4, g5, g6, g7, g8, g9]}
        slide={imageController.slide}
      />
      <div className="profile-2">
        <div id="content-page" className="content-page">
          <Container>
            <Row>
              <Col lg="12">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col lg="2">
                        <div className="item1 ms-1">
                          <img
                            loading="lazy"
                            src={imgp1}
                            className="img-fluid rounded profile-image"
                            alt="profile-img"
                          />
                        </div>
                      </Col>
                      <Col lg="10">
                        <div className="d-flex justify-content-between">
                          <div className="item2 ">
                            <h4 className="">
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
                            </h4>
                            <span>
                              {`${currentUser?.followers.length} followers ${currentUser?.following.length} following`}
                            </span>
                          </div>
                          <div className="item4 ms-1">
                            {location.pathname !== "/profile" && (
                              <div className="d-flex justify-content-between align-items-center ms-1 flex-wrap">
                                <div className="d-flex align-items-center">
                                  <span className="material-symbols-outlined writ-icon md-18">
                                    send
                                  </span>
                                  <h6 className="ms-1">Write a message</h6>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-primary ms-2 btn-sm d-flex align-items-center"
                                >
                                  <span className="material-symbols-outlined  md-16">
                                    add
                                  </span>
                                  Follow
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <Row>
                          <Col lg="5">
                            <div className="item5 mt-3">
                              <div className="d-flex align-items-center mb-1">
                                <span className="material-symbols-outlined md-18">
                                  import_contacts
                                </span>
                                <span className="ms-2">
                                  {currentUser?.email}
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Card>
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Bio</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="mb-2">
                        <span>{currentUser?.bio}</span>
                      </div>
                      <div>
                        <span>{currentUser?.likes.length} likes</span>
                      </div>
                      <div>
                        <span>{currentUser?.comments.length} Comments</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="8">
                <Card id="post-modal-data">
                  <div className="card-header d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">Create Post</h4>
                    </div>
                  </div>
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="user-img">
                        <img
                          loading="lazy"
                          src={imgp1}
                          alt="userimg"
                          className="avatar-60 rounded-circle"
                        />
                      </div>
                      <form
                        className="post-text ms-3 w-100 "
                        onSubmit={handleCreatePost}
                      >
                        <input
                          type="text"
                          name="title"
                          value={postContent.title}
                          onChange={handleInputChange}
                          className="form-control rounded"
                          placeholder="Write your title here..."
                          style={{ border: "none" }}
                        />
                        <input
                          type="text"
                          value={postContent.content}
                          name="content"
                          onChange={handleInputChange}
                          className="form-control rounded"
                          placeholder="Write some content here..."
                          style={{ border: "none" }}
                        />
                      </form>
                    </div>
                    <hr />
                    <div className="d-block w-100">
                      <button
                        type="submit"
                        className="btn btn-primary d-block w-100 mt-3 "
                        onClick={handleCreatePost}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="d-flex align-items-center justify-content-center">
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            />
                            Posting...
                          </span>
                        ) : (
                          "Post"
                        )}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
                {isLoadingPosts ? (
                  <Card>
                    <Card.Body className="text-center">
                      <div className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </Card.Body>
                  </Card>
                ) : posts.length === 0 ? (
                  <Card>
                    <Card.Body className="text-center">
                      <p>No posts found</p>
                    </Card.Body>
                  </Card>
                ) : (
                  posts
                    .filter((post) => post.userId?.id === currentUser.id)
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((post) => (
                      <Card key={post._id}>
                        <Card.Body>
                          <ul className="post-comments p-0 m-0">
                            <li className="mb-2">
                              <div className="d-flex justify-content-between">
                                <div className="user-img">
                                  <img
                                    loading="lazy"
                                    src={imgp1}
                                    alt="userimg"
                                    className="avatar-60 me-3 rounded-circle img-fluid"
                                  />
                                </div>
                                <div className="w-100 text-margin">
                                  <h5>
                                    {post.userId?.username || "Anonymous"}
                                  </h5>
                                  <small className="d-flex align-items-center">
                                    <i className="material-symbols-outlined md-14 me-1">
                                      schedule
                                    </i>
                                    {new Date(post.createdAt).toLocaleString()}
                                  </small>
                                  <h6 className="mt-2">{post.title}</h6>
                                  <p>{post.content}</p>
                                  <hr />
                                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          favorite_border
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Love it
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center me-3">
                                        <span className="material-symbols-outlined md-18">
                                          comment
                                        </span>
                                        <span className="card-text-1 ms-1">
                                          Comment
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="comment-input-wrapper mt-3">
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="text"
                                        className="form-control rounded"
                                        placeholder="Write a comment..."
                                        value={comments[post.id] || ""}
                                        onChange={(e) =>
                                          setComments((prev) => ({
                                            ...prev,
                                            [post.id]: e.target.value,
                                          }))
                                        }
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            handleCreateComment(
                                              post.id,
                                              comments[post.id]
                                            );
                                          }
                                        }}
                                      />
                                      <button
                                        className="btn btn-primary ms-2"
                                        onClick={() =>
                                          handleCreateComment(
                                            post._id,
                                            comments[post._id]
                                          )
                                        }
                                        disabled={
                                          isLoadingComment ||
                                          !comments[post.id]?.trim()
                                        }
                                      >
                                        {isLoadingComment ? (
                                          <span
                                            className="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <span className="material-symbols-outlined">
                                            send
                                          </span>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    ))
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};
export default Profile;
