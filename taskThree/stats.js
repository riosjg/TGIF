const members = data.results[0].members;
var i;
const leastTable = document.querySelector("#leastTable")
const mostTable = document.querySelector("#mostTable")
const loyalId = document.querySelector("#loyal")
const attendanceId = document.querySelector("#attendance")
const glanceTable = document.querySelector("#glanceTable")

var stats=
{
    total: members.length,
    democrats:{
                amount: 0,
                votes_w_party_pct: 0,
            },
    republicans:{
                amount: 0,
                votes_w_party_pct: 0,
            },
    independents:{
                amount: 0,
                votes_w_party_pct: 0,
            },
    leastLoyal: [],
    mostLoyal: [],
    leastEngaged: [],
    mostEngaged: [],
}

if (loyalId)
{
    let orderedLoyal = members.slice().sort(function (a,b)
    {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    })

    pushArrayByConditions(orderedLoyal, stats.mostLoyal, 'votes_with_party_pct');
    orderedLoyal.reverse();
    pushArrayByConditions(orderedLoyal, stats.leastLoyal, 'votes_with_party_pct');

    insertTable(leastTable, 'leastLoyal', 'total_votes', 'votes_with_party_pct', 1);
    insertTable(mostTable, 'mostLoyal', 'total_votes', 'votes_with_party_pct', 1);

}
else if(attendanceId)
{
    let orderedEngaged = members.slice().sort(function(a, b)
    {
    return a.missed_votes_pct - b.missed_votes_pct
    });

    pushArrayByConditions(orderedEngaged, stats.mostEngaged, 'missed_votes_pct');
    orderedEngaged.reverse();
    pushArrayByConditions(orderedEngaged, stats.leastEngaged, 'missed_votes_pct');

    insertTable(leastTable, 'leastEngaged', 'missed_votes', 'missed_votes_pct', 0);
    insertTable(mostTable, 'mostEngaged', 'missed_votes', 'missed_votes_pct', 0);
}

function pushArrayByConditions(array, pushedArray, prop)
{
    let i=0;
    let pct = (array.length * 0.1)
    do
    {
        if(array[i].total_votes > 0){
            pushedArray.push(array[i]);
        }else{
            pct += 1;
        }
        i++

    } while(i < pct || array[i][prop] == array[i-1][prop] )
}

function insertTable(idTable, array, fieldOne, fieldTwo, boolean)
{
    stats[array].forEach(member => 
    {
        let row = idTable.insertRow(-1);
        let fullname = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`
        fullname = (member.url == "" ? fullname : `<a href="${member.url}">${fullname}</a>`)
        // let number;
        // boolean = 0 ? number = (member[fieldTwo] * member[number])
        row.innerHTML=
        `<td>${fullname}</td>
        <td>${member[fieldOne]}</td>
        <td>${member[fieldTwo]}</td>`
    })
}

members.forEach(member => 
    {
        if(member.party == 'D')
        {
            stats.democrats.amount++
            stats.democrats.votes_w_party_pct += member.votes_with_party_pct
        }
        else if(member.party == 'R')
        {
            stats.republicans.amount++
            stats.republicans.votes_w_party_pct += member.votes_with_party_pct
        }            
        else
        {
            stats.independents.amount++
            stats.independents.votes_w_party_pct += member.votes_with_party_pct
        }
    })

function FillGlanceTable()
{
    let totalAmount = 0
    let totalPct = 0
    stats.democrats.votes_w_party_pct /= stats.democrats.amount
    stats.republicans.votes_w_party_pct /= stats.republicans.amount
    totalAmount = (stats.democrats.amount + stats.republicans.amount + stats.independents.amount)
    totalPct = (stats.democrats.votes_w_party_pct + stats.republicans.votes_w_party_pct + stats.independents.votes_w_party_pct) / 3
    let row = glanceTable.insertRow(-1)
    row.innerHTML=
    `<td>Democrats</td>
    <td>${stats.democrats.amount}</td>
    <td>${stats.democrats.votes_w_party_pct}</td>`
}

FillGlanceTable();




