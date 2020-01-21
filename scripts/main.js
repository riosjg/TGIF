console.log("Yo, yo yo, 148-3 to the 3 to the 6 to the 9, representing the ABQ, what up biatch?! Leave it at the tone.");

											// JS Basics

// Excercise 1

var myName = "Gabriel";

console.log(myName);

// Excercise 2

var myAge = 22;

console.log(myAge);

// Excercise 3

var ignasiAge = 32;

var ageDiff	= (myAge - ignasiAge);

console.log(ageDiff);


// Excercise 4

var ageComparison = 21;

if(myAge > ageComparison)
{
	console.log("You are older than 21");
}
else
{
	console.log("You are not older than 21");
}

// Excercise 5

if(myAge > ignasiAge)
	console.log("Ignasi is younger than you");
else
{
	if(myAge < ignasiAge)
		console.log("Ignasi is older than you");
	else
		console.log("You have the same age as Ignasi");
}

											// JS Array Functions

// Excercise 1

console.log("Create an array with all the names of your class (including mentors).  Sort the array alphabetically.  Print the first element of the array in the console.  Print the last element of the array in the console.  Print all the elements of the array in the console.");

var classroomPersons = ['Nahuel F', 'Gabriel', 'Eduardo', 'Matias', 'Ezequiel', 'Elias', 'Branko', 'Rodrigo', 'Jose', 'Nicolas F.', 'Agustin', 'Nicolas S.', 'Mauro', 'Lucio', 'Ivan', 'Alexis', 'Lucas H.', 'Roman', 'Rocio', 'Lucas G.', 'Diego', 'Alan', 'Ariel', 'Leandro', 'Nahuel L.', 'Gian', 'Eri'];
var i, classroomPersonsSize;

classroomPersonsSize = classroomPersons.length;

classroomPersons.sort();

console.log("First person on the list: " + classroomPersons[0]);

console.log("Last person on the list: " + classroomPersons[classroomPersonsSize - 1]);

console.log("List of the entire classroom sorted by alphabetical order:")
for(i=0; i < classroomPersonsSize; i++)
{
	console.log(classroomPersons[i]);
}



