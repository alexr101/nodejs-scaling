process.on('message', (msg) => console.log('message from parent:', msg));

let counter = 0;

const repeat = () => {
    let count = 0;
    const repeater = ()=> {
        process.send({
            count: count
        })
    }

    return (iterations) => {
        while(count < iterations){
            repeater();
            count++;
        }

    }
}

let repeater = repeat()
repeater(10);