import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Label, Col, Row, FormGroup } from "reactstrap";
import GeneratorColumnInput from "./GeneratorColumnInput";

import { addField, setNumRows, setFileType, exportConfig, generateData } from "../../actions/form";


class GeneratorForm extends Component {

  renderColInputs() {
    console.log(this.props.form.colIdArray);
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
            <Button color="secondary" onClick={this.props.exportConfig}>
              Export Config
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
    generateData
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GeneratorForm);
