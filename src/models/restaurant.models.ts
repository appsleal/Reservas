import { Schema,model,Document } from 'mongoose'

export interface Itables {
    name:string
}

const RestaurantSchema = new Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    direction:{
        type:String,
    },
    country:{
        type:String,
    },
    url:{
        type:String,
        required: 'URL can\'t be empty',
    },
    tables:[
        {
            name:{
                type:String
            }
        }
    ]
});

RestaurantSchema.path('url').validate((val:any)=>{
    let urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL')

interface IRestaurant extends Document{
    name:string;
    description:string;
    direction:string;
    country:string;
    url:string;
    tables: Array<Itables>
}

export const Restaurants = model<IRestaurant>('Restaurants',RestaurantSchema);