let students = [];

const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");
const studentTableBody = document.getElementById("studentTableBody");
const totalStudentsDisplay = document.getElementById("totalStudents");
const averageScoreDisplay = document.getElementById("averageScore");

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addStudent();
  }
});

studentTableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const index = event.target.getAttribute("data-index");
    students.splice(index, 1);
    renderTable();
  }
});

function addStudent() {
  const name = nameInput.value.trim();
  const score = parseFloat(scoreInput.value);

  if (name === "" || isNaN(score) || score < 0 || score > 10) {
    alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
    return;
  }

  let rank = "Yếu";
  if (score >= 8.5) {
    rank = "Giỏi";
  } else if (score >= 7.0) {
    rank = "Khá";
  } else if (score >= 5.0) {
    rank = "Trung bình";
  }

  students.push({ name, score, rank });

  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();

  renderTable();
}

function renderTable() {
  studentTableBody.innerHTML = "";
  let totalScore = 0;

  students.forEach((student, index) => {
    totalScore += student.score;

    const tr = document.createElement("tr");

    if (student.score < 5.0) {
      tr.classList.add("row-weak");
    }

    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.rank}</td>
            <td><button data-index="${index}">Xóa</button></td>
        `;

    studentTableBody.appendChild(tr);
  });

  totalStudentsDisplay.textContent = students.length;
  if (students.length > 0) {
    averageScoreDisplay.textContent = (totalScore / students.length).toFixed(2);
  } else {
    averageScoreDisplay.textContent = "0.00";
  }
}
