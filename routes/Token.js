import express from "express";
import Token from '..//models/Token.js';

const router = express.Router();

// Lấy tất cả token
router.get('/', async (req, res) => {
    try {
        const tokens = await Token.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả token thành công', 
            data: tokens
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router