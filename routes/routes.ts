import express = require('express');
import {updateProduct} from '../handlers/vendor/vendor';
const router = express.Router();

router.get('/' , (req,res)=>{
    res.send('Welcome ');
})

router.put('/stock/:apparelCode/:size', (req,res)=>{
let apparelDto = {
    apparelCode: req.params.apparelCode,
    size: req.params.size,
    price: req.body.price,
    quantity: req.body.quantity
}
})
router.put('/stock/')
module.exports = router;