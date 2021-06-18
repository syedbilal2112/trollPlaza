import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import api from "../containers/apiMiddleWare";
import { PropTypes } from 'react';
import '../css/style.css';

class dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            body: {

            },
            toDashboard: false,
            rightCar: {
                'position': 'relative',
                'right': '127px',
                'float': 'right'
            },
            leftCar: {
                'position': 'relative',
                'transform': 'translate(0px, 600px)',
                'paddingLeft': '9%'
            }
        }
    }
    enterInputValue(value, type) {
        let body = this.state.body;
        body[type] = value;
        this.setState({
            body
        });
    }

    async addVehicle(isEntry) {
        let payload = {
            vehicleRegistrationNumber: this.state.body.vehicleRegistrationNumber,
            route: this.state.body.route,
            isEntry: isEntry
        }
        let res = await api.post(
            "trollPlaza/vehicle/", payload
        );
        if (res && res.status === 200) {

            this.closeModal();
            let body = {
                vehicleRegistrationNumber: this.state.body.vehicleRegistrationNumber,
                route: this.state.body.route,
                amountPaid: res.data.amountPaid
            }
            this.setState({
                body: body
            });
            var modal = document.getElementById("myModal-print");
            modal.style.display = "block";
        } else {
            sessionStorage.clear();
            alert('Data Adding Unsuccessful');
            this.setState({
                toDashboard: true
            });
        }
    }

    async addVerifyVehicle() {
        let res = await api.get(
            "trollPlaza/vehicle?vehicleRegistrationNumber=" + this.state.body.vehicleRegistrationNumber
        );
        if (res && res.status === 200) {
            this.closeModal();
            let body = {
                _id: res.data
            }
            this.setState({
                body: body
            });
            var modal = document.getElementById("myModal-update");
            modal.style.display = "block";
        } else {
            alert("Details not verified Please pay The amount")
            var modal = document.getElementById("myModal-update");
            modal.style.display = "none";
            var modal = document.getElementById("myModal-verify");
            modal.style.display = "none";
            var modal = document.getElementById("myModal-exit");
            modal.style.display = "block";
        }
    }

    print(x) {
        var modal = document.getElementById("myModal-print");
        modal.style.display = "none";
        this.setState({
            body: {}
        });
        alert("On Clicking on this you will be able to print Recipt")
        this.reset()
    }

    reset() {
        let rightTemp = {
            'position': 'relative',
            'right': '127px',
            'float': 'right',
            'transition': '0s',
            'transform': 'translate(0px, 0px)'
        }
        let leftTemp = {
            'position': 'relative',
            'transition': '0s',
            'paddingLeft': '9%',
            'transform': 'translate(0px, 600px)'
        }
        this.setState({
            rightCar: rightTemp,
            leftCar: leftTemp
        });
    }

    openAddInVehicle() {
        var modal = document.getElementById("myModal-entry");
        modal.style.display = "block";
    }

    openAddOutVehicle() {
        var modal = document.getElementById("myModal-exit");
        modal.style.display = "block";
    }

    verifyVehicle() {
        var modal = document.getElementById("myModal-verify");
        modal.style.display = "block";
    }

    async updateJourney() {
        let res = await api.put(
            "trollPlaza/vehicle/" + this.state.body._id
        );
        if (res && res.status === 200) {
            this.closeModal();
            alert("Journey Updated")
            this.reset();
        } else {

        }
    }

    closeModal() {
        var modal = document.getElementById("myModal-entry");
        modal.style.display = "none";
        var modal1 = document.getElementById("myModal-exit");
        modal1.style.display = "none";
        var modal2 = document.getElementById("myModal-verify");
        modal2.style.display = "none";
        var modal3 = document.getElementById("myModal-print");
        modal3.style.display = "none";
        var modal4 = document.getElementById("myModal-update");
        modal4.style.display = "none";
    }

    componentDidMount() {
        setInterval(() => {
            let rightTemp = {
                'position': 'relative',
                'right': '127px',
                'float': 'right',
                'transition': '5s',
                'transform': 'translate(0px, 300px)'
            }
            let leftTemp = {
                'position': 'relative',
                'transition': '5s',
                'paddingLeft': '9%',
                'transform': 'translate(0px, 300px)'
            }
            this.setState({
                rightCar: rightTemp,
                leftCar: leftTemp
            });
        }, 1000)
    }
    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <div id="myModal-entry" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close" onClick={(e) => this.closeModal()}>&times;</span>
                        <div>
                            <input type="text" className="form-control" name="vehicleRegistrationNumber" placeholder="Vehicle Registration Number" required onChange={(e) => this.enterInputValue(e.target.value, 'vehicleRegistrationNumber')} /><br />
                            <select className="form-control" name="route" placeholder="route" required onChange={(e) => this.enterInputValue(e.target.value, 'route')}>
                                <option>Select one way or return</option>
                                <option value="oneWay">One Way</option>
                                <option value="return">Return</option>
                            </select>
                            <br />
                            <h2>Amount: ₹ {this.state.body.route == 'oneWay' ? 100 : this.state.body.route == 'return' ? 200 : ''}</h2>
                            <br />
                            <button className="btn btn-primary" type="button" onClick={(e) => this.addVehicle(true)} >Save Vehicle Details</button>
                        </div>
                    </div>
                </div>

                <div id="myModal-exit" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close" onClick={(e) => this.closeModal()}>&times;</span>
                        <div>
                            <input type="text" className="form-control" name="vehicleRegistrationNumber" placeholder="Vehicle Registration Number" required onChange={(e) => this.enterInputValue(e.target.value, 'vehicleRegistrationNumber')} /><br />
                            <select className="form-control" name="route" placeholder="route" required onChange={(e) => this.enterInputValue(e.target.value, 'route')}>
                                <option>Select one way or return</option>
                                <option value="oneWay">One Way</option>
                                <option value="return">Return</option>
                            </select>
                            <br />
                            <h2>Amount: ₹ {this.state.body.route == 'oneWay' ? 100 : this.state.body.route == 'return' ? 200 : ''}</h2>
                            <br />
                            <button className="btn btn-primary" type="button" onClick={(e) => this.addVehicle(false)} >Save Vehicle Details</button>
                        </div>
                    </div>
                </div>

                <div id="myModal-verify" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close" onClick={(e) => this.closeModal()}>&times;</span>
                        <div>
                            <input type="text" className="form-control" name="vehicleRegistrationNumber" placeholder="Vehicle Registration Number" required onChange={(e) => this.enterInputValue(e.target.value, 'vehicleRegistrationNumber')} /><br />
                            <br />
                            <button className="btn btn-primary" type="button" onClick={(e) => this.addVerifyVehicle()} >Verify Vehicle Details</button>
                        </div>
                    </div>
                </div>

                <div id="myModal-print" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close" onClick={(e) => this.closeModal()}>&times;</span>
                        <div>
                            <h2>Vehicle Number : {this.state.body.vehicleRegistrationNumber}</h2>
                            <h2>Amount : ₹ {this.state.body.amountPaid}</h2>
                            <h2>Route : {this.state.body.route}</h2>
                            <br />
                            <button className="btn btn-primary" type="button" onClick={(e) => this.print(true)} >Print</button>
                        </div>
                    </div>
                </div>

                <div id="myModal-update" className="modal">
                    <div className="modal-content">
                        <span className="close" id="close" onClick={(e) => this.closeModal()}>&times;</span>
                        <div>
                            <h2>Journey Completed? {this.state.body.vehicleRegistrationNumber}</h2>
                            <br />
                            <button className="btn btn-primary" type="button" onClick={(e) => this.updateJourney()} >Update</button>
                            <button className="btn btn-danger" type="button" onClick={(e) => this.closeModal()} >Cancel</button>
                        </div>
                    </div>
                </div>

                <div style={this.state.rightCar}>
                    <img src={require('../css/car-in.png')} style={{ 'width': '200px' }} />
                </div>
                <div style={this.state.leftCar}>
                    <img src={require('../css/car-out.png')} style={{ 'width': '200px' }} />
                </div>
                <div className="wrapper">
                    <div className="main-area">
                        <div className="out">
                            <button className="btn btn-primary button" onClick={(e) => this.verifyVehicle(true)}>Verify Vehicle</button>
                            <button className="btn btn-primary button" onClick={(e) => this.openAddOutVehicle()}>Add Vehicle</button>
                        Out</div>
                        <div className="in">
                            In    <button className="btn btn-primary button" onClick={(e) => this.openAddInVehicle()}>Add Vehicle</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


dashboard.contextTypes = {
    router: { PropTypes }.object
}

export default dashboard;