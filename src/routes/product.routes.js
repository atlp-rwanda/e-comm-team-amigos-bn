import express from 'express'
import product from './products/product'
import review from './Review/review'

const router = express.Router()
router.use('/product', product)
router.use('/reviews', review)
export default router
