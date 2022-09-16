const mongoose=require('mongoose');
var people=mongoose.Schema({
    name:{
        type:String,
        requre:true
    },
    email:{
        type:String,
    require:true
    },
    password:{
      type:String,
      require:true
    },
    point:{
        type:Number,
        require:true
    },point:{
        type:Number,
        default:' '
    }
})
const member=mongoose.model('users',people);
mongoose.model('post',people);
module.exports=member;
//
// mongoose.model('post',userSchema);
// module.exports=mongoose.model('users',people,'users');