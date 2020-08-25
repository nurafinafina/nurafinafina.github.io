import helper from '/js/helper.js';

const loadFinishedMatches = data => {
    let FinishedHTML = ''
    data.matches.forEach(finish => {
        finish = JSON.parse(JSON.stringify(finish).replace(/http:/g, 'https:'));
        FinishedHTML += `
        <div class="col s12 m12 l12">
        <div class="card">
          <div class="card-content">
            <div center-align>
            <div class="row" style="margin:20px">
            <div class="col s5 truncate right-align">
              <span class="blue-text"> ${finish.score.fullTime.homeTeam}</span>
            </div>
            <div class="col s2 ">
              :
            </div>
            <div class="col s5 truncate left-align">
              <span class="blue-text"> ${finish.score.fullTime.awayTeam}</span>
            </div>
              <div class="row" style="margin:20px">
                <div class="col s5 truncate right-align">
                  <span class="blue-text">  ${finish.homeTeam.name}</span>
                </div>
                <div class="col s2 ">
                  VS
                </div>
                <div class="col s5 truncate left-align">
                  <span class="blue-text"> ${finish.awayTeam.name}</span>
                </div>
                <h6>
                    ${helper.convertDate(new Date(finish.utcDate))}
                </h6>
                
                <h6>${finish.competition.name}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    });
    document.getElementById("latest-content").innerHTML = FinishedHTML;
}

const loadScheduledMatches = data => {
    var scheduledHTML = ''
    data.matches.forEach(scheduled => {
        scheduled = JSON.parse(JSON.stringify(scheduled).replace(/http:/g, 'https:'));
        scheduledHTML += `
        <div class="col s12 m6 l6">
        <div class="card">
          <div class="card-content">
            <div center-align>
            <div class="row" style="margin:20px">
            <div class="col s5 truncate right-align">
              <span class="blue-text"> ${scheduled.homeTeam.name}</span>
            </div>
            <div class="col s2 ">
              :
            </div>
            <div class="col s5 truncate left-align">
              <span class="blue-text"> ${scheduled.awayTeam.name}</span>
            </div>
            <h6>
                ${scheduled.competition.name}
            </h6>
            <h6>
                ${helper.convertDate(new Date(scheduled.utcDate))}
            </h6>
              </div>
            </div>
          </div>
        </div>
      </div>`
    });
    document.getElementById("upcoming-content").innerHTML = scheduledHTML;
}

const loadTeamOnStanding = data => {
        let StandingsHTML = '';
        data = data.standings[0].table

        data.forEach(dataStandings => { 
            dataStandings = JSON.parse(JSON.stringify(dataStandings)
            .replace(/^http:\/\//i, 'https://'));  
            
            StandingsHTML += `
            <div class="row" id="standings">
                <h4>${dataStandings.team.name}</h4>
                <div class="col s12 m12" id="standings">
                    <div class="card">
                        <div class="card-content">
                            <table class="responsive-table striped centered">
                                <thead>
                                    <tr>
                                        <th class="center-align">Position</th>
                                        <th class="center-align">Team</th>
                                        <th class="center-align">Played</th>
                                        <th class="center-align">Won</th>
                                        <th class="center-align">Draw</th>
                                        <th class="center-align">Lost</th>
                                        <th class="center-align">GF</th>
                                        <th class="center-align">GA</th>
                                        <th class="center-align">GD</th>
                                        <th class="center-align">Points</th>
                                        <th class="center-align">Note</th>
                                    </tr>
                                </thead>

                                <tbody id="standingstable">
                                    <tr>
                                        <td class="center-align">${dataStandings.position}</td>
                                        <td>
                                                <p style="display: flex; align-items: center;">
                                                    <img class="materialboxed" style="center; margin-right:20px" width="50" height="50" src="${dataStandings.team.crestUrl}">
                                                </p> 
                                        </td>
                                        <td class="center-align">${dataStandings.playedGames}</td>
                                        <td class="center-align">${dataStandings.won}</td>
                                        <td class="center-align">${dataStandings.draw}</td>
                                        <td class="center-align">${dataStandings.lost}</td>
                                        <td class="center-align">${dataStandings.goalsFor}</td>
                                        <td class="center-align">${dataStandings.goalsAgainst}</td>
                                        <td class="center-align">${dataStandings.goalDifference}</td>
                                        <td class="center-align">${dataStandings.points}</td>
                                        <td class="center-align"><a href="./detailTeam.html?id=${dataStandings.team.id}">Detail</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                  
            `;
        }); 
        document.getElementById("standings").innerHTML = StandingsHTML;
}


const loadTeam = data => {
    let loadTeamsHTML = '';
    data = data.standings[0].table
        data.forEach(team => { 
            team = JSON.parse(JSON.stringify(team)
            .replace(/^http:\/\//i, 'https://'));  
            
            loadTeamsHTML += `
            <div class="col s12 m6 l6">
                <div class="card">
                    <div class="card-content">
                        <div center-align>
                            <a href="./detailTeam.html?id=${team.team.id}"><img style="center; width="50" height="50"src="${team.team.crestUrl}"></a>
                            <div class="center-align"><a href="./detailTeam.html?id=${team.team.id}">${team.team.name}</a></div>
                        </div>
                    </div>
                </div>
            </div>
                  
            `;
        }); 
        document.getElementById("team").innerHTML = loadTeamsHTML;
}


const loadDetailTeam = data => {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    let overviewHTML = "";
    let squadHTML = "";
    overviewHTML += `
            <tr>
                <td class="center-align">${data.name}</td>
                <td class="center-align">${data.shortName}</td>
                <td class="center-align">${data.founded}</td>
                <td class="center-align">${data.tla}</td>
                <td class="center-align">${data.address}</td>
                <td class="center-align">${data.phone}</td>
                <td class="center-align">${data.website}</td>
                <td class="center-align">${data.email}</td>
                <td class="center-align">${data.clubColors}</td>
                <td class="center-align">${data.venue}</td>
            </tr>
        `;
    data.squad.forEach(squad => {
    squadHTML +=   
    `<div class="col s12 m6 l6">
            <div class="card">
            <div class="card-content">
                <div center-align>
                <h5 class="center-align">${squad.name}</h5>

                <div class="row" style="margin:20px">
                    
                    <p>Position             :   ${squad.position}</p>
                    <p>Date of Birth        :   ${squad.dateOfBirth}</p>
                    <p>Country of Birth     :   ${squad.countryOfBirth}</p>
                    <p>Nationality          :   ${squad.nationality}</p>
                    <p>Role                 :   ${squad.role}</p>
                </div>
                
                </div>
            </div>
            </div>
        </div> 
        `;
    });
    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("squad").innerHTML = squadHTML;
    document.getElementById("detailteam").innerHTML = overviewHTML;

}


const loadMatches = data => {
    let MatchesHTML = '';
    let match = data.matches;

        match.forEach(match => {  
            
            MatchesHTML += `
            <div class="col s12 m6 l6">
            <div class="card">
            <div class="card-content">
                <div center-align>
                <h5 class="center-align">Match Day: ${match.matchday}</h5>
                <div class="center-align">Kick Off : ${helper.convertDate(new Date(match.utcDate))}</div>
            
                <div class="row" style="margin:20px">
                    <div class="col s5 truncate right-align">
                        <span class="red-text">  ${match.homeTeam.name}</span>
                    </div>
                    <div class="col s2 ">
                    VS
                    </div>
                    <div class="col s5 truncate left-align">
                        <span class="red-text">  ${match.awayTeam.name}</span>
                    </div>
                    <p>Status : ${match.status}</p>
                    <p>Full Time</p>
                    <p>${match.score.fullTime.homeTeam} : ${match.score.fullTime.awayTeam}</p>
                    <p>Half Time</p>
                    <p>${match.score.halfTime.homeTeam} : ${match.score.halfTime.awayTeam}</p>
                </div>
                
                <div class="center-align">
                            <a class="red waves-effect waves-light btn" href="detailMatches.html?id=${match.id}"><i class="material-icons left"></i>Detail</a>
                        </div>
                </div>
            </div>
            </div>
        </div>       
            `;
        }); 
        document.getElementById("matches").innerHTML = MatchesHTML;
}

const loadDetailMatches = data => {
    let detailmatchesHTML = "";
    let match = data.match;
    let h2h = data.head2head;

    detailmatchesHTML += `
    <div class="col s12 m12 l12">
            <div class="card">
            <div class="card-content">
                <div center-align>
                <div class="col s5 truncate right-align">
                        <span class="red-text" href="./detailMatches.html?id=${match.homeTeam.id}">${match.homeTeam.name}</span>
                    </div>
                    <div class="col s2 ">
                    VS
                    </div>
                    <div class="col s5 truncate left-align">
                        <span class="red-text" href="./detailMatches.html?id=${match.awayTeam.id}">${match.awayTeam.name}</span>
                </div>
                    <p>Win      :   ${h2h.homeTeam.wins}</p>
                    <p>Draws    :   ${h2h.homeTeam.draws}</p>
                    <p>Losses   :   ${h2h.homeTeam.losses}</p>
                </div>
                
                </div>
            </div>
            
            </div>
        </div> 
      
        `;
    document.getElementById("detailmatches").innerHTML = detailmatchesHTML;

}

export default {
    loadFinishedMatches,
    loadScheduledMatches,
    loadTeamOnStanding,
    loadTeam,
    loadDetailTeam,
    loadMatches,
    loadDetailMatches,    
}