import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Col,
  Row,
  Label
} from "reactstrap";
import { connect } from 'react-redux';
import { setOptsInt } from "../../actions/form";

class OptionsModal extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      type: this.props.type,
      dist: "",
      isOpen: false
    };
  }

  handleDistributionChange = e => {
    // var dist = e.target.value;
    this.setState({ dist: e.target.value });
  };

  handleModalSubmit = evt => {
    var type = this.props.form.colTypeArray[this.props.id];
    var dist = this.state.dist;
    console.log("here");
    if (type == "integer") {
      if (dist == "uniform") {
        var opts = {
          min: parseInt(document.getElementById(`min-${this.props.id}`).value),
          max: parseInt(document.getElementById(`max-${this.props.id}`).value)
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      if (dist == "normal") {
        var opts = {
          mean: parseInt(document.getElementById(`mean-${this.props.id}`).value),
          standard_deviation: parseInt(document.getElementById(`standard-deviation-${this.props.id}`).value)
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    }
    else if (type == "zip-code") {
      if (dist == "uniform-usa") {
        var opts = {};
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      else if (dist == "uniform-state") {
        var opts = {
          state: document.getElementById(`state-${this.props.id}`).value
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      else if (dist == "uniform-city") {
        var opts = {
          state: document.getElementById(`state-${this.props.id}`).value,
          city: document.getElementById(`city-${this.props.id}`).value
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    }
    this.toggleModal()
  };

  toggleModal() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    if (this.props.type == "integer") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            //   className={this.props.className}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Integer Options</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Distribution</Label>
                  <Input
                    type="select"
                    name="distribution"
                    id={`dist-${this.props.id}`}
                    onChange={this.handleDistributionChange}
                  >
                    <option value="">--Select a Distribution--</option>
                    <option value="uniform">Uniform</option>
                    <option value="normal">Gaussian (Normal)</option>
                  </Input>
                </FormGroup>
                <hr />
                <h5>Uniform</h5>
                <FormGroup row>
                  <Col md={6}>
                    <Label>Min Value</Label>
                    <Input
                      type="number"
                      name="min"
                      id={`min-${this.props.id}`}
                      // onChange={e => this.setState({ option2: e.target.value })}
                      disabled={this.state.dist !== "uniform"}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      name="max"
                      id={`max-${this.props.id}`}
                      // onChange={e => this.setState({ option3: e.target.value })}
                      disabled={this.state.dist !== "uniform"}
                    />
                  </Col>
                </FormGroup>
                <hr />
                <h5>Gaussian (Normal)</h5>
                <FormGroup row>
                  <Col md={6}>
                    <Label>Mean</Label>
                    <Input
                      type="number"
                      name="mean"
                      id={`mean-${this.props.id}`}
                      // onChange={e => this.setState({ option2: e.target.value })}
                      disabled={this.state.dist !== "normal"}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Standard Deviation</Label>
                    <Input
                      type="number"
                      name="standard-deviation"
                      id={`standard-deviation-${this.props.id}`}
                      // onChange={e => this.setState({ option3: e.target.value })}
                      disabled={this.state.dist !== "normal"}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleModalSubmit}>
                Confirm Options
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )
      return modal_html;
    }
    else if (this.props.type == "zip-code") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            //   className={this.props.className}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Zip Code Options</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Distribution</Label>
                  <Input
                    type="select"
                    name="distribution"
                    id={`dist-${this.props.id}`}
                    onChange={this.handleDistributionChange}
                  >
                    <option value="">--Select a Distribution--</option>
                    <option value="uniform-usa">Uniform (USA)</option>
                    <option value="uniform-state">Uniform (State)</option>
                    <option value="uniform-city">Uniform (City)</option>
                  </Input>
                </FormGroup>
                <hr />
                <h5>Uniform</h5>
                <FormGroup row>
                  <Col md={6}>
                    <Label>State</Label>
                    <Input
                      type="number"
                      name="state"
                      id={`state-${this.props.id}`}
                      // onChange={e => this.setState({ option2: e.target.value })}
                      disabled={(this.state.dist != "uniform-city") && (this.state.dist != "uniform-state")}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>City</Label>
                    <Input
                      type="number"
                      name="city"
                      id={`city-${this.props.id}`}
                      // onChange={e => this.setState({ option3: e.target.value })}
                      disabled={this.state.dist != "uniform-city"}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleModalSubmit}>
                Confirm Options
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )
      return modal_html;
    } else {
      return (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            //   className={this.props.className}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Options</ModalHeader>
            <ModalBody>
              <Input
                type="select"
                name="datatype"
                id={`type-${this.props.id}`}
                onChange={e => this.setState({ option1: e.target.value })}
              >
                <option value="integer">Integer</option>
                <option value="time-series">Time-Series</option>
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
              </Input>
              <Input
                type="number"
                name="numcols"
                id={`numcols-${this.props.id}`}
                onChange={e => this.setState({ option2: e.target.value })}
              />
              <Input
                type="number"
                name="foo"
                id={`foo-${this.props.id}`}
                onChange={e => this.setState({ option3: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleModalSubmit}>
                Confirm Options
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    form: state.form
  }
}

const mapDispatchToProps = () => {
  return {
    // all actions needed by component ***be sure to import them***
    setOptsInt
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(OptionsModal);
