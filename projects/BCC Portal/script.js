
const students = [
  JhonAnthonyCatamcoPano, EdcelMahusaySancez
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const idNumber = document.getElementById("idNumber").value;
  const enrolledStudents = students.filter((s) => s.id === idNumber);
  if (enrolledStudents.length > 0) {
      const student = enrolledStudents[0];
      document.getElementById("studentName").innerText = student.name;
      document.getElementById("studentCourse").innerText = student.course;
      document.getElementById("studentId").innerText = student.id;
      document.getElementById("page1").style.display = "none";
      document.getElementById("page2").style.display = "block";
      displayEnrolledInfo(enrolledStudents);
  } else {
      alert("Invalid ID Number");
  }
});

function viewGrades(id, semester, sy) {
  const student = students.find((s) => s.id === id);
  document.getElementById("page2").style.display = "none";
  document.getElementById("page3").style.display = "block";
  displayGradeInfo(student, semester, sy);
}

function displayEnrolledInfo(enrolledStudents) {
  const enrolledInfo = document.getElementById("enrolledInfo");
  enrolledInfo.innerHTML =
      `
<div class="col-12">
<div class="table-responsive">
  <div class="row">
      <div class="col-3"><strong>School Year</strong></div>
      <div class="col-3"><strong>Semester</strong></div>
      <div class="col-3"><strong>Status</strong></div>
      <div class="col-3"><strong>Action</strong></div>
  </div>
</div>
</div>
` +
      enrolledStudents.map((student) =>
          student.sy
              .map((sy) =>
                  sy.semesters
                      .map(
                          (semester) => `
<div class="row">
  <div class="col-3">${sy.year}</div>
  <div class="col-3">${semester.semester}</div>
  <div class="col-3">${semester.status}</div>
  <div class="col-3"><button class="btn btn-info" onclick="viewGrades('${student.id}', ${semester.semester}, '${sy.year}')">View Grades</button></div>
</div>`
                      )
                      .join("")
              )
              .join("")
      );
}

function displayGradeInfo(student, semester, sy) {
  const gradeInfo = document.getElementById("gradeInfo");
  const currentSemester = student.sy
      .find((s) => s.year === sy)
      .semesters.find((s) => s.semester === semester);
  const subjectsHtml = currentSemester.subjects
      .map(
          (sub) => `
<div class="row">
<div class="col-2">${sub.subject}</div>
<div class="col-4">${sub.description}</div>
<div class="col-2">${sub.midterm !== undefined ? sub.midterm : "N/A"
              }</div>
<div class="col-2">${sub.final !== undefined ? sub.final : "N/A"}</div>
<div class="col-2 ${getStatus(sub.midterm, sub.final)}">${getStatusText(
                  sub.midterm,
                  sub.final
              )}</div>
</div>
`
      )
      .join("");
  gradeInfo.innerHTML = `
<div class="col-12">
<p style="font-weight: bold;">School Year: ${sy}</p>
<p style="font-weight: bold;">Semester: ${semester}</p>
<h4>Subjects</h4>
<div class="row">
  <div class="col-2"><strong>Subject</strong></div>
  <div class="col-4"><strong>Description</strong></div>
  <div class="col-2"><strong>Midterm Grade</strong></div>
  <div class="col-2"><strong>Final Grade</strong></div>
  <div class="col-2"><strong>Status</strong></div>
</div>
${subjectsHtml}
</div>
`;
}

function getStatus(midterm, final) {
  if (midterm === undefined || final === undefined) return "incomplete";
  return (midterm + final) / 2 > 3.0 ? "failed" : "passed";
}

function getStatusText(midterm, final) {
  if (midterm === undefined || final === undefined) return "Incomplete";
  return (midterm + final) / 2 > 3.0 ? "Failed" : "Passed";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "block";
});

document.getElementById("backBtn").addEventListener("click", function () {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page2").style.display = "block";
});
