import React, { Component } from 'react';

import {getAllStorage, setItem} from './Utils/StaticFunctions';

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

    render(){
        return(
            <div className="staffList">
                <table>
                    <tr><th className="w">FirstName</th><th className="w">LastName</th><th className="w">Title</th><th className="w">Salary</th><th className="w">Pay Interval</th><th className="w">Total received</th><th>Edit Pay</th><th>Edit Pay Interval</th><th>Edit Title</th><th>Bonus</th></tr>
                    {getAllStorage("employees").map((item) => {
                        return (
                            <tr>
                                <td className="w">{item.firstname}</td>
                                <td className="w">{item.lastname}</td>
                                <td className="w">{item.title}</td>
                                <td className="w">{item.pay_amount}</td>
                                <td className="w">{item.pay_interval}</td>
                                <td className="w">{item.total_pay}</td>
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
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }
}