export const calculateBmi = (height: number, mass: number): string => {
	if (height === 0)
		throw new Error('Can\'t devide by 0');
	const bmi: number = mass / ((height / 100) ** 2);
	if (bmi < 16) {
		return 'Underweight (Severe thinness)';
	} else if (bmi < 16.9) {
		return 'Underwieght (Moderate thinness)';
	} else if (bmi < 18.4) {
		return 'Underwieght (Mild thinness)';
	} else if (bmi < 24.9) {
		return 'Normal range';
	} else if (bmi < 29.9) {
		return 'Overweight (Pre-obese)';
	} else if (bmi < 34.9) {
		return 'Obese (Class I)';
	} else if (bmi < 39.9) {
		return 'Obese (Class II)';
	} else {
		return 'Obese (Class III)';
	}
};
