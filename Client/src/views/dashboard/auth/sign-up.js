import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import axios from "axios";
import login1 from "../../../assets/images/login/1.png";
import login2 from "../../../assets/images/login/2.png";
import login3 from "../../../assets/images/login/3.png";
import logo from "../../../assets/images/logo-full.png";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    bio: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Signup successful:", response.data);
      navigate("/login", {
        state: { message: "Registration successful! Please login." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="sign-in-page">
        <div id="container-inside">
          <div id="circle-small"></div>
          <div id="circle-medium"></div>
          <div id="circle-large"></div>
          <div id="circle-xlarge"></div>
          <div id="circle-xxlarge"></div>
        </div>
        <Container className="p-0">
          <Row className="no-gutters">
            <Col md="6" className="text-center pt-5">
              <div className="sign-in-detail text-white">
                <Link className="sign-in-logo mb-5" to="#">
                  <Image src={logo} className="img-fluid" alt="logo" />
                </Link>
                <div className="sign-slider overflow-hidden">
                  <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    className="list-inline m-0 p-0 "
                  >
                    <SwiperSlide>
                      <Image
                        src={login1}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Find new friends</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login2}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">
                        Connect with the world
                      </h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        src={login3}
                        className="img-fluid mb-4"
                        alt="logo"
                      />
                      <h4 className="mb-1 text-white">Create new events</h4>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </Col>
            <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
              <div className="sign-in-from">
                <h1 className="mb-0">Sign Up</h1>
                {error ? (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                ) : (
                  <p>
                    Enter your email address and password to access admin panel.
                  </p>
                )}

                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group className="form-group">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                      className="mb-0"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Your Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="mb-0"
                      placeholder="Your Full Name"
                    />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="mb-0"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      type="text"
                      className="mb-0"
                      value={formData.bio}
                      onChange={handleChange}
                      name="bio"
                      placeholder="introduce your self"
                    />
                  </Form.Group>

                  <div className="d-inline-block w-100">
                    <Button
                      type="submit"
                      disabled={loading}
                      className={`btn-primary w-100 ${
                        loading ? " opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                  </div>
                  <div className="sign-info">
                    <span className="dark-color d-inline-block line-height-2">
                      Already Have Account ? <Link to="/login">Log In</Link>
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SignUp;
