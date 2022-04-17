export const updateTodo=(payload)=>{
    // var today = new Date(),

    // date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '            (' + today.getHours() + ':' + today.getMinutes()+')';
    payload.forEach(element => {
        element.date= new Date();
        
    });
    return payload;
    }