/* =========================================================
   STUPIVOT — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SHORT SELECTORS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   BASIC HELPERS
========================================================= */

const year = $("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}


function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function getNumber(value, label = "Value") {

    const clean = String(value ?? "").trim();

    if (!clean) {
        throw new Error(`${label} is required.`);
    }

    const number = Number(clean);

    if (!Number.isFinite(number)) {
        throw new Error(`${label} must be a valid number.`);
    }

    return number;
}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: .12
        }
    );


$$(".reveal").forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

menuBtn?.addEventListener("click", () => {

    const active =
        navLinks.classList.toggle("active");

    menuBtn.setAttribute(
        "aria-expanded",
        String(active)
    );

});


$$(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks?.classList.remove("active");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


document.addEventListener("click", event => {

    if (!navLinks?.classList.contains("active")) {
        return;
    }

    if (
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        navLinks.classList.remove("active");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );
    }

});


/* =========================================================
   QUICK ACCESS
========================================================= */

$$(".quick-card").forEach(button => {

    button.addEventListener("click", () => {

        const target =
            document.getElementById(
                button.dataset.scroll
            );

        target?.scrollIntoView({
            behavior: "smooth"
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

    localStorage.setItem(
        "stupivot-theme",
        document.body.classList.contains("light-mode")
            ? "light"
            : "dark"
    );

});


/* =========================================================
   MODALS
========================================================= */

const toolModal = $("#toolModal");
const articleModal = $("#articleModal");
const legalModal = $("#legalModal");

const modalContent = $("#modalContent");
const articleContent = $("#articleContent");
const legalContent = $("#legalContent");


function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        !toolModal?.classList.contains("active") &&
        !articleModal?.classList.contains("active") &&
        !legalModal?.classList.contains("active")
    ) {
        document.body.classList.remove(
            "modal-open"
        );
    }

}


$("#modalClose")?.addEventListener(
    "click",
    () => closeModal(toolModal)
);

$("#articleClose")?.addEventListener(
    "click",
    () => closeModal(articleModal)
);

$("#legalClose")?.addEventListener(
    "click",
    () => closeModal(legalModal)
);


$$(".modal-overlay").forEach(overlay => {

    overlay.addEventListener("click", () => {

        closeModal(
            overlay.closest(".modal")
        );

    });

});


document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeModal(toolModal);
    closeModal(articleModal);
    closeModal(legalModal);

});


/* =========================================================
   SEARCH OPEN
========================================================= */

$("#searchOpen")?.addEventListener(
    "click",
    () => {

        const search =
            $("#search");

        search?.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {
            $("#siteSearch")?.focus();
        }, 500);

    }
);


/* =========================================================
   STUDY HUB
========================================================= */

let selectedClass = "";
let selectedFaculty = "";
let selectedSubject = "";


/*
   The faculty list is intentionally displayed after
   Class 11 / Class 12, matching the requested flow.
*/

const facultyData = {

    science: {
        name: "Science",

        subjects: [
            "Physics",
            "Chemistry",
            "Mathematics",
            "Biology",
            "Computer Science"
        ]
    },

    management: {
        name: "Management",

        subjects: [
            "Accounting",
            "Economics",
            "Business Studies",
            "Computer Science",
            "Mathematics"
        ]
    },

    humanities: {
        name: "Humanities",

        subjects: [
            "Sociology",
            "Economics",
            "Psychology",
            "Mass Communication",
            "Rural Development"
        ]
    },

    education: {
        name: "Education",

        subjects: [
            "Education",
            "Nepali",
            "English",
            "Economics",
            "Computer Science"
        ]
    }

};


const studyStepClass =
    $("#studyStepClass");

const studyStepFaculty =
    $("#studyStepFaculty");

const studyStepSubject =
    $("#studyStepSubject");

const studyStepResource =
    $("#studyStepResource");


function showStudyStep(step) {

    [
        studyStepClass,
        studyStepFaculty,
        studyStepSubject,
        studyStepResource
    ].forEach(item => {
        item?.classList.add("hidden");
    });

    step?.classList.remove("hidden");

    setTimeout(() => {

        step?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }, 50);

}


function resetStudy() {

    selectedClass = "";
    selectedFaculty = "";
    selectedSubject = "";

    showStudyStep(
        studyStepClass
    );

}


$$(".class-choice").forEach(button => {

    button.addEventListener("click", () => {

        selectedClass =
            button.dataset.class;

        $("#studyClassPath").textContent =
            `CLASS ${selectedClass}`;

        showStudyStep(
            studyStepFaculty
        );

    });

});


$$(".faculty-card").forEach(button => {

    button.addEventListener("click", () => {

        selectedFaculty =
            button.dataset.faculty;

        const faculty =
            facultyData[selectedFaculty];

        if (!faculty) return;

        $("#studyFacultyPath")
            .textContent =
            faculty.name.toUpperCase();

        $("#subjectHeading")
            .textContent =
            `${faculty.name} subjects`;

        const subjectGrid =
            $("#subjectGrid");

        subjectGrid.innerHTML =
            faculty.subjects
                .map(
                    (subject, index) => `

                    <button
                        class="subject-card"
                        data-subject="${escapeHTML(subject)}">

                        <strong>
                            ${escapeHTML(subject)}
                        </strong>

                        <small>
                            Subject resources
                        </small>

                        <b>→</b>

                    </button>

                    `
                )
                .join("");

        attachSubjectButtons();

        showStudyStep(
            studyStepSubject
        );

    });

});


function attachSubjectButtons() {

    $$(".subject-card").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedSubject =
                    button.dataset.subject;

                $("#studySubjectPath")
                    .textContent =
                    selectedSubject
                        .toUpperCase();

                $("#resourceHeading")
                    .textContent =
                    selectedSubject;

                $("#studyResourceResult")
                    .innerHTML = "";

                showStudyStep(
                    studyStepResource
                );

            }
        );

    });

}


/* BACK NAVIGATION */

$$("[data-study-back]").forEach(button => {

    button.addEventListener("click", () => {

        const target =
            button.dataset.studyBack;

        if (target === "class") {

            showStudyStep(
                studyStepClass
            );

            return;
        }

        if (target === "faculty") {

            showStudyStep(
                studyStepFaculty
            );

            return;
        }

        if (target === "subject") {

            showStudyStep(
                studyStepSubject
            );

        }

    });

});


