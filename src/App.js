import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function getListFromLocalStorage() {
  const itemList = localStorage.getItem("list");
  if (itemList) {
    return JSON.parse(itemList);
  } else {
    return [];
  }
}

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(getListFromLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function showAlert(show = false, msg = "", type = "") {
    setAlert({ show, msg, type });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (item === "") {
      showAlert(true, "Please enter the item", "danger");
    } else {
      if (isEditing) {
        setList(
          list.map((listItem) => {
            if (listItem.id === editID) {
              return { ...listItem, item: item };
            } else {
              return listItem;
            }
          })
        );
        setItem("");
        setIsEditing(false);
        setEditID(null);
        showAlert(true, "Item edited in the list", "success");
      } else {
        const newItem = { id: new Date().getTime().toString(), item: item };
        setList([...list, newItem]);
        setItem("");
        showAlert(true, "Item added to the list", "success");
      }
    }
  }

  function clearAllItems() {
    setList([]);
    showAlert(true, "All items removed from the list", "danger");
  }

  function removeItem(id) {
    setList(
      list.filter((listItem) => {
        return listItem.id !== id;
      })
    );
    showAlert(true, "Item removed from the list", "danger");
  }

  function editItem(id) {
    const itemSelected = list.find((listItem) => {
      return listItem.id === id;
    });
    setIsEditing(true);
    setEditID(id);
    setItem(itemSelected.item);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. Eggs"
            name="item"
            value={item}
            onChange={(event) => {
              setItem(event.target.value);
            }}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearAllItems}>
            Clear All Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
