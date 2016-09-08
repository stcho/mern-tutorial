var BugRow = React.createClass({
	render: function() {
		console.log("Rendering BugRow:", this.props.bug);
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
		console.log("Rendering BugFilter");
		return (
			<div>placeholding bug filter</div>
		)
	}
});

var BugTable = React.createClass({
	render: function() {
		console.log("Rendering bug table, num items:", this.props.bugs.length);
		var bugRows = this.props.bugs.map(function(bug) {
			return (
				<BugRow key={bug.id} bug={bug} />
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

var BugAdd = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var form = document.forms.bugAdd;
		this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
		form.owner.value = '';
		form.title.value = '';
	},
	render: function() {
		console.log("Rendering BugAdd");
		return (
			<form name="bugAdd">
				<input type="text" name="owner" placeholder="Owner" />
				<input type="text" name="title" placeholder="Title" />
				<button onClick={this.handleSubmit}>Add Bug</button>
			</form>
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
		$.ajax({
			url: '/api/bugs',
			success: function(data) {
				this.setState({bugs: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(err.toString());
			}.bind(this)
		});
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
				<BugFilter />
				<hr />
				<BugTable bugs={this.state.bugs}/>
				<hr />
				<BugAdd addBug={this.addBug}/>
			</div>
		);
	}
});

ReactDOM.render(
  <BugList />,
  document.getElementById('main')
);