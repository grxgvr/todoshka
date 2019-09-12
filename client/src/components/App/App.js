import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';
import TodoList from '../TodoList/TodoList';
import Header from '../Header/Header';
import Form from '../Form/Form';
import './App.css';

// { title: 'task1', description: 'desc1', date: '28.10.2018', id: 1 },
// { title: 'task2', description: 'desc2', date: '21.10.2018', id: 2 },
// { title: 'task3', description: 'desc3', date: '21.01.2019', id: 3 }

class App extends Component {
  state = {
    items: [],
    currentItem: null,
    formOpen: false,
    formAction: null,
    submenuOpenFor: null,
    lastIndex: 0,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null
  }

  //front functions
  showInfo = (id, reason) => {
    let item = this.state.items.find(el => el.id === id);
    this.setState({ formAction: reason, formOpen: true, currentItem: item });
  }
  checkMenu = () => {
    return this.state.submenuOpenFor === null;
  }
  setMenu = (id) => {
    this.setState({ submenuOpenFor: id });
  }
  toggleForm = (reason) => {
    let isOpen = this.state.formOpen;
    if (isOpen)
      reason = null;
    this.setState({ formOpen: !isOpen, formAction: reason });
  }
  newItem = (title, description, date) => {
    // const id = this.state.lastIndex + 1;
    // let itemArr = this.state.items;
    // let item = { title, description, date, id };
    // itemArr.unshift(item);
    // this.setState({ items: itemArr, lastIndex: id });

    //NEW
    this.putDataToDB(title, description, date);
  };

  deleteItem = (id) => {
    // const items = [...this.state.items];
    // const itemIndex = items.findIndex(el => el.id === id);
    // items.splice(itemIndex, 1);
    // this.setState({ items });
    this.deleteFromDB(id);
  };

  saveItem = (item) => {
    // let items = [...this.state.items];
    // let index = items.findIndex(el => el.id === item.id);
    // items[index] = item;
    // this.setState({ items });

    //NEW
    this.updateDB(item);
  }
  onDragEnd = (result) => {
    if (!result.destination)
      return;
    let items = [...this.state.items];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    this.setState({ items });
  }

  //back funcs
  componentDidMount() {
    this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  componentWillUnmount() {
    this.state.items.forEach(el => {
      this.updateDB(el);
    })
  }


  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ items: res.data }));
  };

  putDataToDB = (title, description, date) => {
    let currentIds = this.state.items.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      title,
      description,
      date
    });
    setTimeout(this.getDataFromDb, 500);
  };

  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.items.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    console.log(objIdToDelete);
    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
    setTimeout(this.getDataFromDb, 500);
  };

  updateDB = (editedItem) => {
    let objIdToUpdate = null;
    this.state.items.forEach(dat => {
      if (dat.id === editedItem.id) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: {
        title: editedItem.title,
        description: editedItem.description,
        date: editedItem.date
      }
    });
    setTimeout(this.getDataFromDb, 500);
  };



  render() {
    let form;
    let act = this.state.formAction;
    if (this.state.formOpen) {
      if (act === 'show') {
        form = <Form reason='show' item={this.state.currentItem} />
      } else if (act === 'new') {
        form = <Form reason='new' newItem={this.newItem} close={this.toggleForm} />;
      } else if (act === 'edit') {
        form = <Form reason='edit' item={this.state.currentItem} saveItem={this.saveItem} close={this.toggleForm} />;
      } else
        form = null;
    }
    let list = <TodoList
      items={this.state.items}
      showInfo={this.showInfo}
      delete={this.deleteItem}
      editItem={this.showInfo}
      setMenu={this.setMenu}
      checkMenu={this.checkMenu} />;
    return (
      <div className="App">
        <Header
          reason={this.state.formAction}
          click={this.toggleForm}
          newItem={this.newItem} />
        {form}
        {/* <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef}> */}
                {list}
              {/* </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </div>
    );
  }
}
export default App;
