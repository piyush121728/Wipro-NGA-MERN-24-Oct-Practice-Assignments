const express=require('express');
const router=express.Router();
const validate=require('../middleware/validateCourseId');
const courses=require('../data/courses.json').courses;

router.get('/',(req,res)=>{
  res.render('courses',{courses});
});

router.get('/:id',validate,(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).json({error:"Course not found"});
  res.json(course);
});

module.exports=router;
