
import React, { useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { getAssignmentForTeacher } from "../../store/assignment-slice";
import { logoutUser } from "../../store/auth-slice";

export default function Assignment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: getCurrentAssignment } = useLocation();
  const { submissions } = useSelector((store) => store.assignment);

  console.log(getCurrentAssignment);

  useEffect(() => {
    dispatch(getAssignmentForTeacher(id));
  }, [id, dispatch]);

  return (
    <div className="min-h-screen p-4 md:p-12 bg-gray-100">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 bg-white shadow">
        <h1
          onClick={() => navigate("/teacher")}
          className="text-xl font-bold text-red-600 hover:cursor-pointer mb-2 sm:mb-0"
        >
          tailwebs.
        </h1>
        <nav className="flex gap-4 sm:gap-6 text-sm font-medium">
          <Link to="/teacher" className="hover:text-red-600">
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
          {/* Assignment Info */}
          <div className="px-4 sm:px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold">
              {getCurrentAssignment?.title || "Assignment Detail"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {getCurrentAssignment?.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2 text-sm text-gray-500">
              <span>
                Due:{" "}
                {getCurrentAssignment?.dueDate
                  ? formatDate(getCurrentAssignment.dueDate)
                  : "-"}
              </span>
              <span>
                Status:{" "}
                <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  {getCurrentAssignment?.status}
                </span>
              </span>
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-4 bg-gray-100 text-gray-700 font-semibold px-6 py-3">
            <div>Student Name</div>
            <div>Answer</div>
            <div>Submitted At</div>
            <div>Status</div>
          </div>

          {/* Table Rows / Cards */}
          <ul>
            {submissions.length > 0 ? (
              submissions.map((sub, idx) => (
                <li
                  key={idx}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <div className="grid sm:grid-cols-4 items-start sm:items-center px-4 sm:px-6 py-4 gap-2 sm:gap-0">
                    <div className="font-medium">
                      {sub?.student?.username || "Unknown"}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {sub.answerText}
                    </div>
                    <div>{formatDate(sub.submittedAt)}</div>
                    <div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          sub.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>

                  <div className="sm:hidden flex flex-col gap-1 text-sm text-gray-600 px-2 py-2">
                    <div>
                      <strong>Student:</strong>{" "}
                      {sub?.student?.username || "Unknown"}
                    </div>
                    <div>
                      <strong>Answer:</strong> {sub.answerText}
                    </div>
                    <div>
                      <strong>Submitted At:</strong>{" "}
                      {formatDate(sub.submittedAt)}
                    </div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          sub.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                No submissions yet.
              </li>
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}
