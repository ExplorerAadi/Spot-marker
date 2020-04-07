const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nedb = require('nedb');
const database = new nedb('database.db');
const collection = "places";
const objectId = require('nedb').ObjectID;

database.loadDatabase();

app.listen(3000, () => {
    console.log('listening at 3000')
});
app.use(express.static('public'));
app.use(express.json());

const getPrimaryKey = (_id) => {
    return objectId(_id);
}

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err) {
            console.log(error)
        }
        response.json(data)
    })
})

app.post('/api', (request, response) => {
    const data = request.body;
    database.insert(data);
    response.json(data)
})

app.put('/api/:id', (request, response) => {
    const locationId = request.params.id;
    const userInput = request.body;
    console.log(locationId)

    database.update({_id : database.getPrimaryKey(locationId)}, { $set: {inputValue : userInput.inputValue}}, {upsert : true}, (err, data) => {
        if(err) {
            console.log(error)
        }
        response.json(data)
    })
})