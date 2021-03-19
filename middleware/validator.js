const mongoose =require('mongoose');
module.exports = function (Id) {
    return mongoose.Types.ObjectId.isValid(Id);
}