import diaryData from '../../data/entries';

import { DiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = () => {
	return diaries;
};

const addDiary = () => {
	return null;
};

 export default {
	 getEntries,
	 addDiary
 }
