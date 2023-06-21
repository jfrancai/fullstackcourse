import diagnoses from '../../data/diagnose';
 
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
	return diagnoses.map(({code, name, latin}) => ({
		code,
		name,
		latin
	}));
};

export default {
	getEntries
}
