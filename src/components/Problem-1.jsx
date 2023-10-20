import React, { useState } from "react";
import data from "../assets/data/DataInfo.json";

const Problem1 = () => {
//   console.log("data", data);

  const [show, setShow] = useState("all");

  const [allData, setAllData] = useState(data);
  const [activeData, setActiveData] = useState("");
  const [completedData, setCompletedData] = useState("");
  const [newName, setNewName] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleNewDataSubmit = (e) => {
    e.preventDefault();

    const newDataItem = { name: newName, status: newStatus };

    if (newStatus === "active") {
      setActiveData([...activeData, newDataItem]);
    } else if (newStatus === "completed") {
      setCompletedData([...completedData, newDataItem]);
    }

    setAllData([...allData, newDataItem]);

    setNewName("");
    setNewStatus("");
  };

//   console.log("all data", allData);

  const handleClick = (val) => {
    setShow(val);

    if (val == "all") {
      console.log("show status", val);
    } else if (val == "active") {
      console.log("show status", val);

      const filteredData = allData.filter((item) => item.status === "active");
      setActiveData(filteredData);
    } else if (val == "completed") {
      console.log("show status", val);

      const filteredData = allData.filter(
        (item) => item.status === "completed"
      );
      setCompletedData(filteredData);
    }
  };

  const sortData = (a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;
    if (a.status === "completed" && b.status !== "completed") return -1;
    if (a.status !== "completed" && b.status === "completed") return 1;
    return 0;
  };

  // console.log("checck data", completedData)
  const displayData =
    show === "active"
      ? activeData
      : show === "completed"
      ? completedData
      : allData.slice().sort(sortData);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNewDataSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
