 const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use("/api",apiRoutes)

router.use("/api", (req,res,next)=>{
    next(
    new Error("The route you are trying to access does not exist.")
    )
})
module.exports = router;