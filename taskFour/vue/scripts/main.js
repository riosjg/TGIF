const members = data.results[0].members  

const tbody = document.querySelector("tbody")

const select = document.querySelector("select")

var states = []

var aux = []

members.forEach(member =>
{
    if ( states.indexOf(member.state) == -1 )
        states.push(member.state)
}
)

for(let i=0; i<states.length; i++)
    select.innerHTML += `<option value="${states[i]}">${states[i]}</option>`



function filterArray()
{
    tbody.innerHTML=""
    let checkboxes = document.querySelectorAll("input[type=checkbox]")
    for(let i=0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
        {
            if(select.value == "All")
            {
                aux = members.filter(e => e.party == checkboxes[i].value)
            }else
            {
                aux = members.filter(e => e.party == checkboxes[i].value && e.state == select.value)
            }   
                aux.forEach(member =>
                {
                    let row = tbody.insertRow(-1);
                    let fullname = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`
                    fullname = (member.url == "" ? fullname : `<a href="${member.url}">${fullname}</a>`)
                    row.innerHTML=
                    `<td>${fullname}</td>
                    <td>${member.party}</td>
                    <td>${member.state}</td>
                    <td>${member.seniority}</td>
                    <td>${member.votes_with_party_pct}</td>`
                })
            
        }
    }
}

filterArray();

document.getElementById("rep").addEventListener("click",filterArray)
document.getElementById("dem").addEventListener("click",filterArray)
document.getElementById("ind").addEventListener("click",filterArray)
document.getElementById("select").addEventListener("change",filterArray)

