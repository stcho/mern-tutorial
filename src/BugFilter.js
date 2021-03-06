var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('react-bootstrap/lib/Button');

var BugFilter = React.createClass({
	getInitialState: function() {
		var initFilter = this.props.initFilter;
		return {status: initFilter.status, priority: initFilter.priority};
	},
	onChangeStatus: function(e) {
		this.setState({status: e.target.value})
	},
	onChangePriority: function(e) {
		this.setState({priority: e.target.value})
	},
	submit: function() {
		this.props.submitHandler({status: this.state.status, priority: this.state.priority});
	},
	render: function() {
		console.log("Rendering BugFilter");
		return (
			<div>
				<h3>Filter</h3>
				Status:
				<select value={this.state.status} onChange={this.onChangeStatus}>
					<option value="">(Any)</option>	
					<option value="New">New</option>
					<option value="Open">Open</option>
					<option value="Closed">Closed</option>
				</select>
				<br/>
				Priority:
				<select value={this.state.priority} onChange={this.onChangePriority}>
					<option value="">(Any)</option>
					<option value="P1">P1</option>
					<option value="P2">P2</option>
					<option value="P3">P3</option>
				</select>
				<br/>
				<Button bsStyle="primary" onClick={this.submit}>Search</Button>
			</div>
		)
	}
});

module.exports = BugFilter;