/* RESOURCE BUTTONS */

$$(".resource-card").forEach(button => {

    button.addEventListener("click", () => {

        const resource =
            button.dataset.resource;

        const result =
            $("#studyResourceResult");

        const names = {

            notes: {
                title: "Notes",
                text:
                    `Notes for ${selectedSubject} can be organized here. Add your subject notes, chapter summaries and study material as the Study Hub grows.`
            },

            questions: {
                title: "Questions",
                text:
                    `Practice questions for ${selectedSubject} can be added here, including chapter questions, model questions and revision exercises.`
            },

            exams: {
                title: "Exam Preparation",
                text:
                    `Exam preparation resources for ${selectedSubject} can include revision checklists, important topics and practice schedules.`
            },

            neb: {
                title: "NEB Resources",
                text:
                    `NEB resources for ${selectedClass}, ${facultyData[selectedFaculty]?.name || ""} and ${selectedSubject} can be placed here.`
            }

        };

        const item =
            names[resource];

        if (!item) return;

        result.innerHTML = `

            <div class="study-message">

                <h4>
                    ${escapeHTML(item.title)}
                </h4>

                <p>
                    ${escapeHTML(item.text)}
                </p>

            </div>

        `;

    });

});


/* =========================================================
   CODING HUB
========================================================= */

const codingData = {

    c: {

        title: "C Programming",

        content: `
            <p>
                C is a structured programming language commonly
                used to learn programming fundamentals.
            </p>

            <div class="info-box">
                <strong>Core topics</strong>
                <p>
                    Variables, data types, input/output, operators,
                    conditions, loops, arrays, strings, functions
                    and pointers.
                </p>
            </div>
        `
    },

    html: {

        title: "HTML",

        content: `
            <p>
                HTML provides the structure of a webpage.
            </p>

            <div class="info-box">
                <strong>Core topics</strong>
                <p>
                    Elements, headings, paragraphs, links, images,
                    forms, tables and semantic structure.
                </p>
            </div>
        `
    },

    css: {

        title: "CSS",

        content: `
            <p>
                CSS controls the appearance and layout of webpages.
            </p>

            <div class="info-box">
                <strong>Core topics</strong>
                <p>
                    Selectors, box model, flexbox, grid, responsive
                    design, transitions and animations.
                </p>
            </div>
        `
    },

    javascript: {

        title: "JavaScript",

        content: `
            <p>
                JavaScript adds logic and interaction to webpages.
            </p>

            <div class="info-box">
                <strong>Core topics</strong>
                <p>
                    Variables, functions, arrays, objects, events,
                    DOM manipulation and browser APIs.
                </p>
            </div>
        `
    }

};


$$(".coding-card").forEach(button => {

    button.addEventListener("click", () => {

        const data =
            codingData[
                button.dataset.code
            ];

        if (!data) return;

        modalContent.innerHTML =
            toolShell(
                data.title,
                "Coding Hub resource",
                data.content
            );

        openModal(toolModal);

    });

});


/* =========================================================
   TOOL SHELL
========================================================= */

