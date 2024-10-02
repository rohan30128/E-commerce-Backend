const {model,Schema} = require("mongoose");

const categorySchema = Schema({
    name: {
        type : String,
        required : true,
        unique : true
    },
    slug : {
        type : String,
        lowercase : true
    }
});

const Category = model("category",categorySchema);

module.exports = Category;