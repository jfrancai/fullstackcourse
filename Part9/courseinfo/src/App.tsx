interface HeaderProps {
	courseName: string
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
	description: string;	
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface PartProps {
	part: CoursePart
}

interface ContentProps {
	courseParts: CoursePart[]
}

interface TotalProps {
	courseParts: CoursePart[]		
}

const Header = (props: HeaderProps): JSX.Element => {
	return (
		<h1>{props.courseName}</h1>
   )
}

const Part = (props: PartProps): JSX.Element => {
	switch(props.part.kind) {
		case "basic":
			return (
				<div>
					<b>{props.part.name} {props.part.exerciseCount}</b><br/>
					{props.part.description}
				</div>
				);
		case "group":
			return (
				<div>
					<b>{props.part.name} {props.part.exerciseCount}</b><br/>
					Group project count: {props.part.groupProjectCount}
				</div>
			)
		case "background":
			return (
				<div>
					<b>{props.part.name} {props.part.exerciseCount}</b><br/>
					Background Material: {props.part.backgroundMaterial}
				</div>
			)
		case "special":
			return (
				<div>
					<b>{props.part.name} {props.part.exerciseCount}</b><br/>
					Description: {props.part.description}<br/>Required skills: {props.part.requirements.join(', ')}
				</div>
			)
	}
}

const Content = (props: ContentProps): JSX.Element => {
	return (
		<div>
			<Part part={props.courseParts[0]} />
			<Part part={props.courseParts[1]} />
			<Part part={props.courseParts[2]} />
			<Part part={props.courseParts[3]} />
			<Part part={props.courseParts[4]} />
			<Part part={props.courseParts[5]} />
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

const courseParts: CoursePart[] = [
	{
		name: "Fundamentals",
		exerciseCount: 10,
		description: "This is an awesome course part",
		kind: "basic"
	},
	{
		name: "Using props to pass data",
		exerciseCount: 7,
		groupProjectCount: 3,
		kind: "group"
	},
	{
		name: "Basics of type Narrowing",
		exerciseCount: 7,
		description: "How to go from unknown to string",
		kind: "basic"
	},
	{
		name: "Deeper type usage",
		exerciseCount: 14,
		description: "Confusing description",
		backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
		kind: "background"
	},
	{
		name: "TypeScript in frontend",
		exerciseCount: 10,
		description: "a hard part",
		kind: "basic",
	},
	{
		name: "Backend development",
		exerciseCount: 21,
		description: "Typing the backend",
		requirements: ["nodejs", "jest"],
		kind: "special"
	}
];

const App = () => {
	const courseName = "Half Stack application development";

	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<Total courseParts={courseParts} />
		</div>
   );
};

export default App;
