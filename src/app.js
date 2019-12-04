import express from 'express';
import { urlencoded, json } from 'body-parser';
// use this port for socket connection
const port = 3000;

//create an express app
const app = express();

// parse request of the contenttype - application/x-www-form-urlencoded
app.use(urlencoded({extended : true})); 

//parse the application/json
app.use(json());

app.get('/', (req, res) => {
    res.json({'message':'Hi there!!!, this is just for starters, main course later'});
});

// listen server on port 
app.listen(port, () => {
    console.log(`server started at port :${port}`)
})