function toolShell(
    title,
    subtitle,
    body
) {

    return `

        <div class="tool-interface">

            <div class="tool-interface-header">

                <span class="section-label">
                    STUPIVOT TOOL
                </span>

                <h2>
                    ${title}
                </h2>

                <p>
                    ${subtitle}
                </p>

            </div>

            <div class="tool-body">

                ${body}

            </div>

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


function numberInput(
    id,
    label,
    placeholder = ""
) {

    return `

        <div class="form-group">

            <label for="${id}">
                ${label}
            </label>

            <input
                id="${id}"
                type="number"
                inputmode="decimal"
                placeholder="${placeholder}">

        </div>

    `;

}


function showToolError(message) {

    const error =
        $("#toolError");

    if (!error) return;

    error.textContent =
        message;

    error.classList.add(
        "visible"
    );

}


function clearToolError() {

    const error =
        $("#toolError");

    if (!error) return;

    error.textContent = "";

    error.classList.remove(
        "visible"
    );

}


function setToolResult(html) {

    const result =
        $("#toolResult");

    if (!result) return;

    result.innerHTML =
        html;

}


/* =========================================================
   OPEN TOOL
========================================================= */

$$(".open-tool").forEach(button => {

    button.addEventListener("click", () => {

        openTool(
            button.dataset.tool
        );

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
            html = dateTool();
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
            html = profitTool();
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
            html =
                toolShell(
                    "Tool unavailable",
                    "This tool is not configured.",
                    ""
                );

    }

    modalContent.innerHTML =
        html;

    openModal(
        toolModal
    );

    initializeTool(
        tool
    );

}


/* =========================================================
   INITIALIZE TOOL
========================================================= */

function initializeTool(tool) {

    const map = {

        gpa: initializeGPA,
        cgpa: initializeCGPA,
        percentage: initializePercentage,
        grade: initializeGrade,
        attendance: initializeAttendance,
        age: initializeAge,
        date: initializeDate,
        unit: initializeUnit,
        "bs-ad": initializeBSAD,
        "simple-interest":
            initializeSimpleInterest,
        "compound-interest":
            initializeCompoundInterest,
        discount: initializeDiscount,
        profit: initializeProfit,
        "word-counter":
            initializeWordCounter,
        "case-converter":
            initializeCaseConverter,
        "text-cleaner":
            initializeTextCleaner,
        qr: initializeQR,
        password: initializePassword,
        random: initializeRandom

    };

    map[tool]?.();

}


/* =========================================================
   GPA
========================================================= */

const gradeScale = [

    {
        min: 90,
        grade: "A+",
        point: 4
    },

    {
        min: 80,
        grade: "A",
        point: 3.6
    },

    {
        min: 70,
        grade: "B+",
        point: 3.2
    },

    {
        min: 60,
        grade: "B",
        point: 2.8
    },

    {
        min: 50,
        grade: "C+",
        point: 2.4
    },

    {
        min: 40,
        grade: "C",
        point: 2
    },

    {
        min: 35,
        grade: "D",
        point: 1.6
    },

    {
        min: 0,
        grade: "NG",
        point: 0
    }

];


function getGrade(percent) {

    return (
        gradeScale.find(
            item =>
                percent >= item.min
        )
        ||
        gradeScale.at(-1)
    );

}


function gpaTool() {

    return toolShell(

        "NEB GPA Calculator",

        "Enter subject marks and calculate the average grade point.",

        `

        <div class="tool-grid">

            ${Array.from(
                { length: 7 },
                (_, i) => `

                <div class="form-group">

                    <label>
                        Subject ${i + 1}
                    </label>

                    <input
                        class="gpa-mark"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Marks / 100">

                </div>

                `
            ).join("")}

        </div>

        <button
            class="primary-button"
            id="calculateGPA">

            Calculate GPA →

        </button>

        `

    );

}


function initializeGPA() {

    $("#calculateGPA")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const marks =
                        $$(".gpa-mark")
                            .map(
                                input =>
                                    getNumber(
                                        input.value,
                                        "Subject mark"
                                    )
                            );

                    if (!marks.length) {
                        throw new Error(
                            "Enter at least one mark."
                        );
                    }

                    if (
                        marks.some(
                            mark =>
                                mark < 0 ||
                                mark > 100
                        )
                    ) {
                        throw new Error(
                            "Marks must be between 0 and 100."
                        );
                    }

                    const rows =
                        marks.map(
                            mark => ({
                                mark,
                                ...getGrade(mark)
                            })
                        );

                    const gpa =
                        rows.reduce(
                            (sum, item) =>
                                sum + item.point,
                            0
                        )
                        /
                        rows.length;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${gpa.toFixed(2)}
                                </strong>

                                <span>
                                    GPA
                                </span>

                            </div>

                            <table class="result-table">

                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                        <th>Grade</th>
                                        <th>Point</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    ${rows
                                        .map(
                                            (row, i) => `
                                            <tr>
                                                <td>
                                                    ${i + 1}
                                                </td>
                                                <td>
                                                    ${row.mark}
                                                </td>
                                                <td>
                                                    ${row.grade}
                                                </td>
                                                <td>
                                                    ${row.point}
                                                </td>
                                            </tr>
                                            `
                                        )
                                        .join("")}

                                </tbody>

                            </table>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   CGPA
========================================================= */

function cgpaTool() {

    return toolShell(

        "CGPA Calculator",

        "Enter grade points. Add credits if you want a weighted result.",

        `

        <div class="form-group">

            <label>
                Calculation mode
            </label>

            <select id="cgpaMode">

                <option value="average">
                    Simple Average
                </option>

                <option value="weighted">
                    Credit Weighted
                </option>

            </select>

        </div>

        <div id="cgpaRows">

            ${createCGPARow(0)}
            ${createCGPARow(1)}
            ${createCGPARow(2)}

        </div>

        <button
            class="secondary-button"
            id="addCGPARow">

            + Add Subject

        </button>

        <button
            class="primary-button"
            id="calculateCGPA">

            Calculate CGPA →

        </button>

        `

    );

}


function createCGPARow(index) {

    return `

        <div
            class="subject-row cgpa-row"
            data-index="${index}">

            <div class="subject-number">
                ${index + 1}
            </div>

            <div class="subject-fields">

                <input
                    class="cgpa-point"
                    type="number"
                    min="0"
                    max="4"
                    step=".01"
                    placeholder="Grade point">

                <input
                    class="cgpa-credit"
                    type="number"
                    min="0"
                    step=".01"
                    placeholder="Credit">

            </div>

        </div>

    `;

}


function initializeCGPA() {

    let index = 3;

    $("#addCGPARow")
        ?.addEventListener(
            "click",
            () => {

                $("#cgpaRows")
                    .insertAdjacentHTML(
                        "beforeend",
                        createCGPARow(index)
                    );

                index++;

            }
        );


    $("#calculateCGPA")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const rows =
                        $$(".cgpa-row");

                    let points = [];
                    let credits = [];

                    rows.forEach(row => {

                        const pointInput =
                            $(".cgpa-point", row);

                        const creditInput =
                            $(".cgpa-credit", row);

                        if (
                            !pointInput.value.trim()
                        ) return;

                        const point =
                            getNumber(
                                pointInput.value,
                                "Grade point"
                            );

                        if (
                            point < 0 ||
                            point > 4
                        ) {
                            throw new Error(
                                "Grade points must be between 0 and 4."
                            );
                        }

                        points.push(point);

                        credits.push(
                            creditInput.value.trim()
                                ? getNumber(
                                    creditInput.value,
                                    "Credit"
                                )
                                : 1
                        );

                    });

                    if (!points.length) {
                        throw new Error(
                            "Enter at least one grade point."
                        );
                    }

                    const mode =
                        $("#cgpaMode").value;

                    let result;

                    if (
                        mode === "weighted"
                    ) {

                        const totalCredits =
                            credits.reduce(
                                (a,b) => a + b,
                                0
                            );

                        result =
                            points.reduce(
                                (sum, point, i) =>
                                    sum +
                                    point *
                                    credits[i],
                                0
                            )
                            /
                            totalCredits;

                    } else {

                        result =
                            points.reduce(
                                (a,b) => a + b,
                                0
                            )
                            /
                            points.length;

                    }

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${result.toFixed(2)}
                                </strong>

                                <span>
                                    CGPA
                                </span>

                            </div>

                            <div class="info-box">
                                ${
                                    mode === "weighted"
                                        ? "Credit-weighted calculation."
                                        : "Simple average calculation."
                                }
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   PERCENTAGE
========================================================= */

function percentageTool() {

    return toolShell(

        "Percentage Calculator",

        "Enter obtained marks and total marks.",

        `

        <div class="tool-grid">

            ${numberInput(
                "obtainedMarks",
                "Obtained Marks",
                "450"
            )}

            ${numberInput(
                "totalMarks",
                "Total Marks",
                "500"
            )}

        </div>

        <button
            class="primary-button"
            id="calculatePercentage">

            Calculate →

        </button>

        `

    );

}


function initializePercentage() {

    $("#calculatePercentage")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const obtained =
                        getNumber(
                            $("#obtainedMarks").value,
                            "Obtained marks"
                        );

                    const total =
                        getNumber(
                            $("#totalMarks").value,
                            "Total marks"
                        );

                    if (
                        total <= 0
                    ) {
                        throw new Error(
                            "Total marks must be greater than zero."
                        );
                    }

                    if (
                        obtained < 0 ||
                        obtained > total
                    ) {
                        throw new Error(
                            "Obtained marks must be between 0 and total marks."
                        );
                    }

                    const percentage =
                        obtained / total * 100;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${percentage.toFixed(2)}%
                                </strong>

                                <span>
                                    Percentage
                                </span>

                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   GRADE
========================================================= */

function gradeTool() {

    return toolShell(

        "Marks & Grade",

        "Enter your percentage.",

        `

        ${numberInput(
            "gradePercentage",
            "Percentage",
            "85"
        )}

        <button
            class="primary-button"
            id="calculateGrade">

            Find Grade →

        </button>

        `

    );

}


function initializeGrade() {

    $("#calculateGrade")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const percentage =
                        getNumber(
                            $("#gradePercentage").value,
                            "Percentage"
                        );

                    if (
                        percentage < 0 ||
                        percentage > 100
                    ) {
                        throw new Error(
                            "Percentage must be between 0 and 100."
                        );
                    }

                    const grade =
                        getGrade(
                            percentage
                        );

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${grade.grade}
                                </strong>

                                <span>
                                    ${grade.point} GPA
                                </span>

                            </div>

                            <div class="info-box">
                                ${percentage}% corresponds to
                                grade ${grade.grade}.
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   ATTENDANCE
========================================================= */

function attendanceTool() {

    return toolShell(

        "Attendance Calculator",

        "Calculate your current attendance and target requirements.",

        `

        <div class="tool-grid">

            ${numberInput(
                "classesPresent",
                "Classes Attended",
                "40"
            )}

            ${numberInput(
                "classesTotal",
                "Total Classes",
                "50"
            )}

            ${numberInput(
                "targetAttendance",
                "Target %",
                "80"
            )}

        </div>

        <button
            class="primary-button"
            id="calculateAttendance">

            Calculate →

        </button>

        `

    );

}


function initializeAttendance() {

    $("#calculateAttendance")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const present =
                        getNumber(
                            $("#classesPresent").value,
                            "Classes attended"
                        );

                    const total =
                        getNumber(
                            $("#classesTotal").value,
                            "Total classes"
                        );

                    const target =
                        getNumber(
                            $("#targetAttendance").value,
                            "Target attendance"
                        );

                    if (
                        total <= 0 ||
                        present < 0 ||
                        present > total
                    ) {
                        throw new Error(
                            "Enter valid attendance values."
                        );
                    }

                    if (
                        target <= 0 ||
                        target > 100
                    ) {
                        throw new Error(
                            "Target must be between 0 and 100."
                        );
                    }

                    const current =
                        present / total * 100;

                    let message = "";

                    if (
                        current >= target
                    ) {

                        message =
                            "You are currently at or above your target attendance.";

                    } else {

                        /*
                           x classes must be attended consecutively
                           so that:
                           (present+x)/(total+x) >= target/100
                        */

                        const required =
                            Math.ceil(
                                (
                                    target * total -
                                    100 * present
                                )
                                /
                                (100 - target)
                            );

                        message =
                            `You need to attend approximately ${required} more class(es) consecutively to reach ${target}%.`;

                    }

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${current.toFixed(2)}%
                                </strong>

                                <span>
                                    Current attendance
                                </span>

                            </div>

                            <div class="info-box">
                                ${message}
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   AGE
========================================================= */

function ageTool() {

    return toolShell(

        "Age Calculator",

        "Select your date of birth.",

        `

        <div class="form-group">

            <label>
                Date of Birth
            </label>

            <input
                id="dateOfBirth"
                type="date">

        </div>

        <button
            class="primary-button"
            id="calculateAge">

            Calculate Age →

        </button>

        `

    );

}


function initializeAge() {

    $("#calculateAge")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const value =
                        $("#dateOfBirth").value;

                    if (!value) {
                        throw new Error(
                            "Select your date of birth."
                        );
                    }

                    const dob =
                        new Date(
                            value + "T00:00:00"
                        );

                    const now =
                        new Date();

                    if (dob > now) {
                        throw new Error(
                            "Date of birth cannot be in the future."
                        );
                    }

                    let years =
                        now.getFullYear() -
                        dob.getFullYear();

                    let months =
                        now.getMonth() -
                        dob.getMonth();

                    let days =
                        now.getDate() -
                        dob.getDate();

                    if (days < 0) {

                        months--;

                        const previousMonth =
                            new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                0
                            );

                        days +=
                            previousMonth.getDate();

                    }

                    if (months < 0) {

                        years--;
                        months += 12;

                    }

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${years}
                                </strong>

                                <span>
                                    years old
                                </span>

                            </div>

                            <div class="info-box">
                                ${years} years,
                                ${months} months and
                                ${days} days.
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   DATE DIFFERENCE
========================================================= */

function dateTool() {

    return toolShell(

        "Date Difference",

        "Find the difference between two dates.",

        `

        <div class="tool-grid">

            <div class="form-group">

                <label>
                    Start Date
                </label>

                <input
                    id="dateStart"
                    type="date">

            </div>

            <div class="form-group">

                <label>
                    End Date
                </label>

                <input
                    id="dateEnd"
                    type="date">

            </div>

        </div>

        <button
            class="primary-button"
            id="calculateDate">

            Calculate Difference →

        </button>

        `

    );

}


function initializeDate() {

    $("#calculateDate")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const start =
                        $("#dateStart").value;

                    const end =
                        $("#dateEnd").value;

                    if (!start || !end) {
                        throw new Error(
                            "Select both dates."
                        );
                    }

                    const a =
                        new Date(
                            start + "T00:00:00"
                        );

                    const b =
                        new Date(
                            end + "T00:00:00"
                        );

                    const difference =
                        Math.abs(
                            b - a
                        );

                    const days =
                        Math.round(
                            difference /
                            86400000
                        );

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${days}
                                </strong>

                                <span>
                                    days
                                </span>

                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   UNIT CONVERTER
========================================================= */

function unitTool() {

    return toolShell(

        "Unit Converter",

        "Convert common units.",

        `

        <div class="tool-grid">

            <div class="form-group">

                <label>
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

                </select>

            </div>


            ${numberInput(
                "unitValue",
                "Value",
                "10"
            )}

        </div>


        <div class="tool-grid">

            <div class="form-group">

                <label>
                    From
                </label>

                <select id="unitFrom"></select>

            </div>


            <div class="form-group">

                <label>
                    To
                </label>

                <select id="unitTo"></select>

            </div>

        </div>


        <button
            class="primary-button"
            id="convertUnit">

            Convert →

        </button>

        `

    );

}


const units = {

    length: {
        m: 1,
        km: 1000,
        cm: .01,
        mm: .001,
        ft: .3048,
        inch: .0254
    },

    weight: {
        kg: 1,
        g: .001,
        mg: .000001,
        lb: .45359237
    },

    temperature: {
        C: "C",
        F: "F",
        K: "K"
    }

};


function initializeUnit() {

    const category =
        $("#unitCategory");

    const from =
        $("#unitFrom");

    const to =
        $("#unitTo");


    function populate() {

        const data =
            units[
                category.value
            ];

        from.innerHTML =
            Object.keys(data)
                .map(
                    key =>
                        `<option value="${key}">
                            ${key}
                        </option>`
                )
                .join("");

        to.innerHTML =
            Object.keys(data)
                .map(
                    key =>
                        `<option value="${key}">
                            ${key}
                        </option>`
                )
                .join("");

    }


    populate();


    category.addEventListener(
        "change",
        populate
    );


    $("#convertUnit")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const value =
                        getNumber(
                            $("#unitValue").value,
                            "Value"
                        );

                    const type =
                        category.value;

                    let result;


                    if (
                        type === "temperature"
                    ) {

                        result =
                            convertTemperature(
                                value,
                                from.value,
                                to.value
                            );

                    } else {

                        const base =
                            value *
                            units[type][
                                from.value
                            ];

                        result =
                            base /
                            units[type][
                                to.value
                            ];

                    }


                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${formatNumber(result)}
                                </strong>

                                <span>
                                    ${to.value}
                                </span>

                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


function convertTemperature(
    value,
    from,
    to
) {

    let celsius;

    if (from === "C") {
        celsius = value;
    }

    else if (from === "F") {
        celsius =
            (value - 32) * 5 / 9;
    }

    else {
        celsius =
            value - 273.15;
    }


    if (to === "C") {
        return celsius;
    }

    if (to === "F") {
        return celsius * 9 / 5 + 32;
    }

    return celsius + 273.15;

}


function formatNumber(number) {

    return Number(
        number.toFixed(8)
    ).toLocaleString();

}


/* =========================================================
   BS / AD
========================================================= */

function bsAdTool() {

    return toolShell(

        "BS ↔ AD Converter",

        "Enter a date and use the available conversion direction.",

        `

        <div class="info-box">

            <strong>
                Important
            </strong>

            <p>
                Accurate Bikram Sambat conversion requires a
                complete calendar dataset. This interface is
                prepared for the conversion engine and does not
                pretend that a fixed year subtraction is exact.
            </p>

        </div>

        <div class="tool-grid">

            <div class="form-group">

                <label>
                    Direction
                </label>

                <select id="bsDirection">

                    <option value="ad-bs">
                        AD → BS
                    </option>

                    <option value="bs-ad">
                        BS → AD
                    </option>

                </select>

            </div>

            <div class="form-group">

                <label>
                    Date
                </label>

                <input
                    id="bsDate"
                    type="date">

            </div>

        </div>

        <button
            class="primary-button"
            id="convertBS">

            Convert →

        </button>

        `

    );

}


function initializeBSAD() {

    $("#convertBS")
        ?.addEventListener(
            "click",
            () => {

                const direction =
                    $("#bsDirection").value;

                const date =
                    $("#bsDate").value;

                if (!date) {

                    showToolError(
                        "Select a date."
                    );

                    return;
                }

                setToolResult(`

                    <div class="result-card">

                        <div class="info-box">

                            <strong>
                                ${direction === "ad-bs"
                                    ? "AD → BS"
                                    : "BS → AD"}
                            </strong>

                            <p>
                                Calendar conversion requires
                                a full BS calendar dataset.
                                The interface is ready for
                                the dataset to be connected.
                            </p>

                        </div>

                    </div>

                `);

            }
        );

}


/* =========================================================
   SIMPLE INTEREST
========================================================= */

function simpleInterestTool() {

    return toolShell(

        "Simple Interest",

        "Use SI = P × R × T / 100.",

        `

        <div class="tool-grid">

            ${numberInput(
                "siPrincipal",
                "Principal",
                "10000"
            )}

            ${numberInput(
                "siRate",
                "Rate (%)",
                "5"
            )}

            ${numberInput(
                "siTime",
                "Time (years)",
                "2"
            )}

        </div>

        <button
            class="primary-button"
            id="calculateSI">

            Calculate →

        </button>

        `

    );

}


function initializeSimpleInterest() {

    $("#calculateSI")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const P =
                        getNumber(
                            $("#siPrincipal").value,
                            "Principal"
                        );

                    const R =
                        getNumber(
                            $("#siRate").value,
                            "Rate"
                        );

                    const T =
                        getNumber(
                            $("#siTime").value,
                            "Time"
                        );

                    const interest =
                        P * R * T / 100;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${formatNumber(interest)}
                                </strong>

                                <span>
                                    Interest
                                </span>

                            </div>

                            <div class="info-box">
                                Total amount:
                                ${formatNumber(
                                    P + interest
                                )}
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   COMPOUND INTEREST
========================================================= */

function compoundInterestTool() {

    return toolShell(

        "Compound Interest",

        "Calculate compound growth.",

        `

        <div class="tool-grid">

            ${numberInput(
                "ciPrincipal",
                "Principal",
                "10000"
            )}

            ${numberInput(
                "ciRate",
                "Annual Rate (%)",
                "5"
            )}

            ${numberInput(
                "ciTime",
                "Time (years)",
                "2"
            )}

            ${numberInput(
                "ciFrequency",
                "Compounds / year",
                "1"
            )}

        </div>

        <button
            class="primary-button"
            id="calculateCI">

            Calculate →

        </button>

        `

    );

}


function initializeCompoundInterest() {

    $("#calculateCI")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearToolError();

                    const P =
                        getNumber(
                            $("#ciPrincipal").value,
                            "Principal"
                        );

                    const R =
                        getNumber(
                            $("#ciRate").value,
                            "Rate"
                        );

                    const T =
                        getNumber(
                            $("#ciTime").value,
                            "Time"
                        );

                    const n =
                        getNumber(
                            $("#ciFrequency").value,
                            "Frequency"
                        );

                    if (n <= 0) {
                        throw new Error(
                            "Compounding frequency must be greater than zero."
                        );
                    }

                    const amount =
                        P *
                        Math.pow(
                            1 + R / 100 / n,
                            n * T
                        );

                    const interest =
                        amount - P;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${formatNumber(amount)}
                                </strong>

                                <span>
                                    Total Amount
                                </span>

                            </div>

                            <div class="info-box">
                                Compound interest:
                                ${formatNumber(interest)}
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   DISCOUNT
========================================================= */

function discountTool() {

    return toolShell(

        "Discount Calculator",

        "Calculate discount and final selling price.",

        `

        <div class="tool-grid">

            ${numberInput(
                "discountPrice",
                "Original Price",
                "1000"
            )}

            ${numberInput(
                "discountRate",
                "Discount (%)",
                "10"
            )}

        </div>

        <button
            class="primary-button"
            id="calculateDiscount">

            Calculate →

        </button>

        `

    );

}


function initializeDiscount() {

    $("#calculateDiscount")
        ?.addEventListener(
            "click",
            () => {

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
                            "Discount"
                        );

                    if (
                        rate < 0 ||
                        rate > 100
                    ) {
                        throw new Error(
                            "Discount must be between 0 and 100%."
                        );
                    }

                    const amount =
                        price * rate / 100;

                    const finalPrice =
                        price - amount;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${formatNumber(finalPrice)}
                                </strong>

                                <span>
                                    Final Price
                                </span>

                            </div>

                            <div class="info-box">
                                Discount:
                                ${formatNumber(amount)}
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   PROFIT / LOSS
========================================================= */

function profitTool() {

    return toolShell(

        "Profit & Loss",

        "Enter cost price and selling price.",

        `

        <div class="tool-grid">

            ${numberInput(
                "costPrice",
                "Cost Price",
                "1000"
            )}

            ${numberInput(
                "sellingPrice",
                "Selling Price",
                "1200"
            )}

        </div>

        <button
            class="primary-button"
            id="calculateProfit">

            Calculate →

        </button>

        `

    );

}


function initializeProfit() {

    $("#calculateProfit")
        ?.addEventListener(
            "click",
            () => {

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
                            "Cost price must be greater than zero."
                        );
                    }

                    const difference =
                        selling - cost;

                    const percentage =
                        Math.abs(
                            difference
                        )
                        /
                        cost
                        *
                        100;

                    const type =
                        difference > 0
                            ? "Profit"
                            : difference < 0
                                ? "Loss"
                                : "No Profit / No Loss";

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${formatNumber(
                                        Math.abs(difference)
                                    )}
                                </strong>

                                <span>
                                    ${type}
                                </span>

                            </div>

                            <div class="info-box">
                                ${percentage.toFixed(2)}%
                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   WORD COUNTER
========================================================= */

function wordCounterTool() {

    return toolShell(

        "Word Counter",

        "Count words, characters and lines.",

        `

        <textarea
            id="wordText"
            class="tool-textarea"
            placeholder="Type or paste your text here...">
        </textarea>

        <button
            class="primary-button"
            id="countWords">

            Count →

        </button>

        `

    );

}


function initializeWordCounter() {

    $("#countWords")
        ?.addEventListener(
            "click",
            () => {

                const text =
                    $("#wordText").value;

                const trimmed =
                    text.trim();

                const words =
                    trimmed
                        ? trimmed.split(/\s+/).length
                        : 0;

                const characters =
                    text.length;

                const charactersNoSpaces =
                    text.replace(
                        /\s/g,
                        ""
                    ).length;

                const lines =
                    text
                        ? text.split(/\r?\n/).length
                        : 0;

                setToolResult(`

                    <div class="result-card">

                        <div class="tool-grid">

                            <div class="info-box">
                                <strong>
                                    ${words}
                                </strong>
                                <p>Words</p>
                            </div>

                            <div class="info-box">
                                <strong>
                                    ${characters}
                                </strong>
                                <p>Characters</p>
                            </div>

                            <div class="info-box">
                                <strong>
                                    ${charactersNoSpaces}
                                </strong>
                                <p>No spaces</p>
                            </div>

                            <div class="info-box">
                                <strong>
                                    ${lines}
                                </strong>
                                <p>Lines</p>
                            </div>

                        </div>

                    </div>

                `);

            }
        );

}


/* =========================================================
   CASE CONVERTER
========================================================= */

function caseConverterTool() {

    return toolShell(

        "Case Converter",

        "Convert your text into different cases.",

        `

        <textarea
            id="caseText"
            class="tool-textarea"
            placeholder="Enter your text...">
        </textarea>

        <div class="tool-grid">

            <button
                class="secondary-button case-btn"
                data-case="upper">

                UPPERCASE

            </button>

            <button
                class="secondary-button case-btn"
                data-case="lower">

                lowercase

            </button>

            <button
                class="secondary-button case-btn"
                data-case="title">

                Title Case

            </button>

            <button
                class="secondary-button case-btn"
                data-case="sentence">

                Sentence case

            </button>

        </div>

        <textarea
            id="caseResult"
            class="tool-textarea"
            readonly
            placeholder="Result...">
        </textarea>

        `

    );

}


function initializeCaseConverter() {

    $$(".case-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const text =
                    $("#caseText").value;

                const type =
                    button.dataset.case;

                let result = text;

                if (type === "upper") {
                    result =
                        text.toUpperCase();
                }

                if (type === "lower") {
                    result =
                        text.toLowerCase();
                }

                if (type === "title") {

                    result =
                        text.toLowerCase()
                            .replace(
                                /\b\w/g,
                                char =>
                                    char.toUpperCase()
                            );

                }

                if (
                    type === "sentence"
                ) {

                    result =
                        text.toLowerCase()
                            .replace(
                                /(^\s*\w|[.!?]\s+\w)/g,
                                match =>
                                    match.toUpperCase()
                            );

                }

                $("#caseResult").value =
                    result;

            }
        );

    });

}


/* =========================================================
   TEXT CLEANER
========================================================= */

function textCleanerTool() {

    return toolShell(

        "Text Cleaner",

        "Clean repeated spaces and unnecessary blank lines.",

        `

        <textarea
            id="cleanText"
            class="tool-textarea"
            placeholder="Enter text...">
        </textarea>

        <button
            class="primary-button"
            id="cleanTextButton">

            Clean Text →

        </button>

        <textarea
            id="cleanResult"
            class="tool-textarea"
            readonly
            placeholder="Cleaned text...">
        </textarea>

        `

    );

}


function initializeTextCleaner() {

    $("#cleanTextButton")
        ?.addEventListener(
            "click",
            () => {

                const text =
                    $("#cleanText").value;

                const cleaned =
                    text
                        .replace(
                            /[ \t]+/g,
                            " "
                        )
                        .replace(
                            /\n{3,}/g,
                            "\n\n"
                        )
                        .split("\n")
                        .map(
                            line =>
                                line.trim()
                        )
                        .join("\n")
                        .trim();

                $("#cleanResult").value =
                    cleaned;

            }
        );

}


/* =========================================================
   QR GENERATOR
========================================================= */

function qrTool() {

    return toolShell(

        "QR Generator",

        "Generate a QR code from text or a URL.",

        `

        <input
            id="qrText"
            type="text"
            placeholder="https://example.com">

        <button
            class="primary-button"
            id="generateQR">

            Generate QR →

        </button>

        <div
            id="qrResult"
            class="tool-result">
        </div>

        `

    );

}


function initializeQR() {

    $("#generateQR")
        ?.addEventListener(
            "click",
            () => {

                const text =
                    $("#qrText").value.trim();

                if (!text) {

                    showToolError(
                        "Enter text or a URL."
                    );

                    return;

                }

                const encoded =
                    encodeURIComponent(
                        text
                    );

                /*
                   Uses a public QR image endpoint.
                   No user account is required.
                */

                $("#qrResult").innerHTML = `

                    <div class="result-card">

                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encoded}"
                            alt="Generated QR code"
                            width="250"
                            height="250">

                    </div>

                `;

            }
        );

}


/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function passwordTool() {

    return toolShell(

        "Password Generator",

        "Generate a random password in your browser.",

        `

        <div class="tool-grid">

            ${numberInput(
                "passwordLength",
                "Length",
                "16"
            )}

            <div class="form-group">

                <label>
                    Character sets
                </label>

                <select id="passwordType">

                    <option value="strong">
                        Letters + Numbers + Symbols
                    </option>

                    <option value="letters">
                        Letters only
                    </option>

                    <option value="numbers">
                        Numbers only
                    </option>

                </select>

            </div>

        </div>

        <button
            class="primary-button"
            id="generatePassword">

            Generate →

        </button>

        <input
            id="passwordResult"
            type="text"
            readonly
            placeholder="Generated password">

        `

    );

}


function initializePassword() {

    $("#generatePassword")
        ?.addEventListener(
            "click",
            () => {

                try {

                    const length =
                        Math.floor(
                            getNumber(
                                $("#passwordLength").value,
                                "Length"
                            )
                        );

                    if (
                        length < 4 ||
                        length > 100
                    ) {
                        throw new Error(
                            "Length must be between 4 and 100."
                        );
                    }

                    const type =
                        $("#passwordType").value;

                    let chars =
                        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

                    if (
                        type === "numbers"
                    ) {
                        chars =
                            "0123456789";
                    }

                    if (
                        type === "strong"
                    ) {
                        chars +=
                            "0123456789!@#$%^&*()_+-=[]{}";
                    }

                    let result = "";

                    const array =
                        new Uint32Array(
                            length
                        );

                    crypto.getRandomValues(
                        array
                    );

                    for (
                        let i = 0;
                        i < length;
                        i++
                    ) {

                        result +=
                            chars[
                                array[i] %
                                chars.length
                            ];

                    }

                    $("#passwordResult")
                        .value =
                        result;

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   RANDOM NUMBER
========================================================= */

function randomTool() {

    return toolShell(

        "Random Number Generator",

        "Generate a random number between a minimum and maximum.",

        `

        <div class="tool-grid">

            ${numberInput(
                "randomMin",
                "Minimum",
                "1"
            )}

            ${numberInput(
                "randomMax",
                "Maximum",
                "100"
            )}

        </div>

        <button
            class="primary-button"
            id="generateRandom">

            Generate →

        </button>

        `

    );

}


function initializeRandom() {

    $("#generateRandom")
        ?.addEventListener(
            "click",
            () => {

                try {

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

                    if (max < min) {

                        throw new Error(
                            "Maximum must be greater than or equal to minimum."
                        );

                    }

                    const result =
                        Math.floor(
                            Math.random() *
                            (
                                max -
                                min +
                                1
                            )
                        )
                        +
                        min;

                    setToolResult(`

                        <div class="result-card">

                            <div class="result-main">

                                <strong>
                                    ${result}
                                </strong>

                                <span>
                                    Random number
                                </span>

                            </div>

                        </div>

                    `);

                }

                catch (error) {

                    showToolError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   ARTICLES
========================================================= */

const ARTICLES = {

    "study-routine": {

        category: "STUDY",

        title:
            "Building a Better Study Routine",

        content: `

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
                StuPivot's Study Hub can be used alongside normal
                class notes and textbooks to organize additional practice.
            </p>

        `

    },


    "computer-science": {

        category:
            "COMPUTER SCIENCE",

        title:
            "Why Computer Science Matters",

        content: `

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


    "website": {

        category:
            "TECHNOLOGY",

        title:
            "What Happens When You Open a Website?",

        content: `

            <p>
                When you enter a website address, your browser needs
                to locate the server associated with that address and
                request the website's resources.
            </p>

            <p>
                The server sends files such as HTML, CSS and JavaScript
                back to the browser. The browser interprets those files
                and builds the page you see.
            </p>

            <p>
                This involves technologies including DNS, HTTP/HTTPS,
                servers and browsers.
            </p>

        `

    },


    "stupivot-tools": {

        category:
            "TOOLS",

        title:
            "Using StuPivot Effectively",

        content: `

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
                writing, conversion and everyday student tasks.
            </p>

        `

    },


    "bs-ad": {

        category:
            "CALENDAR",

        title:
            "BS and AD Calendar Conversion",

        content: `

            <p>
                Bikram Sambat and the Gregorian calendar use different
                calendar systems.
            </p>

            <p>
                A simple subtraction of a fixed number of years is
                not sufficient for accurate conversion because Nepali
                calendar month lengths vary.
            </p>

            <p>
                A proper BS calendar dataset is required for accurate
                date conversion.
            </p>

        `

    }

};


