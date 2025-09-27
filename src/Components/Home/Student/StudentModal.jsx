import React from "react";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssigmentForStudent,
  submitAssignment,
} from "../../../store/assignment-slice";

export default function StudentModal({ formData, setAssignmentUpdate }) {
  const [answerText, setAnswerText] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  console.log(user, "from student modal");

  function handleSubmit(e) {
    e.preventDefault();

    const submissionData = {
      studentId: user.id, // from auth slice
      answerText,
    };

    dispatch(
      submitAssignment({
        assignmentId: formData._id,
        submission: submissionData,
      })
    )
      .then(() => {
        dispatch(getAssigmentForStudent());
        setAssignmentUpdate(false);
      })
      .catch((err) => {
        console.error("Submission failed:", err);
      });
  }

  console.log(formData, "from modal");

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>

        <div className="mb-4">
          <p className="font-medium">{formData.title}</p>
          <p className="text-sm text-gray-600">{formData.description}</p>
          <p className="text-sm text-gray-500">
            Due: {formatDate(formData.dueDate)}
          </p>
        </div>

        {/* Student Submission */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="answerText"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer here..."
            required
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setAssignmentUpdate(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
