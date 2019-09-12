import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const header = (props) => {
    // let form = props.reason === 'new' ? <Form newItem={ props.newItem } reason='new' close={props.click} /> : null;
    let iconClass = props.reason != null? 'newTodo rot' : 'newTodo';
    let toggle = props.reason === 'new' ? null : 'new';
    return (
        <div>
            <div className='header'>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
                <h1>Todooshka</h1>
                <span className={iconClass} onClick={() => props.click(toggle)} ><FontAwesomeIcon className='plus' icon={faPlus} /></span>
            </div>
        </div>
    );
}

export default header;