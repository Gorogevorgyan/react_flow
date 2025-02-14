import React, { useState } from 'react';

const NodeEditModal = ({ node, onSave, onClose }) => {
  const [name, setName] = useState(node.name);
  const [type, setType] = useState(node.type);

  const handleSave = () => {
    onSave({ ...node, name, type });
    onClose();
  };

  return (
    <div>
      <h2>Edit Node</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={type} onChange={(e) => setType(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default NodeEditModal;