import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssignment,
  getAllAssignments,
} from "../../../store/teacher-slice";
import { formatDate } from "../../../utils/formatDate";
import { FaEdit, FaEraser } from "react-icons/fa";
import { useState } from "react";
import Modal from "./TeacherModal";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../../store/auth-slice";
import TeacherModal from "./TeacherModal";

export default function TeacherLayout() {
  const dispatch = useDispatch();
  const { assignmentList } = useSelector((store) => store.teacher);
  const assignments = [
    {
      title: "React Basics",
      description: "Introduction to components, props, and state.",
      dueDate: "2025-10-01",
      status: "Draft",
    },
    {
      title: "API Integration",
      description: "Fetch and display data from a REST API.",
      dueDate: "2025-10-05",
      status: "Draft",
    },
    {
      title: "Redux Project",
      description: "Implement global state management using Redux Toolkit.",
      dueDate: "2025-10-10",
      status: "Draft",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  // console.log(assignmentList);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Draft",
  });
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const navigate = useNavigate();

  function handleAddProduct(e) {
    setShowModal(true);
  }

  function handleDeleteAssignment(getCurrentId) {
    console.log(getCurrentId, "from delete");
    dispatch(deleteAssignment(getCurrentId)).then(() => {
      dispatch(getAllAssignments());
    });
  }

  function handleEditAssignment(getCurrentFormData, getCurrentId) {
    console.log(getCurrentFormData, getCurrentId, "frome dit");
    setCurrentEditedId(getCurrentId);
    setFormData((prev) => ({
      ...prev,
      ...getCurrentFormData,
      dueDate: formatDate(getCurrentFormData.dueDate),
    }));
    setShowModal(true);
  }

  function handleOnClick(getCurrentAssignment) {
    console.log(getCurrentAssignment);
    navigate(`/teacher/assignments/${getCurrentAssignment._id}`, {
      state: getCurrentAssignment,
    });
  }

  useEffect(() => {
    dispatch(getAllAssignments());
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-12 bg-gray-100">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-red-600 mb-2 sm:mb-0">
          tailwebs.
        </h1>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-red-600">
            Home
          </Link>
          <button
            onClick={() => {
              dispatch(logoutUser());
              window.location.href = "/unauth-page";
            }}
            className="text-red-600 hover:text-red-900"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Section */}
      <main className="p-2 md:p-6">
        <section className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header Row (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-5 bg-gray-100 text-gray-700 font-semibold px-6 py-3">
            <div>Title</div>
            <div>Description</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Action</div>
          </div>

          {/* Assignment Rows */}
          <ul>
            {assignmentList.map((assignment, idx) => (
              <li
                onClick={() => handleOnClick(assignment)}
                key={idx}
                className="grid sm:grid-cols-5 items-start sm:items-center px-4 py-4 border-b last:border-none hover:bg-gray-50 cursor-pointer gap-2 sm:gap-0"
              >
                <div className="font-medium">{assignment.title}</div>
                <div className="text-sm text-gray-600 truncate sm:truncate-none">
                  {assignment.description}
                </div>
                <div>{formatDate(assignment.dueDate)}</div>
                <div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      assignment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </div>
                <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
                  {["Draft", "Published"].includes(assignment.status) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAssignment(assignment, assignment._id);
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:cursor-pointer"
                    >
                      <FaEdit size={20} />
                    </button>
                  )}

                  {assignment.status === "Draft" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAssignment(assignment._id);
                      }}
                      className="w-8 h-8 flex items-center justify-center hover:cursor-pointer"
                    >
                      <FaEraser size={20} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Footer Button */}
          <div className="px-4 py-4">
            <button
              onClick={handleAddProduct}
              className="w-full sm:w-auto px-6 py-2 text-white bg-black rounded hover:bg-gray-800"
            >
              Add Assignment
            </button>
          </div>
        </section>
      </main>

      {showModal && (
        <TeacherModal
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          currentEditedId={currentEditedId}
          setCurrentEditedId={setCurrentEditedId}
        />
      )}
    </div>
  );
}