$$(".read-article")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.article;

                const article =
                    ARTICLES[id];

                if (!article) {

                    showToast(
                        "Article not found."
                    );

                    return;
                }

                articleContent.innerHTML = `

                    <span class="article-category">
                        ${escapeHTML(
                            article.category
                        )}
                    </span>

                    <h1>
                        ${escapeHTML(
                            article.title
                        )}
                    </h1>

                    ${article.content}

                `;

                openModal(
                    articleModal
                );

            }
        );

    });


/* =========================================================
   LEGAL
========================================================= */

const LEGAL = {

    privacy: {

        title:
            "Privacy Policy",

        content: `

            <p>
                StuPivot is designed as a student-focused website.
                The site may receive information that users voluntarily
                submit through its forms.
            </p>

            <p>
                Calculator inputs and many browser-based tools are
                processed locally in the browser.
            </p>

            <p>
                Contact and feedback forms are handled through the
                configured form service.
            </p>

        `

    },


    terms: {

        title:
            "Terms of Use",

        content: `

            <p>
                StuPivot provides educational and utility tools for
                general student use.
            </p>

            <p>
                Calculator results should be checked when accuracy is
                important, especially for academic submissions or
                financial calculations.
            </p>

            <p>
                By using StuPivot, users agree to use the tools
                responsibly and for lawful purposes.
            </p>

        `

    }

};


