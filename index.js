const express = require('express');
const app = express();
const port = 3000;
let courses = require('./data');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  return res.render('index', { courses });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/save', (req, res) => {
    const id = Number(req.body.id);
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);

    const params = {
        "id": id,
        "name": name,
        "description": description,
        "price": price
    }

    courses.push(params);

    return res.redirect('/');
});

app.post('/delete', (req, res) => {
    const id = Number(req.body.id);
    courses = courses.filter(course => course.id !== id);
    return res.redirect('/');
});