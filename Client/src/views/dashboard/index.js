import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../../components/Card";
//image
import axios from "axios";
import Swal from "sweetalert2";
import user1 from "../../assets/images/user/1.jpg";

const Index = () => {
  const [comments, setComments] = useState({});
  const [postComments, setPostComments] = useState({});

  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const fetchPostComments = async (postId) => {
    setIsLoadingComments(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `http://localhost:5000/comment/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setPostComments((prev) => ({
        ...prev,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load comments",
        icon: "error",
      });
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Function to toggle comment section
  const toggleComments = async (postId) => {
    if (activeCommentSection === postId) {
      setActiveCommentSection(null);
    } else {
      setActiveCommentSection(postId);
      await fetchPostComments(postId);
    }
  };
  useEffect(() => {
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
  }, []);
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
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col lg={8} className="row m-0 p-0 mx-auto">
              <Col sm={12}>
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
                          src={user1}
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
                    <button
                      type="submit"
                      className="btn btn-primary d-block w-100 mt-3"
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
                  </Card.Body>
                </Card>
              </Col>

              {isLoadingPosts ? (
                <Card>
                  <Card.Body className="text-center">
                    <div className="spinner-border" role="status">
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
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((post) => (
                    <Col sm={12} key={post.id}>
                      <Card key={post.id}>
                        <Card.Body>
                          <ul className="post-comments p-0 m-0">
                            <li className="mb-2">
                              <div className="d-flex justify-content-between">
                                <div className="user-img">
                                  <img
                                    loading="lazy"
                                    src={user1}
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
                                      <div
                                        className="d-flex align-items-center me-3"
                                        role="button"
                                        onClick={() => toggleComments(post.id)}
                                      >
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
                                        name="content"
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
                                            post.id,
                                            comments[post.id]
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
                                  {post.comments.length > 0 &&
                                    post.comments.map((comment) => (
                                      <div className="bg-blue p-2">
                                        <div className="d-flex align-items-center">
                                          <div className="user-img">
                                            <img
                                              loading="lazy"
                                              src={user1}
                                              alt="userimg"
                                              className="avatar-40 me-3 rounded-circle img-fluid"
                                            />
                                          </div>
                                          <div className="w-100 text-margin">
                                            <h5>
                                              {comment.userId?.username ||
                                                "Anonymous"}
                                            </h5>
                                            <p className="text-md">
                                              {comment.content}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Index;
