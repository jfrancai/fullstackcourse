const Header = ({header}) => <h1>{header}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({content}) => {
	const total = content.reduce((sum, part) => sum + part.exercises, 0)
	return (
		<>
			{ content.map((part) => <Part key={part.id} part={part} />) }
			<b>total of {total} exercises</b>
		</>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header header={course.name}/>
			<Content content={course.parts} />
		</>
	)	
}

export default Course
