const RandomImageRouter = (require('express')).Router();
const { getSquareImage } = require('../controllers/randomImage');
const imageResponder = require('../middleware/responders/image');

RandomImageRouter.route('/')
  .get(getSquareImage, imageResponder);

module.exports = RandomImageRouter;
