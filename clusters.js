const express = require('express');
const cluster = require('cluster');
const os = require('os');
const chalk = require('chalk');
const app = express();


if (cluster.isMaster) {
    const nCpus = os.ncpus().length;
    console.log('Forking ${nCpus} CPUs');

    for(let i = 0; i < nCpus; i++) {
        cluster.fork();
    }

// workers
} else {
    /** 
     * Express Config
     */
    app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
    app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);


    app.get('/slow', (req, res) => {
        for (var i = 0; i < 1e4; i++) {
            console.log(i)
        }
        res.send(Math.random().toString());
    });

    app.get('/', (req, res) => {
        res.send('home');
    })

    app.listen(app.get('port'), () => {
        console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    });


}