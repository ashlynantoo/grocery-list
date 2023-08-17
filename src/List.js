import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  const { list, itemEdited, removeItem, editItem, updateStatus } = props;

  return (
    <div className="grocery-list">
      {list.map((listItem) => {
        const { id, item, completed } = listItem;
        return (
          <article key={id} className="grocery-item">
            <div className="item">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => updateStatus(id)}
              />
              <p className={completed ? "title line-through" : "title"}>
                {item}
              </p>
            </div>
            <div className="btn-container">
              <button
                className="edit-btn"
                onClick={() => {
                  editItem(id, item);
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
