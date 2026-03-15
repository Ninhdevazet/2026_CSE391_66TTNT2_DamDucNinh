let students = [];
let currentId = 0;
let sortDirection = "";

const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortScoreBtn = document.getElementById("sortScoreBtn");
const sortArrow = document.getElementById("sortArrow");

const studentTableBody = document.getElementById("studentTableBody");
const totalStudentsDisplay = document.getElementById("totalStudents");
const averageScoreDisplay = document.getElementById("averageScore");

addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addStudent();
});

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

sortScoreBtn.addEventListener("click", function () {
  if (sortDirection === "" || sortDirection === "desc") {
    sortDirection = "asc";
    sortArrow.textContent = "▲";
  } else {
    sortDirection = "desc";
    sortArrow.textContent = "▼";
  }
  applyFilters();
});

studentTableBody.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const idToDelete = parseInt(event.target.getAttribute("data-id"));
    students = students.filter((student) => student.id !== idToDelete);
    applyFilters();
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
  if (score >= 8.5) rank = "Giỏi";
  else if (score >= 7.0) rank = "Khá";
  else if (score >= 5.0) rank = "Trung bình";

  students.push({ id: currentId++, name, score, rank });

  nameInput.value = "";
  scoreInput.value = "";
  nameInput.focus();

  applyFilters();
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const rankFilter = filterSelect.value;

  let filteredStudents = students.filter((student) => {
    const matchName = student.name.toLowerCase().includes(keyword);
    const matchRank = rankFilter === "Tất cả" || student.rank === rankFilter;
    return matchName && matchRank;
  });

  if (sortDirection === "asc") {
    filteredStudents.sort((a, b) => a.score - b.score);
  } else if (sortDirection === "desc") {
    filteredStudents.sort((a, b) => b.score - a.score);
  }

  renderTable(filteredStudents);
}

function renderTable(dataToRender) {
  studentTableBody.innerHTML = "";
  let totalScore = 0;

  if (dataToRender.length === 0) {
    studentTableBody.innerHTML =
      '<tr><td colspan="5">Không có kết quả</td></tr>';
    totalStudentsDisplay.textContent = "0";
    averageScoreDisplay.textContent = "0.00";
    return;
  }

  dataToRender.forEach((student, index) => {
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
            <td><button data-id="${student.id}">Xóa</button></td>
        `;

    studentTableBody.appendChild(tr);
  });

  totalStudentsDisplay.textContent = dataToRender.length;
  averageScoreDisplay.textContent = (totalScore / dataToRender.length).toFixed(
    2,
  );
}
