var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
	render: function() {
		console.log("Rendering BugRow:", this.props.bug);
		return (
			<tr>
				<td>{this.props.bug._id}</td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.owner}</td>
				<td>{this.props.bug.title}</td>
			</tr>
		);
	}
});

var BugTable = React.createClass({
	render: function() {
		console.log("Rendering bug table, num items:", this.props.bugs.length);
		var bugRows = this.props.bugs.map(function(bug) {
			return (
				<BugRow key={bug._id} bug={bug} />
			);
		});
		return (
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Status</th>
						<th>Priority</th>
						<th>Owner</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{bugRows}
				</tbody>
			</table>
		)
	}
});



var BugList = React.createClass({
	getInitialState: function() {
		return (
			{bugs: []}
		);
	},
	componentDidMount: function() {
		this.loadData({});
	},
	loadData: function(filter) {
		$.ajax('/api/bugs', {data: filter}).done(function(data) {
			this.setState({bugs: data});
		}.bind(this));
	},
	addBug: function(bug) {
		console.log("Adding bug:", bug);
		$.ajax({
			url: '/api/bugs',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(bug),
			success: function(data) {
				var bug = data;

				var bugsModified = this.state.bugs.concat(bug);
				this.setState({bugs: bugsModified});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	},
	render: function() {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return (
			<div>
				<h1>Bug Tracker</h1>
				<BugFilter submitHandler={this.loadData} initFilter={this.props.location.query}/>
				<hr />
				<BugTable bugs={this.state.bugs}/>
				<hr />
				<BugAdd addBug={this.addBug}/>
			</div>
		);
	}
});

module.exports = BugList;