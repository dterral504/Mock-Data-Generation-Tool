import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Label, Col, Row, FormGroup } from "reactstrap";
import GeneratorColumnInput from "./GeneratorColumnInput";

import { addField, setNumRows, setFileType, setFileName, exportConfig, generateData } from "../../actions/form";

class GeneratorForm extends Component {

  renderColInputs() {
    return this.props.form.colIdArray.map(id => {
      return (
        <GeneratorColumnInput
          id={id}
          key={id}
        />
      )
    })

  }

  render() {
    /* Set Num Rows from Import Config */
    let numRows = document.getElementById(`numrows`);
    if (numRows !== null) {
      numRows.value = this.props.form.numRows;
    }
    /* Set File Name from Import Config */
    let fileName = document.getElementById(`filename`);
    if (fileName !== null) {
      fileName.value = this.props.form.fileName;
    }

      return (
      <Form>
        <h5>Column Options</h5>
        <hr />
        <Row>
          <Col md={1}>
            <Label>Remove</Label>
          </Col>
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
        </FormGroup>
        <FormGroup row>
          <Col md={3}>
            <Label>File Name</Label>
            <Input
              type="text"
              name="filename"
              id="filename"
              onChange={e => {
                this.props.setFileName(e.target.value);
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
              <option>JSON</option>
            </Input>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup row>
          <Col md={3}>
            <Button color="secondary" onClick={this.props.exportConfig}>
              Export Configuration
            </Button>
          </Col>
          <Col>
            <Button color="success" onClick={this.props.generateData}>
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
    exportConfig,
    setNumRows,
    setFileType,
    setFileName,
    generateData
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GeneratorForm);
