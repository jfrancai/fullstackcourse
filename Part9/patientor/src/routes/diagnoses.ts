import express from 'express';
import { getEntries } from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(getEntries());
});

export default router;
