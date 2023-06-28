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
