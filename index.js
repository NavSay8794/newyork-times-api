let retrieveStories = async (section) => {
    let apikey = 'nndEIo3rwnfNAZvwa5WslGdhC5t0NMpO'
    let url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apikey}`
    let response = await fetch(url)

    let result = await response.json()
    let data = result.results;
    console.log(data)
    layout(data)
}

retrieveStories('home')

let layout = (w) => {

    switch (w.length % 2) {
        case 0: {
            makelayout(w.length / 2, w)
            break;
        }

        case 1: {
            makelayout((w.length / 2) + 1, w)
            break;
        }

    }

}


let makelayout = (y, x) => {
    let m = 0
    let months = ['Jan' ,'Feb' ,'Mar' ,'Apr' ,'May' ,'Jun' ,'Jul' ,'Aug' ,'Sep' ,'Oct' ,'Nov' ,'Dec' ]
    var sect = document.getElementById('containerSect')
    for (let i = 1; i <= y; i++) {
        var r = document.createElement("div");
        sect.appendChild(r);
        r.className = "row";
        r.id = `row${i}`;
        var rid = document.getElementById(`row${i}`)

        var br = document.createElement('br')
        sect.appendChild(br)
        for (let j = 0; j < 2; j++) {
            let created = new Date(x[m].created_date)
            let monthNUmber = created.getMonth()
            let month = months[monthNUmber]
            let date = created.getDate()
            var c = document.createElement("div");
            rid.appendChild(c);
            c.className = "col-md-6 col-sm-12";
            c.id = `col${j}`;
            var cid = document.querySelector(`#row${i} #col${j}`)

            cid.innerHTML = `
            <div class="card mb-3" style="max-width: 540px; height: 100%; ">
                <div class="row no-gutters">
                    <div class="col-md-7">
                         <div class="card-body">
                            <h6 class="card-title">${(x[m].section).toUpperCase()}</h6>
                            <hr>
                            <div class ="row">
                                <div class="col-12">
                                    <h4 class="card-title">${x[m].title}</h4>
                                    <span class="card-text"><small class="text-muted">${x[m].item_type}  |  ${month} ${date}</small></span>
                                </div>
                            </div>
                            <br>
                            <p class="card-text"><small class="text-muted">${x[m].byline}</small></p>
                            <p class="card-text"><a class="btn btn-info" data-toggle="collapse" href="#multiCollapseExample${m}" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Check Abstract</a>
                                <div class="row">
                                    <div class="col">
                                        <div class="collapse multi-collapse" id="multiCollapseExample${m}">
                                            <div class="card card-body">
                                                ${x[m].abstract}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p>
                            <hr>
                            <p>
                            <a class="btn btn-dark" target ="_blank" href="${x[m].short_url}" role="button">Read The Full Article</a>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5">
                         <img src="${x[m].multimedia[2].url}" class="card-img img-thumbnail" 
                         style= "height: 100%;" alt="...">
                    </div>
                </div>
            </div>`
            m++
        }
    }
}