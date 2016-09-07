var bugdata = [
	{id : 1, status : "Open", priority : "P1", owner : "Ravan", title : "App crashes on open" },
	{id : 2, status : "New", priority : "P2", owner : "Eddie", title : "Misaligned border on panel" }
];

var BugRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.bug.id}</td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.owner}</td>
				<td>{this.props.bug.title}</td>
			</tr>
		);
	}
});

var BugFilter = React.createClass({
	render: function() {
		return (
			<div>placeholding bug filter</div>
		)
	}
});

var BugTable = React.createClass({
	render: function() {
		var bugRows = this.props.bugs.map(function(bug) {
			return (
				<BugRow key={bug.id} bug={bug} />
			);
		})
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

var BugAdd = React.createClass({
	render: function() {
		return (
			<div>placeholding bug add form</div>
		)
	}
});

var BugList = React.createClass({
	render: function() {
		return (
			<div>
				<BugFilter />
				<BugTable bugs={this.props.bugs}/>
				<BugAdd />
			</div>
		);
	}
});

ReactDOM.render(
  <BugList bugs={bugdata}/>,
  document.getElementById('main')
);