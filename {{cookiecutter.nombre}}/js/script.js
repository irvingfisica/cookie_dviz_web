import * as douze from "../libs/douze/douze.js";

const div = document.querySelector("#graf");

const datap = [d3.json({{cookiecutter.data}})];

Promise.all(datap).then(function(datap) {

    let data = datap[0];

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

