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
    this.confirmModal = this.confirmModal.bind(this);
    this.state = {
      type: this.props.type,
      isOpen: false
    };
  }

  toggleModal() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  confirmModal() {
    this.toggleModal();
    const { onModalChange } = this.props;
    onModalChange(this.state.option1, this.state.option2, this.state.option3);
  }

  render() {
    if (this.props.type == "integer") {
      var more = (<p>TEST!!!!!</p>)
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
              {more}
              <Form>
                <FormGroup>
                  <Label>Distribution</Label>
                  <Input
                    type="select"
                    name="distribution"
                    id={`dist-${this.props.id}`}
                    onChange={e => {
                      more = (<p>IT WORKED!</p>);
                      console.log("hey")
                      this.setState({ state: this.state });
                    }}
                  >
                    <option value="uniform">Uniform</option>
                    <option value="normal">Gaussian (Normal)</option>
                  </Input>
                </FormGroup>
                <FormGroup row>
                  <Col md={6}>
                    <Label>Min Value</Label>
                    <Input
                      type="number"
                      name="numcols"
                      id={`min-${this.props.id}`}
                      onChange={e => this.setState({ option2: e.target.value })}
                    />
                  </Col>
                  <Col md={6}>
                    <Label>Max Value</Label>
                    <Input
                      type="number"
                      name="foo"
                      id={`max-${this.props.id}`}
                      onChange={e => this.setState({ option3: e.target.value })}
                    />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => {
                var dist = document.getElementById(`dist-${this.props.id}`).value;
                var opts = {
                  min: document.getElementById(`min-${this.props.id}`).value,
                  max: document.getElementById(`max-${this.props.id}`).value
                };
                this.props.setOptsInt(dist, opts, this.props.id);
              }}>
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
              <Button color="primary" onClick={e => {
                var dist = document.getElementById(`dist-`)
                this.props.setOptsInt()
              }}>
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
