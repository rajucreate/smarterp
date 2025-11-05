import React, { Component } from 'react';
import './Menubar.css';

class Menubar extends Component {
    render() {
        const {menuItems} = this.props;
        return (
            <div className='menubar'>
                <div className='icon'>&#9776; MENU</div>
                <nav>
                    <ul>
                        {menuItems.map((m)=>(
                            <li onClick={()=>this.props.onMenuClick(m.mid)}><img src={"/" + m.micon} alt='' />{m.mtitle}</li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Menubar;