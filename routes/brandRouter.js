const Router = require("express")
const router = new Router()
const {create, getAll} = require("../controllers/brandController");

router.post('/', create)
router.get('/', getAll)

module.exports = router