$$(".legal-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const item =
                    LEGAL[
                        button.dataset.legal
                    ];

                if (!item) return;

                legalContent.innerHTML = `

                    <span class="article-category">
                        STUPIVOT INFORMATION
                    </span>

                    <h1>
                        ${escapeHTML(
                            item.title
                        )}
                    </h1>

                    ${item.content}

                `;

                openModal(
                    legalModal
                );

            }
        );

    });


/* =========================================================
   SEARCH ENGINE
========================================================= */

const searchableItems = [

    {
        title: "GPA Calculator",
        type: "Calculator",
        target: "calculators",
        keywords:
            "gpa neb marks grade class 10 class 11 class 12"
    },

    {
        title: "CGPA Calculator",
        type: "Calculator",
        target: "calculators",
        keywords:
            "cgpa grade point credit academic"
    },

    {
        title: "Percentage Calculator",
        type: "Calculator",
        target: "calculators",
        keywords:
            "percentage marks percent"
    },

    {
        title: "Attendance Calculator",
        type: "Calculator",
        target: "calculators",
        keywords:
            "attendance school classes target"
    },

    {
        title: "Study Hub",
        type: "Study",
        target: "study",
        keywords:
            "class 11 class 12 science management humanities education notes questions exam neb subjects"
    },

    {
        title: "Coding Hub",
        type: "Coding",
        target: "coding",
        keywords:
            "c html css javascript programming coding"
    },

    {
        title: "Online Tools",
        type: "Tools",
        target: "tools",
        keywords:
            "word counter case converter text cleaner qr password random"
    },

    {
        title:
            "Building a Better Study Routine",
        type: "Article",
        target: "articles",
        keywords:
            "study routine revision active recall"
    },

    {
        title:
            "Why Computer Science Matters",
        type: "Article",
        target: "articles",
        keywords:
            "computer science programming algorithms"
    },

    {
        title:
            "What Happens When You Open a Website?",
        type: "Article",
        target: "articles",
        keywords:
            "website browser server dns http"
    }

];


