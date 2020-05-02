import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Root extends Component {
	render() {
		let RedirectVar = '';
		if (this.props.location.pathname === '/') {
			RedirectVar = <Redirect to="/login" />;
		}
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Root Component
export default Root;
