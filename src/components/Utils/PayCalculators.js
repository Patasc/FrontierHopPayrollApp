import {getEmployee, setItem} from "./StaticFunctions";

export function getAmountOfIntervalsPassed(workerData){
    let minutesElapsed = Math.floor((new Date() - getLastPaytime(workerData)) / 60000);

    return Math.floor(minutesElapsed / (workerData.pay_interval));
}

export function getLastPaytime(workerData){
    return new Date(workerData.nextpay_time);
}

export function getNextPayTime(workerData){
    return new Date(getLastPaytime(workerData).getTime() + workerData.pay_interval * 60000);
}

export function needsToBePaid(worker){
    return new Date() > getNextPayTime(worker)
}

export function getAmountOwed(workerData){
    if (! needsToBePaid(workerData)) return 0;

    return getAmountOfIntervalsPassed(workerData) * workerData.pay_amount;
}

export function payWorker(e, id){
    e.preventDefault();

    let worker = getEmployee(id);

    let date = new Date(getLatestPayout(worker).getTime());

    setItem("employees", id, "nextpay_time", date);

    let toPay = parseInt(worker.pay_amount);

    if (getAmountOfIntervalsPassed(worker) > 0){
        toPay *= getAmountOfIntervalsPassed(worker);
    }

    setItem("employees", id, "total_pay", toPay + parseInt(worker.total_pay));
}

export function getLatestPayout(workerData){
    if (getNextPayTime(workerData) < new Date()) {
        return new Date(getLastPaytime(workerData).getTime() + (getAmountOfIntervalsPassed(workerData) * workerData.pay_interval * 60000));
    }

    return new Date(new Date(workerData.nextpay_time).getTime() + workerData.pay_interval * 60000);
}