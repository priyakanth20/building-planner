const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Drawing = require('./models/drawing.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/buildingPlanner', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/save', async (req, res) => {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.send({ status: 'saved', id: drawing._id });
});

app.get('/load/:id', async (req, res) => {
    const drawing = await Drawing.findById(req.params.id);
    res.send(drawing);
});

app.listen(3000, () => console.log('Server running on port 3000'));
