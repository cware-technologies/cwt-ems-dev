import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'

const styles = theme => ({
    node: {
        fill: 'steelblue',
        stroke: 'none',
    },
    link: {
        fill: 'none',
        stroke: '#ccc',
        strokeWidth: '1px',
    },
    name: {
        fill: 'steelblue',
    }
      
})

class HierarchyChart extends React.Component {
    componentDidMount() {
        this.generateChart()
    }

    // componentDidUpdate() {
    //     this.generateChart()
    // }

    generateChart = () => {
        let { classes } = this.props

        var treeLayout = d3.tree()
            .size([400, 200])

        var root = d3.hierarchy(this.props.data)

        treeLayout(root)

        let svg = d3.select(this.root)
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
            .classed(classes.node, true)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; })
            .attr('r', 4);

        d3.select('svg .names')
            .selectAll('text.name')
            .data(root.descendants())
            .enter()
            .append('text')
            .text(d => { return d.data.name })
            .classed(classes.name, true)
            .attr('x', function (d) { return d.x + 15 })
            .attr('y', function (d) { return d.y + 5 })

        // Links
        d3.select('svg .lines')
            .selectAll('line.link')
            .data(root.links())
            .enter()
            .append('path')
            .classed(classes.link, true)
            .attr('d', function (d) {
                return "M" + d.source.x + "," + d.source.y
                    + "C" + (d.source.x) + "," + (d.source.y + 50)
                    + " " + (d.target.x) + "," + (d.target.y - 80) // 50 and 150 are coordinates of inflexion, play with it to change links shape
                    + " " + d.target.x + "," + d.target.y;
            })
    }

    render() {
        return <svg ref={node => this.root = node} width='100%' height='100%'></svg>
    }
}

export default withStyles(styles)(HierarchyChart)