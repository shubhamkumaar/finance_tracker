import mongoose from 'mongoose';

export async function connect() {
    if (mongoose.connection.readyState >= 1) return;
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        const db = mongoose.connection;

        db.on('connected', () => {
            console.log('MongoDb connected Successfully');
        });
        db.on('error', (err) => {
            console.log('MongoDb connection error: ', err);
            process.exit();
        });
    }catch(e){
        console.log('Error: ', e);
    }
}