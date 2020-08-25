import view from '/js/view.js';

const base_url = "https://api.football-data.org/v2/";
const API_TOKEN = "a1d81bd080974be1a367d52e5f6f478c";
const League_ID = 2015;

const url_finished = `${base_url}teams/86/matches?status=FINISHED&limit=2`;
const url_scheduled = `${base_url}teams/81/matches?status=SCHEDULED&limit=2`;
const url_standings = `${base_url}competitions/${League_ID}/standings?standingType=TOTAL`;

const url_detailTeam = `${base_url}teams/`;
const url_matches = `${base_url}competitions/${League_ID}/matches?matchday`;
const url_detailMatches = `${base_url}matches/`;

const status = response => {
    if(response.status !== 200){
        console.log("Error: " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else{
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log("Error : "+ error);
}

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": API_TOKEN
        }
    });
}

// Latest
const getFinishedMatches = () => {
    return new Promise(function(resolve, reject){
    if('caches' in window){
        caches.match(url_finished).then(response => {
            if(response){
                response.json()
                .then(data => {
                    view.loadFinishedMatches(data);
                    resolve(data);
                })
            }
        })
    }
    fetchAPI(url_finished)
        .then(status)
        .then(json)
        .then(data => {
            view.loadFinishedMatches(data);
            resolve(data);
        })
        .catch(error);
    });
}

// Upcoming
const getScheduledMatches = () =>{
    return new Promise((resolve, reject) => {
    if('caches' in window){
        caches.match(url_scheduled).then(response => {
            if(response){
                response.json()
                .then(data => {
                    view.loadScheduledMatches(data);
                    resolve(data);
                })
            }
        })
    }
    fetchAPI(url_scheduled)
        .then(status)
        .then(json)
        .then(data => {
            view.loadScheduledMatches(data);
            resolve(data);
        })
        .catch(error);
    });
}

// Standings
const getStandings = () => {
    return new Promise(function(resolve, reject){
        if("caches" in window){
            caches.match(url_standings)
            .then(response => {
                if(response){
                    response.json()
                    .then(data => {
                        view.loadTeamOnStanding(data);
                        resolve(data);
                    })
                }
            })
        }
        fetchAPI(url_standings)
            .then(status)
            .then(json)
            .then(data => {
                view.loadTeamOnStanding(data);
                resolve(data);
            })
            .catch(error);
    });
}
const getArticleTeam = () => {
    return new Promise(function(resolve, reject){
        if("caches" in window){
            caches.match(url_standings)
            .then(response => {
                if(response){
                    response.json()
                    .then(data => {
                        view.loadTeam(data);
                        resolve(data);
                    })
                }
            })
        }
        fetchAPI(url_standings)
            .then(status)
            .then(json)
            .then(data => {
                view.loadTeam(data);
                resolve(data);
            })
            .catch(error);
    });
}

// Detail Team
const getDetailTeam = () => {
    return new Promise(function(resolve, reject){
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = Number(urlParams.get("id"));
        if("caches" in window){
            caches.match(url_detailTeam + idParam)
            .then(response => {
                if(response){
                    response.json()
                    .then(data => {
                        view.loadDetailTeam(data);
                        resolve(data);
                    });
                }
            });
        }
        fetchAPI(url_detailTeam + idParam)
            .then(status)
            .then(json)
            .then(data => {
                view.loadDetailTeam(data);
                resolve(data);
            })
            .catch(error);
    });
}

// Match
const getMatches = () => {
    return new Promise(function (resolve, reject) {

        if ('caches' in window) {
            caches.match(url_matches).then(response => {
                if (response) {
                    response.json().then(data => {
                        view.loadMatches(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(url_matches)
            .then(status)
            .then(json)
            .then(data => {
                view.loadMatches(data);
                resolve(data);
            })
            .catch(error);
    });
}

// Detail Match
const getDetailMatches = () =>{
    return new Promise(function(resolve, reject){
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = Number(urlParams.get("id"));
        if ("caches" in window) {
            caches.match(url_detailMatches + idParam)
            .then(response => {
                if (response) {
                    response.json()
                    .then(data => {
                        view.loadDetailMatches(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(url_detailMatches + idParam)
            .then(status)
            .then(json)
            .then(data => {
                view.loadDetailMatches(data);
                resolve(data);
            })
        .catch(error);
    });
}

export default {
    getFinishedMatches,
    getScheduledMatches,
    getStandings,
    getArticleTeam,
    getDetailTeam,
    getMatches,
    getDetailMatches
};