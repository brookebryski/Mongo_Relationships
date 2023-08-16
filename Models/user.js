const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationshipBasics', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("there was a Mongo connection error:")
    console.log(err)
})

const userSchema = new mongoose.Schema({
    first: String, 
    last: String,
    addresses: [
        {
            _id: { id: false },
            street: String,
            city: String, 
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Brooke',
        last: 'Bryski'
    })
    u.addresses.push({
        street: '1440 Hemmingway Rd',
        city: 'London',
        state: 'UK',
        country: 'England'
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '1756 Beverly Rd',
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
         }
    )
    const res = await user.save();
    console.log(res);
}

makeUser();