import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { importConfig } from "../../actions/form"

class PageHeader extends Component {

  constructor(props) {
    super(props);
    this.importConfiguration = this.importConfiguration.bind(this);
  }

  importConfiguration(event) {
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.onload = (function (theFile) {
      return function (event) {
        this.importJSON_Obj_Global = JSON.parse(event.target.result);
        console.log(this.importJSON_Obj_Global);
      };
    })(file);
    reader.readAsText(event.target.files[0]);
  }

  importConfirm = evt => {
    // the "obj" argument to importConfig needs to be whatever you want to pass to the reducer
    var obj = {}
    this.props.importConfig(obj);
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
            <Col md={3}>
              <input type="file" id="importFile" onChange={this.importConfiguration} />
            </Col>
            <Col md={3}>
              <Button color="warning" onClick={this.importConfirm}>
                Import Configuration
              </Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // datatype of current column and anything else from store
    form: state.form
  }
}

const mapDispatchToProps = () => {
  return {
    // all actions needed by component ***be sure to import them***
    importConfig
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(PageHeader);
