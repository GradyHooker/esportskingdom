var root;
var tree;
var diagonal;
var svg;
var teams;
var i = 0;
var duration = 750;
var rectW = 400;
var rectH = 250;

function makeD3(jsonFile, defaultWidth, defaultHeight) {
	rectW = defaultWidth;
	rectH = defaultHeight;
	
	$.when(
		$.getJSON("/json/" + jsonFile + ".json", function(json) {
			root = json;
		}),
		$.getJSON("/json/teams.json", function(jsonTeam) {
			teams = jsonTeam;
		})
	).then(function() {
		tree = d3.layout.tree().nodeSize([420, 270]);
		diagonal = d3.svg.diagonal()
			.projection(function (d) {
				var x = d.x + rectW / 2;
				var y = d.y + rectH / 2;
				return [x, y];
			});

		svg = d3.select("#d3-cont").append("svg")
			.call(zm = d3.behavior.zoom().scaleExtent([0.1,2]).on("zoom", redraw)).append("g")
			.attr("transform", "translate(" + 350 + "," + 20 + ")");

		//necessary so that zoom knows where to zoom and unzoom from
		zm.translate([$(svg[0].parentNode).width()/3, 20]);
		zm.scale(0.2);
		redraw_reset();

		root.x0 = 0;
		root.y0 = 0;

		update(root);
	});
}

//Redraw for zoom
function redraw() {
	svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
}

//Reset
function redraw_reset() {
	svg.attr("transform", "translate(" + $(svg[0].parentNode).width()/3 + ", " + 20 + ")" + " scale(0.2)");
}

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
	var nodeIDs = [];
    nodes.forEach(function (d) {
		if(d.depth < 5) d.y = d.depth * 600;
		else d.y = d.depth * 600 + 250;
		d.x = d.x - rectW/2 * (d.size[0]-1);
		nodeIDs.push(d.id);
    });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
		.style("opacity", 0)
        .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
		.on("click", click);

    nodeEnter.append("rect")
        .attr("width", function (d) { return rectW * d.size[0]; })
        .attr("height", function (d) { return rectH * d.size[1]; })
		.attr("rx", 20)
		.attr("ry", 20)
        .attr("height", rectH)
        .attr("stroke", function (d) { return d.color; })
        .attr("stroke-width", 5)
        .style("fill", function (d) { return d._children ? "#eee" : "#fff"; });

    nodeEnter.append("text")
        .attr("x", function (d) { return (rectW * d.size[0])/2; })
        .attr("y", 35)
		.attr("fill", function (d) { return d.color; })
        .attr("text-anchor", "middle")
        .text(function (d) { return d.name; });

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
		.style("opacity", 1)
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    nodeUpdate.select("rect")
        .attr("width", function (d) { return rectW * d.size[0]; })
        .attr("height", function (d) { return rectH * d.size[1]; })
		.attr("rx", 20)
		.attr("ry", 20)
        .attr("stroke", function (d) { return d.color; })
        .attr("stroke-width", 5)
        .style("fill", function (d) { return d._children ? "#eee" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
		.style("opacity", 0)
        .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
        .remove();

    nodeExit.select("rect")
		.attr("rx", 20)
		.attr("ry", 20)
        .attr("width", function (d) { return rectW * d.size[0]; })
        .attr("height", function (d) { return rectH * d.size[1]; })
        .attr("stroke", function (d) { return d.color; })
        .attr("stroke-width", 5);

    nodeExit.select("text");
	
	var line = d3.svg.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; });

	// Set the position for links
    links.forEach(function (d) {
		if(d.source.lx == null) {
			d.source.lx = d.source.x;
			d.source.x = d.source.x + rectW/2 * (d.source.size[0]-1);
		}
		if(d.target.lx == null) {
			d.target.lx = d.target.x;
			d.target.x = d.target.x + rectW/2 * (d.target.size[0]-1);
		}
    });
		
    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function (d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
		.attr("stroke-width", 5)
		.attr("stroke", function(d) { return (d.target.color || "#ccc"); })
        .attr("d", function (d) {
        var o = {
            x: source.x0,
            y: source.y0
        };
        return diagonal({
            source: o,
            target: o
        });
    });

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
        var o = {
            x: source.x,
            y: source.y
        };
        return diagonal({
            source: o,
            target: o
        });
    })
    .remove();

	// Set the positions back to normal
    links.forEach(function (d) {
		if(d.source.lx != null) {
			d.source.x = d.source.lx;
			d.source.lx = null;
		}
		if(d.target.lx != null) {
			d.target.x = d.target.lx;
			d.target.lx = null;
		}
    });
	
	//Is something displayed, that shouldn't be
	$('foreignObject').each(function (index) {
		if(jQuery.inArray(parseInt($(this)[0].id), nodeIDs) == -1) {
			var toRemove = $(this)[0];
			var dx = source.x - $(toRemove).attr('x');
			var dy = source.y - $(toRemove).attr('y');
			d3.select(toRemove).transition()
				.duration(duration)
				.style("opacity", 0)
				.attr("transform", "translate(" + dx + "," + dy + ")")
				.remove();
		}
	});
		
	//Is something not displayed, but should be
	nodes.forEach(function (d) {
		if($('foreignObject#' + d.id).length == 0) {
			//Making from scratch
			var foreignObject = svg.append('foreignObject')
				.style("opacity", 0)
				.attr('x', source.x)
				.attr('y', source.y)
				.attr("width", rectW * d.size[0])
				.attr("height", rectH * d.size[1])
				.attr("id", d.id);
			var dx = d.x - source.x;
			var dy = d.y - source.y;			
			foreignObject.transition()
				.duration(duration)
				.style("opacity", 1)
				.attr("transform", "translate(" + dx + "," + dy + ")");
			var div = foreignObject.append('xhtml:div')
				.html(generateTeamTable(d))
		} else {
			var obj = $('foreignObject#' + d.id)[0];
			//Moving to new location
			if($(obj).attr('x') != d.x || $(obj).attr('y') != d.y) {
				var dx = d.x - $(obj).attr('x');
				var dy = d.y - $(obj).attr('y');
				d3.select(obj).transition()
					.duration(duration)
					.attr("transform", "translate(" + dx + "," + dy + ")");
			}
		}
	});

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

function generateTeamTable(ele) {
	var html = "<div class='teamlogo-cont'>";
	
	if(ele.teams != null) {
		ele.teams.forEach(function (team) {
			html += "<img src='/assets/logos/medium/" + team.name + ".png' style='background: " + team.color + "' title='" + teams[team.name] + "' alt='Team Logo for " + teams[team.name] + "'/>";
		});
	} else if(ele.teamtext != null) {
		html += "<span class='teamtext'>" + ele.teamtext + "</span>";
	}
	
	html += "</div>";
	return html;
}