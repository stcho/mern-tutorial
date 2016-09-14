var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugEdit = React.createClass({
	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		$.ajax('/api/bugs/' + this.props.params.id).done(function(bug) {
			this.setState(bug);
		}.bind(this));
	},

	submit: function(e) {
		e.preventDefault();
		console.log("submit")
		var bug = {
			priority: this.state.priority,
			status: this.state.status,
			owner: this.state.owner,
			title: this.state.title
		}

		$.ajax({
			url: '/api/bugs/' + this.props.params.id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify(bug),
			dataType: 'json',
			success: function(bug) {
				this.setState(bug);
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		})
	},

	onChangePriority: function(e) {
		this.setState({priority: e.target.value});
	},

	onChangeStatus: function(e) {
		this.setState({status: e.target.value});
	},

	onChangeOwner: function(e) {
		this.setState({owner: e.target.value});
	},

	onChangeTitle: function(e) {
		this.setState({title: e.target.value});
	},

	render: function() {
		return (
			<div>
				Edit bug: {this.props.params.id}
				<br/>
				<form onSubmit={this.submit}>
					Priority:
					<select value={this.state.priority} onChange={this.onChangePriority}>
						<option value="P1">P1</option>
						<option value="P2">P2</option>
						<option value="P3">P3</option>
					</select>
					<br/>
					Status:
					<select value={this.state.status} onChange={this.onChangeStatus}>
						<option value="New">New</option>
						<option value="Open">Open</option>
						<option value="Closed">Closed</option>
					</select>
					<br/>
					Owner: <input type="text" value={this.state.owner} onChange={this.onChangeOwner} />
					<br/>
					Title: <input type="text" value={this.state.title} onChange={this.onChangeTitle} />
					<br/>
					<button type="submit" >Submit</button>
				</form>
			</div>
		)
	}
});

module.exports = BugEdit;