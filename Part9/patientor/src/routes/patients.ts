import express from 'express';
import { getNonSensitiveEntries } from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(getNonSensitiveEntries());
});

export default router;
