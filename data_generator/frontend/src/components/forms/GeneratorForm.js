import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Label, Col, Row, FormGroup } from "reactstrap";
import GeneratorColumnInput from "./GeneratorColumnInput";
import { addField, setNumRows, setFileType } from "../../actions/form";

class GeneratorForm extends Component {

  // dataTypeChanged(id, type) {
  //   var colTypeArray = { ...this.state.colTypeArray };
  //   colTypeArray[id] = type;
  //   this.setState({ colTypeArray });
  // }

  // numColsChanged(id, numCols) {
  //   var numColsArray = { ...this.state.numColsArray };
  //   numColsArray[id] = numCols;
  //   this.setState({ numColsArray });
  // }

  // colOptionsChanged(id, colOpts) {
  //   var colOptsArray = { ...this.state.colOptsArray };
  //   colOptsArray[id] = colOpts;
  //   this.setState({ colOptsArray });
  // }

  // appendInput() {
  //   var newInput = `${this.state.colIdArray.length}`;
  //   this.setState(prevState => ({
  //     colTypeArray: prevState.colTypeArray.concat(["integer"]),
  //     numColsArray: prevState.numColsArray.concat([0]),
  //     colOptsArray: prevState.colOptsArray.concat([""]),
  //     colIdArray: prevState.colIdArray.concat([newInput])
  //   }));
  // }

  generateData(options) {
    console.log(this.state);
    // TO DO: two possible options for implementation (TBD):
    //    (1) perform the data file export or (PROBABLY THIS OPTION)
    //    (2) send the options as a paramter to a function in app.py to export the data
  }

  renderColInputs() {
    console.log(this.props.form.colIdArray);
    return this.props.form.colIdArray.map(id => {
      return (
        <GeneratorColumnInput
          id={id}
          key={id}
        // dataTypeChanged={this.dataTypeChanged}
        // numColsChanged={this.numColsChanged}
        // colOptionsChanged={this.colOptionsChanged}
        />
      )
    })

  }

  render() {
    return (
      <Form>
        <h5>Column Options</h5>
        <hr />
        <Row>
          <Col md={3}>
            <Label>Column Data Type</Label>
          </Col>
          <Col md={3}>
            <Label>Number of Columns</Label>
          </Col>
        </Row>

        {this.renderColInputs()}

        <Button color="secondary" onClick={this.props.addField}>
          Add Field
        </Button>
        <br />
        <br />
        <h5>Row & File Options</h5>
        <hr />
        <FormGroup row>
          <Col md={3}>
            <Label>Number of Rows</Label>
            <Input
              type="number"
              name="numrows"
              id="numrows"
              onChange={e => {
                this.props.setNumRows(e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
            <Label>File Format</Label>
            <Input
              type="select"
              name="filetype"
              id="filetype"
              onChange={e => this.props.setFileType(e.target.value)}
            >
              <option>CSV</option>
              <option>Excel</option>
              <option>JSON</option>
            </Input>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup row>
          <Col md={2}>
            <Button color="secondary" onClick={this.exportConfiguration}>
              Export Config
            </Button>
          </Col>
          <Col>
            <Button color="success" onClick={this.generateData}>
              Generate Data
            </Button>
          </Col>
        </FormGroup>
      </Form>
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
    addField,
    setNumRows,
    setFileType
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GeneratorForm);
