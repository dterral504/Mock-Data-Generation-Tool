import React, { Component } from "react";
import { FormGroup, Col, Input, Label, Container, ModalBody, ModalFooter, Form, Button } from "reactstrap";
import { connect } from "react-redux";
import { addCategory, setOptsInt, setCategoryName, setCategoryProb, setCategoricalDist } from "../../actions/form";

class CategoricalInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dist: "",
            categoryIdArray: [0, 1],
            categoryNameArray: ["", ""],
            categoryProbArray: ["", ""]
        };
    }

    handleDistributionChange = e => {
        this.setState({ dist: e.target.value })
    };


    renderCategoricalInputs() {
        return this.props.form.colOptsArray[this.props.id].categoryIdArray.map(id => {
            return (
                <FormGroup row key={id}>
                    <Col md={8}>
                        <Input
                            type="text"
                            name="name"
                            id={id}
                            onChange={e => {
                                this.props.setCategoryName(this.props.form.colOptsArray, e.target.value, this.props.id, id, this.state.dist);
                            }}
                            disabled={this.state.dist == ""}
                        />
                    </Col>
                    <Col md={4}>
                        <Input
                            type="number"
                            name="prob"
                            id={id}
                            onChange={e => {
                                this.props.setCategoryProb(this.props.form.colOptsArray, e.target.value, this.props.id, id, this.state.dist)
                            }}
                            disabled={this.state.dist != "multinomial"}
                        />
                    </Col>
                </FormGroup>
            )
        })

    }

    render() {
        return (
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input
                            type="select"
                            name="distribution"
                            id={`dist-${this.props.id}`}
                            onChange={this.handleDistributionChange}
                        >
                            <option value="">--Select a Distribution--</option>
                            <option value="uniform">Uniform</option>
                            <option value="multinomial">Multinomial</option>
                        </Input>
                    </FormGroup>
                    <h5>Categories</h5>
                    <hr />
                    <FormGroup row>
                        <Col md={8}>
                            <Label>Name</Label>
                        </Col>
                        <Col md={4}>
                            <Label>Probability (%)</Label>
                        </Col>
                    </FormGroup>
                    {this.renderCategoricalInputs()}
                    <Button color="secondary" onClick={() => this.props.addCategory(this.props.form.colOptsArray, this.props.id)}>
                        Add Category
                        </Button>
                </Form>
            </ModalBody>



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
        addCategory,
        setOptsInt,
        setCategoryName,
        setCategoryProb,
        setCategoricalDist
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(CategoricalInput);
