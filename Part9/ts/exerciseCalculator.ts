interface TrainingAnalysis {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number
}

export const calculateExercise = (exHours: Array<number>, target: number): TrainingAnalysis => {

	if (target < 0) {
		target = 0;
	}
	const average: number = exHours.reduce((a, b) => {
		return a + b;
	}, 0) / exHours.length;
	const trainingDays: number = exHours.reduce((a, b) => {
		if (b === 0)
			return a;
		return a + 1;
	}, 0);
	const periodLength = exHours.length;
	const success = average < target ? false : true;
	const rating = average / target * 3 > 3 ? 3 : average / target * 3;
	const ratingDescription = ((rating: number) => {
		if (rating < 1) {
			return 'you really suck';
		} else if (rating < 2) {
			return 'it\'s bad and you know it';
		} else if (rating < 3) {
			return 	'not so bad but could be better';
		} else {
			return 'GG';
		}
	})(rating);

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average
	};
};

if (process.argv.length >= 3) {
	const args: Array<string> = process.argv.slice(3, process.argv.length);
	console.log(calculateExercise(args.map(arg => Number(arg)), Number(process.argv[2])));
} else {
	console.log('not enought args');
}
