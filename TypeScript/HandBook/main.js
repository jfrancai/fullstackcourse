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
var printDog = function (dog) {
    var _a;
    console.log(dog.name);
    console.log((_a = dog.age) === null || _a === void 0 ? void 0 : _a.toUpperCase()); // prevent the application from crashing and use undefined
};
printDog({
    name: 'pilou',
});
var handleRequest = function (method) {
    console.log(method);
};
var req = { method: "GET" };
var req2 = { method: "GET" };
handleRequest(req.method);
handleRequest(req2.method);
