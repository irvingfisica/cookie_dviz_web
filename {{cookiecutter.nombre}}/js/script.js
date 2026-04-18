let data = null;

const datap = [d3.json("./resources/datos/data.json")];

Promise.all(datap).then(function (datal) {
  data = Array.from(
    d3.rollup(
      datal[0],
      (v) => d3.mean(v, (d) => d["Horsepower"]),
      (d) => d["Origin"],
    ),
    ([key, value]) => ({ label: key, valor: value }),
  ).sort((a, b) => b.label - a.label);
  console.log(data);
  render();
});

function render() {
  if (!data) return;

  const container = d3.select("#grafica-sector");
  container.selectAll("*").remove();

  const { width, height } = container.node().getBoundingClientRect();

  const margin = { top: 0, right: 0, bottom: 40, left: 50 };
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

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.valor)])
    .range([innerHeight, 0]);

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, innerWidth])
    .paddingInner(0.2);

  const cScale = d3
    .scaleOrdinal()
    .domain(["USA", "Europe", "Japan"])
    .range(["#5B7E3C", "#A2CB8B", "#E8F5BD"]);

  g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.label))
    .attr("y", (d) => yScale(d.valor))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(0) - yScale(d.valor))
    .attr("fill", (d) => cScale(d.label));

  g.append("g").call(d3.axisLeft(yScale));
  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale));
}

const resizer = new ResizeObserver(() => {
  window.requestAnimationFrame(() => {
    render();
  });
});

resizer.observe(document.querySelector("#grafica-sector"));
