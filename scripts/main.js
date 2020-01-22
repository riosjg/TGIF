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
console.log("--------------------------------------------------------");

// Excercise 1

console.log("	Create an array with all the names of your class (including mentors).  Sort the array alphabetically.  Print the first element of the array in the console.  Print the last element of the array in the console.  Print all the elements of the array in the console.");

var classroomPersons = ['Nahuel F', 'Gabriel', 'Eduardo', 'Matias', 'Ezequiel', 'Elias', 'Branko', 'Rodrigo', 'Jose', 'Nicolas F.', 'Agustin', 'Nicolas S.', 'Mauro', 'Lucio', 'Ivan', 'Alexis', 'Lucas H.', 'Roman', 'Rocio', 'Lucas G.', 'Diego', 'Alan', 'Ariel', 'Leandro', 'Nahuel L.', 'Gian', 'Eri'];

classroomPersons.sort();

console.log("First person on the list: " + classroomPersons[0]);

console.log("Last person on the list: " + classroomPersons[classroomPersons.length - 1]);

console.log("List of the entire classroom sorted by alphabetical order:")

for(let i=0; i < classroomPersons.length; i++)
{
	console.log( (i+1) + ". 	" + classroomPersons[i] );
}

console.log("--------------------------------------------------------");

// Excercise 2

console.log("	Create an array with all the ages of the students in your class.  Iterate the array using a while loop, and then print every age in the console.  Add a conditional inside the while loop to only print even numbers.  Change the loop to use a for loop instead of a while loop.")

var classroomAge = [17, 22, 25, 23, 19, 17, 32, 26, 22, 20, 20, 20, 19, 21, 21, 19, 22, 23, 18, 20, 24, 19, 24, 19, 17, 23, 18];

let i=0;

console.log("	Loop using while:");

while(i < classroomAge.length )
{
	if( (classroomAge[i] % 2) == 0 )
		console.log(classroomAge[i] + " años." );
	i++;
}

i=0 //reinicio el contador i

console.log("	Loop using for:")

for( i=0; i < classroomAge.length; i++)
{
	if( (classroomAge[i] % 2) == 0 )
		console.log(classroomAge[i] + " años." )
}

console.log("--------------------------------------------------------");

var arrTest = [-4, 2, 6, -5, 1, 2, 1, -4];
// var arrTest = [4, 4];

for(let i=0; i < arrTest.length; i++)
{
	console.log(arrTest[i]);
}

console.log("--------------------------------------------------------");

	// Exercise 3

console.log("	Write a function which receives an array as a parameter and prints the lowest number in the array to the console.")

printLowestNumber(arrTest);


function printLowestNumber(arr)
{
	let res=arr[0];
	for (let i=1; i < arr.length; i++)
	{
		if( res > arr[i] )
			res=arr[i];
	}

	console.log("The lowest number is: " + res );
}

console.log("--------------------------------------------------------");

	// Exercise 4

console.log("	Write a function which receives an array as a parameter and prints the biggest number in the array to the console.");

printBiggestNumber(arrTest);


function printBiggestNumber(arr)
{
	let res=arr[0];
	for (let i=1; i < arr.length ; i++)
	{
		if ( res < arr[i] )
			res=arr[i];
	}

	console.log("The biggest number is: " + res);
}

console.log("--------------------------------------------------------");

	// Excercise 5

console.log("Write a function which receives two parameters, an array and an index.  The function will print the value of the element at the given position (one-based) to the console.");

let ind;

ind = 0//x ej

printArrIndex(arrTest, ind);


function printArrIndex(arr, ind)
{
	console.log(arr[ind]);
}

console.log("--------------------------------------------------------");

	// Excercise 6

console.log("	Write a function which receives an array and only prints the values that repeat.");

console.log("These numbers appear more than once:")

printArrayDuplicates(arrTest);

function printArrayDuplicates(arr)
{
	for(let i=0; i < arr.length; i++)
	{
		for(let j=i; j < arr.length; j++)
		{
			if( arr[i] == arr[j+1])
			{
				console.log(arr[i]);
				break;
			}
		}
	}
}

console.log("--------------------------------------------------------");


	// Excercise 7

console.log("	Write a simple JavaScript function to join all elements of the following array into a string.");

let myColor = ["Red", "Green", "White", "Black"];

arrayIntoString(myColor);


function arrayIntoString(arr)
{
	console.log('"' + arr.join('", "') + '"');
}

											// JS String Functions
console.log("--------------------------------------------------------");

console.log("	Write a JavaScript function that reverses a number.");

var nam = 2398;

reverseVar(nam);


function reverseVar(nam)
{
	console.log( nam.toString().split("").reverse().join("") );
}

