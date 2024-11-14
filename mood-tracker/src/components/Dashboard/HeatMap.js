import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

const HeatMap = ({ data }) => {
	const svgRef = useRef(null)

	useEffect(() => {
		d3.select(svgRef.current).selectAll('*').remove()

		const margin = { top: 80, right: 25, bottom: 30, left: 40 },
			width = 450 - margin.left - margin.right,
			height = 450 - margin.top - margin.bottom

		const svg = d3
			.select(svgRef.current)
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

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

		const monthMap = {
			'01': 'Jan',
			'02': 'Feb',
			'03': 'Mar',
			'04': 'Apr',
			'05': 'May',
			'06': 'Jun',
			'07': 'Jul',
			'08': 'Aug',
			'09': 'Sep',
			10: 'Oct',
			11: 'Nov',
			12: 'Dec',
		}

		// Generate the Y axis dynamically from the data
		const myVars = Array.from(new Set(data.map((d) => d.Date)))
		const x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.5)
		svg.append('g')
			.style('font-size', 15)
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x).tickSize(0))
			.select('.domain')
			.remove()

		const y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.5)
		svg.append('g')
			.style('font-size', 15)
			.call(d3.axisLeft(y).tickSize(0))
			.select('.domain')
			.remove()

		const myColor = d3
			.scaleLinear()
			.range([
				'#9fd89b',
				'#9ed799',
				'#9dd798',
				'#9bd697',
				'#9ad696',
				'#99d595',
				'#97d494',
				'#96d492',
				'#95d391',
				'#93d390',
				'#92d28f',
				'#91d18e',
				'#8fd18d',
				'#8ed08c',
				'#8ccf8a',
				'#8bcf89',
				'#8ace88',
				'#88cd87',
				'#87cd86',
				'#85cc85',
				'#84cb84',

				'#5db86b',
				'#5bb86a',
				'#5ab769',
				'#58b668',
				'#57b568',
				'#56b467',
				'#54b466',
				'#53b365',
				'#51b264',
				'#50b164',
				'#4eb063',
				'#4daf62',
				'#4caf61',
				'#4aae61',
				'#49ad60',
				'#48ac5f',
				'#46ab5e',
				'#45aa5d',
				'#44a95d',
				'#42a85c',
				'#41a75b',
				'#40a75a',
				'#3fa65a',
				'#3ea559',
				'#3ca458',
				'#3ba357',
				'#3aa257',
				'#39a156',
				'#38a055',
				'#379f54',
				'#369e54',
				'#359d53',
				'#349c52',
				'#339b51',
				'#329a50',
				'#319950',
				'#30984f',
				'#2f974e',
				'#2e964d',
				'#2d954d',
				'#2b944c',
				'#2a934b',
				'#29924a',
				'#28914a',
				'#279049',
				'#268f48',
				'#258f47',
				'#248e47',
				'#238d46',
				'#228c45',
				'#218b44',
				'#208a43',
				'#1f8943',
				'#1e8842',

				'#16803c',
				'#157f3b',
				'#147e3a',
				'#137d3a',
				'#127c39',
				'#117b38',
				'#107a37',
				'#107937',
				'#0f7836',
				'#0e7735',
				'#0d7634',
				'#0c7534',
				'#0b7433',
				'#0b7332',
				'#0a7232',
				'#097131',
				'#087030',
				'#086f2f',
				'#076e2f',
				'#066c2e',
				'#066b2d',
				'#056a2d',
				'#05692c',
				'#04682b',
				'#04672b',
				'#04662a',
				'#03642a',
				'#036329',
				'#026228',
				'#026128',
				'#026027',
				'#025e27',
				'#015d26',
				'#015c25',
				'#015b25',
				'#015a24',
				'#015824',
				'#015723',
				'#005623',
				'#005522',
				'#005321',
				'#005221',
				'#005120',
				'#005020',
				'#004e1f',
				'#004d1f',
				'#004c1e',
				'#004a1e',
				'#00491d',
				'#00481d',
				'#00471c',
				'#00451c',
				'#00441b',
			])

		const tooltip = d3
			.select('body')
			.append('div')
			.style('opacity', 0)
			.attr('class', 'tooltip')
			.style('position', 'absolute')
			.style('background-color', 'white')
			.style('border', 'solid')
			.style('border-width', '2px')
			.style('border-radius', '5px')
			.style('padding', '5px')

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

		svg.selectAll()
			.data(data)
			.join('rect')
			.attr('x', (d) => x(monthMap[d.Month].padStart(2, '0')))
			.attr('y', (d) => y(d.Date))
			.attr('rx', 4)
			.attr('ry', 4)
			.attr('width', x.bandwidth())
			.attr('height', y.bandwidth())
			.style('fill', (d) => myColor(d.value || 1)) // default to 1 if no value provided
			.style('stroke-width', 4)
			.style('stroke', 'none')
			.style('opacity', 0.8)
			.on('mouseover', mouseover)
			.on('mousemove', mousemove)
			.on('mouseleave', mouseleave)

		svg.append('text')
			.attr('x', 0)
			.attr('y', -50)
			.attr('text-anchor', 'left')
			.style('font-size', '22px')
			.text('Mood Heatmap')

		svg.append('text')
			.attr('x', 0)
			.attr('y', -20)
			.attr('text-anchor', 'left')
			.style('font-size', '14px')
			.style('fill', 'grey')
			.style('max-width', 400)
			.text(
				'Consistency is Key. The more you log, the more insights you get.'
			)

		return () => tooltip.remove()
	}, [data])

	return <svg ref={svgRef}></svg>
}

export default HeatMap
