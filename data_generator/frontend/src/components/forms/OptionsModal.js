import React, { Component } from "react";
import {Modal, ModalHeader, ModalBody, Input, ModalFooter, Button, Form, FormGroup, Col, Row, Label} from "reactstrap";
import { connect } from 'react-redux';
import { setOptsInt } from "../../actions/form";
import CategoricalInput from "./CategoricalInput"


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



  addOptionsFromImport() {}

  handleDistributionChange = e => {
    this.props.form.colOptsArray[this.props.id].dist = e.target.value;
    this.setState({ dist: e.target.value });
  };

  handleModalSubmit = evt => {
    var type = this.props.form.colTypeArray[this.props.id];
    var dist = this.state.dist;

    if (type === "integer") {
      if (dist === "uniform") {
        var opts = {
          min: parseInt(document.getElementById(`min-${this.props.id}`).value),
          max: parseInt(document.getElementById(`max-${this.props.id}`).value)
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      if (dist === "normal") {
        var opts = {
          mean: parseInt(document.getElementById(`mean-${this.props.id}`).value),
          standard_deviation: parseInt(document.getElementById(`standard-deviation-${this.props.id}`).value)
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    } else if (type === "float") {
      if (dist === "uniform") {
        var opts = {
          min: document.getElementById(`min-${this.props.id}`).value,
          max: document.getElementById(`max-${this.props.id}`).value
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      if (dist === "normal") {
        var opts = {
          mean: parseInt(document.getElementById(`mean-${this.props.id}`).value),
          standard_deviation: parseInt(document.getElementById(`standard-deviation-${this.props.id}`).value)
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    }
    else if (type === "zip-code") {
      if (dist === "uniform-usa") {
        var opts = {};
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      else if (dist === "uniform-state") {
        var opts = {
          state: document.getElementById(`state-${this.props.id}`).value
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      else if (dist === "uniform-city") {
        var opts = {
          state: document.getElementById(`state-${this.props.id}`).value,
          city: document.getElementById(`city-${this.props.id}`).value
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    }
    else if (type === "phone") {
      if (dist === "all-area-codes") {
        var opts = {};
        this.props.setOptsInt(dist, opts, this.props.id);
      }
      else if (dist === "area-codes") {
        var areaCodes = document.getElementById(`area-codes-${this.props.id}`).value;
        var opts = {
          areaCodes: areaCodes
        };
        this.props.setOptsInt(dist, opts, this.props.id);
      }
    }
    else if (type === "categorical") {
    }
    this.toggleModal()
  };

  toggleModal() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    /* Add Distribution Options from Import */
    let dist;
    let min, max, mean, stdev;
    let state, city;
    let areaCode;

    console.log(this.props.form);

    let import_options = this.props.form.colOptsArray[this.props.id];
    if (typeof import_options !== 'undefined') {

      /* Distributions */
      if (import_options.dist !== 'undefined') {
        dist = import_options.dist;
        this.state.dist = dist;
        console.log(this.state.dist);
      }

      /* Specific Options */
      if (import_options.opts !== 'undefined') {
        /* Set Uniform: Min, Max */
        let type = this.props.form.colTypeArray[this.props.id];
        if (import_options.dist === "uniform") {
          if (type === "float" || type === "integer") {
            min = import_options.opts.min;
            max = import_options.opts.max;
          }
        }

        /* Set Gaussian: Mean, Standard Deviation */
        if (import_options.dist === "normal") {
          if (type === "float" || type === "integer") {
            mean = import_options.opts.mean;
            stdev = import_options.opts.standard_deviation;
          }
        }


        /* Set Zip Codes: USA, State, City */
        if (import_options.dist === "uniform-state") {
          state = import_options.opts.state;
        }
        else if (import_options.dist === "uniform-city") {
          state = import_options.opts.state;
          city = import_options.opts.city;
        }


        /* Set Area Code */
        if (import_options.dist === "area-codes") {
          areaCode = import_options.opts.area-codes;
        }


        /* Set Categorical */
        // if (import_options.dist === "uniform") {
        //   if (type === "categorical") {
        //
        //   }
        // }






      }
    }


    if (this.props.type === "integer") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
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
                    defaultValue={dist}
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
                      disabled={this.state.dist !== "uniform"}
                      placeholder={min}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      name="max"
                      id={`max-${this.props.id}`}
                      disabled={this.state.dist !== "uniform"}
                      placeholder={max}
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
                      disabled={this.state.dist !== "normal"}
                      placeholder={mean}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Standard Deviation</Label>
                    <Input
                      type="number"
                      name="standard-deviation"
                      id={`standard-deviation-${this.props.id}`}
                      disabled={this.state.dist !== "normal"}
                      placeholder={stdev}
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
    else if (this.props.type === "float") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Float Options</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Distribution</Label>
                  <Input
                    type="select"
                    name="distribution"
                    id={`dist-${this.props.id}`}
                    defaultValue={dist}
                    onChange={this.handleDistributionChange}
                  >
                    <option value="">--Select a Distribution--</option>
                    <option value="uniform" >Uniform</option>
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
                      disabled={this.state.dist !== "uniform"}
                      placeholder={min}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      name="max"
                      id={`max-${this.props.id}`}
                      disabled={this.state.dist !== "uniform"}
                      placeholder={max}
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
                      disabled={this.state.dist !== "normal"}
                      placeholder={mean}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Standard Deviation</Label>
                    <Input
                      type="number"
                      name="standard-deviation"
                      id={`standard-deviation-${this.props.id}`}
                      disabled={this.state.dist !== "normal"}
                      placeholder={stdev}
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
    else if (this.props.type === "zip-code") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
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
                    defaultValue={dist}
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
                      type="text"
                      name="state"
                      id={`state-${this.props.id}`}
                      disabled={(this.state.dist !== "uniform-city") && (this.state.dist !== "uniform-state")}
                      placeholder={state}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>City</Label>
                    <Input
                      type="text"
                      name="city"
                      id={`city-${this.props.id}`}
                      disabled={this.state.dist !== "uniform-city"}
                      placeholder={city}
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
    else if (this.props.type === "phone") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Phone Number Options</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Filter</Label>
                  <Input
                    type="select"
                    name="distribution"
                    id={`dist-${this.props.id}`}
                    onChange={this.handleDistributionChange}
                    defaultValue={dist}
                  >
                    <option value="">--Select a Distribution--</option>
                    <option value="all-area-codes">None</option>
                    <option value="area-codes">By Area Code</option>
                  </Input>
                </FormGroup>
                <hr />
                <h5>Area Code</h5>
                <FormGroup row>
                  <Col md={12}>
                    <Label>Area Code</Label>
                    <Input
                      type="text"
                      name="state"
                      id={`area-codes-${this.props.id}`}
                      disabled={this.state.dist !== "area-codes"}
                      placeholder={areaCode}
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
    else if (this.props.type === "categorical") {
      var modal_html = (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>

          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
            unmountOnClose={false}
          >
            <ModalHeader toggle={this.toggleModal}>Categorical Options</ModalHeader>
            <CategoricalInput id={this.props.id} />
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
    else {
      return (
        <div>
          <Button color="secondary" onClick={this.toggleModal}>
            Options
          </Button>
          <Modal
            isOpen={this.state.isOpen}
            toggle={this.toggleModal}
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
