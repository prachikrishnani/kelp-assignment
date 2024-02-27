const express = require('express')
const router = express.Router()
const { addUsersController, getDistributionController } = require('../controllers/user.controller')


router.route('/add-users').post(addUsersController)
router.route('/get-distribution').get(getDistributionController)

module.exports = router