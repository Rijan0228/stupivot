"use strict";

const $ = (selector, parent = document) =>
parent.querySelector(selector);

const $$ = (selector, parent = document) =>
[...parent.querySelectorAll(selector)];

const toolModal = $("#toolModal");
const articleModal = $("#articleModal");
const legalModal = $("#legalModal");
const modalContent = $("#modalContent");
const articleContent = $("#articleContent");
const legalContent = $("#legalContent");
const toast = $("#toast");

if ($("#year")) {
$("#year").textContent = new Date().getFullYear();
}

/* =========================================================
TOAST
========================================================= */

let toastTimer;

function showToast(message, type = "normal") {
if (!toast) return;

toast.textContent = message;
toast.className = "toast show";

if (type === "error") {
toast.classList.add("toast-error");
}

clearTimeout(toastTimer);

toastTimer = setTimeout(() => {
toast.classList.remove("show");
}, 3500);
}

/* =========================================================
MODALS
========================================================= */

function openModal(modal) {
if (!modal) return;
modal.classList.add("active");
modal.setAttribute("aria-hidden", "false");
document.body.classList.add("modal-open");
}

function closeModal(modal) {
if (!modal) return;
modal.classList.remove("active");
modal.setAttribute("aria-hidden", "true");
document.body.classList.remove("modal-open");
}

$("#modalClose")?.addEventListener("click", () => {
closeModal(toolModal);
});

$("#articleClose")?.addEventListener("click", () => {
closeModal(articleModal);
});

$("#legalClose")?.addEventListener("click", () => {
closeModal(legalModal);
});

$$(".modal").forEach(modal => {
const overlay = $(".modal-overlay", modal);

overlay?.addEventListener("click", () => {
closeModal(modal);
});
});

document.addEventListener("keydown", event => {
if (event.key !== "Escape") return;

closeModal(toolModal);
closeModal(articleModal);
closeModal(legalModal);
});

/* =========================================================
MOBILE MENU
========================================================= */

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

menuBtn?.addEventListener("click", () => {
navLinks?.classList.toggle("active");
menuBtn.classList.toggle("active");
});

$$(".nav-links a").forEach(link => {

link.addEventListener("click", () => {

navLinks?.classList.remove("active");
menuBtn?.classList.remove("active");

});

});

/* =========================================================
QUICK ACCESS
========================================================= */

$$(".quick-card").forEach(button => {

button.addEventListener("click", () => {

const target = button.dataset.scroll;

document
.getElementById(target)
?.scrollIntoView({
behavior:"smooth"
});

});

});

/* =========================================================
THEME
========================================================= */

const themeToggle = $("#themeToggle");

const savedTheme =
localStorage.getItem("stupivot-theme");

if (savedTheme === "light") {
document.body.classList.add("light-mode");
}

themeToggle?.addEventListener("click", () => {

document.body.classList.toggle("light-mode");

const isLight =
document.body.classList.contains("light-mode");

localStorage.setItem(
"stupivot-theme",
isLight ? "light" : "dark"
);

});

/* =========================================================
SEARCH OPEN
========================================================= */

$("#searchOpen")?.addEventListener("click", () => {

document
.getElementById("search")
?.scrollIntoView({
behavior:"smooth"
});

setTimeout(() => {
$("#siteSearch")?.focus();
}, 500);

});

/* =========================================================
NUMBERS
========================================================= */

function getNumber(value, label = "Value") {

const clean = String(value).trim();

if (clean === "") {
throw new Error(`${label} is required.`);
}

if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(clean)) {
throw new Error(`${label} must contain numbers only.`);
}

const number = Number(clean);

if (!Number.isFinite(number)) {
throw new Error(`${label} is invalid.`);
}

return number;
}

function numberInput(
id,
label,
value = "",
placeholder = ""
) {

return `
<div class="form-group">

<label for="${id}">
${label}
</label>

<input
id="${id}"
type="text"
inputmode="decimal"
autocomplete="off"
value="${value}"
placeholder="${placeholder}">

</div>
`;
}

function showToolError(message) {

const error = $("#toolError");

if (!error) return;

error.textContent = message;
error.classList.add("visible");
}

function clearToolError() {

const error = $("#toolError");

if (!error) return;

error.textContent = "";
error.classList.remove("visible");
}

function toolShell(title, subtitle, body) {

return `
<div class="tool-interface">

<div class="tool-interface-header">

<span class="section-label">
STUPIVOT TOOL
</span>

<h2>${title}</h2>

<p>${subtitle}</p>

</div>

${body}

<div
id="toolError"
class="tool-error"
role="alert">
</div>

<div
id="toolResult"
class="tool-result">
</div>

</div>
`;
}

/* =========================================================
OPEN TOOLS
========================================================= */

$$(".open-tool").forEach(button => {

button.addEventListener("click", () => {

openTool(button.dataset.tool);

});

});

function openTool(tool) {

let html = "";

switch (tool) {

case "gpa":
html = gpaTool();
break;

case "cgpa":
html = cgpaTool();
break;

case "percentage":
html = percentageTool();
break;

case "grade":
html = gradeTool();
break;

case "attendance":
html = attendanceTool();
break;

case "age":
html = ageTool();
break;

case "date":
html = dateDifferenceTool();
break;

case "unit":
html = unitTool();
break;

case "bs-ad":
html = bsAdTool();
break;

case "simple-interest":
html = simpleInterestTool();
break;

case "compound-interest":
html = compoundInterestTool();
break;

case "discount":
html = discountTool();
break;

case "profit":
html = profitLossTool();
break;

case "word-counter":
html = wordCounterTool();
break;

case "case-converter":
html = caseConverterTool();
break;

case "text-cleaner":
html = textCleanerTool();
break;

case "qr":
html = qrTool();
break;

case "password":
html = passwordTool();
break;

case "random":
html = randomTool();
break;

default:
html = toolShell(
"Tool unavailable",
"This tool has not been configured yet.",
""
);

}

modalContent.innerHTML = html;

openModal(toolModal);

initializeTool(tool);

}

/* =========================================================
INITIALIZE
========================================================= */

function initializeTool(tool) {

switch (tool) {

case "gpa":
initializeGPATool();
break;

case "cgpa":
initializeCGPATool();
break;

case "percentage":
initializePercentageTool();
break;

case "grade":
initializeGradeTool();
break;

case "attendance":
initializeAttendanceTool();
break;

case "age":
initializeAgeTool();
break;

case "date":
initializeDateTool();
break;

case "unit":
initializeUnitTool();
break;

case "bs-ad":
initializeBSADTool();
break;

case "simple-interest":
initializeSimpleInterestTool();
break;

case "compound-interest":
initializeCompoundInterestTool();
break;

case "discount":
initializeDiscountTool();
break;

case "profit":
initializeProfitTool();
break;

case "word-counter":
initializeWordCounter();
break;

case "case-converter":
initializeCaseConverter();
break;

case "text-cleaner":
initializeTextCleaner();
break;

case "qr":
initializeQR();
break;

case "password":
initializePassword();
break;

case "random":
initializeRandom();
break;

}

}

/* =========================================================
GRADE SCALE
========================================================= */

const GRADE_SCALE = [

{
min:90,
max:100,
grade:"A+",
point:4.0
},

{
min:80,
max:89.999999,
grade:"A",
point:3.6
},

{
min:70,
max:79.999999,
grade:"B+",
point:3.2
},

{
min:60,
max:69.999999,
grade:"B",
point:2.8
},

{
min:50,
max:59.999999,
grade:"C+",
point:2.4
},

{
min:40,
max:49.999999,
grade:"C",
point:2.0
},

{
min:35,
max:39.999999,
grade:"D",
point:1.6
},

{
min:0,
max:34.999999,
grade:"NG",
point:0
}

];

function getGradeFromPercentage(percent) {

return GRADE_SCALE.find(item =>
percent >= item.min &&
percent <= item.max
) || GRADE_SCALE[GRADE_SCALE.length - 1];

}

/* =========================================================
GPA
========================================================= */

function gpaTool() {

return toolShell(
"NEB GPA Calculator",
"Choose your class first. Then enter your subjects and marks.",
`
<div class="calculator-step">

<div class="form-group">

<label for="gpaClass">
Select Class
</label>

<select id="gpaClass">

<option value="">
Choose Class
</option>

<option value="10">
Class 10
</option>

<option value="11">
Class 11
</option>

<option value="12">
Class 12
</option>

</select>

</div>

</div>

<div id="gpaDynamicArea"></div>
`
);

}

