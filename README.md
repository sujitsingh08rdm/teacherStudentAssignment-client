Frontend Setup
Installed necessary dependencies: Tailwind CSS, React Router DOM, React Icons, Redux Toolkit (RTK).
Set up React Router with an initial Login page for testing.
Created a static layout for the Login page with a functional form.

Login Functionality
Integrated Redux Toolkit for state management.
Initially mocked form submission with setTimeout for testing.
Replaced the mock with real API calls using createAsyncThunk.

Backend Setup
Installed required packages for backend development.
Created basic router and controller structure for user login.
Implemented login functionality and tested it using Postman.

Frontend Integration with Backend
Connected frontend login form to backend using Redux Thunks.
Implemented JWT authentication with cookies. Token handling is working correctly.

Teacher Dashboard
Developed static Teacher and Student dashboards with sample data.
Created backend endpoints for teacher-related data.
Implemented Redux async thunks for fetching and managing teacher data on the frontend.
Added functionality to create, read, update, and delete assignments.
Implemented logout functionality.

Student Assignment Module
Backend routes and controllers implemented for fetching and submitting assignments.
Frontend integrated to display assignments for students using async thunks.
Implemented submission restrictions based on due dates.
Students can submit assignments only once, and submissions after the due date are restricted.

Teacher Assignment Review
Created a Teacher Assignment Details page to view student submissions.
Teachers can see student names, answers, and submission dates.

Final Touches
Restructured the logout flow.
Reviewed overall functionality; major features are complete and tested.
Restructured the logout flow.

Reviewed overall functionality; major features are complete and tested.
