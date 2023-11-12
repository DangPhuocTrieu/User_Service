import express from "express";
import User from '../models/User.js';
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { verifyPermission } from "../middleware/verifyPermission.js";

const router = express.Router();

// Lấy tất cả người dùng
router.get('/getAll', verifyPermission, async (req, res) => {
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
router.get('/get/:id', verifyPermission, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('Cart', ['Quantity', 'ProductID']);
        res.status(200).json({ 
            success: true, 
            message: 'Lấy người dùng thành công!', 
            data: user 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
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
                message: 'Sửa người dùng thành công'
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

// Thêm vào giỏ hàng
router.post('/cart/:userId', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
       const product = await Product.findById(productId);
       const user = await User.findById(req.params.userId);

       // tìm xem trong giỏ hàng đã tồn tại sản phẩm đó của user muốn thêm chưa
       const item = await Cart.findOne({ UserID: user._id, ProductID: product._id });

       // nếu có => cập nhật lại số lượng của sản phẩm đó
       if (item) {
        item.Quantity = item.Quantity + quantity;
        await item.save();
        
       // nếu không => tạo sản phẩm mới trong giỏ hàng
       } else {
           const newItem = new Cart({
                UserID: user._id,
                ProductID: product._id,
                Quantity: quantity
           })
           const savedItem = await newItem.save();
           await user.updateOne({ $push: { Cart: savedItem._id } });
       }

       res.status(200).json({
        success: true,
        message: 'Thêm sản phẩm vào giỏ hàng thành công'
    });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
});

export default router