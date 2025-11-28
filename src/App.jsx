import { useReducer } from "react";

const initialState = [
  { id: 1, name: "Varun", status: "Unknown" },
  { id: 2, name: "Rishith", status: "Unknown" }
];

function reducer(state, action) {
  switch (action.type) {
    case "MARK_PRESENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Present" } : s
      );

    case "MARK_ABSENT":
      return state.map(s =>
        s.id === action.id ? { ...s, status: "Absent" } : s
      );

    case "RESET":
      return state.map(s => ({ ...s, status: "Unknown" }));

    default:
      return state;
  }
}

export default function App() {
  const [students, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Attendance Tracker</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.status}</td>
              <td>
                <button
                  onClick={() =>
                    dispatch({ type: "MARK_PRESENT", id: student.id })
                  }
                >
                  Present
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "MARK_ABSENT", id: student.id })
                  }
                  style={{ marginLeft: "10px" }}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        style={{ marginTop: "20px" }}
      >
        Reset All
      </button>
    </div>
  );
}
