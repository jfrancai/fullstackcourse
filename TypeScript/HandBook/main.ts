const message = 'Hello';

//message();

const user = {
  name: 'toto',
}

// user.age

const greet = (person: string, date: Date) => {
  console.log(`Hello ${person}, today is ${date.toDateString()}`);
}

greet('julien', new Date())

const names = ["Alice", "Bob", "Eve"];

names.forEach((s) => {
  console.log(s);
})

const printDog = (dog: { name: string, age?: string }) => {
    console.log(dog.name);
    console.log(dog.age?.toUpperCase()); // prevent the application from crashing and use undefined
};

printDog({
  name: 'pilou',
})


const handleRequest = (method: "GET" | "POST"): void => {
  console.log(method);
}

const req = { method: "GET" as "GET" };
const req2 = { method: "GET" as "GET" };

handleRequest(req.method);
handleRequest(req2.method as "GET");
