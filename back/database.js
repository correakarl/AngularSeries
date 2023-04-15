const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/series_db';
mongoose.connect(URI)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));
module.exports = mongoose;