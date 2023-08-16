const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/relationshipBasics', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection open!")
})
.catch(err => {
    console.log("there was a Mongo connection error:")
    console.log(err)
})

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String, 
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async() => {
    const u = new User({ username: 'bbrysk', age: 28});
    const tweet1 = new Tweet({ text: 'I am considering a MS', likes: 50})
    tweet1.user = user;
    user.save();
    tweet1.save();
}
