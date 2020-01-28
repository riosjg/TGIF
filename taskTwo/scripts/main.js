const members = data.results[0].members

const tbody = document.querySelector("tbody")

members.forEach(member => {
    let row = tbody.insertRow(-1);
    let fullname = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`
    fullname = (member.url == "" ? fullname : `<a href="${member.url}">${fullname}</a>`)
    row.innerHTML=`<td>${fullname}</td>
    <td>${member.party}</td>
    <td>${member.state}</td>
    <td>${member.seniority}</td>
    <td>${member.votes_with_party_pct}</td>`
});