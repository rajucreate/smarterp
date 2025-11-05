import React, { Component } from 'react';
import './Dashboard.css';
import { BASEURL, callApi, getSession, setSession } from './lib';
import Menubar from './Menubar';
import Users from './Users';
import MyProfile from './MyProfile';
import Settings from './Settings';
class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            username: getSession("sid"),
            fullName: "",
            menuItems: [],
            activeComponent: ""
        };
        this.getFullName = this.getFullName.bind(this);
        this.loadModule = this.loadModule.bind(this);
    }
    componentDidMount(){
        if(this.state.username === ""){
            this.logout();
            return;
        }
        let data = JSON.stringify({
            email: this.state.username
        });
        callApi("POST", BASEURL + "getfullname", data, this.getFullName);
    }
    getFullName(res){
        let rdata = JSON.parse(res);
        if (!rdata.user) {
            alert("Invalid user data from server");
            return;
        }
        this.setState({
            fullName: rdata.user.firstName + " " + rdata.user.lastName,
            menuItems: rdata.menus || []
        });
    }
    logout(){
        setSession("sid", "", -1);
        window.location.replace("/");
    }
    loadModule(mid){
        //alert(mid);
        let components = {
            "M001": <Users/>,
            "M002": <MyProfile/>,
            "M003": <Settings/>
        };
        this.setState({activeComponent: components[mid]});
    }
    render() {
        const{fullName, menuItems, activeComponent} = this.state;
        return (
            <div className='dashboard'>
                <div className='header'>
                    <div className='logo'>KL University</div>
                    <div className='userinfo'>
                        <div>{fullName}</div>
                        <img src="/logout.png" alt="" onClick={()=>this.logout()} />
                    </div>
                </div>
                <div className='menu'><Menubar menuItems={menuItems} onMenuClick={this.loadModule} /></div>
                <div className='workspace'>{activeComponent}</div>
                <div className='footer'>Copyright @ 2025. All rights reserved.</div>
            </div>
        );
    }
}

export default Dashboard;