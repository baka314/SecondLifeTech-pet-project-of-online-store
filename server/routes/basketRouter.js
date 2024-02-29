const Router = require('express');
const router = new Router();
const basketController = require('../controllers/BasketController');

router.post('/', basketController.create);
router.get('/:id', basketController.getOne);
router.get('/', basketController.getAll);
router.put('/:id', basketController.update); // Add this line for updating a basket
router.delete('/:id', basketController.delete);

module.exports = router;
