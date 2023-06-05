import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = (props) => {
  const { list, removeItem, editItem } = props;
  return (
    <div className="grocery-list">
      {list.map((listItem) => {
        const { id, item } = listItem;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{item}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => {
                  editItem(id);
                }}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  removeItem(id);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
