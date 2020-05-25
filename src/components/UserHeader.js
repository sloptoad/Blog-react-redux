import React from 'react';
import {connect} from 'react-redux';
// import{fetchPostsAndUsers} from '../actions';

// we compare user ID to Post user id here
class UserHeader extends React.Component{
    // componentDidMount(){
    //     this.props.fetchPostsAndUsers(this.props.userId);
    // }
    render(){

        const {user} = this.props;

        if(!user){
            return <div>loading...</div>
        }
        return <div className="header">{user.name}</div>
    }
}
// gives access to redux state, now have access to users props
// ownProps ref to props about to be sent into this component, pre calc to props as to not pass a ton of data to component
// mapState gets called with state object and ownProps

const mapStateToProps = (state, ownProps) =>{
    return {user: state.users.find(user=> user.id === ownProps.userId)}
};

export default connect(mapStateToProps)(UserHeader);