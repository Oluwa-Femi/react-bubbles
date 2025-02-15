import React, { useState, useEffect } from "react";
import axiosWithAuth from "../Utilities/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    let activeColor = colors.filter(color => color.id === colorToEdit.id)
    console.log(activeColor[0])

    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${activeColor[0].id}`, colorToEdit)
      .then(res => {

        console.log(res)

        colors = colors.filter(color => color.id !== res.data.id)
        updateColors([...colors, res.data])

        // updateColors(colors.map(color => {
        //   if (color.id === colorToEdit.id){
        //     color = res.data
        //   }
        // }))

        setEditing(false)
      })
      .catch(err => console.log(err))
    //console.log(colorList)
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    //updateColors(colors.filter(color => color.id === color.id))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                X
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
            <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
            <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit" onClick={(event) => addColor(event, colorToAdd)}>save</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </div>
      </form> */}
    </div>
  );
};

export default ColorList;
