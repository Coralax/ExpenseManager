//To run: npm run test
const mongoose = require('mongoose');
const config = require('config');
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb+srv://${config.get('db.user')}:${config.get('db.password')}@cluster0.6p3gd.mongodb.net/Test?retryWrites=true&w=majority`).then(() => console.log('Connected to MongoDB Successfully'))
mongoose.connection
    .on('error', (error) => {
        console.warn('Error : ',error);
    });


after((done) => {
    mongoose.connection.collections.UserData.drop(() => {
        done();
    });

});

after((done) => {
    mongoose.connection.collections["cost-collection"].drop(()=> {

        done();
    });

});


