import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

//swiper
import SwiperCore, { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import 'swiper/components/navigation/navigation.scss';

//img
import axios from "axios";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("userRef", response.data.userId);

      console.log("Login successful:", response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
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
            <div className="sign-in-detail text-white ">
              <div className="sign-slider overflow-hidden "></div>
            </div>
          </Col>
          <Col md="6" className="bg-white pt-5 pt-5 pb-lg-0 pb-5">
            <div className="sign-in-from">
              <h1 className="font-Extrabold text-xl text-center">SocialApp</h1>
              <h1 className="mb-0">Sign in</h1>
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
                    className="mb-0"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="form-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="mb-0"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <div className="d-inline-block w-100">
                  <Button
                    variant="primary"
                    type="submit"
                    className={`btn-primary w-100 ${
                      loading ? " opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Sign in
                  </Button>
                </div>
                <div className="sign-info">
                  <span className="dark-color d-inline-block line-height-2">
                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                  </span>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;
