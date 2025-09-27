import React from "react";
import { logoutUser } from "../../../store/auth-slice";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAssigmentForStudent } from "../../../store/assignment-slice";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";
import StudentModal from "./StudentModal";

export default function StudentLayout() {
  const dispatch = useDispatch();
  const { assignmentList } = useSelector((store) => store.assignment);
  const { user } = useSelector((store) => store.auth);
  const [assignmentUpdate, setAssignmentUpdate] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleOnClick = (assignment) => {
    setAssignmentUpdate(true);
    setSelectedAssignment(assignment);
  };

  useEffect(() => {
    dispatch(getAssigmentForStudent());
  }, [assignmentUpdate, dispatch]);

  return (
    <div className="min-h-screen p-12 bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-red-600">tailwebs.</h1>
        <nav className="flex gap-6 text-sm font-medium">
          <a href="/" className="hover:text-red-600">
            Home
          </a>
          <button
            to="/unauth-page"
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
      <main className="p-6">
        <section className="bg-white shadow rounded-lg p-6">
          {/* Student Info */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Assignments for {user.username}
          </h2>
          {/* Assignments List */}
          <ul className="space-y-3">
            {assignmentList
              .filter((assignment) => assignment.status !== "Draft") // hide Draft
              .map((assignment, idx) => {
                const studentHasSubmitted = assignment?.submissions?.some(
                  (sub) => sub.student && sub.student.toString() === user.id
                );

                const dueDatePassed = new Date(assignment.dueDate) < new Date();

                const isDisabled =
                  assignment.status === "Completed" ||
                  studentHasSubmitted ||
                  dueDatePassed;

                let statusLabel = "";
                if (studentHasSubmitted) {
                  statusLabel = "Completed";
                } else if (dueDatePassed) {
                  statusLabel = "Not Completed";
                } else if (assignment.status === "Published") {
                  statusLabel = "Published";
                } else if (assignment.status === "Completed") {
                  statusLabel = "Not Completed";
                }

                return (
                  <li
                    key={idx}
                    className={`flex justify-between items-center px-4 py-3 border rounded-lg 
          ${
            isDisabled
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-50 hover:cursor-pointer"
          }`}
                    onClick={() => {
                      if (!isDisabled && assignment.status === "Published") {
                        handleOnClick(assignment);
                      }
                    }}
                  >
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-gray-600">
                        {assignment.description}
                      </p>
                      <p
                        className={`text-sm ${
                          dueDatePassed ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        Due: {formatDate(assignment.dueDate)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        statusLabel === "Published"
                          ? "bg-yellow-100 text-yellow-700"
                          : statusLabel === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700" // Not Completed
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </li>
                );
              })}
          </ul>
        </section>
      </main>

      {assignmentUpdate && (
        <StudentModal
          formData={selectedAssignment}
          setAssignmentUpdate={setAssignmentUpdate}
        />
      )}
    </div>
  );
}