function initializeGPATool() {

const classSelect = $("#gpaClass");

classSelect?.addEventListener("change", () => {

const selected = classSelect.value;
const area = $("#gpaDynamicArea");

if (!area) return;

if (!selected) {
area.innerHTML = "";
return;
}

if (selected === "10") {
renderClass10GPA(area);
} else {
renderClass11_12GPA(
area,
selected
);
}

});

}

/* =========================================================
CLASS 10 GPA
========================================================= */

function renderClass10GPA(area) {

const subjects = [
"Compulsory Subject 1",
"Compulsory Subject 2",
"Compulsory Subject 3",
"Compulsory Subject 4",
"Compulsory Subject 5",
"Optional Subject 1",
"Optional Subject 2"
];

area.innerHTML = `

<div class="calculator-info">
Class 10: enter the subject names and marks
for all 7 subjects.
</div>

<div class="subject-list">

${subjects.map((subject,index) => `

<div class="subject-row">

<div class="subject-number">
${index + 1}
</div>

<div class="subject-fields">

<input
type="text"
id="class10Name${index}"
placeholder="${subject} name">

<input
type="text"
inputmode="decimal"
id="class10Marks${index}"
placeholder="Marks / 100"
min="0"
max="100">

</div>

</div>

`).join("")}

</div>

<button
type="button"
class="primary-button calculate-button"
id="calculateClass10GPA">
Calculate GPA
</button>
`;

$("#calculateClass10GPA")
?.addEventListener("click", () => {

try {

clearToolError();

const results = [];

for (let i = 0; i < 7; i++) {

const name =
$(`#class10Name${i}`).value.trim();

if (!name) {

throw new Error(
`Please enter the name of subject ${i + 1}.`
);

}

const marks =
getNumber(
$(`#class10Marks${i}`).value,
`${name} marks`
);

if (marks < 0 || marks > 100) {

throw new Error(
`${name} marks must be between 0 and 100.`
);

}

const grade =
getGradeFromPercentage(marks);

results.push({
name,
marks,
grade:grade.grade,
point:grade.point
});

}

const totalPoints =
results.reduce(
(sum,item) => sum + item.point,
0
);

const gpa =
totalPoints / results.length;

renderGPAResult(
results,
gpa,
"Class 10"
);

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
FACULTIES
========================================================= */

const NEB_FACULTIES = {

science:{
name:"Science",
subjects:[
"Physics",
"Chemistry",
"Biology",
"Mathematics",
"Computer Science"
]
},

management:{
name:"Management",
subjects:[
"Accounting",
"Economics",
"Business Studies",
"Computer Science",
"Mathematics"
]
},

humanities:{
name:"Humanities",
subjects:[
"Sociology",
"Rural Development",
"Mass Communication",
"Psychology",
"Economics"
]
},

education:{
name:"Education",
subjects:[
"Education",
"Nepali",
"English",
"Economics",
"Computer Science"
]
},

law:{
name:"Law",
subjects:[
"Legal Studies",
"English",
"Nepali",
"Social Studies",
"Economics"
]
}

};

const COMMON_NEB_SUBJECTS = [
"Nepali",
"English",
"Social Studies & Life Skills",
"Mathematics"
];

function renderClass11_12GPA(area,selectedClass) {

area.innerHTML = `

<div class="calculator-info">

<strong>
Class ${selectedClass}
</strong>

<p>
Select your faculty/stream. You can edit
the subject names yourself below.
</p>

</div>

<div class="form-group">

<label for="gpaFaculty">
Faculty / Stream
</label>

<select id="gpaFaculty">

<option value="">
Select Faculty
</option>

${Object.entries(NEB_FACULTIES)
.map(([key,faculty]) => `
<option value="${key}">
${faculty.name}
</option>
`)
.join("")}

</select>

</div>

<div id="facultySubjects"></div>

`;

$("#gpaFaculty")
?.addEventListener("change",event => {

const faculty =
NEB_FACULTIES[event.target.value];

if (!faculty) {

$("#facultySubjects").innerHTML = "";
return;

}

renderFacultySubjects(
selectedClass,
faculty
);

});

}

function renderFacultySubjects(
selectedClass,
faculty
) {

const area =
$("#facultySubjects");

if (!area) return;

const subjects = [
...COMMON_NEB_SUBJECTS.slice(0,3),
...faculty.subjects.slice(0,3)
];

area.innerHTML = `

<div class="calculator-info">

<p>
Enter the marks for each subject.
The calculator uses each subject's final
percentage to obtain its grade point.
</p>

<p>
For a subject with theory/internal components,
enter the final combined mark obtained out of 100.
</p>

</div>

<div class="subject-list">

${subjects.map((subject,index) => `

<div class="subject-row">

<div class="subject-number">
${index + 1}
</div>

<div class="subject-fields">

<input
type="text"
id="nebName${index}"
value="${subject}"
placeholder="Subject name">

<input
type="text"
inputmode="decimal"
id="nebMarks${index}"
placeholder="Final marks / 100">

</div>

</div>

`).join("")}

</div>

<button
type="button"
class="primary-button calculate-button"
id="calculateNEBGPA">
Calculate Class ${selectedClass} GPA
</button>

`;

$("#calculateNEBGPA")
?.addEventListener("click",() => {

try {

clearToolError();

const results = [];

for (let i = 0; i < subjects.length; i++) {

const name =
$(`#nebName${i}`).value.trim();

if (!name) {

throw new Error(
`Please enter subject ${i + 1}.`
);

}

const marks =
getNumber(
$(`#nebMarks${i}`).value,
`${name} marks`
);

if (marks < 0 || marks > 100) {

throw new Error(
`${name} marks must be between 0 and 100.`
);

}

const grade =
getGradeFromPercentage(marks);

results.push({
name,
marks,
grade:grade.grade,
point:grade.point
});

}

const gpa =
results.reduce(
(sum,item) => sum + item.point,
0
) / results.length;

renderGPAResult(
results,
gpa,
`Class ${selectedClass}`
);

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
GPA RESULT
========================================================= */

function renderGPAResult(
results,
gpa,
className
) {

const result =
$("#toolResult");

if (!result) return;

result.innerHTML = `

<div class="result-header">

<span>GPA RESULT</span>

<strong>
${gpa.toFixed(2)}
</strong>

<small>
${className}
</small>

</div>

<div class="result-table">

${results.map(item => `

<div class="result-row">

<span>
${escapeHTML(item.name)}
</span>

<span>
${item.marks}
</span>

<span>
${item.grade}
</span>

<span>
${item.point.toFixed(1)}
</span>

</div>

`).join("")}

</div>

<div class="calculator-note">

GPA =
Σ Grade Points ÷ Number of Subjects

<br><br>

For credit-weighted GPA/CGPA, use the
CGPA calculator and enter the relevant credit hours.

</div>
`;

}

/* =========================================================
CGPA
========================================================= */

function cgpaTool() {

return toolShell(
"CGPA Calculator",
"Use equal credits or enter credit hours for a weighted calculation.",
`

<div class="form-group">

<label for="cgpaMode">
Calculation Method
</label>

<select id="cgpaMode">

<option value="equal">
Equal-credit average
</option>

<option value="weighted">
Credit-weighted CGPA
</option>

</select>

</div>

<div class="form-group">

<label for="cgpaCount">
Number of subjects / semesters
</label>

<input
type="text"
inputmode="numeric"
id="cgpaCount"
placeholder="Example: 6">

</div>

<div id="cgpaRows"></div>

<button
type="button"
class="secondary-button"
id="createCGPARows">
Create Fields
</button>

<button
type="button"
class="primary-button calculate-button"
id="calculateCGPA">
Calculate CGPA
</button>

`
);

}

function initializeCGPATool() {

let rowsCreated = false;

$("#createCGPARows")
?.addEventListener("click",() => {

try {

const count =
getNumber(
$("#cgpaCount").value,
"Number of subjects"
);

if (
!Number.isInteger(count) ||
count < 1 ||
count > 30
) {

throw new Error(
"Enter a whole number from 1 to 30."
);

}

renderCGPARows(count);
rowsCreated = true;

} catch (error) {

showToolError(error.message);

}

});

$("#calculateCGPA")
?.addEventListener("click",() => {

try {

clearToolError();

if (!rowsCreated) {

throw new Error(
"Create the fields first."
);

}

const mode =
$("#cgpaMode").value;

const rows =
$$(".cgpa-row");

let numerator = 0;
let denominator = 0;

rows.forEach((row,index) => {

const gp =
getNumber(
$(`#cgpaGP${index}`).value,
`Grade point ${index + 1}`
);

if (gp < 0 || gp > 4) {

throw new Error(
`Grade point ${index + 1} must be between 0 and 4.`
);

}

if (mode === "weighted") {

const credit =
getNumber(
$(`#cgpaCredit${index}`).value,
`Credit ${index + 1}`
);

if (credit <= 0) {

throw new Error(
`Credit ${index + 1} must be greater than 0.`
);

}

numerator += gp * credit;
denominator += credit;

} else {

numerator += gp;
denominator++;

}

});

const cgpa =
numerator / denominator;

$("#toolResult").innerHTML = `

<div class="result-header">

<span>CGPA</span>

<strong>
${cgpa.toFixed(2)}
</strong>

</div>

<div class="calculator-note">

${
mode === "weighted"
? "CGPA = Σ(Credit × Grade Point) ÷ Total Credit Hours"
: "CGPA = Sum of Grade Points ÷ Number of Entries"
}

</div>

`;

} catch (error) {

showToolError(error.message);

}

});

}

function renderCGPARows(count) {

const mode =
$("#cgpaMode").value;

$("#cgpaRows").innerHTML = `

<div class="cgpa-list">

${Array.from(
{length:count},
(_,index) => `

<div class="cgpa-row">

<span>
${index + 1}
</span>

<input
type="text"
inputmode="decimal"
id="cgpaGP${index}"
placeholder="Grade Point">

${
mode === "weighted"
? `
<input
type="text"
inputmode="decimal"
id="cgpaCredit${index}"
placeholder="Credit Hours">
`
: ""
}

</div>
`
).join("")}

</div>
`;

}

/* =========================================================
PERCENTAGE
========================================================= */

function percentageTool() {

return toolShell(
"Percentage Calculator",
"Enter obtained marks and total marks.",
`

${numberInput(
"percentageObtained",
"Obtained Marks",
"",
"Example: 425.5"
)}

${numberInput(
"percentageTotal",
"Total Marks",
"",
"Example: 500"
)}

<button
type="button"
class="primary-button"
id="calculatePercentage">
Calculate Percentage
</button>

`
);

}

function initializePercentageTool() {

$("#calculatePercentage")
?.addEventListener("click",() => {

try {

clearToolError();

const obtained =
getNumber(
$("#percentageObtained").value,
"Obtained marks"
);

const total =
getNumber(
$("#percentageTotal").value,
"Total marks"
);

if (total <= 0) {

throw new Error(
"Total marks must be greater than 0."
);

}

if (obtained < 0 || obtained > total) {

throw new Error(
"Obtained marks must be between 0 and total marks."
);

}

const percentage =
(obtained / total) * 100;

$("#toolResult").innerHTML = `

<div class="result-header">

<span>PERCENTAGE</span>

<strong>
${percentage.toFixed(2)}%
</strong>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
GRADE
========================================================= */

function gradeTool() {

return toolShell(
"Marks & Grade",
"Enter marks and total marks to calculate grade.",
`

${numberInput(
"gradeObtained",
"Obtained Marks",
"",
"Example: 82.5"
)}

${numberInput(
"gradeTotal",
"Full Marks",
"",
"Example: 100"
)}

<button
type="button"
class="primary-button"
id="calculateGrade">
Calculate Grade
</button>

`
);

}

function initializeGradeTool() {

$("#calculateGrade")
?.addEventListener("click",() => {

try {

clearToolError();

const obtained =
getNumber(
$("#gradeObtained").value,
"Obtained marks"
);

const total =
getNumber(
$("#gradeTotal").value,
"Full marks"
);

if (total <= 0) {

throw new Error(
"Full marks must be greater than 0."
);

}

if (obtained < 0 || obtained > total) {

throw new Error(
"Obtained marks must be between 0 and full marks."
);

}

const percent =
(obtained / total) * 100;

const grade =
getGradeFromPercentage(percent);

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
${percent.toFixed(2)}%
</span>

<strong>
${grade.grade}
</strong>

<small>
Grade Point:
${grade.point.toFixed(1)}
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
ATTENDANCE
========================================================= */

function attendanceTool() {

return toolShell(
"Attendance Calculator",
"Enter attended and total classes.",
`

${numberInput(
"attendancePresent",
"Classes Attended",
"",
"Example: 42"
)}

${numberInput(
"attendanceTotal",
"Total Classes",
"",
"Example: 50"
)}

${numberInput(
"attendanceTarget",
"Target Attendance %",
"75",
"Example: 75"
)}

<button
type="button"
class="primary-button"
id="calculateAttendance">
Calculate Attendance
</button>

`
);

}

function initializeAttendanceTool() {

$("#calculateAttendance")
?.addEventListener("click",() => {

try {

clearToolError();

const attended =
getNumber(
$("#attendancePresent").value,
"Classes attended"
);

const total =
getNumber(
$("#attendanceTotal").value,
"Total classes"
);

const target =
getNumber(
$("#attendanceTarget").value,
"Target attendance"
);

if (total <= 0) {

throw new Error(
"Total classes must be greater than 0."
);

}

if (
attended < 0 ||
attended > total
) {

throw new Error(
"Attended classes must be between 0 and total classes."
);

}

if (
target < 0 ||
target > 100
) {

throw new Error(
"Target attendance must be between 0% and 100%."
);

}

const current =
(attended / total) * 100;

let message = "";

if (current >= target) {

message =
`You currently meet the ${target}% target.`;

} else {

const needed =
Math.ceil(
(
target * total / 100 -
attended
) /
(1 - target / 100)
);

message =
`You need to attend approximately ${Math.max(0,needed)} more class(es) without missing classes to reach ${target}%.`;

}

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
CURRENT ATTENDANCE
</span>

<strong>
${current.toFixed(2)}%
</strong>

<small>
${message}
</small>

</div>

`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
AGE
========================================================= */

function ageTool() {

return toolShell(
"Age Calculator",
"Use your date of birth. A future date is not allowed.",
`

<div class="form-group">

<label for="dateOfBirth">
Date of Birth
</label>

<input
type="date"
id="dateOfBirth">

</div>

<button
type="button"
class="primary-button"
id="calculateAge">
Calculate Age
</button>

`
);

}

function initializeAgeTool() {

$("#calculateAge")
?.addEventListener("click",() => {

try {

clearToolError();

const value =
$("#dateOfBirth").value;

if (!value) {

throw new Error(
"Please select your date of birth."
);

}

const dob =
parseDateLocal(value);

const today =
new Date();

if (dob > today) {

throw new Error(
"Date of birth cannot be in the future."
);

}

let years =
today.getFullYear() -
dob.getFullYear();

let months =
today.getMonth() -
dob.getMonth();

let days =
today.getDate() -
dob.getDate();

if (days < 0) {

months--;

days +=
new Date(
today.getFullYear(),
today.getMonth(),
0
).getDate();

}

if (months < 0) {

years--;
months += 12;

}

$("#toolResult").innerHTML = `

<div class="result-header">

<span>YOUR AGE</span>

<strong>
${years} years
</strong>

<small>
${months} months and
${days} days
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
DATE DIFFERENCE
========================================================= */

function dateDifferenceTool() {

return toolShell(
"Date Difference",
"Choose two dates to calculate the exact difference.",
`

<div class="form-group">

<label for="dateOne">
Start Date
</label>

<input
type="date"
id="dateOne">

</div>

<div class="form-group">

<label for="dateTwo">
End Date
</label>

<input
type="date"
id="dateTwo">

</div>

<button
type="button"
class="primary-button"
id="calculateDateDifference">
Calculate Difference
</button>

`
);

}

function initializeDateTool() {

$("#calculateDateDifference")
?.addEventListener("click",() => {

try {

clearToolError();

const first =
$("#dateOne").value;

const second =
$("#dateTwo").value;

if (!first || !second) {

throw new Error(
"Please select both dates."
);

}

const date1 =
parseDateLocal(first);

const date2 =
parseDateLocal(second);

const difference =
Math.abs(date2 - date1);

const days =
Math.round(
difference / 86400000
);

const weeks =
Math.floor(days / 7);

const years =
Math.floor(days / 365.2425);

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
DATE DIFFERENCE
</span>

<strong>
${days.toLocaleString()} days
</strong>

<small>
Approximately
${weeks.toLocaleString()} weeks /
${years} years
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
UNIT CONVERTER
========================================================= */

const UNIT_DATA = {

length:{
meter:1,
kilometer:1000,
centimeter:.01,
millimeter:.001,
mile:1609.344,
yard:.9144,
foot:.3048,
inch:.0254
},

weight:{
kilogram:1,
gram:.001,
milligram:.000001,
pound:.45359237,
ounce:.028349523125
},

temperature:{
celsius:"celsius",
fahrenheit:"fahrenheit",
kelvin:"kelvin"
},

time:{
second:1,
minute:60,
hour:3600,
day:86400
}

};

function unitTool() {

return toolShell(
"Unit Converter",
"Convert common units with decimal values supported.",
`

<div class="form-group">

<label for="unitCategory">
Category
</label>

<select id="unitCategory">

<option value="length">
Length
</option>

<option value="weight">
Weight
</option>

<option value="temperature">
Temperature
</option>

<option value="time">
Time
</option>

</select>

</div>

<div class="form-group">

<label for="unitValue">
Value
</label>

<input
type="text"
inputmode="decimal"
id="unitValue"
placeholder="Example: 12.5">

</div>

<div class="form-group">

<label for="unitFrom">
From
</label>

<select id="unitFrom"></select>

</div>

<div class="form-group">

<label for="unitTo">
To
</label>

<select id="unitTo"></select>

</div>

<button
type="button"
class="primary-button"
id="convertUnit">
Convert
</button>

`
);

}

function initializeUnitTool() {

const category =
$("#unitCategory");

updateUnitOptions();

category?.addEventListener(
"change",
updateUnitOptions
);

$("#convertUnit")
?.addEventListener("click",() => {

try {

clearToolError();

const value =
getNumber(
$("#unitValue").value,
"Value"
);

const type =
$("#unitCategory").value;

const from =
$("#unitFrom").value;

const to =
$("#unitTo").value;

const result =
convertUnit(
value,
type,
from,
to
);

$("#toolResult").innerHTML = `

<div class="result-header">

<span>RESULT</span>

<strong>
${formatNumber(result)}
</strong>

<small>
${from} → ${to}
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

function updateUnitOptions() {

const type =
$("#unitCategory").value;

const units =
Object.keys(
UNIT_DATA[type]
);

$("#unitFrom").innerHTML =
units.map(
unit =>
`<option value="${unit}">
${capitalize(unit)}
</option>`
).join("");

$("#unitTo").innerHTML =
units.map(
unit =>
`<option value="${unit}">
${capitalize(unit)}
</option>`
).join("");

}

function convertUnit(
value,
category,
from,
to
) {

if (category === "temperature") {

let celsius;

if (from === "celsius") {
celsius = value;
}
else if (from === "fahrenheit") {
celsius = (value - 32) * 5 / 9;
}
else {
celsius = value - 273.15;
}

if (to === "celsius") {
return celsius;
}

if (to === "fahrenheit") {
return celsius * 9 / 5 + 32;
}

return celsius + 273.15;

}

const baseValue =
value *
UNIT_DATA[category][from];

return (
baseValue /
UNIT_DATA[category][to]
);

}

/* =========================================================
BS ↔ AD
========================================================= */

function bsAdTool() {

return toolShell(
"BS ↔ AD Converter",
"Convert between Bikram Sambat and Gregorian dates.",
`

<div class="form-group">

<label for="calendarDirection">
Conversion
</label>

<select id="calendarDirection">

<option value="bs-ad">
BS → AD
</option>

<option value="ad-bs">
AD → BS
</option>

</select>

</div>

<div class="form-group">

<label for="calendarDate">
Date
</label>

<input
type="text"
inputmode="numeric"
id="calendarDate"
placeholder="YYYY-MM-DD">

<small class="input-help">
Example: 2083-06-12
</small>

</div>

<button
type="button"
class="primary-button"
id="convertCalendar">
Convert Date
</button>

<div class="calculator-note">
The converter uses a calendar conversion library
instead of a fixed 56/57-year subtraction.
</div>

`
);

}

function initializeBSADTool() {

$("#convertCalendar")
?.addEventListener("click",async () => {

try {

clearToolError();

const date =
$("#calendarDate")
.value
.trim();

validateCalendarString(date);

if (
typeof window.adToBs !== "function" &&
typeof window.bsToAd !== "function"
) {

await loadNepaliConverter();

}

const direction =
$("#calendarDirection").value;

let result;

if (direction === "bs-ad") {

if (
typeof window.bsToAd !== "function"
) {

throw new Error(
"BS converter could not be loaded."
);

}

result =
window.bsToAd(date);

} else {

if (
typeof window.adToBs !== "function"
) {

throw new Error(
"AD converter could not be loaded."
);

}

result =
window.adToBs(date);

}

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
CONVERTED DATE
</span>

<strong>
${escapeHTML(result)}
</strong>

</div>

`;

} catch (error) {

showToolError(
error.message ||
"Unable to convert the date."
);

}

});

}

function validateCalendarString(date) {

if (
!/^\d{4}-\d{2}-\d{2}$/.test(date)
) {

throw new Error(
"Enter the date in YYYY-MM-DD format."
);

}

}

function loadNepaliConverter() {

return new Promise((resolve,reject) => {

if (
typeof window.bsToAd === "function" &&
typeof window.adToBs === "function"
) {

resolve();
return;

}

const existing =
document.querySelector(
'script[data-nepali-converter]'
);

if (existing) {

existing.addEventListener(
"load",
resolve
);

existing.addEventListener(
"error",
() =>
reject(
new Error(
"Nepali date converter failed to load."
)
)
);

return;

}

const script =
document.createElement("script");

script.src =
"https://cdn.jsdelivr.net/npm/nepali-date-converter@3.4.0/dist/nepali-date-converter.min.js";

script.dataset.nepaliConverter = "true";

script.onload = () => {

if (
typeof window.bsToAd !== "function" &&
window.nepaliDateConverter
) {

window.bsToAd =
window.nepaliDateConverter.bsToAd;

window.adToBs =
window.nepaliDateConverter.adToBs;

}

if (
typeof window.bsToAd !== "function" ||
typeof window.adToBs !== "function"
) {

reject(
new Error(
"The converter library loaded but its browser functions were not found."
)
);

return;

}

resolve();

};

script.onerror = () => {

reject(
new Error(
"Could not load the Nepali date converter. Check your internet connection."
)
);

};

document.head.appendChild(script);

});

}

/* =========================================================
SIMPLE INTEREST
========================================================= */

function simpleInterestTool() {

return toolShell(
"Simple Interest",
"Calculate simple interest and total amount.",
`

${numberInput(
"siPrincipal",
"Principal",
"",
"Example: 10000"
)}

${numberInput(
"siRate",
"Rate (%)",
"",
"Example: 5.5"
)}

${numberInput(
"siTime",
"Time (years)",
"",
"Example: 2.5"
)}

<button
type="button"
class="primary-button"
id="calculateSI">
Calculate
</button>

`
);

}

function initializeSimpleInterestTool() {

$("#calculateSI")
?.addEventListener("click",() => {

try {

clearToolError();

const p =
getNumber(
$("#siPrincipal").value,
"Principal"
);

const r =
getNumber(
$("#siRate").value,
"Rate"
);

const t =
getNumber(
$("#siTime").value,
"Time"
);

if (p < 0 || r < 0 || t < 0) {

throw new Error(
"Values cannot be negative."
);

}

const interest =
p * r * t / 100;

const amount =
p + interest;

showMoneyResult(
"SIMPLE INTEREST",
interest,
amount
);

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
COMPOUND INTEREST
========================================================= */

function compoundInterestTool() {

return toolShell(
"Compound Interest",
"Calculate compound interest with flexible compounding.",
`

${numberInput(
"ciPrincipal",
"Principal",
"",
"Example: 10000"
)}

${numberInput(
"ciRate",
"Annual Rate (%)",
"",
"Example: 5.5"
)}

${numberInput(
"ciTime",
"Time (years)",
"",
"Example: 2"
)}

${numberInput(
"ciFrequency",
"Compounds per year",
"1",
"Example: 4"
)}

<button
type="button"
class="primary-button"
id="calculateCI">
Calculate
</button>

`
);

}

function initializeCompoundInterestTool() {

$("#calculateCI")
?.addEventListener("click",() => {

try {

clearToolError();

const p =
getNumber(
$("#ciPrincipal").value,
"Principal"
);

const r =
getNumber(
$("#ciRate").value,
"Annual rate"
);

const t =
getNumber(
$("#ciTime").value,
"Time"
);

const n =
getNumber(
$("#ciFrequency").value,
"Compounds per year"
);

if (
p < 0 ||
r < 0 ||
t < 0 ||
n <= 0
) {

throw new Error(
"Enter valid non-negative values and a positive compounding frequency."
);

}

const amount =
p *
Math.pow(
1 + r / (100 * n),
n * t
);

const interest =
amount - p;

showMoneyResult(
"COMPOUND INTEREST",
interest,
amount
);

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
DISCOUNT
========================================================= */

function discountTool() {

return toolShell(
"Discount Calculator",
"Calculate discount amount and final price.",
`

${numberInput(
"discountPrice",
"Original Price",
"",
"Example: 2500"
)}

${numberInput(
"discountRate",
"Discount (%)",
"",
"Example: 15.5"
)}

<button
type="button"
class="primary-button"
id="calculateDiscount">
Calculate
</button>

`
);

}

function initializeDiscountTool() {

$("#calculateDiscount")
?.addEventListener("click",() => {

try {

clearToolError();

const price =
getNumber(
$("#discountPrice").value,
"Original price"
);

const rate =
getNumber(
$("#discountRate").value,
"Discount rate"
);

if (price < 0) {

throw new Error(
"Original price cannot be negative."
);

}

if (rate < 0 || rate > 100) {

throw new Error(
"Discount must be between 0% and 100%."
);

}

const discount =
price * rate / 100;

const finalPrice =
price - discount;

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
DISCOUNT
</span>

<strong>
${formatNumber(discount)}
</strong>

<small>
Final price:
${formatNumber(finalPrice)}
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
PROFIT / LOSS
========================================================= */

function profitLossTool() {

return toolShell(
"Profit & Loss",
"Calculate profit, loss and percentage.",
`

${numberInput(
"costPrice",
"Cost Price",
"",
"Example: 1000"
)}

${numberInput(
"sellingPrice",
"Selling Price",
"",
"Example: 1250"
)}

<button
type="button"
class="primary-button"
id="calculateProfit">
Calculate
</button>

`
);

}

function initializeProfitTool() {

$("#calculateProfit")
?.addEventListener("click",() => {

try {

clearToolError();

const cost =
getNumber(
$("#costPrice").value,
"Cost price"
);

const selling =
getNumber(
$("#sellingPrice").value,
"Selling price"
);

if (cost <= 0) {

throw new Error(
"Cost price must be greater than 0."
);

}

const difference =
selling - cost;

const percent =
Math.abs(difference / cost * 100);

const type =
difference > 0
? "PROFIT"
: difference < 0
? "LOSS"
: "NO PROFIT / NO LOSS";

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
${type}
</span>

<strong>
${formatNumber(Math.abs(difference))}
</strong>

<small>
${percent.toFixed(2)}%
</small>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
WORD COUNTER
========================================================= */

function wordCounterTool() {

return toolShell(
"Word Counter",
"Write or paste your text below.",
`

<div class="form-group">

<label for="wordCounterText">
Your Text
</label>

<textarea
id="wordCounterText"
rows="12"
placeholder="Start writing here..."></textarea>

</div>

<div class="live-stats">

<div>
<strong id="wordCount">0</strong>
<span>Words</span>
</div>

<div>
<strong id="characterCount">0</strong>
<span>Characters</span>
</div>

<div>
<strong id="characterNoSpaceCount">0</strong>
<span>No Spaces</span>
</div>

<div>
<strong id="lineCount">0</strong>
<span>Lines</span>
</div>

</div>

`
);

}

function initializeWordCounter() {

const textarea =
$("#wordCounterText");

textarea?.addEventListener(
"input",
() => {

const text =
textarea.value;

const words =
text.trim()
? text.trim().split(/\s+/).length
: 0;

const lines =
text
? text.split(/\n/).length
: 0;

$("#wordCount").textContent = words;
$("#characterCount").textContent = text.length;

$("#characterNoSpaceCount").textContent =
text.replace(/\s/g,"").length;

$("#lineCount").textContent = lines;

}
);

}

/* =========================================================
CASE CONVERTER
========================================================= */

function caseConverterTool() {

return toolShell(
"Case Converter",
"Write text and convert its letter case.",
`

<div class="form-group">

<label for="caseText">
Your Text
</label>

<textarea
id="caseText"
rows="12"
placeholder="Write your text here..."></textarea>

</div>

<div class="button-row">

<button
type="button"
class="secondary-button"
data-case="upper">
UPPERCASE
</button>

<button
type="button"
class="secondary-button"
data-case="lower">
lowercase
</button>

<button
type="button"
class="secondary-button"
data-case="title">
Title Case
</button>

<button
type="button"
class="secondary-button"
data-case="sentence">
Sentence case
</button>

</div>

`
);

}

function initializeCaseConverter() {

$$(".secondary-button").forEach(button => {

const type =
button.dataset.case;

if (!type) return;

button.addEventListener("click",() => {

const textarea =
$("#caseText");

if (!textarea) return;

const text =
textarea.value;

if (type === "upper") {
textarea.value = text.toUpperCase();
}

if (type === "lower") {
textarea.value = text.toLowerCase();
}

if (type === "title") {

textarea.value =
text
.toLowerCase()
.replace(
/\b\w/g,
char => char.toUpperCase()
);

}

if (type === "sentence") {

textarea.value =
text
.toLowerCase()
.replace(
/(^\s*\w|[.!?]\s+\w)/g,
match => match.toUpperCase()
);

}

});

});

}

/* =========================================================
TEXT CLEANER
========================================================= */

function textCleanerTool() {

return toolShell(
"Text Cleaner",
"Clean extra spaces and unwanted blank lines.",
`

<div class="form-group">

<label for="cleanText">
Your Text
</label>

<textarea
id="cleanText"
rows="14"
placeholder="Paste or write your text here..."></textarea>

</div>

<div class="button-row">

<button
type="button"
class="primary-button"
id="cleanTextButton">
Clean Text
</button>

<button
type="button"
class="secondary-button"
id="copyCleanText">
Copy
</button>

</div>

`
);

}

function initializeTextCleaner() {

$("#cleanTextButton")
?.addEventListener("click",() => {

const textarea =
$("#cleanText");

if (!textarea) return;

textarea.value =
textarea.value
.replace(/[ \t]+/g," ")
.replace(/\n\s*\n\s*\n+/g,"\n\n")
.trim();

showToast(
"Text cleaned successfully."
);

});

$("#copyCleanText")
?.addEventListener("click",async () => {

const textarea =
$("#cleanText");

if (!textarea?.value) {

showToast(
"There is no text to copy.",
"error"
);

return;

}

try {

await navigator.clipboard.writeText(
textarea.value
);

showToast("Text copied.");

} catch {

showToast(
"Copy was blocked by the browser.",
"error"
);

}

});

}

/* =========================================================
QR
========================================================= */

function qrTool() {

return toolShell(
"QR Code Generator",
"Enter text or a URL to generate a QR code.",
`

<div class="form-group">

<label for="qrText">
Text or URL
</label>

<textarea
id="qrText"
rows="6"
placeholder="https://example.com"></textarea>

</div>

<button
type="button"
class="primary-button"
id="generateQR">
Generate QR
</button>

`
);

}

function initializeQR() {

$("#generateQR")
?.addEventListener("click",() => {

const value =
$("#qrText").value.trim();

if (!value) {

showToolError(
"Please enter text or a URL."
);

return;

}

clearToolError();

const encoded =
encodeURIComponent(value);

$("#toolResult").innerHTML = `

<div class="qr-result">

<img
src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encoded}"
alt="Generated QR code">

<p>
QR code generated successfully.
</p>

</div>
`;

});

}

/* =========================================================
PASSWORD
========================================================= */

function passwordTool() {

return toolShell(
"Password Generator",
"Generate a random password.",
`

${numberInput(
"passwordLength",
"Password Length",
"16",
"Example: 16"
)}

<div class="checkbox-grid">

<label>
<input
type="checkbox"
id="includeUpper"
checked>
Uppercase
</label>

<label>
<input
type="checkbox"
id="includeLower"
checked>
Lowercase
</label>

<label>
<input
type="checkbox"
id="includeNumbers"
checked>
Numbers
</label>

<label>
<input
type="checkbox"
id="includeSymbols"
checked>
Symbols
</label>

</div>

<button
type="button"
class="primary-button"
id="generatePassword">
Generate Password
</button>

`
);

}

function initializePassword() {

$("#generatePassword")
?.addEventListener("click",() => {

try {

clearToolError();

const length =
getNumber(
$("#passwordLength").value,
"Password length"
);

if (
!Number.isInteger(length) ||
length < 4 ||
length > 128
) {

throw new Error(
"Password length must be a whole number from 4 to 128."
);

}

let characters = "";

if ($("#includeUpper").checked) {

characters +=
"ABCDEFGHIJKLMNOPQRSTUVWXYZ";

}

if ($("#includeLower").checked) {

characters +=
"abcdefghijklmnopqrstuvwxyz";

}

if ($("#includeNumbers").checked) {

characters +=
"0123456789";

}

if ($("#includeSymbols").checked) {

characters +=
"!@#$%^&*()_+-=[]{}";

}

if (!characters) {

throw new Error(
"Select at least one character type."
);

}

let password = "";

for (
let i = 0;
i < length;
i++
) {

const randomIndex =
Math.floor(
Math.random() * characters.length
);

password += characters[randomIndex];

}

$("#toolResult").innerHTML = `

<div class="generated-output">

<input
type="text"
id="generatedPassword"
value="${escapeAttribute(password)}"
readonly>

<button
type="button"
class="secondary-button"
id="copyPassword">
Copy
</button>

</div>
`;

$("#copyPassword")
?.addEventListener("click",async () => {

try {

await navigator.clipboard.writeText(
password
);

showToast("Password copied.");

} catch {

showToast(
"Copy was blocked.",
"error"
);

}

});

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
RANDOM
========================================================= */

function randomTool() {

return toolShell(
"Random Number Generator",
"Generate a random number between two values.",
`

${numberInput(
"randomMin",
"Minimum",
"1",
"Example: 1"
)}

${numberInput(
"randomMax",
"Maximum",
"100",
"Example: 100"
)}

<button
type="button"
class="primary-button"
id="generateRandom">
Generate
</button>

`
);

}

function initializeRandom() {

$("#generateRandom")
?.addEventListener("click",() => {

try {

clearToolError();

const min =
getNumber(
$("#randomMin").value,
"Minimum"
);

const max =
getNumber(
$("#randomMax").value,
"Maximum"
);

if (min > max) {

throw new Error(
"Minimum cannot be greater than maximum."
);

}

const random =
Math.random() *
(max - min) +
min;

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
RANDOM NUMBER
</span>

<strong>
${formatNumber(random)}
</strong>

</div>
`;

} catch (error) {

showToolError(error.message);

}

});

}

/* =========================================================
ARTICLES
========================================================= */

const ARTICLES = {

"neb-gpa":{

category:"ACADEMICS",

title:"How NEB GPA Calculation Works",

content:`

<p>
GPA represents grade-point performance across
subjects.
</p>

<p>
In a credit-weighted calculation, each subject's
grade point is multiplied by its credit hour.
The products are then divided by the total
credit hours.
</p>

<p>
StuPivot's academic calculators are designed to
make the calculation easier to understand rather
than hiding the calculation behind a single number.
</p>

`
},

"gpa-cgpa":{

category:"ACADEMICS",

title:"GPA vs CGPA",

content:`

<p>
GPA normally represents performance for a specific
group of subjects or an academic period.
</p>

<p>
CGPA combines multiple grade-point entries.
When credits are equal, an ordinary average can
be used. When credits differ, a credit-weighted
calculation gives each entry its appropriate weight.
</p>

<p>
StuPivot provides both approaches so students can
choose the calculation that matches their academic record.
</p>

`
},

"c-programming":{

category:"PROGRAMMING",

title:"Starting C Programming",

content:`

<p>
C is a useful language for learning programming
fundamentals because its syntax exposes many of
the ideas used throughout computer science.
</p>

<p>
Start with variables, input and output, operators,
conditions and loops. Then move to arrays,
strings, pointers and functions.
</p>

<p>
The most useful way to improve is to write small
programs regularly instead of only reading examples.
</p>

`
},

"study-routine":{

category:"STUDY",

title:"Building a Better Study Routine",

content:`

<p>
A useful study routine should be realistic enough
to follow consistently.
</p>

<p>
Divide larger subjects into smaller topics.
Use active recall, practice questions and regular
revision instead of depending only on rereading.
</p>

<p>
StuPivot's Study Hub can be used alongside your
normal class notes and textbooks.
</p>

`
},

"computer-science":{

category:"COMPUTER SCIENCE",

title:"Why Computer Science Matters",

content:`

<p>
Computer science is not only about writing code.
It also involves algorithms, data, computer systems,
problem solving and logical thinking.
</p>

<p>
Learning programming gives students a practical way
to turn an idea into a working solution.
</p>

`
},

"website":{

category:"TECHNOLOGY",

title:"What Happens When You Open a Website?",

content:`

<p>
When you enter a website address, your browser
needs to locate the server associated with that
address and request the website's resources.
</p>

<p>
The server sends files such as HTML, CSS and
JavaScript back to the browser. The browser then
interprets those files and builds the page you see.
</p>

<p>
This involves technologies including DNS,
HTTP/HTTPS, servers and browsers.
</p>

`
},

"stupivot-tools":{

category:"TOOLS",

title:"Using StuPivot Effectively",

content:`

<p>
StuPivot brings calculators, study resources,
coding content and online utilities together.
</p>

<p>
Use the calculators for quick academic calculations,
the Study Hub for organized learning resources,
and the Coding Hub for programming practice.
</p>

<p>
The Online Tools section provides utilities for
writing, conversion and other everyday student tasks.
</p>

`
},

"bs-ad":{

category:"CALENDAR",

title:"BS and AD Calendar Conversion",

content:`

<p>
Bikram Sambat (BS) and the Gregorian calendar (AD)
use different calendar systems.
</p>

<p>
A simple subtraction of a fixed number of years is
not sufficient for accurate date conversion because
Nepali calendar month lengths vary.
</p>

<p>
StuPivot therefore uses a proper date-conversion
method for the BS ↔ AD tool.
</p>

`
}

};

$$(".read-article").forEach(button => {

button.addEventListener("click",() => {

openArticle(
button.dataset.article
);

});

});

function openArticle(id) {

const article =
ARTICLES[id];

if (!article) {

showToast(
"Article not found.",
"error"
);

return;

}

articleContent.innerHTML = `

<span class="section-label">
${article.category}
</span>

<h2>
${article.title}
</h2>

<div class="article-body">
${article.content}
</div>
`;

openModal(articleModal);

}

/* =========================================================
SEARCH
========================================================= */

const SEARCH_ITEMS = [

{
title:"GPA Calculator",
description:"Class 10, Class 11 and Class 12 GPA tool.",
section:"calculators",
tool:"gpa"
},

{
title:"CGPA Calculator",
description:"Equal-credit and weighted CGPA.",
section:"calculators",
tool:"cgpa"
},

{
title:"Percentage Calculator",
description:"Calculate academic percentage.",
section:"calculators",
tool:"percentage"
},

{
title:"Marks & Grade",
description:"Calculate percentage, grade and grade point.",
section:"calculators",
tool:"grade"
},

{
title:"Attendance Calculator",
description:"Calculate attendance percentage.",
section:"calculators",
tool:"attendance"
},

{
title:"Age Calculator",
description:"Calculate age from date of birth.",
section:"calculators",
tool:"age"
},

{
title:"Date Difference",
description:"Calculate difference between dates.",
section:"calculators",
tool:"date"
},

{
title:"Unit Converter",
description:"Convert common measurement units.",
section:"tools",
tool:"unit"
},

{
title:"BS AD Converter",
description:"Convert Bikram Sambat and Gregorian dates.",
section:"tools",
tool:"bs-ad"
},

{
title:"Simple Interest",
description:"Calculate simple interest.",
section:"calculators",
tool:"simple-interest"
},

{
title:"Compound Interest",
description:"Calculate compound interest.",
section:"calculators",
tool:"compound-interest"
},

{
title:"Discount Calculator",
description:"Calculate discounts.",
section:"calculators",
tool:"discount"
},

{
title:"Profit & Loss",
description:"Calculate profit and loss.",
section:"calculators",
tool:"profit"
},

{
title:"C Programming",
description:"Learn C programming.",
section:"coding",
coding:"c"
},

{
title:"Algorithms",
description:"Learn algorithmic thinking.",
section:"coding",
coding:"algorithms"
},

{
title:"Word Counter",
description:"Count words and characters.",
section:"tools",
tool:"word-counter"
},

{
title:"Case Converter",
description:"Convert text case.",
section:"tools",
tool:"case-converter"
},

{
title:"Text Cleaner",
description:"Clean unwanted spaces and formatting.",
section:"tools",
tool:"text-cleaner"
},

{
title:"QR Code Generator",
description:"Generate a QR code.",
section:"tools",
tool:"qr"
},

{
title:"Password Generator",
description:"Generate random passwords.",
section:"tools",
tool:"password"
},

{
title:"Random Number",
description:"Generate random numbers.",
section:"tools",
tool:"random"
},

{
title:"Study Hub",
description:"Class 11 and Class 12 study resources.",
section:"study"
},

{
title:"Articles",
description:"Student and technology articles.",
section:"articles"
}

];

$("#searchButton")
?.addEventListener("click",performSearch);

$("#siteSearch")
?.addEventListener("keydown",event => {

if (event.key === "Enter") {

event.preventDefault();

performSearch();

}

});

$("#siteSearch")
?.addEventListener("input",performSearch);

function performSearch() {

const query =
$("#siteSearch")
?.value
.trim()
.toLowerCase();

const results =
$("#searchResults");

if (!results) return;

if (!query) {

results.innerHTML = "";

return;

}

const matches =
SEARCH_ITEMS.filter(item =>
`${item.title} ${item.description}`
.toLowerCase()
.includes(query)
);

if (!matches.length) {

results.innerHTML = `

<div class="search-empty">
No matching StuPivot content found.
</div>

`;

return;

}

results.innerHTML =
matches.map(item => `

<button
type="button"
class="search-result-item"
data-search-tool="${item.tool || ""}"
data-search-section="${item.section}"
data-search-coding="${item.coding || ""}">

<strong>
${item.title}
</strong>

<small>
${item.description}
</small>

</button>

`).join("");

$$(".search-result-item",results)
.forEach(item => {

item.addEventListener("click",() => {

if (item.dataset.searchTool) {

openTool(
item.dataset.searchTool
);

return;

}

if (item.dataset.searchCoding) {

openCoding(
item.dataset.searchCoding
);

document
.getElementById("coding")
?.scrollIntoView({
behavior:"smooth"
});

return;

}

document
.getElementById(
item.dataset.searchSection
)
?.scrollIntoView({
behavior:"smooth"
});

});

});

}

/* =========================================================
STUDY HUB
========================================================= */

let selectedStudyClass = null;
let selectedStudyFaculty = null;
let selectedStudySubject = null;

const STUDY_FACULTIES = {

science:{
name:"Science",
icon:"SC",
subjects:[
"Physics",
"Chemistry",
"Biology",
"Mathematics",
"Computer Science"
]
},

management:{
name:"Management",
icon:"MG",
subjects:[
"Accounting",
"Economics",
"Business Studies",
"Computer Science",
"Mathematics"
]
},

humanities:{
name:"Humanities",
icon:"HU",
subjects:[
"Sociology",
"Rural Development",
"Mass Communication",
"Psychology",
"Economics"
]
},

education:{
name:"Education",
icon:"ED",
subjects:[
"Education",
"Nepali",
"English",
"Economics",
"Computer Science"
]
},

law:{
name:"Law",
icon:"LW",
subjects:[
"Legal Studies",
"English",
"Nepali",
"Social Studies",
"Economics"
]
}

};

function studyShow(id) {

const el = $(id);

if (el) {
el.classList.remove("hidden");
}

}

function studyHide(id) {

const el = $(id);

if (el) {
el.classList.add("hidden");
}

}

function studyResetToClass() {

selectedStudyClass = null;
selectedStudyFaculty = null;
selectedStudySubject = null;

studyShow("#studyStepClass");

studyHide("#studyStepFaculty");
studyHide("#studyStepSubject");
studyHide("#studyStepResource");

}

function studyOpenFaculty(classNumber) {

selectedStudyClass =
String(classNumber);

selectedStudyFaculty = null;
selectedStudySubject = null;

$("#studyFacultyClassLabel").textContent =
selectedStudyClass;

$("#studyFacultyGrid").innerHTML =
Object.entries(STUDY_FACULTIES)
.map(([key,faculty]) => `

<button
type="button"
class="study-choice-card"
data-faculty="${key}">

<span class="study-choice-icon">
${faculty.icon}
</span>

<span>

<strong>
${faculty.name}
</strong>

<small>
${faculty.subjects.length}
main subjects available
</small>

</span>

<span class="arrow">→</span>

</button>

`)
.join("");

studyHide("#studyStepClass");
studyShow("#studyStepFaculty");
studyHide("#studyStepSubject");
studyHide("#studyStepResource");

$("#studyStepFaculty")
?.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

}

function studyOpenSubjects(facultyKey) {

const faculty =
STUDY_FACULTIES[facultyKey];

if (!faculty) return;

selectedStudyFaculty =
facultyKey;

selectedStudySubject = null;

$("#studySubjectPath").textContent =
`CLASS ${selectedStudyClass} • ${faculty.name.toUpperCase()}`;

$("#studySubjectGrid").innerHTML =
faculty.subjects
.map((subject,index) => `

<button
type="button"
class="study-choice-card"
data-subject-index="${index}">

<span class="study-choice-icon">
${String(index + 1).padStart(2,"0")}
</span>

<span>

<strong>
${subject}
</strong>

<small>
Open ${subject} study resources
</small>

</span>

<span class="arrow">→</span>

</button>

`)
.join("");

studyHide("#studyStepFaculty");
studyShow("#studyStepSubject");
studyHide("#studyStepResource");

$("#studyStepSubject")
?.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

}

function studyOpenResources(subject) {

selectedStudySubject = subject;

const faculty =
STUDY_FACULTIES[selectedStudyFaculty];

$("#studyResourcePathClass").textContent =
`Class ${selectedStudyClass}`;

$("#studyResourcePathFaculty").textContent =
faculty?.name || "Faculty";

$("#studyResourcePathSubject").textContent =
subject;

$("#studyResourceTitle").textContent =
subject;

$("#studyResourceDescription").textContent =
`Choose a resource for ${subject}.`;

$("#studyResourceOutput")
?.classList.add("hidden");

studyHide("#studyStepSubject");
studyShow("#studyStepResource");

$("#studyStepResource")
?.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

}

function studyOpenResource(type) {

const labels = {

notes:[
"Notes",
"Chapter notes, concepts and revision material for this subject."
],

questions:[
"Questions",
"Practice and model questions for this subject."
],

exam:[
"Exam Preparation",
"Use revision, past-question practice and topic review for exam preparation."
],

neb:[
"NEB Resources",
"Board-related resources for the selected class, faculty and subject."
]

};

const item =
labels[type] ||
[
"Study Resource",
"Resource selected."
];

const out =
$("#studyResourceOutput");

if (!out) return;

out.innerHTML = `

<h4>
${item[0]}
</h4>

<p>
${item[1]}
</p>

<p>

<strong>
Path:
</strong>

Class ${selectedStudyClass}
→
${STUDY_FACULTIES[selectedStudyFaculty]?.name || "Faculty"}
→
${selectedStudySubject}

</p>
`;

out.classList.remove("hidden");

out.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

}

/* CLASS BUTTONS */

$$(".class-choice").forEach(button => {

button.addEventListener("click",() => {

studyOpenFaculty(
button.dataset.class
);

});

});

/* FACULTY BUTTONS */

$("#studyFacultyGrid")
?.addEventListener("click",event => {

const card =
event.target.closest("[data-faculty]");

if (card) {

studyOpenSubjects(
card.dataset.faculty
);

}

});

/* SUBJECT BUTTONS */

$("#studySubjectGrid")
?.addEventListener("click",event => {

const card =
event.target.closest("[data-subject-index]");

if (!card) return;

const faculty =
STUDY_FACULTIES[selectedStudyFaculty];

if (!faculty) return;

studyOpenResources(
faculty.subjects[
Number(card.dataset.subjectIndex)
]
);

});

/* RESOURCES */

$$("[data-resource]").forEach(button => {

button.addEventListener("click",() => {

studyOpenResource(
button.dataset.resource
);

});

});

/* BACK BUTTONS */

$$("[data-study-back]").forEach(button => {

button.addEventListener("click",() => {

const target =
button.dataset.studyBack;

if (target === "class") {

studyResetToClass();

}

else if (target === "faculty") {

studyOpenFaculty(
selectedStudyClass
);

}

else if (target === "subject") {

studyOpenSubjects(
selectedStudyFaculty
);

}

});

});

/* =========================================================
CODING HUB
========================================================= */

const CODING_CONTENT = {

c:{

title:"C Programming",

content:`

<p>
Learn C step by step from basic syntax to
arrays, strings, functions and problem solving.
</p>

<div class="coding-topic-list">

<button
type="button"
data-topic="variables">
Variables & Data Types
</button>

<button
type="button"
data-topic="input">
Input & Output
</button>

<button
type="button"
data-topic="conditions">
Conditions
</button>

<button
type="button"
data-topic="loops">
Loops
</button>

<button
type="button"
data-topic="arrays">
Arrays
</button>

<button
type="button"
data-topic="strings">
Strings
</button>

<button
type="button"
data-topic="functions">
Functions
</button>

</div>

`

},

algorithms:{

title:"Algorithms",

content:`

<p>
An algorithm is a sequence of steps used
to solve a problem.
</p>

<div class="coding-resource-list">

<div>

<strong>
Problem Analysis
</strong>

<p>
Understand the input, process and output.
</p>

</div>

<div>

<strong>
Flowcharts
</strong>

<p>
Represent a solution visually.
</p>

</div>

<div>

<strong>
Pseudocode
</strong>

<p>
Describe program logic before coding.
</p>

</div>

</div>

`

},

concepts:{

title:"Programming Concepts",

content:`

<p>
Build your foundation with variables,
operators, conditions, loops, arrays,
strings and functions.
</p>

`

},

examples:{

title:"C Examples",

content:`

<div class="coding-resource-list">

<div>

<strong>
Largest of Three Numbers
</strong>

<p>
Practice conditional statements.
</p>

</div>

<div>

<strong>
Factorial
</strong>

<p>
Practice loops.
</p>

</div>

<div>

<strong>
Fibonacci Series
</strong>

<p>
Practice repetition and variables.
</p>

</div>

<div>

<strong>
Palindrome
</strong>

<p>
Practice strings and logic.
</p>

</div>

</div>

`

},

practice:{

title:"Practice Problems",

content:`

<div class="coding-resource-list">

<div>

<strong>
Beginner
</strong>

<p>
Variables, arithmetic and conditions.
</p>

</div>

<div>

<strong>
Intermediate
</strong>

<p>
Loops, arrays and strings.
</p>

</div>

<div>

<strong>
Challenge
</strong>

<p>
Combine multiple concepts into one program.
</p>

</div>

</div>

`

},

guides:{

title:"Beginner Guides",

content:`

<p>
Start small. Understand the problem first,
write an algorithm, then convert the algorithm
into code and test the result.
</p>

`

}

};

let selectedCodingId = "c";

const CODING_TOPICS = {

variables:{
title:"Variables & Data Types",
content:
"Variables store values that a program can use and change. Common C data types include int, float, char and double."
},

input:{
title:"Input & Output",
content:
"Use printf() to display information and scanf() to receive input from the user. Keep input statements clear and easy to test."
},

conditions:{
title:"Conditions",
content:
"if, else if and else let a program make decisions based on whether a condition is true or false."
},

loops:{
title:"Loops",
content:
"for, while and do-while loops repeat a block of code. Choose the loop that best matches the problem and its stopping condition."
},

arrays:{
title:"Arrays",
content:
"An array stores multiple values of the same data type under one name. In C, array indexing starts from 0."
},

strings:{
title:"Strings",
content:
"A C string is a sequence of characters ending with a null character. Common string functions are provided by string.h."
},

functions:{
title:"Functions",
content:
"Functions divide a program into reusable parts. They can accept parameters, perform a task and optionally return a value."
}

};

/* IMPORTANT:
   Topic buttons are created INSIDE #codingContent,
   so the click handler belongs on #codingContent.
*/

$("#codingContent")
?.addEventListener("click",event => {

if (
event.target.closest(
"[data-coding-back]"
)
) {

openCoding(selectedCodingId);
return;

}

const topicButton =
event.target.closest("[data-topic]");

if (!topicButton) return;

const topic =
CODING_TOPICS[
topicButton.dataset.topic
];

if (!topic) return;

const area =
$("#codingContent");

if (!area) return;

area.innerHTML = `

<div class="coding-content-header">

<span class="section-label">
CODING TOPIC
</span>

<h3>
${topic.title}
</h3>

</div>

<div class="coding-content-body">

<p>
${topic.content}
</p>

<button
type="button"
class="secondary-button"
data-coding-back>

← Back to Coding Topics

</button>

</div>

`;

area.classList.remove("hidden");

area.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

});

$$(".coding-option").forEach(button => {

button.addEventListener("click",() => {

openCoding(
button.dataset.coding
);

});

});

function openCoding(id) {

const item =
CODING_CONTENT[id];

if (!item) return;

selectedCodingId = id;

const area =
$("#codingContent");

if (!area) return;

area.innerHTML = `

<div class="coding-content-header">

<span class="section-label">
CODING
</span>

<h3>
${item.title}
</h3>

</div>

<div class="coding-content-body">

${item.content}

</div>
`;

area.classList.remove("hidden");

area.scrollIntoView({
behavior:"smooth",
block:"nearest"
});

}

/* =========================================================
LEGAL
========================================================= */

const LEGAL_CONTENT = {

privacy:{

title:"Privacy Policy",

content:`

<p>
StuPivot is designed as a student utility website.
Information submitted through contact or feedback
forms is sent through the configured form service.
</p>

<p>
StuPivot does not require students to create an
account for the basic calculators and tools.
</p>

<p>
Do not submit passwords, financial information or
other sensitive information through feedback forms.
</p>

`

},

terms:{

title:"Terms of Use",

content:`

<p>
StuPivot provides educational calculators,
tools and information for general student use.
</p>

<p>
Calculated results should be checked against
official academic records where accuracy is
important.
</p>

<p>
StuPivot resources are intended to support learning
and should not replace official school or board
documents.
</p>

`

}

};

$$(".legal-card").forEach(button => {

button.addEventListener("click",() => {

const id =
button.dataset.legal;

const item =
LEGAL_CONTENT[id];

if (!item) return;

legalContent.innerHTML = `

<span class="section-label">
INFORMATION
</span>

<h2>
${item.title}
</h2>

<div class="article-body">
${item.content}
</div>

`;

openModal(legalModal);

});

});

/* =========================================================
FORMS
========================================================= */

function setupForm(formId) {

const form =
document.getElementById(formId);

if (!form) return;

form.addEventListener(
"submit",
async event => {

event.preventDefault();

const submitButton =
form.querySelector(
'[type="submit"]'
);

const originalText =
submitButton?.textContent;

if (submitButton) {

submitButton.disabled = true;
submitButton.textContent = "Sending...";

}

try {

const response =
await fetch(
form.action,
{
method:"POST",
body:new FormData(form),
headers:{
Accept:"application/json"
}
}
);

if (!response.ok) {

throw new Error(
"Message could not be sent."
);

}

form.reset();

showToast(
"Your message was sent successfully."
);

} catch (error) {

showToast(
error.message ||
"Something went wrong while sending.",
"error"
);

} finally {

if (submitButton) {

submitButton.disabled = false;
submitButton.textContent =
originalText;

}

}

}
);

}

setupForm("feedbackForm");
setupForm("contactForm");

/* =========================================================
UTILITIES
========================================================= */

function parseDateLocal(value) {

const parts =
value.split("-").map(Number);

return new Date(
parts[0],
parts[1] - 1,
parts[2]
);

}

function formatNumber(number) {

return Number(
number.toFixed(6)
).toLocaleString(
undefined,
{
maximumFractionDigits:6
}
);

}

function capitalize(value) {

return String(value)
.replace(/-/g," ")
.replace(
/\b\w/g,
char => char.toUpperCase()
);

}

function showMoneyResult(
label,
interest,
amount
) {

$("#toolResult").innerHTML = `

<div class="result-header">

<span>
${label}
</span>

<strong>
${formatNumber(interest)}
</strong>

<small>
Total Amount:
${formatNumber(amount)}
</small>

</div>
`;

}

function escapeHTML(value) {

return String(value)
.replace(/&/g,"&amp;")
.replace(/</g,"&lt;")
.replace(/>/g,"&gt;")
.replace(/"/g,"&quot;")
.replace(/'/g,"&#039;");

}

function escapeAttribute(value) {

return escapeHTML(value);

}

/* =========================================================
SMOOTH LINKS
========================================================= */

$$('a[href^="#"]').forEach(link => {

link.addEventListener("click",event => {

const targetId =
link.getAttribute("href");

if (
!targetId ||
targetId === "#"
) return;

const target =
document.querySelector(targetId);

if (!target) return;

event.preventDefault();

target.scrollIntoView({
behavior:"smooth"
});

});

});

/* =========================================================
DECIMAL INPUT CLEANUP
========================================================= */

document.addEventListener(
"input",
event => {

const input =
event.target;

if (
input.tagName !== "INPUT" ||
input.getAttribute("inputmode") !== "decimal"
) {
return;
}

input.value =
input.value.replace(
/[^0-9.\-]/g,
""
);

}
);

/* =========================================================
DONE
========================================================= */

document.addEventListener(
"DOMContentLoaded",
() => {

console.log(
"StuPivot initialized successfully."
);

}
);
