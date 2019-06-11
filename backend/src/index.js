const express = require('express');
const mongoose = require('mongoose');

const app = express();

console.log(process.env.omnisenha);
mongoose.connect(`mongodb+srv://victorjordan95:${process.env.omnisenha}@cluster0-y3luc.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

app.use(require('./routes'));

app.listen(3333);