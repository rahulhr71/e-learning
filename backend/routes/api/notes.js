const router = require("express").Router();
const {getNotes,addNotes} = require("../../controllers/notes");
const { route } = require("./Auth.route");
router.get("/getnotes",getNotes)
router.post("/addnotes",addNotes)
router.put("/updatenote/:id",require("../../controllers/notes").updateNote)
router.delete("/deletenote/:id",require("../../controllers/notes").deleteNote)
module.exports = router;