const express = require('express');
const chalk = require('chalk');
const app = express();

/** 
 * Express Config
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use('/', ()=> {
    console.log('home');
})
app.use('/slow', ()=>{
    console.log('slow');
});

app.listen(app.get('port'), () =>{
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
})