import React, { Component } from "react";
import { FormGroup, Col, Input } from "reactstrap";
import OptionsModal from "./OptionsModal";
import CorrelationModal from "./CorrelationModal";
import { connect } from "react-redux";
import { setNumCols, setDataType } from "../../actions/form";

class GeneratorColumnInput extends Component {
  constructor(props) {
    super(props);
      console.log(this.props.form.colTypeArray[this.props.id]);
    this.state = {
      type: this.props.form.colTypeArray[this.props.id],
      num: 0
    }
  }

  render() {
      // console.log(this.props.id);
      // console.log(this.props.form);
      // this.state.type = this.props.form.colTypeArray[this.props.id];
      //
      // console.log(this.state);
      // this.setState(this.state);
      var numCols = document.getElementById(`numcols-${this.props.id}`);
      if (numCols !== null) {
          for (var i = 0; i < this.props.form.numColsArray.length; i++) {
              numCols = document.getElementById(`numcols-${i}`);
              numCols.value = this.props.form.numColsArray[i];
          }
      }

      var colTypes = document.getElementById(`type-${this.props.id}`);
      if (numCols !== null) {
          for (var i = 0; i < this.props.form.numColsArray.length; i++) {
              colTypes = document.getElementById(`type-${i}`);
              colTypes.value = this.props.form.colTypeArray[i];
          }
      }

    return (
      <FormGroup row>
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
            <option value="categorical">Categorical</option>s
            <option value="time-series">Time-Series</option>
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
