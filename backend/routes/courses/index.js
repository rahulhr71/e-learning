const router=require('express').Router()
const {addCourse,getCourse,updateCourse,deleteCourse}=require('../../controllers/course')
router.get('/getcourse',getCourse)
router.post('/addcourse',addCourse)
router.put('/update/:id',updateCourse)
router.delete('/delete/:id',deleteCourse)

module.exports=router