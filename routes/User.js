import express from "express";
import User from '../models/User.js';
import Post from "../models/Post.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

const router = express.Router();

// Lấy tất cả người dùng
router.get('/', verifyPermission, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ 
            success: true, 
            message: 'Lấy tất cả người dùng thành công', 
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
})

// Lấy người dùng theo id
router.get('/:id', verifyPermission, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('Posts', ['Title', 'Description']);
        res.status(200).json({ 
            success: true, 
            message: 'Lấy người dùng thành công!', 
            data: user 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
})

// Sửa người dùng theo id
router.put('/edit/:id', verifyPermission, async (req, res) => {
    const id = req.params.id;
    const { Username, Email } = req.body;

    try {
        const existUserName = await User.findOne({ Username: Username });
        const existEmail = await User.findOne({ Email: Email });

        if (!existUserName && !existEmail) { 
            await User.findOneAndUpdate( { _id: id }, { ...req.body });
            res.status(200).json({
                success: true,
                message: 'Sửa người dùng thành công!'
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: 'Username hoặc email đã tồn tại'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

// Xóa người dùng
router.delete('/delete/:id', verifyPermission, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Xóa người dùng thành công'
         });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router