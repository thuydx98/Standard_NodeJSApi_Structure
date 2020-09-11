import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const categoryCompanySchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'companies'
    }
});

export default mongoose.model('categoriesCompanies', categoryCompanySchema);
