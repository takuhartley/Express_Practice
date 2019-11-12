const express = require('express');
const app = express();
const cars = [
    { id: 1, name: 'Tesla'},
    { id: 2, name: 'Toyota'},
    { id: 3, name: 'Mercedes'}
];
app.use(express.json());
app.get('/', (req, res) => res.send(cars));
app.get('/name/:id', (req, res) => res.send(req.params.id));
app.get('/cars/:id', (req, res) => {
    const coolcars = cars.find(c => c.id === parseInt(req.params.id));
    if (!coolcars) res.status(404).send('The car with the given id was not found');
    res.send(coolcars);
});
app.get('/things/:name/:id', function(req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
 });
 app.use('/things', function(req, res, next){
    console.log("A request for things received at " + Date.now());
    next();
 });
app.post('/newcar', (req, res) => {
    if(!req.body.name || req.body.name.length <3 ){
        res.status(400).send('')
    }
    const car = {
        id: cars.length + 1,
        name: req.body.name
    };
    cars.push(car);
    res.send(car);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}!`));