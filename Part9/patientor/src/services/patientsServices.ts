import patients from '../../data/patients';
import { v1 as uuid } from 'uuid'
 
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const findById = (id: string): PatientEntry | undefined => {
	const entry = patients.find(p => p.id === id);
	return entry;
};

const getEntries = (): PatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	}));
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
	const newPatientEntry = {
		id: uuid(),
		...entry
	};
	patients.push(newPatientEntry);
	return newPatientEntry;
}

export default {
	getEntries,
	getNonSensitiveEntries,
	findById,
	addPatient
}
