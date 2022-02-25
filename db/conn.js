const mongoose = require('mongoose');
const dburl = "mongodb://localhost:27017/mongotube"


mongoose.connect(dburl, {  
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // mongoose.connection
    .then(() => console.log("db Connected"))
    .catch((error) =>
        console.log('you error', error));