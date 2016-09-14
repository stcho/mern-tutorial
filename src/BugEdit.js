var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugEdit = React.createClass({
	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		$.ajax('/api/bugs/' + this.props.params.id).done(function(data) {
			this.setState({bug: data});
		}).bind(this);
	},

	submit: function() {

	},

	render: function() {
		return (
			<div>
				Edit bug: {this.props.params.id}
				<form name="budEdit">
					Priority:
					<select value={this.state.bug.priority}>
						<option value="P1"></option>
						<option value="P2"></option>
						<option value="P3"></option>
					</select>
					Status:
					<select value={this.state.bug.status}>
						<option value="New"></option>
						<option value="Open"></option>
						<option value="Closed"></option>
					</select>
					<input type="text" name="owner" placeholder={this.state.bug.owner} />
					<input type="text" name="title" placeholder={this.state.bug.title} />
					<button onClick={this.submit}>Submit</button>
				</form>
			</div>
		)
	}
});