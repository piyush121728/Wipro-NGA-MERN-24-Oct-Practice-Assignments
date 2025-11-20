const express=require('express');
const router=express.Router();
const users=[];

// GET /users -> return all users
router.get('/', (req, res) => {
  res.status(200).json({
    message: "Users fetched successfully",
    data: users
  });
});

router.post('/',(req,res)=>{
  if(!req.body.name){
    return res.status(400).json({message:"Missing name",data:null});
  }
  const newUser={id:users.length+1,...req.body};
  users.push(newUser);
  res.status(201).json({ message:"User created successfully",data:newUser});
});

module.exports=router;
