import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const HeatMap = ({ data }) => {
	const svgRef = useRef(null)

	useEffect(() => {
		d3.select(svgRef.current).selectAll('*').remove()

		// Set the dimensions and margins
		const margin = { top: 80, right: 25, bottom: 30, left: 40 },
			width = 450 - margin.left - margin.right,
			height = 450 - margin.top - margin.bottom

		// Create main SVG
		const svg = d3
			.select(svgRef.current)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

		// Labels of row and columns
		const myGroups = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		]

		// Build X scales and axis
		const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.5)
		svg.append('g')
			.style('font-size', 15)
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x).tickSize(0))
			.select('.domain')
			.remove()

		// Build color scale
		const myColor = d3
			.scaleSequential()
			.interpolator(d3.interpolateInferno)
			.domain([1, 100])

		// Tooltip setup
		const tooltip = d3
			.select('body') // Adjusted to append tooltip to body
			.append('div')
			.style('opacity', 0)
			.attr('class', 'tooltip')
			.style('position', 'absolute')
			.style('background-color', 'white')
			.style('border', 'solid')
			.style('border-width', '2px')
			.style('border-radius', '5px')
			.style('padding', '5px')

		// Tooltip functions
		const mouseover = function (event, d) {
			tooltip.style('opacity', 1)
			d3.select(this).style('stroke', 'black').style('opacity', 1)
		}
		const mousemove = function (event, d) {
			tooltip
				.html('The exact value of<br>this cell is: ' + d.value)
				.style('left', event.pageX + 10 + 'px')
				.style('top', event.pageY - 10 + 'px')
		}
		const mouseleave = function (event, d) {
			tooltip.style('opacity', 0)
			d3.select(this).style('stroke', 'none').style('opacity', 0.8)
		}

		// Add squares
		svg.selectAll()
			.data(data, (d) => d.group + ':' + d.variable)
			.join('rect')
			.attr('x', (d) => x(d.group))
			.attr('rx', 4)
			.attr('ry', 4)
			.attr('width', x.bandwidth())
			.style('fill', (d) => myColor(d.value))
			.style('stroke-width', 4)
			.style('stroke', 'none')
			.style('opacity', 0.8)
			.on('mouseover', mouseover)
			.on('mousemove', mousemove)
			.on('mouseleave', mouseleave)

		// Title
		svg.append('text')
			.attr('x', 0)
			.attr('y', -50)
			.attr('text-anchor', 'left')
			.style('font-size', '22px')
			.text('A d3.js heatmap')

		// Subtitle
		svg.append('text')
			.attr('x', 0)
			.attr('y', -20)
			.attr('text-anchor', 'left')
			.style('font-size', '14px')
			.style('fill', 'grey')
			.style('max-width', 400)
			.text('A short description of the take-away message of this chart.')

		// Cleanup tooltip on unmount
		return () => tooltip.remove()
	}, []) // Re-run effect when data changes

	return <svg ref={svgRef}></svg>
}

export default HeatMap
