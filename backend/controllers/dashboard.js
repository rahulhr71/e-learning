const User = require('../model/user'); 
const dashboardController=async (req,res)=>{
   try{
    const getUsers = await User.find({});
    if (getUsers.length === 0) {
        return res.status(404).json({ message: 'No users found', success: false });
    }
    res.status(200).json({ message:"successfull", success: true,getUsers,id:getUsers[0]._id});
    console.log(getUsers[0]._id);
    

}
catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: 'Internal server error', success: false });
}
   
    
}
module.exports = {dashboardController};