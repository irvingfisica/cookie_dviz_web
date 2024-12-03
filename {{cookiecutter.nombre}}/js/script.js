let width = parseInt(d3.select("#graf").style("width"));
let height = window.innerWidth > 576 ? width*0.56 : height*1.5;

let margin = {top: 0, bottom: 0, right: 0, left: 0};
let effective_width = width - margin.left - margin.right;
let effective_height = height - margin.top - margin.bottom;

let svg = d3.select("#grafsvg").append("svg")
            .attr("width", effective_width + margin.left + margin.right)
            .attr("height", effective_height + margin.top + margin.bottom)
            .append("g")
            .attr("class","gb_svg")
            .attr("transform","translate(" + margin.left + "," + margin.top + ")");

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

