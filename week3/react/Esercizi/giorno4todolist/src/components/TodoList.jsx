function TodoList({ items, onDelete }) {
  return (
    <ul style={{ padding: 0 }}>
      {items.map((item) => (
        <li
          key={item.id}
          style={{
            listStyle: "none",
            marginBottom: 8,
            padding: "10px 12px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>{item.text}</span>
          <button onClick={() => onDelete(item.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
