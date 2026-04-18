const container = d3.select("#grafica-sector");
const { width, height } = container.node().getBoundingClientRect();

// Importante: El margen de D3 debe "restar" espacio, no sumarlo
const margin = { top: 20, right: 20, bottom: 40, left: 50 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("display", "block"); // Evita el espacio extra de los inline-elements

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const datap = [d3.json({{cookiecutter.data}})];

Promise.all(datap).then(function(datap) {

  let data = datap[0];
  console.log(data);

  const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.valor)])
      .range([0, innerWidth]);

  const yScale = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerHeight]);

})
