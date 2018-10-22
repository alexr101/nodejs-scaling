const longCompute = () => {
    let counter = 0;
    let data = {
        longCompute: {
            completed: false,
            count: counter
        }
    }
    
    for (let i = 0; i < 1e10; i++) {        
        counter++;
    }
    
    data.longCompute.count = counter;
    data.longCompute.complete = true;

    process.send(data);
}

process.on('message', () => {    
    longCompute();
});