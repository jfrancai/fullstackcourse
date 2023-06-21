interface HeaderProps {
	courseName: string
}

interface CourseContent {
	name: string,
	exerciseCount: number
}

interface ContentProps {
	courseParts: CourseContent[]
}

interface TotalProps {
	courseParts: CourseContent[]		
}

const Header = (props: HeaderProps): JSX.Element => {
	return (
		<h1>{props.courseName}</h1>
   )
}

const Content = (props: ContentProps): JSX.Element => {
	return (
		<div>
			<p>
				{props.courseParts[0].name} {props.courseParts[0].exerciseCount}
			</p>
			<p>
				{props.courseParts[1].name} {props.courseParts[1].exerciseCount}
			</p>
			<p>
				{props.courseParts[2].name} {props.courseParts[2].exerciseCount}
			</p>
		</div>
	)
}

const Total = (props: TotalProps): JSX.Element => {
	return (
		<div>
			<p>
				Number of exercises{" "}
				{props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
			</p>
		</div>
	)
}

const App = () => {
	const courseName = "Half Stack application development";
	const courseParts = [
	{
		name: "Fundamentals",
		exerciseCount: 10
	},
	{
		name: "Using props to pass data",
		exerciseCount: 7
	},
	{
		name: "Deeper type usage",
		exerciseCount: 14
	}
	];

	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<Total courseParts={courseParts} />
		</div>
   );
};

export default App;
