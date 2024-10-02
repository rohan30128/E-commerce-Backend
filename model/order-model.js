const {model,Schema, default: mongoose} = require("mongoose");

const orderSchema = Schema({
   products : [
    {
        type : mongoose.ObjectId,
        ref  : "product"
    }
   ],
   payment : {},
   buyer : {
    type : mongoose.ObjectId,
    ref : "user"
   },
   status : {
    type : String,
    default : "Not Process",
    enum : ["Not Process","Processing","Shipped","delivered","cancel"]
   }
},{timestamps : true});

const Order = model("order",orderSchema);

module.exports = Order;