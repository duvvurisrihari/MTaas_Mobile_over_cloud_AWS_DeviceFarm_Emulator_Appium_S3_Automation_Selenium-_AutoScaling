import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
	render() {
		localStorage.removeItem('281Username');
		localStorage.removeItem('281UserId');
		localStorage.removeItem('281UserType');
		let RedirectVar = <Redirect to="/" />;
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Logout Component
export default Logout;