const siteSearch =
    $("#siteSearch");

const searchResults =
    $("#searchResults");


function runSearch() {

    const query =
        siteSearch.value
            .trim()
            .toLowerCase();

    if (!query) {

        searchResults.innerHTML = "";

        return;

    }

    const results =
        searchableItems
            .filter(item => {

                const text =
                    (
                        item.title +
                        " " +
                        item.type +
                        " " +
                        item.keywords
                    )
                    .toLowerCase();

                return text.includes(
                    query
                );

            });


    if (!results.length) {

        searchResults.innerHTML = `

            <div class="search-result">

                <strong>
                    Nothing found
                </strong>

                <small>
                    Try another search term.
                </small>

            </div>

        `;

        return;
    }


    searchResults.innerHTML =
        results
            .map(
                item => `

                <div
                    class="search-result"
                    data-target="${item.target}">

                    <strong>
                        ${escapeHTML(
                            item.title
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            item.type
                        )}
                    </small>

                </div>

                `
            )
            .join("");


    $$(".search-result")
        .forEach(result => {

            result.addEventListener(
                "click",
                () => {

                    const target =
                        document.getElementById(
                            result.dataset.target
                        );

                    target?.scrollIntoView({
                        behavior: "smooth"
                    });

                }
            );

        });

}


$("#searchButton")
    ?.addEventListener(
        "click",
        runSearch
    );


siteSearch?.addEventListener(
    "input",
    runSearch
);


siteSearch?.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            runSearch();

        }

    }
);


/* =========================================================
   FORM UX
========================================================= */

function setupForm(formSelector) {

    const form =
        $(formSelector);

    if (!form) return;

    form.addEventListener(
        "submit",
        () => {

            const button =
                $("button[type='submit']", form);

            if (!button) return;

            button.disabled = true;

            const original =
                button.textContent;

            button.textContent =
                "Sending...";

            /*
               Restore the button after a short delay.
               If Formspree redirects, this simply has no
               visible effect. If submission fails locally,
               the button becomes usable again.
            */

            setTimeout(() => {

                button.disabled = false;
                button.textContent =
                    original;

            }, 5000);

        }
    );

}


setupForm(
    "#feedbackForm"
);

setupForm(
    "#contactForm"
);


/* =========================================================
   HASH NAVIGATION
========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        navLinks?.classList.remove(
            "active"
        );

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );

    }
);


/* =========================================================
   FINAL SAFETY
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);
