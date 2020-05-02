import React, {Component} from 'react';
import { Button, Input} from 'reactstrap';
import { withRouter} from 'react-router-dom';


class BugsNav extends Component {

  constructor(props){
    super(props);
    this.state={
      projectId : null,
      errMsg: '',
      successMsg: '',
    }
  }

  changeHandler = (event)  => {
    let value = event.target.value;
    this.setState({ projectId: value });
  }

    goToCreateBug = (e) =>{
        e.preventDefault();
        this.props.history.push(`/${localStorage.getItem('281UserType').toLowerCase()}/bugs/createBug`);
    }

    render(){
        return(
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly",paddingTop:"30px"}}>
                <Button style={{height:"50px"}}outline onClick={this.goToCreateBug} color="primary">Create New Bug</Button>{' '}
            </div>
        )
    }
}
export default withRouter(BugsNav);

