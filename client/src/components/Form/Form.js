import React, { Component } from 'react';
import './Form.css'

class Form extends Component {
    constructor(props) {
        super(props);
        let title = this.props.item !== undefined ? this.props.item.title : '';
        let description = this.props.item !== undefined ? this.props.item.description : '';
        let date = this.props.item !== undefined ? this.props.item.date.split('.').reverse().join('-') : '';
        this.state = {
            title,
            description,
            date
        }
    }
    setFields = (cond) => {
        if (cond) {
            this.setState({ title: this.props.item.title, description: this.props.item.description, date: this.props.item.date.split('.').reverse().join('-'), setValues: false });
        }
    }
    inputChangedHandler = (e, field) => {
        let newVal = e.target.value;
        if (field === 'title')
            this.setState({ title: newVal });
        else if (field === 'date')
            this.setState({ date: newVal });
        else
            this.setState({ description: newVal });
    }
    checkInputs = () => {
        let st = this.state;
        if (st.title !== '' && st.date.split('-').every(el => /^\d+$/.test(el)) && st.description !== '') {
            if (this.props.reason === 'new') {
                this.props.newItem(st.title, st.description, st.date.split('-').reverse().join('.'));
            } else {
                this.props.saveItem({
                    title: st.title,
                    description: st.description,
                    date: st.date.split('-').reverse().join('.'),
                    id: this.props.item.id
                });
            };
            this.props.close();
        } else {
            console.log('notAdded');
        }
    }
    render() { 
        let title, description, date, button;
        if (this.props.reason === 'new') {
            title = <input
                type="text"
                className="form-control"
                onChange={(event) => this.inputChangedHandler(event, 'title')} />
            description = <textarea
                className="form-control" id="exampleFormControlTextarea1"
                rows="3"
                onChange={(event) => this.inputChangedHandler(event, 'description')}>
            </textarea>;
            date = <input
                type="date"
                className="form-control"
                onChange={(event) => this.inputChangedHandler(event, 'date')} />
            button = <button
                onClick={this.checkInputs}
                className="btn btn-primary">
                Добавить
                </button>;
        } else if (this.props.reason === 'show') {
            title = (<div><p>{this.props.item.title}</p><hr/></div>);
            description = <p>{this.props.item.description}</p>;
            date = (<div><p>{this.props.item.date}</p><hr/></div>);
        } else if (this.props.reason === 'edit') {
            title = <input
                type="text"
                className="form-control"
                onChange={(event) => this.inputChangedHandler(event, 'title')}
                value={this.state.title} />
            description = <textarea
                className="form-control"
                rows="3"
                onChange={(event) => this.inputChangedHandler(event, 'description')}
                value={this.state.description}>
            </textarea>;
            date = <input
                type="date"
                className="form-control"
                onChange={(event) => this.inputChangedHandler(event, 'date')}
                value={this.state.date} />
            button = <button
                onClick={this.checkInputs}
                className="btn btn-primary">
                Сохранить
                </button>;
        }
        return (
            <div className='form'>
                <div className='form-content'>
                    <div className="form-group">
                        <label>Название:</label>
                        {title}
                    </div>
                    <div className="form-group">
                        <label>Дата:</label>
                        {date}
                    </div>
                    <div className="form-group">
                        <label>Описание:</label>
                        {description}
                    </div>
                    {button}
                </div>
            </div>
        )
    }
}

export default Form;
