var app = new Vue({
    el: '#app',
    data: {
        url: document.querySelector("#senate") ? "https://api.propublica.org/congress/v1/113/senate/members.json" : "https://api.propublica.org/congress/v1/113/house/members.json",
        init: {
            method: 'GET',
            headers: {
                "X-API-Key": "jkpwFiFwFLiipoOi8BmjIrFhBGZkUJd5R6dBBN5K"}
        },
        members: [],
        parties: [],
        states: [],
        selected: "All",

        leastLoyal: [],
        mostLoyal: [],
        leastEngaged: [],
        mostEngaged: [],

        glance: {
            Democrats:{
                amount: 0,
                votes_w_party_pct: 0
            },
            Republicans:{
                amount: 0,
                votes_w_party_pct: 0
            },
            Independents:{
                amount: 0,
                votes_w_party_pct: 0
            },
            Total:{
                amount: 0,
                votes_w_party_pct: 0
            }
        },

    },
    created(){
        fetch(this.url, this.init)
        .then(function(res){
            if(res.ok){
                return res.json()
            } else{
                throw new Error(res.status)
            }
        })
        .then(function(json){
            app.members = json.results[0].members
            
        })
        .then(function(){
            app.fillFields(); //takes data from members 
            app.calculateGlanceTable();
            app.getTablesInfo();
        })
        
        .catch(function(error){
            console.log(error)
        })
    },
    methods:{
        toFullName(array){
            let fullname = array.last_name + " " + array.first_name + " " + (array.middle_name || "")  
            return fullname;
        },
        fillFields(){
            app.members.forEach(member => 
                {
                    if(app.parties.indexOf(member.party) == -1){
                        app.parties.push(member.party)
                    }
                    if(app.states.indexOf(member.state) == -1){
                        app.states.push(member.state)
                    }
                })
        },

        orderMemberAlph(a, b){
            if (a.last_name > b.last_name)
            {
                return 1;
            }
            if (a.last_name < b.last_name)
            {
                return -1;
            }
            return 0;
        },

        calculateGlanceTable(){
            app.members.forEach(member => 
                {
                    if(member.party == 'D')
                    {
                        app.glance.Democrats.amount++
                        app.glance.Democrats.votes_w_party_pct += member.votes_with_party_pct
                    }
                    else if(member.party == 'R')
                    {
                        app.glance.Republicans.amount++
                        app.glance.Republicans.votes_w_party_pct += member.votes_with_party_pct
                    }
                    else
                    {
                        app.glance.Independents.amount++
                        app.glance.Independents.votes_w_party_pct += member.votes_with_party_pct
                    }
                })
                this.glance.Democrats.votes_w_party_pct /= this.glance.Democrats.amount
                this.glance.Republicans.votes_w_party_pct /= this.glance.Republicans.amount
                this.glance.Independents.amount != 0 ? this.glance.Independents.votes_w_party_pct /= this.glance.Independents.amount : this.glance.Independents.votes_w_party_pct = 0
                this.glance.Total.amount = ( this.glance.Democrats.amount + this.glance.Republicans.amount + this.glance.Independents.amount)
                this.glance.Independents.amount != 0 ? this.glance.Total.votes_w_party_pct = (this.glance.Democrats.votes_w_party_pct + this.glance.Republicans.votes_w_party_pct + this.glance.Independents.votes_w_party_pct) / 3 : this.glance.Total.votes_w_party_pct = (this.glance.Democrats.votes_w_party_pct + this.glance.Republicans.votes_w_party_pct) / 2
        },

        pushArrayByConditions(array, pushedArray, prop){
            let i=0;
            let pct = (array.length * 0.1)
            do
            {
                if(array[i].total_votes > 0){
                    pushedArray.push(array[i])
                }else{
                    pct += 1; //If a member of the array is discarded because of it's total votes, its needed to enlarge the condition so it's always the same pct of the total length.
                }
                i++
            } while( i < pct || array[i][prop] == array[i-1][prop] )
        },

        getTablesInfo(){
            if(document.querySelector("#loyalty")){
                let orderedLoyal = app.members.slice().sort(function (a,b){
                    return a.votes_with_party_pct - b.votes_with_party_pct;
                })
                this.pushArrayByConditions(orderedLoyal, this.leastLoyal, 'votes_with_party_pct');
                orderedLoyal.reverse();
                this.pushArrayByConditions(orderedLoyal, this.mostLoyal, 'votes_with_party_pct');
            }
            else if(document.querySelector("#attendance"))
            {
                let orderedEngaged = this.members.slice().sort(function(a, b){
                    return a.missed_votes_pct - b.missed_votes_pct
                });
                this.pushArrayByConditions(orderedEngaged, this.mostEngaged, 'missed_votes_pct');
                orderedEngaged.reverse();
                this.pushArrayByConditions(orderedEngaged, this.leastEngaged, 'missed_votes_pct');
            }
        },
    },
    computed:{
        filteredMembers(){
            if(this.selected == "All"){
                return this.members.filter(member => app.parties.includes(member.party)).sort(this.orderMemberAlph)
            } else{
                return this.members.filter(member => app.parties.includes(member.party) && app.selected == member.state).sort(this.orderMemberAlph)
            }
        },


    }
})