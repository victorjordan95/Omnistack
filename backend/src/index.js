const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(`mongodb+srv://victorjordan95:viku1995@cluster0-y3luc.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

app.use(require('./routes'));

app.listen(3333);