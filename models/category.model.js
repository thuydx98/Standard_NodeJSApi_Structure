import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String
    }
});

export default mongoose.model('categories', categorySchema);