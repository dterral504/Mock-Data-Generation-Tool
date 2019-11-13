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
    Label
} from "reactstrap";
import { connect } from 'react-redux';
import { setCorrelationOpts, removeCorrelatedCol } from "../../actions/form";
import SimpleTooltip from "./SimpleTooltip";

class CorrelationModal extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isOpen: false,
            isSet: false,
            slope: 0,
            intercept: 0,
            stddev: 1
        };
    }

    toggleModal() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    removeCorrelatedCol = e => {
        this.props.removeCorrelatedCol(this.props.id);
        this.setState({ isSet: false });
    }

    handleModalSubmit = e => {
        var correlationOpts = {
            slope: this.state.slope,
            intercept: parseInt(document.getElementById(`intercept-${this.props.id}`).value),
            stddev: parseInt(document.getElementById(`stddev-${this.props.id}`).value)
        }
        this.props.setCorrelationOpts(correlationOpts, this.props.id)
        this.setState({ isSet: true });
        this.toggleModal()
    }

    render() {
        if (this.state.isSet == false) {
            if (this.props.show == false) {
                var modal_html = (
                    <div>
                        <span id="add-correlation">
                            <Button outline color="info" onClick={e => { if (true) return }}>
                                Add Correlated Column
                            </Button>
                        </span>
                        <SimpleTooltip placement="right" target="add-correlation" >
                            To add a correlated column, you must have:
                            (1) Number of Columns = 1 and (2) Column Data Type = Integer or Float.
                        </SimpleTooltip>

                        <Modal
                            isOpen={this.state.isOpen}
                            toggle={this.toggleModal}
                            unmountOnClose={false}
                        >
                            <ModalHeader toggle={this.toggleModal}>Correlated Column Options</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Slope</Label>
                                        <Input
                                            type="number"
                                            name="slope"
                                            id={`slope-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ slope: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Intercept</Label>
                                        <Input
                                            type="number"
                                            name="intercept"
                                            id={`intercept-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ intercept: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Standard Deviation (Error)</Label>
                                        <Input
                                            type="number"
                                            name="stddev"
                                            id={`stddev-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ stddev: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleModalSubmit}>
                                    Confirm Options
                                    </Button>
                            </ModalFooter>
                        </Modal>
                    </div >
                )
            } else {
                var modal_html = (
                    <div>
                        <Button color="info" onClick={this.toggleModal} disabled={this.props.show == false}>
                            Add Correlated Column
                        </Button>

                        <Modal
                            isOpen={this.state.isOpen}
                            toggle={this.toggleModal}
                            unmountOnClose={false}
                        >
                            <ModalHeader toggle={this.toggleModal}>Correlated Column Options</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Slope</Label>
                                        <Input
                                            type="number"
                                            name="slope"
                                            id={`slope-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ slope: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Intercept</Label>
                                        <Input
                                            type="number"
                                            name="intercept"
                                            id={`intercept-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ intercept: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Standard Deviation (Error)</Label>
                                        <Input
                                            type="number"
                                            name="stddev"
                                            id={`stddev-${this.props.id}`}
                                            onChange={e => {
                                                this.setState({ stddev: parseInt(e.target.value) });
                                            }}
                                        >
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleModalSubmit}>
                                    Confirm Options
                                    </Button>
                            </ModalFooter>
                        </Modal>
                    </div >
                )
            }
        } else if (this.state.isSet == true) {
            var modal_html = (
                <div>
                    <Button color="danger" onClick={this.removeCorrelatedCol} disabled={this.props.show == false}>
                        Remove Correlated Column
                    </Button>
                </div >
            )
        }
        return modal_html;
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
        setCorrelationOpts,
        removeCorrelatedCol
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(CorrelationModal);
