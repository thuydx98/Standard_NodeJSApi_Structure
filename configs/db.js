import mongoose from 'mongoose';
export const connect = () => {
    mongoose.connect('mongodb+srv://admin:admin@mongodb.h4uxf.mongodb.net/hrm?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (!err) {
            console.log("MongoDB connect succeed.");
        } else {
            console.log("Error in database connection: " + JSON.stringify(err, undefined, 2));
        }
    });
}