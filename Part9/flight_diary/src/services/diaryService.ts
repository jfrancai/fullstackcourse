import diaryData from '../../data/entries';

import { NonSensitiveDiaryEntry, DiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
			id,
			date,
			weather,
			visibility
	}));
};

const getEntries = () => {
	return diaries;
};

const addDiary = () => {
	return null;
};

 export default {
	 getEntries,
	 getNonSensitiveEntries,
	 addDiary
 }
