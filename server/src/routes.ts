import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const router = express.Router();

const classControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

router.get('/classes', classControllers.index);
router.post('/classes', classControllers.create);

router.post('/connections', connectionsControllers.create)
router.get('/connections', connectionsControllers.index)

export default router;