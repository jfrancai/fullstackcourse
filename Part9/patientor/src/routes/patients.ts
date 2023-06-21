import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatientEntry from '../utils';

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
	try {
		const newPatientEnty = toNewPatientEntry(req.body);
		const addedEntry = patientsServices.addPatient(newPatientEnty);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
})

export default router;
