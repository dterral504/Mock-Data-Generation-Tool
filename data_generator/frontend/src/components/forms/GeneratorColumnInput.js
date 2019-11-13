import React, { Component } from "react";
import { FormGroup, Col, Input, Button } from "reactstrap";
import OptionsModal from "./OptionsModal";
import CorrelationModal from "./CorrelationModal";
import { connect } from "react-redux";
import { setNumCols, setDataType } from "../../actions/form";

class GeneratorColumnInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "integer",
      num: 0
    }
  }

  render() {
    return (
      <FormGroup row>
        <Col md={1}>
          <Button outline color="danger">
            Delete
          </Button>
        </Col>
        <Col md={3}>
          <Input
            type="select"
            name="datatype"
            id={`type-${this.props.id}`}
            onChange={e => {
              this.props.setDataType(e.target.value, this.props.id);
              this.setState({ type: e.target.value });
            }}
          >
            <option value="integer">Integer</option>
            <option value="float">Float</option>
            <option value="zip-code">Zip Code</option>
            <option value="phone">Phone Number</option>
            <option value="categorical">Categorical</option>
            <option value="date-time">Date-Time</option>
            <option value="text">Text</option>
          </Input>
        </Col>
        <Col md={3}>
          <Input
            type="number"
            name="numcols"
            id={`numcols-${this.props.id}`}
            onChange={e => {
              this.props.setNumCols(e.target.value, this.props.id);
              this.setState({ num: parseInt(e.target.value) });
            }}
            placeholder="0"
          />
        </Col>
        <Col md={1}>
          <OptionsModal
            type={this.props.form.colTypeArray[this.props.id]}
            id={this.props.id}
          />
        </Col>
        <Col md={3}>
          <CorrelationModal
            type={this.props.form.colTypeArray[this.props.id]}
            id={this.props.id}
            show={this.state.num == 1 && ((this.state.type == "integer") || (this.state.type == "float"))}
          />
        </Col>
      </FormGroup>
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
    setDataType,
    setNumCols
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(GeneratorColumnInput);
