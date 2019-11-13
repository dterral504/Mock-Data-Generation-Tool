import React, { Component } from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";

class PageHeader extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1 className="display-3">Data Generation Tool</h1>
            </Col>
            <Col md={1}>
              <a href="https://github.com/dterral504/Mock-Data-Generation-Tool"><img src="../../../static/images/github_logo.png" alt="Our GitHub Repo" /></a>
            </Col>
          </Row>

          <hr className="my-2" />
          <br />
          <h6>Customize your data from scratch using the form below, or import a previous configuration by clicking the button below.</h6>
          <br />
          <Row>
            <Col md={2}>
              <Button color="warning" onClick={this.importConfiguration}>
                Import Config
              </Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default PageHeader;
