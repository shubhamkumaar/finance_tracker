import mongoose from "mongoose";

export const BudgetModel = mongoose.model('Budget', new mongoose.Schema({
    food:{
        type: Number,
        default: 0
    },
    rent:{
        type: Number,
        default: 0
    },
    travel:{
        type: Number,
        default: 0
    },
    subscription:{
        type: Number,
        default: 0
    },
    other:{
        type: Number,
        default: 0
    },
    time : {
        type:'string',
        default:"month"
    }
}));