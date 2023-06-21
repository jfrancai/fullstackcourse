import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(diagnosesServices.getEntries());
});

export default router;
