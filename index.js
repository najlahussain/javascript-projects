//demo connecting to an api ghibliapi.vercel.app usinf fetch and promise

//connecting with API
const fetchPromise = fetch("https://ghibliapi.vercel.app/people");

//getting the div with id main from html page
const main = document.getElementById("main");

//fetching response using promise
fetchPromise.then(response => {
        return response.json();//converting response to json object
    }).then(people => {
            //displaying response on html page
            main.innerHTML = listOfNames(people);
            // console.log(colors);
        });
       //function to display names in unordered list form
function listOfNames(people){
    const names = people.map(person=>`<li>${person.name}</li>`).join("\n");
    return `<ul>${names}</ul>`;
}