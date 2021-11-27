const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/reserva', require('./routes/reserva'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/personal', require('./routes/personal'));

// servidor
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});