import express from 'express';
import patientsServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
	return res.send(patientsServices.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	const patient = patientsServices.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	const { name, dateOfBirth, ssn, gender, occupation } = req.body;

	const addedEntry = patientsServices.addPatient(
		name, dateOfBirth, ssn, gender, occupation
	);
	res.json(addedEntry);
})

export default router;
