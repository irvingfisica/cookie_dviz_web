let data = null;

const datap = [d3.json({{cookiecutter.data}})];

Promise.all(datap).then(function (datap) {
  data = datap[0];
  console.log(data);
  render();
});

function render() {
  if (!data) return;

  const container = d3.select("#grafica-sector");
  container.selectAll("*").remove();

  const { width, height } = container.node().getBoundingClientRect();

  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("display", "block");

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.valor)])
    .range([0, innerWidth]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, innerHeight]);
}

const resizer = new ResizeObserver(() => {
  window.requestAnimationFrame(() => {
    render();
  });
});

resizer.observe(document.querySelector("#grafica-sector"));
