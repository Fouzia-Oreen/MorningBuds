import express from 'express'
import { test, updateUser , deleteUser, signoutUser} from '../controllers/userController.js'
import { verifyToken } from '../utils/verifyUser.js'
const router = express.Router()

router.get('/test', test)
router.put('/update/:iserId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser);
router.delete('/signout', signoutUser);

export default router