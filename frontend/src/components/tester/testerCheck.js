import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Logout extends Component {
	render() {
        let RedirectVar
        if (localStorage.getItem('281UserType') === "Manager") {
            RedirectVar = <Redirect to="/manager/dashboard" />;
        } else if (localStorage.getItem('281UserType') === "Admin") {
            RedirectVar = <Redirect to="/admin/dashboard" />;
        } 
		return (
			<div>
				{RedirectVar}
			</div>
		);
	}
}
// export Logout Component
export default Logout;
