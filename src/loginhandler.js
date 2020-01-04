const db = require('./db/index.js');

exports.loginHandler = function loginHandler(req) {
    
    //const requestedUserID = req.params.id;
    const requestedUserID = 1;
    const queryText = 'SELECT * FROM users where id = $1';
    const values = [requestedUserID];

    this.result = 'example';
    
    db.connect(err => {
        if (err) {
          console.error('connection error', err.stack)
        } else {
          console.log('connected')
        }
      });
    
    return getUser(queryText, values);
}

async function getUser(queryText, values) {
    try {
        const results = await db.query(queryText, values);
        db.end();
        console.log(results.rows);
        return results.rows;
    } catch(e){
        db.end();
        console.log('There was an error with the getUser() query...')
        console.error(e.stack);
        return [];
    }
}


