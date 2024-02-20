import React from "react";
import { Container, Row } from "react-bootstrap";
import AccessToken from "../components/forms/AccessToken";
import Photots from "../components/forms/Photots";
import Videos from "../components/forms/Videos";

const Home = () => {
  return (
    <div className="marginCenter">
      <Container>
        <Row className="justify-content-between">
          <AccessToken />
          <Photots />
          <Videos />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
