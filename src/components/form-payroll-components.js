import React, { Component } from 'react';
export default class FormDataComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePay = this.onChangePay.bind(this);
        this.onChangeInterval = this.onChangeInterval.bind(this);
        this.onChangeBonusCondition = this.onChangeBonusCondition.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            title: '',
            pay_amount: '',
            pay_interval: 60,
            bonus: '',
            start_time: '',
            nextpay_time: '',
            total_pay: 0,
            id: ''
        }
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangePay(e) {
        this.setState({ pay_amount: e.target.value })
    }

    onChangeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeInterval(e) {
        this.setState({ pay_interval: e.target.value })
    }

    onChangeBonusCondition(e) {
        this.setState({ bonus: e.target.value })
    }

    onChangeStartTime(e) {
        this.setState({ start_time: e.target.value })
    }

    getRandomId(){
        return (Math.floor(Math.random() * (999999999 - 111111111 + 1) + 111111111)).toString();
    }
    onSubmit(e) {
        let today = new Date();
        this.state.start_time = new Date(today.toDateString() + ' ' + this.state.start_time);

        this.state.nextpay_time = this.state.start_time // this.getNextPayTime(this.state);
        let randomNumber = this.getRandomId();

        let storedEmployees = JSON.parse(localStorage.getItem("employees")) || {};

        while (typeof(storedEmployees[randomNumber]) !== "undefined"){
            randomNumber = this.getRandomId();
        }

        this.state.id = randomNumber;

        storedEmployees[randomNumber] = this.state;

        localStorage.setItem("employees", JSON.stringify(storedEmployees))

        e.preventDefault()

        this.setState({
            name: '',
            title: '',
            pay_amount: '',
            pay_interval: 60,
            bonus: '',
            start_time: '',
            nextpay_time: '',
            total_pay: 0,
            id: ''
        })


        window.dispatchEvent(new Event('storage'));
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.onSubmit} style={{paddingBottom: "20px", display:"inline-block", width: "80%"}}>
                    <div>
                        <div className="form-group">
                            <label>Name</label>
                            <input required type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input required type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle} />
                        </div>
                        <div className="form-group">
                            <label>Pay Amount</label>
                            <input required type="number" className="form-control" value={this.state.pay_amount} onChange={this.onChangePay} />
                        </div>

                        <div className="form-group">
                            <label>Pay interval</label>
                            <input value={this.state.pay_interval} type="number" className="form-control" onChange={this.onChangeInterval} />
                        </div>

                        <div className="form-group">
                            <label>Bonus</label>
                            <input type="text" className="form-control" value={this.state.bonus} onChange={this.onChangeBonusCondition} />
                        </div>
                        <div className="form-group">
                            <label>Starting time</label>
                            <input required type="time" value={this.state.start_time} onChange={this.onChangeStartTime}/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}