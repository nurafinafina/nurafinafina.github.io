import view from '/js/view.js';

let storeNameTeam = 'fav_team';

const dbPromise = idb => {
    let dbPromised = idb.open("dbfootball", 1, upgradeDb => {    
        if (!upgradeDb.objectStoreNames.contains(storeNameTeam)) {
            let TeamIndex = upgradeDb.createObjectStore(storeNameTeam, {
                keypath: "id"
            })
            TeamIndex.createIndex("nameteam", "name", {
                unique: false
            });
            TeamIndex.createIndex("foundedteam", "founded",{
                unique: false
            });
            TeamIndex.createIndex("clubColorteam", "clubColors",{
                unique: false
            });
            TeamIndex.createIndex("venueteam", "venue",{
                unique: false
            });
        
        }

    });

    return dbPromised;
}

const addTeamFav = (storeName, team) => {  
    let datateam = team.id;
    storeName = storeNameTeam;   
    dbPromise(idb)
    .then(db => {
        let transaction = db.transaction(storeName, 'readwrite');
        let store = transaction.objectStore(storeName);
        
        store.put(team, datateam);

        return transaction.complete;
    })
    .then(() =>{
        console.log('Team updated');
        document.getElementById("favoriteteam").innerHTML = "favorite";
        M.toast({
            html: 'Data berhasil disimpan!'
        });
    }).catch(()=> {
        M.toast({
            html: 'error'
        });
    });
}
const getTeamByID = (id, storeName) => {
    storeName = storeNameTeam;
    return new Promise ((resolve, reject )=> {
    
    dbPromise(idb)
    .then(db => {
        let transaction = db.transaction(storeName, 'readonly');
        let store = transaction.objectStore(storeName);
        
        return store.get(id);

    })
    .then((team) =>{
        if (team != undefined) {
            resolve("data favorit")
        } else {
            reject("bukan data favorit")
        }
        });
    });
}

const getTeamDeleteFav = (id, storeName) => {
    storeName = storeNameTeam;
    console.log(id + " " +storeName);
    dbPromise(idb).then(db => {
            let transaction = db.transaction(storeName, "readwrite");
            let store = transaction.objectStore(storeName);

            store.delete(id);

            return transaction.complete;
        })
        .then(function() {
            M.toast({
                html: 'delete team to favorite'
            });
        })
}

const getSavedDataFavByID = (datatype) => {
    
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = Number(urlParams.get("id"));
    if(datatype == "team"){
        getTeamByID(idParam, 'fav_team').then((team) => {
            console.dir("getSavedTeamByID: " +team)
            view.loadDetailTeam(team)
        });
    } 
}

const getShowTeam = (storeName) => {
    storeName = storeNameTeam;
    return new Promise((resolve, reject) => {
        dbPromise(idb)
        .then((db) => {
            let transaction = db.transaction(storeName, 'readonly');
            let store = transaction.objectStore(storeName);
            return store.getAll();
        })
        .then((teams) =>{
        console.log(teams)
        let favteamsHTML = "";
        
        teams.forEach(team => {
        favteamsHTML += `
                <div class="col s12 m12 l12">
                    <div class="card">
                    <div class="card-content">
                        <div center-align>
                        <a href="./detailTeam.html?id=${team.id}"></a>
                        <h5 class="center-align">${team.name}</h5>
                        <div class="center-align">
                            <div class="row" style="margin:20px">
                                
                                <p>Founded      :   ${team.founded}</p>
                                <p>Club Color   :   ${team.clubColors}</p>
                                <p>Venue        :   ${team.venue}</p>
                            </div>
                        
                            <button class="btn waves-effect waves-light btn-del-finish red" type="submit" name="action">Remove Favorite</button>

                        </div>
                        </div>
                    </div>
                    </div>
                </div> 
            `;
        })
        document.getElementById("bookmark-team").innerHTML = favteamsHTML;
        let btnFav = document.getElementById("bookmark-team").getElementsByClassName("btn-del-finish");
            for(let i = 0; i < btnFav.length; i++) {
                btnFav[i].onclick = () => {
                    getTeamDeleteFav(teams[i].id);
                    getShowTeam();
                }
            }
        })
    });
}

export default {
    addTeamFav,
    getTeamByID,
    getTeamDeleteFav,
    getSavedDataFavByID,
    getShowTeam
}
