import express from 'express';
import { isNotNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;
	if (isNotNumber(height) || isNotNumber(weight)) {
		res.status(400).send({
			error: 'malformatted parameters'
		});
	} else {
		const bmi = calculateBmi(Number(height), Number(weight));
		res.send({
			height: Number(height),
			weight: Number(weight),
			bmi
		});
	}
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
