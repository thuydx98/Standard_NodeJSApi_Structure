import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: String,
    companyCode: {
        type: String
    }
});

export default mongoose.model('companies', companySchema);