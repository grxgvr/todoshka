import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleActions: false,
            isDone: false
        }
    }
    showActions = () => {
        let condition = this.state.toggleActions;
        if (condition) {
            this.props.setMenu(null);
            this.setState({ toggleActions: !condition });
        }
        else {
            if (this.props.checkMenu()) {
                this.props.setMenu(this.props.id);
                this.setState({ toggleActions: !condition });
            }
        }
    }
    deleteItem = () => {
        this.showActions();
        this.props.delete();
    }
    editItem = (id, reason) => {
        this.showActions();
        this.props.edit(id, reason);
    }
    setDone = () => {
        this.showActions();
        let done = this.state.isDone;
        this.setState({ isDone: !done });
    }
    render() {
        let toggleIcon, dropMenu, titleStyle, date, today, liStyle;
        if (!this.state.toggleActions) {
            toggleIcon = faEllipsisV;
            dropMenu = "dropdown-content hide";
        } else {
            toggleIcon = faTimes;
            dropMenu = "dropdown-content show";
        }
        titleStyle = this.state.isDone ? 'title done' : 'title';
        date = this.props.date.split('.');
        date = new Date(date[2], date[1] - 1, date[0]);
        today = new Date();
        if ((date.getTime() - today.getTime()) / (1000 * 3600 * 24) < -1) {
            liStyle = 'past';
        } else if ((date.getTime() - today.getTime()) / (1000 * 3600 * 24) <= 3) {
            liStyle = 'near';
        } else {
            liStyle = null;
        }
        let info = (
            <div className='info'>
                {this.props.date}
                <div className="dropdown" >
                    <button className="dropbtn" onClick={this.showActions}>
                        <span className='toggle' onClick={this.showActions}>
                            <FontAwesomeIcon icon={toggleIcon} />
                        </span>
                    </button>
                    <div className={dropMenu}>
                        <span className='check' onClick={() => this.setDone()}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className='edit' onClick={() => this.editItem(this.props.id, 'edit')}>
                            <FontAwesomeIcon icon={faEdit} />
                        </span>
                        <span className='trash' onClick={this.deleteItem}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </span>
                    </div>
                </div>
            </div>);
        return (
            <li className={liStyle}>
                <div
                    className={titleStyle}
                    onClick={() => this.props.showInfo(this.props.id, 'show')}>{this.props.title}
                </div>
                {info}
            </li>
        )
    }
}

export default TodoItem;