import React, { Component } from 'react';

import {getAllStorage, setItem, getEmployee, removeEmployee} from './Utils/StaticFunctions';

export default class PayoutComponent extends Component {
    constructor(props) {
        super(props);

        window.addEventListener('storage', () => {
            this.forceUpdate();
        })
    }

    payWorker(e, id){
        e.preventDefault();

        setItem("employees", id, "nextpay_time", this.getNextPayTime(getEmployee(id)));

        let worker = getEmployee(id);

        setItem("employees", id, "total_pay", parseInt(worker.pay_amount) + parseInt(worker.total_pay));
    }

    skipPayWorker(e, id){
        e.preventDefault();

        setItem("employees", id, "nextpay_time", this.getNextPayTime(getEmployee(id)));
    }

    fireWorker(e, id){
        e.preventDefault();
        removeEmployee(id);
    }

    getNextPayTime(workerData){
        let nextpay_time = new Date(workerData.nextpay_time)
        return new Date(nextpay_time.getTime() + workerData.pay_interval * 60000);
    }

    getSortedByNextPayout(){
        let temp = getAllStorage("employees");
        return temp.sort((a, b) => (this.getNextPayTime(a) > this.getNextPayTime(b) ? 1 : -1)).slice(0, 7);
    }

    getFormattedTime(timeObject){
        let hour = timeObject.getHours();
        let minutes = timeObject.getMinutes();

        if (minutes < 10){
            minutes = "0" + minutes;
        }

        return hour + ":" + minutes;
    }

    needsToBePaid(worker){
        return new Date() > this.getNextPayTime(worker)
    }

    needsToBePaidSoon(worker){
        return (new Date((new Date()).getTime() + 10 * 60000)) > this.getNextPayTime(worker);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({time: Date.now()}), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    getPayoutColour(worker){
        if (this.needsToBePaid(worker)){
            return "red";
        }
        else if (this.needsToBePaidSoon(worker)){
            return "green"
        }
        return "black";
    }

    test(){
        return (
            <div>
                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Salary</th>
                        <th>Paytime</th>
                        <th>Pay worker</th>
                        <th>Skip pay</th>
                        <th>Fire</th>
                    </tr>
                    {this.getSortedByNextPayout().map((item) => {
                        return (
                                <tr style={{color: this.getPayoutColour(item)}}>
                                    <td className="table_firstname">{item.firstname}</td>
                                    <td className="table_lastname">{item.lastname}</td>
                                    <td className="table_title">{item.title}</td>
                                    <td className="table_pay_amount">{item.pay_amount}</td>
                                    <td className="table_next_pay">{this.getFormattedTime(this.getNextPayTime(item))}</td>
                                    <td className="give_pay"><form onSubmit={event => this.payWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Pay Worker</button></form></td>
                                    <td className="skip_pay"><form onSubmit={event => this.skipPayWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Skip Pay</button></form></td>
                                    <td className="fire_pay"><form onSubmit={event => this.fireWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Fire</button></form></td>
                                </tr>
                    )})}
                </table>
            </div>
        )
    }
    render() {
        return(
            <div className="payout-container"> {this.test()} </div>
        )
    }
}