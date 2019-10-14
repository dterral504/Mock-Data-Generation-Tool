import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button
} from "reactstrap";
import { connect } from 'react-redux';

class OptionsModal extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
    this.state = {
      type: this.props.type,
      option1: "",
      option2: "",
      option3: "",
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
            <Button color="primary" onClick={this.confirmModal}>
              Confirm Options
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // datatype of current column and anything else from store
  }
}

const mapDispatchToProps = () => {
  return {
    // all actions needed by component ***be sure to import them***
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(OptionsModal);
