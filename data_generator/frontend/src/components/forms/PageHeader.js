import React, { Component } from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";

class PageHeader extends Component {
  render() {
    return (
      <Jumbotron>
        <Container>
          <h1 className="display-3">Data Generation Tool</h1>
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
            <Col>
              <Button color="primary" onClick={this.githubRepo}>
                Our GitHub Repo
              </Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default PageHeader;
