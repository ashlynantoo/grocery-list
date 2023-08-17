import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroceryForm from "./GroceryForm";
import List from "./List";

function getListFromLocalStorage() {
  const itemList = localStorage.getItem("list");
  if (itemList) {
    return JSON.parse(itemList);
  } else {
    return [];
  }
}

const App = () => {
  const [list, setList] = useState(getListFromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [itemEdited, setItemEdited] = useState(null);

  const setLocalStorage = () => {
    localStorage.setItem("list", JSON.stringify(list));
  };

  const addItemToList = (newItem) => {
    setList([...list, newItem]);
    setLocalStorage();
    toast.success("Item added to the list");
  };

  const clearAllItems = () => {
    setList([]);
    setLocalStorage();
    toast.error("All items removed from the list");
  };

  const removeItem = (itemId) => {
    setList(
      list.filter((listItem) => {
        return listItem.id !== itemId;
      })
    );
    setLocalStorage();
    toast.error("Item removed from the list");
  };

  const editItem = (itemId, item) => {
    setIsEditing(true);
    setEditID(itemId);
    setItemEdited(item);
  };

  const editItemInList = (item) => {
    const itemsList = list.map((listItem) => {
      if (listItem.id === editID) {
        return { ...listItem, item: item };
      } else {
        return listItem;
      }
    });
    setList(itemsList);
    setLocalStorage();
    setIsEditing(false);
    setEditID(null);
    setItemEdited(null);
    toast.success("Item edited in the list");
  };

  const updateStatus = (itemId) => {
    const itemsList = list.map((listItem) => {
      if (listItem.id === itemId) {
        return { ...listItem, completed: !listItem.completed };
      } else {
        return listItem;
      }
    });
    setList(itemsList);
    setLocalStorage();
    toast.success("Item status updated");
  };

  return (
    <section className="section-center">
      <GroceryForm
        isEditing={isEditing}
        itemEdited={itemEdited}
        addItemToList={addItemToList}
        editItemInList={editItemInList}
      />
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            list={list}
            removeItem={removeItem}
            editItem={editItem}
            updateStatus={updateStatus}
          />
          <button className="clear-btn" onClick={clearAllItems}>
            Clear All Items
          </button>
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default App;
