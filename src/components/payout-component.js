import React, { Component } from 'react';

import {getAllStorage, setItem, getEmployee, removeEmployee} from './Utils/StaticFunctions';
import {getAmountOfIntervalsPassed, getAmountOwed, getLatestPayout, getNextPayTime, payWorker} from './Utils/PayCalculators';

export default class PayoutComponent extends Component {
    constructor(props) {
        super(props);

        window.addEventListener('storage', () => {
            this.forceUpdate();
        })
    }

    skipPayWorker(e, id){
        e.preventDefault();

        setItem("employees", id, "nextpay_time", getNextPayTime(getEmployee(id)));
    }

    fireWorker(e, id){
        e.preventDefault();
        removeEmployee(id);
    }

    getSortedByNextPayout(){
        let temp = getAllStorage("employees");
        return temp.sort((a, b) => (getNextPayTime(a) > getNextPayTime(b) ? 1 : -1)).slice(0, 6);
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
        return new Date() > getNextPayTime(worker)
    }

    needsToBePaidSoon(worker){
        return (new Date((new Date()).getTime() + 10 * 60000)) > getNextPayTime(worker);
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
                        <th>Name</th>
                        <th>Title</th>
                        <th>Amount Owed</th>
                        <th>Time worked</th>
                        <th>Most recent Due Paytime</th>
                        <th>Pay worker</th>
                        <th>Skip pay</th>
                    </tr>
                    {this.getSortedByNextPayout().map((item) => {
                        return (
                                <tr style={{color: this.getPayoutColour(item)}}>
                                    <td className="table_firstname">{item.name}</td>
                                    <td className="table_title">{item.title}</td>
                                    <td className="table_pay_amount">{getAmountOwed(item)}</td>
                                    <td className="table_pay_amount">{getAmountOfIntervalsPassed(item) * parseInt(item.pay_interval)}</td>
                                    <td className="table_next_pay">{this.getFormattedTime(getLatestPayout(item))}</td>
                                    <td className="give_pay"><form onSubmit={event => payWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Pay Worker</button></form></td>
                                    <td className="skip_pay"><form onSubmit={event => this.skipPayWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Skip Pay</button></form></td>
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