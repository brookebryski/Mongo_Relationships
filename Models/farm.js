const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationshipBasics', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("there was a Mongo connection error:")
    console.log(err)
})

const productSchema = new Schema({
    name: String, 
    price: Number,
    season: {
        type: String, 
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

const Product = mongoose.model('Product', productSchema);

// Product.insertMany([
//     { name: 'Watermelon', price: '5.00', season: 'Summer'},
//     { name: 'Apple', price: 1.00, season: 'Fall'},
//     { name: 'Grapes', price: 2.00, season: 'Winter'}
// ])

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = new mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
 const farm = new Farm({ name: 'Ojai Valley Farm', city: 'Ojai, CA'});
 const melon = await Product.findOne({ name: 'Watermelon'});
 farm.products.push(melon);
 await farm.save();
}

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Ojai Valley Farm' });
    const apple = await Product.findOne({ name: 'Apple'});
    farm.products.push(apple);
    farm.save();
}

Farm.findOne({ name: 'Ojai Valley Farm'})
.populate('products')
.then(farm => console.log(farm))