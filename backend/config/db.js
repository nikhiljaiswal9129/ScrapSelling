import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/ScrapWala').then((val) => {
    console.log('MongoDB connected');
});  

export default mongoose;