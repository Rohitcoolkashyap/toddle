import React, { useState } from "react";
import "./FileExplorer.css";
export default function FileExplorer({
  explorer,
  handleInsertNode = () => {},
  handleDeleteNode = () => {},
}) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });
  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };
  const handleDeleteFolder = (e, folderId) => {
    e.stopPropagation();
    handleDeleteNode(folderId);
  };
  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            <button onClick={(e) => handleDeleteFolder(e, explorer.id)}>
              Del -
            </button>
          </div>
        </div>
        <div
          style={{
            display: expand ? "flex" : "none",
            paddingLeft: 25,
            width: 170,
          }}
          className="folder-container"
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <FileExplorer
                explorer={exp}
                key={exp.id}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}
