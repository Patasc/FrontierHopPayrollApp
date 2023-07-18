import React, { Component } from 'react';

import {getAllStorage, setItem, removeEmployee, getEmployee} from './Utils/StaticFunctions';
import {getAmountOfIntervalsPassed, getAmountOwed, getNextPayTime, payWorker} from './Utils/PayCalculators';

export default class StaffListComponent extends Component{
    constructor(props) {
        super(props);

        window.addEventListener('storage', () => {
            this.forceUpdate();
        })

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onPayChange = this.onPayChange.bind(this);

        this.new_pay = {};
        this.new_title = {};
        this.new_pay_interval = {};

    }

    editPay(e, id){
        if (! (this.new_pay[id])){
            return;
        }

        e.preventDefault();
        setItem("employees", id, "pay_amount", this.new_pay[id]);
    }

    editTitle(e, id){
        if (! (this.new_title[id])){
            return true;
        }

        e.preventDefault();
        setItem("employees", id, "title", this.new_title[id]);
    }

    editPayInterval(e, id){
        if (! (this.new_pay_interval[id])){
            return true;
        }

        e.preventDefault();
        setItem("employees", id, "pay_interval", this.new_pay_interval[id]);
    }

    onTitleChange(e, id){
        this.new_title[id] = e.target.value;
    }

    onPayChange(e, id){
        this.new_pay[id] = e.target.value;
    }

    onPayIntervalChange(e, id){
        this.new_pay_interval[id] = e.target.value;
    }

    skipPayWorker(e, id){
        e.preventDefault();

        setItem("employees", id, "nextpay_time", getNextPayTime(getEmployee(id)));
    }

    render(){
        return(
            <div className="staffList">
                <table>
                    <tr>
                        <th className="w">Name</th>
                        <th className="w">Title</th>
                        <th className="w">Salary / interval</th>
                        <th className="w">Pay Interval / min</th>
                        <th className="w">Total received</th>
                        <th className="w">Amount owed</th>
                        <th className="w">Time worked</th>
                        <th className="w">Pay Worker</th>
                        <th className="w">Skip Pay</th>
                        <th>Edit Pay</th>
                        <th>Edit Pay Interval</th>
                        <th>Edit Title</th>
                        <th>Bonus</th>
                        <th>Fire Worker</th>
                    </tr>
                    {getAllStorage("employees").map((item) => {
                        return (
                            <tr>
                                <td className="w">{item.name}</td>
                                <td className="w">{item.title}</td>
                                <td className="w">{item.pay_amount}</td>
                                <td className="w">{item.pay_interval}</td>
                                <td className="w">{item.total_pay}</td>
                                <td className="w">{getAmountOwed(item)}</td>
                                <td className="w">{getAmountOfIntervalsPassed(item) * parseInt(item.pay_interval)}</td>
                                <td className="w"><form onSubmit={event => payWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Pay Worker</button></form></td>
                                <td className="w"><form onSubmit={event => this.skipPayWorker(event, item.id)}><button type="submit" className="btn btn-primary btn-block">Skip Pay</button></form></td>
                                <td><form onSubmit={event => this.editPay(event, item.id)}>
                                    <input type='number' onChange={event => this.onPayChange(event, item.id)}/>
                                    <button type="submit">Edit Pay</button>
                                </form></td>

                                <td><form onSubmit={event => this.editPayInterval(event, item.id)}>
                                    <input type='number' onChange={event => this.onPayIntervalChange(event, item.id)}/>
                                    <button type="submit">Edit Pay Interval</button>
                                </form></td>

                                <td><form onSubmit={event => this.editTitle(event, item.id)}>
                                    <input type="text" onChange={event => this.onTitleChange(event, item.id)}/>
                                    <button type="submit">Edit Title</button>
                                </form></td>

                                <td>{item.bonus}</td>

                                <td className="fire_pay">
                                    <form onSubmit={event => removeEmployee(item.id)}>
                                        <button type="submit" className="btn btn-primary btn-block">Fire</button>
                                    </form>
                                </td>

                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}