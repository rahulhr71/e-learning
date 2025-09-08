const router=require('express').Router()
const {addCourse,getCourse,updateCourse,deleteCourse}=require('../../controllers/course')
router.get('/getcourse',getCourse)
router.post('/addcourse',addCourse)
router.put('/update/:id',updateCourse)
router.delete('/delete/:id',deleteCourse)
router.get('/search',require('../../controllers/course').searchCourse)
router.get('/categories',require('../../controllers/course').getCategoriesWithCount)

module.exports=router