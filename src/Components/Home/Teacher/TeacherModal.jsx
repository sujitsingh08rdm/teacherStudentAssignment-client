import React from "react";
import { useDispatch } from "react-redux";
import {
  createAssignment,
  getAllAssignments,
  updateAssignment,
} from "../../../store/teacher-slice";

export default function TeacherModal({
  setShowModal,
  formData,
  setFormData,
  currentEditedId,
  setCurrentEditedId,
}) {
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    {
      currentEditedId
        ? dispatch(updateAssignment({ id: currentEditedId, formData })).then(
            (data) => {
              console.log("Edit block is called", data);
              dispatch(getAllAssignments());
              setFormData({
                title: "",
                description: "",
                dueDate: "",
                status: "Draft",
              });
              setShowModal(false);
              setCurrentEditedId(null);
            }
          )
        : dispatch(createAssignment(formData)).then((data) => {
            console.log("add block is called", data);
            dispatch(getAllAssignments());
            setFormData({
              title: "",
              description: "",
              dueDate: "",
              status: "Draft",
            });
            setShowModal(false);
          });
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="dueDate"
            value={
              formData.dueDate
                ? new Date(formData.dueDate).toISOString().split("T")[0] // ensures YYYY-MM-DD
                : ""
            }
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
