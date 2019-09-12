import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { Draggable } from 'react-beautiful-dnd';

const todoList = (props) => props.items.map((el, i) => {
    return (
        // <Draggable key={el.id} draggableId={el.id} index={i}>
        // {(provided) => (
        //             <div
        //               ref={provided.innerRef}
        //               {...provided.draggableProps}
        //               {...provided.dragHandleProps}
        //               >
                      <TodoItem
                          key={el.id}
                          id={el.id}
                          title={el.title}
                          date={el.date}
                          showInfo={(id, reason) => props.showInfo(id, reason)}
                          delete={() => props.delete(el.id)}
                          edit={(id, reason) => props.editItem(id, reason)}
                          setMenu={(id) => props.setMenu(id)}
                          checkMenu={() => props.checkMenu()}
                      />
        //             </div>
        //           )}
        // </Draggable>
    )
})

export default todoList;
