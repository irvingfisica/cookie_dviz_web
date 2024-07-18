import * as douze from "../libs/douze/douze.js";

const div = document.querySelector("#graf");
let mapa = new douze.Mapa("mapa")
    .set_aspect(0.8);

const datap = [d3.json({{cookiecutter.data}}),
    d3.buffer("./resources/datos/ent_18.json.gz"),];

Promise.all(datap).then(function(datap) {

    let data = datap[0];
    let ents = douze.geofflprocess(datap[1])[0];

    let ently = new douze.Layer(mapa, ents, "estados");
    ently.geopaths.style("stroke-width",0.3);

    const plot = Plot.plot({
        color: {legend:true},
        r: {range:[0,7]},
        marks: [
            Plot.dot(data, {
                x:"Horsepower",
                y:"Miles_per_Gallon",
                r:"Displacement",
                fill:"Origin",
                stroke:"black",
                strokeWidth: 0.5,
                tip: true  
            })
        ]
    });
    
    div.append(plot);

})

