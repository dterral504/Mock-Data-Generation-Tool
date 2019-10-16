import React, { Component } from "react";
import { FormGroup, Col, Input } from "reactstrap";
import OptionsModal from "./OptionsModal";
import { connect } from "react-redux";
import { setNumCols, setDataType } from "../../actions/form";

class GeneratorColumnInput extends Component {
  constructor(props) {
    super(props);
  }

  // onDataTypeChange(event) {
  //   this.setState({ dataType: event.target.value });
  //   const { dataTypeChanged, id } = this.props;
  //   dataTypeChanged(id, event.target.value);
  // }

  // onNumColsChange(event) {
  //   this.setState({ numCols: event.target.value });
  //   const { numColsChanged, id } = this.props;
  //   numColsChanged(id, event.target.value);
  // }

  // onModalChange(opt1, opt2, opt3) {
  //   var modalOptions = { ...this.state.modalOptions };
  //   modalOptions.option1 = opt1;
  //   modalOptions.option2 = opt2;
  //   modalOptions.option3 = opt3;
  //   this.setState({ modalOptions });
  //   const { colOptionsChanged, id } = this.props;
  //   colOptionsChanged(id, modalOptions);
  // }

  render() {
    return (
      <FormGroup row>
        <Col md={3}>
          <Input
            type="select"
            name="datatype"
            id={`type-${this.props.id}`}
            onChange={e => {
              this.props.setDataType(e.target.value, this.props.id);
            }}
          >
            <option value="integer">Integer</option>
            <option value="zip-code">Zip Code</option>
            <option value="phone">Phone Number</option>
          </Input>
        </Col>
        <Col md={3}>
          <Input
            type="number"
            name="numcols"
            id={`numcols-${this.props.id}`}
            onChange={e => {
              this.props.setNumCols(e.target.value, this.props.id);
            }}
            placeholder="0"
          />
        </Col>
        <Col md={2}>
          <OptionsModal
            type={this.props.form.colTypeArray[this.props.id]}
            // onModalChange={this.onModalChange}
            id={this.props.id}
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
