var message = 'Hello';
//message();
var user = {
    name: 'toto',
};
// user.age
var greet = function (person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString()));
};
greet('julien', new Date());
var names = ["Alice", "Bob", "Eve"];
names.forEach(function (s) {
    console.log(s);
});
