import api from '/js/api.js';
import '/js/view.js';
import view from '/js/view.js';
import db from '/js/db.js';
let favoriteType = "";

const getPage = (page) => {
    if (page == "" || page == "#") {
        page = "home";
        api.getFinishedMatches();
        api.getScheduledMatches();
    }
    else if (page == "standings"){
        page = "standings";
        api.getStandings();
    }
    else if (page == "team"){
        page = "team";
        api.getArticleTeam();
    } else if (page == "area"){
        page = "area";
        api.getArea();
    }
    else if (page == "matches") {
        page = "matches";
        api.getMatches();
    }else if (page == "bookfavteam"){
        page = "bookfavteam";
    }else if (page == "bookfavplayer"){
        page = "bookfavplayer";
    }
    
    return page;
}

const loadPage = (page) => {
    var xhttp = new XMLHttpRequest();
        
    xhttp.onreadystatechange = function() {
        var content = document.querySelector("#body-content");
                
        if (this.readyState == 4) {
            if(page === "home"){
                api.getFinishedMatches();
                api.getScheduledMatches();
            } else if (page == "standings"){
                api.getStandings();
            } else if (page == "matches"){
                api.getMatches();
            } else if (page == "team"){
                api.getArticleTeam();
            } else if (page == "area"){
                api.getArea();
            } else if (page == "bookfavteam"){
                db.getShowTeam();
            } else if (page == "bookfavplayer"){
                db.getShowMatch();
            }
            

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}

export default {
    getPage,
    loadPage
};
