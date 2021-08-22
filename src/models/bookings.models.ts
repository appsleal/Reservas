import { Schema,model,Document } from 'mongoose'

export interface Itables {
    name:string
}

const BookingsSchema = new Schema({
    restaurant_id:{
        type:String,
    },
    table_id:{
        type:String,
    },
    date:{
        type:Date,
    }
});

interface IBooking extends Document{
    restaurant_id:string;
    table_id:string;
    date:Date;
}

export const Bookings = model<IBooking>('Bookings',BookingsSchema);