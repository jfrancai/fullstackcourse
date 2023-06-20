import patients from '../../data/patients';
 
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export {
	getEntries,
	getNonSensitiveEntries
}
