const members = data.results[0].members;
var i;
const leastTable = document.querySelector("#leastTable")
const mostTable = document.querySelector("#mostTable")
const loyalId = document.querySelector("#loyalty")
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
    leastLoyal: [], //those that have the least pct of votes towards it's party
    mostLoyal: [], //those that have the most pct of votes towards it's party
    leastEngaged: [], //those that have the MOST pct of MISSED votes
    mostEngaged: [], //those that have the LEAST pct of MISSED votes
}

if (loyalId) //in order to use only ONE function to sort the array and insert the data into the tables, we gotta check in which page we are, because loyalty and attendance uses different info.
{
    let orderedLoyal = members.slice().sort(function (a,b)
    {
        return a.votes_with_party_pct - b.votes_with_party_pct;
    })

    pushArrayByConditions(orderedLoyal, stats.mostLoyal, 'votes_with_party_pct');
    orderedLoyal.reverse();
    pushArrayByConditions(orderedLoyal, stats.leastLoyal, 'votes_with_party_pct');

    insertTable(leastTable, 'mostLoyal', 'total_votes', 'votes_with_party_pct', 1);
    insertTable(mostTable, 'leastLoyal', 'total_votes', 'votes_with_party_pct', 1);

}
else if(attendanceId) //in case you need to use this same script for another page, you can always add another condition.
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
            pct += 1; //If a member of the array is discarded because of it's total votes, its needed to enlarge the condition so it's always the same pct of the total length.
        }
        i++

    } while(i < pct || array[i][prop] == array[i-1][prop] )
}

function insertTable(idTable, array, fieldOne, fieldTwo, boolean) //you need to send a boolean value since in the loyalty page you don't have the exact amount of votes in favour of the party, but you do for missed votes so you don't need to calculate anything.
{
    stats[array].forEach(member => 
    {
        let row = idTable.insertRow(-1);
        let fullname = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`
        fullname = (member.url == "" ? fullname : `<a href="${member.url}">${fullname}</a>`)
        let amount 
        boolean != 0 ? amount = ( (member[fieldTwo] * member[fieldOne]) / 100 ) : amount = member[fieldOne]
        amount = Math.round(amount)
        row.innerHTML=
        `<td>${fullname}</td>
        <td>${amount}</td>
        <td>${member[fieldTwo]} %</td>`
    })
}

members.forEach(member => 
    {
        if(member.party == 'D')
        {
            stats.democrats.amount++
            stats.democrats.votes_w_party_pct += member.votes_with_party_pct //the sum of the pct of the votes in favour of the party of EVERY democrat
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
    stats.independents.amount != 0 ? stats.independents.votes_w_party_pct /= stats.independents.amount : stats.independents.votes_w_party_pct = 0
    totalAmount = (stats.democrats.amount + stats.republicans.amount + stats.independents.amount)
    totalPct = (stats.democrats.votes_w_party_pct + stats.republicans.votes_w_party_pct + stats.independents.votes_w_party_pct) / 3
    totalAmount = Math.round(totalAmount)
    totalPct = totalPct.toFixed(2)
    let row = glanceTable.insertRow(-1)
    row.innerHTML=
    `<td>Democrats</td>
    <td>${stats.democrats.amount}</td>
    <td>${stats.democrats.votes_w_party_pct.toFixed(2)} %</td>`
    row=glanceTable.insertRow(-1)
    row.innerHTML=
    `<td>Republicans</td>
    <td>${stats.republicans.amount}</td>
    <td>${stats.republicans.votes_w_party_pct.toFixed(2)} %</td>`
    row=glanceTable.insertRow(-1)
    row.innerHTML=
    `<td>Independents</td>
    <td>${stats.independents.amount}</td>
    <td>${stats.independents.votes_w_party_pct.toFixed(2)} %</td>`
    row=glanceTable.insertRow(-1)
    row.innerHTML=
    `<td>Total</td>
    <td>${totalAmount}</td>
    <td>${totalPct} %</td>`
}

FillGlanceTable();




