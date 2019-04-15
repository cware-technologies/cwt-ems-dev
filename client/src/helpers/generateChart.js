import * as d3 from 'd3';

export default (data) => {
    console.log('hello')
    var treeLayout = d3.tree()
        .size([600, 200])

    var root = d3.hierarchy(data)

    treeLayout(root)

    let svg = d3.select(".chainContainer")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
        }))
        .append("g")

    svg.append("g")
        .classed("lines", true)
    svg.append("g")
        .classed("nodes", true)
    svg.append("g")
        .classed("names", true)

    // Nodes
    d3.select('svg .nodes')
        .selectAll('circle.node')
        .data(root.descendants())
        .enter()
        .append('circle')
        .classed('node', true)
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; })
        .attr('r', 4);

    d3.select('svg .names')
        .data(root.descendants())
        .enter()
        .append('a')
        .classed('link', true)
        .attr('xlink:href', `#`)

    d3.select('svg .names .link')
        .selectAll('text.name')
        .data(root.descendants())
        .enter()
        .append('text')
        .text(d => { return d.data.name })
        .classed('name', true)
        .attr('x', function (d) { return d.x * 1.05; })
        .attr('y', function (d) { return d.y; })

    // Links
    d3.select('svg .lines')
        .selectAll('line.link')
        .data(root.links())
        .enter()
        .append('path')
        .classed('link', true)
        .attr('d', function (d) {
            return "M" + d.source.x + "," + d.source.y
                + "C" + (d.source.x) + "," + (d.source.y + 50)
                + " " + (d.target.x) + "," + (d.target.y - 80) // 50 and 80 are coordinates of inflexion, play with it to change links shape
                + " " + d.target.x + "," + d.target.y;
        })
    // .attr('y1', function(d) {return d.source.y;})
    // .attr('x2', function(d) {return d.target.x;})
    // .attr('y2', function(d) {return d.target.y;});
}