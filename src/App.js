import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FormDataComponent from './components/form-payroll-components.js';
import PayoutComponent from "./components/payout-component";
import StaffListComponent from "./components/staff-list-component";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div style={{overflow: "hidden"}}>
                    <div className={"halfWidth"} style={{float: "left", border: "1px solid black"}}><FormDataComponent /></div>
                    <div className={"halfWidth"} style={{float: "left", border: "1px solid black"}}><PayoutComponent /></div>
                </div>
                <div style={{border: "1px solid black"}}>
                    <StaffListComponent />
                </div>
            </div>
        );
    }
}
export default App;