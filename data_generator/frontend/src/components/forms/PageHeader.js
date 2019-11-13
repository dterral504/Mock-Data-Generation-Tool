import React, { Component } from "react";
import { connect } from "react-redux";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";
import { importConfig } from "../../actions/form";

var importJSON_Obj_Global;
class PageHeader extends Component {

  importConfiguration(event) {
    var reader = new FileReader();
    var file = event.target.files[0];

    reader.onload = (function(theFile) {
            return function(event) {
              this.importJSON_Obj_Global = JSON.parse(event.target.result);
              console.log(this.importJSON_Obj_Global);
            };
          })(file);
    reader.readAsText(event.target.files[0]);
  }



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
              <Button color="warning" onClick={this.props.importConfig}>
                Import Config
              </Button>
              <input type="file" id="importFile" onChange={this.importConfiguration}/>
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


// datatype of current column and anything else from store
const mapStateToProps = (state) => {
  return {
    form: state.form
  }
}

// all actions needed by component ***be sure to import them***
const mapDispatchToProps = () => {
  return {
    importConfig
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(PageHeader);
// export default PageHeader;
