import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

const GroceryForm = (props) => {
  const { isEditing, itemEdited, addItemToList, editItemInList } = props;
  const [item, setItem] = useState("");

  useEffect(() => {
    if (isEditing) {
      setItem(itemEdited);
    }
  }, [isEditing, itemEdited]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (item === "") {
      toast.error("Please enter the item");
    } else {
      if (isEditing) {
        editItemInList(item);
        setItem("");
      } else {
        const newItem = { id: nanoid(), item: item, completed: false };
        addItemToList(newItem);
        setItem("");
      }
    }
  };

  return (
    <form className="grocery-form" onSubmit={handleSubmit}>
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
          {isEditing ? "Edit Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
};
export default GroceryForm;
