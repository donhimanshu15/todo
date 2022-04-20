import moment from 'moment';

export const updateTodo = (payload) => {
    //var today = new Date(),

    // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '            (' + today.getHours() + ':' + today.getMinutes()+')';
    payload.forEach(element => {
        let today = new Date();
        element.starting_date = moment().format('YYYY/MM/DD');
        element.completed_date = moment().format('YYYY/MM/DD');

    });
    return payload;
}

export const timetaken = (start, end) => {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
export const taskcompleted = (payload) => {
    const task = 0;
    payload.forEach(element => { if (element.completed === true) task++; })
    return task;
}
export const dateSet = (payload) => {
    const dateSetForEach = new Set();
    payload.forEach(element => dateSetForEach.add(element.completed_date))
    return dateSetForEach;
}