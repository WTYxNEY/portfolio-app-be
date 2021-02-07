const express = require('express');
const { getPortFolio, createPortfolio, getUserPortFolio, getPortFolioByID, editPortfolio,deletePortfolio } = require('../controllers/portfolio')
const auth = require('../middleware/auth')
const router = express.Router();

router.get('/', getPortFolio);
router.get('/:portfolio_id', getPortFolioByID);
router.get('/creator/:id',getUserPortFolio);
router.post('/', auth, createPortfolio);
router.patch('/edit/:id', auth, editPortfolio);
router.delete('/delete/:id', auth, deletePortfolio);

module.exports = router;