/* =========================================================
   STUPIVOT — MAIN JAVASCRIPT
   Clean integrated version
   ========================================================= */

"use strict";

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const money = value =>
    Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 2
    });

const num = (value, label = "Value") => {

    const text =
        String(value ?? "").trim();

    if (!text) {
        throw new Error(`${label} is required.`);
    }

    if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(text)) {
        throw new Error(
            `${label} must be a valid number.`
        );
    }

    const result = Number(text);

    if (!Number.isFinite(result)) {
        throw new Error(`${label} is invalid.`);
    }

    return result;
};

const esc = value =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const localDate = value => {

    const [
        year,
        month,
        day
    ] = value.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
};

const validISODate = value => {

    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
        return false;
    }

    const [
        year,
        month,
        day
    ] = value.split("-").map(Number);

    const date =
        new Date(
            year,
            month - 1,
            day
        );

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
};

function scrollToId(id) {

    document
        .getElementById(id)
        ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

}

function clearError() {

    const errorBox =
        $("#toolError");

    if (!errorBox) return;

    errorBox.textContent = "";

    errorBox.classList.remove("visible");

}

function showError(message) {

    const errorBox =
        $("#toolError");

    if (!errorBox) return;

    errorBox.textContent =
        message;

    errorBox.classList.add("visible");

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function showToast(
    message,
    type = "normal"
) {

    const toast =
        $("#toast");

    if (!toast) return;

    toast.textContent =
        message;

    toast.className =
        "toast show";

    if (type === "error") {

        toast.classList.add(
            "toast-error"
        );

    }

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            3200
        );

}


/* =========================================================
   YEAR
   ========================================================= */

if ($("#year")) {

    $("#year").textContent =
        new Date().getFullYear();

}


/* =========================================================
   MODALS
   ========================================================= */

const toolModal =
    $("#toolModal");

const articleModal =
    $("#articleModal");

const legalModal =
    $("#legalModal");

const modalContent =
    $("#modalContent");

const articleContent =
    $("#articleContent");

const legalContent =
    $("#legalContent");


function openModal(modal) {

    if (!modal) return;

    modal.classList.add(
        "active"
    );

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

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    const anotherOpen =
        toolModal?.classList.contains("active") ||
        articleModal?.classList.contains("active") ||
        legalModal?.classList.contains("active");

    if (!anotherOpen) {

        document.body.classList.remove(
            "modal-open"
        );

    }

}


$("#modalClose")
    ?.addEventListener(
        "click",
        () => closeModal(toolModal)
    );

$("#articleClose")
    ?.addEventListener(
        "click",
        () => closeModal(articleModal)
    );

$("#legalClose")
    ?.addEventListener(
        "click",
        () => closeModal(legalModal)
    );


$$(".modal")
    .forEach(modal => {

        $(".modal-overlay", modal)
            ?.addEventListener(
                "click",
                () => closeModal(modal)
            );

    });


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }

        closeModal(toolModal);
        closeModal(articleModal);
        closeModal(legalModal);

    }
);


/* =========================================================
   MOBILE MENU + NAVIGATION
   ========================================================= */

const menuBtn =
    $("#menuBtn");

const navLinks =
    $("#navLinks");


menuBtn?.addEventListener(
    "click",
    () => {

        navLinks?.classList.toggle(
            "active"
        );

        menuBtn.classList.toggle(
            "active"
        );

        menuBtn.setAttribute(
            "aria-expanded",
            String(
                navLinks?.classList.contains(
                    "active"
                )
            )
        );

    }
);


$$(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks?.classList.remove(
                    "active"
                );

                menuBtn?.classList.remove(
                    "active"
                );

                menuBtn?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* =========================================================
   QUICK ACCESS
   ========================================================= */

$$(".quick-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                scrollToId(
                    card.dataset.scroll
                );

            }
        );

    });


/* =========================================================
   THEME
   ========================================================= */

const savedTheme =
    localStorage.getItem(
        "stupivot-theme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light-mode"
    );

}


$("#themeToggle")
    ?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );

            localStorage.setItem(
                "stupivot-theme",
                document.body.classList.contains(
                    "light-mode"
                )
                    ? "light"
                    : "dark"
            );

        }
    );


/* =========================================================
   SEARCH OPEN
   ========================================================= */

$("#searchOpen")
    ?.addEventListener(
        "click",
        () => {

            scrollToId(
                "search"
            );

            setTimeout(
                () => {
                    $("#siteSearch")?.focus();
                },
                450
            );

        }
    );


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
                    ${esc(title)}
                </h2>

                <p>
                    ${esc(subtitle)}
                </p>

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


function inputField(
    id,
    label,
    placeholder = "",
    type = "text"
) {

    return `

        <div class="form-group">

            <label for="${id}">
                ${esc(label)}
            </label>

            <input
                id="${id}"
                type="${type}"
                ${
                    type === "text"
                        ? 'inputmode="decimal"'
                        : ""
                }
                placeholder="${esc(
                    placeholder
                )}"
                autocomplete="off">

        </div>

    `;

}


/* =========================================================
   GRADE SCALE
   ========================================================= */

const GRADE_SCALE = [

    {
        min: 90,
        grade: "A+",
        point: 4.0
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
        point: 2.0
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


function gradeFor(percent) {

    return (
        GRADE_SCALE.find(
            item =>
                percent >= item.min
        ) ||
        GRADE_SCALE[
            GRADE_SCALE.length - 1
        ]
    );

}


/* =========================================================
   NEB FACULTIES
   ENGLISH + NEPALI IN EVERY FACULTY
   ========================================================= */

const NEB_FACULTIES = {

    science: {

        name: "Science",

        subjects: [

            "English",
            "Nepali",
            "Physics",
            "Chemistry",
            "Biology",
            "Mathematics",
            "Computer Science"

        ]

    },

    management: {

        name: "Management",

        subjects: [

            "English",
            "Nepali",
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

            "English",
            "Nepali",
            "Sociology",
            "Rural Development",
            "Mass Communication",
            "Psychology",
            "Economics"

        ]

    },

    education: {

        name: "Education",

        subjects: [

            "English",
            "Nepali",
            "Education",
            "Economics",
            "Computer Science"

        ]

    },

    law: {

        name: "Law",

        subjects: [

            "English",
            "Nepali",
            "Legal Studies",
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


/* =========================================================
   TOOL OPENING
   ========================================================= */

const TOOL_RENDERERS = {

    gpa: renderGPATool,

    cgpa: renderCGPATool,

    percentage: renderPercentageTool,

    grade: renderGradeTool,

    attendance: renderAttendanceTool,

    age: renderAgeTool,

    date: renderDateTool,

    unit: renderUnitTool,

    "bs-ad": renderBSADTool,

    "simple-interest": renderSITool,

    "compound-interest":
        renderCITool,

    discount:
        renderDiscountTool,

    profit:
        renderProfitTool,

    "word-counter":
        renderWordCounterTool,

    "case-converter":
        renderCaseConverterTool,

    "text-cleaner":
        renderTextCleanerTool,

    qr:
        renderQRTool,

    password:
        renderPasswordTool,

    random:
        renderRandomTool

};


$$(".open-tool")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openTool(
                    button.dataset.tool
                );

            }
        );

    });


function openTool(tool) {

    const renderer =
        TOOL_RENDERERS[tool];

    if (
        !renderer ||
        !modalContent
    ) {

        showToast(
            "This tool is not available yet.",
            "error"
        );

        return;

    }

    modalContent.innerHTML =
        renderer();

    openModal(
        toolModal
    );

    try {

        initializeTool(
            tool
        );

    } catch (error) {

        showError(
            error.message ||
            "Could not initialize the tool."
        );

    }

}


function initializeTool(tool) {

    const initializers = {

        gpa: initGPA,

        cgpa: initCGPA,

        percentage:
            initPercentage,

        grade:
            initGrade,

        attendance:
            initAttendance,

        age:
            initAge,

        date:
            initDateDifference,

        unit:
            initUnit,

        "bs-ad":
            initBSAD,

        "simple-interest":
            initSI,

        "compound-interest":
            initCI,

        discount:
            initDiscount,

        profit:
            initProfit,

        "word-counter":
            initWordCounter,

        "case-converter":
            initCaseConverter,

        "text-cleaner":
            initTextCleaner,

        qr:
            initQR,

        password:
            initPassword,

        random:
            initRandom

    };

    initializers[tool]?.();

}


/* =========================================================
   GPA CALCULATOR
   ========================================================= */

function renderGPATool() {

    return toolShell(

        "NEB GPA Calculator",

        "Choose Class 10, 11 or 12, then enter subject marks.",

        `

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

        <div id="gpaDynamicArea"></div>

        `

    );

}


function initGPA() {

    $("#gpaClass")
        ?.addEventListener(
            "change",
            event => {

                const area =
                    $("#gpaDynamicArea");

                if (!area) return;

                if (!event.target.value) {

                    area.innerHTML = "";

                    return;

                }

                if (
                    event.target.value === "10"
                ) {

                    renderClass10GPA(
                        area
                    );

                } else {

                    renderClass11GPA(
                        area,
                        event.target.value
                    );

                }

            }
        );

}


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

            <p>
                Enter marks out of 100
                for all seven subjects.
            </p>

        </div>

        <div class="subject-list">

            ${
                subjects
                    .map(
                        (name, i) => `

                        <div class="subject-row">

                            <div
                                class="subject-number">
                                ${i + 1}
                            </div>

                            <div
                                class="subject-fields">

                                <input
                                    id="class10Name${i}"
                                    type="text"
                                    placeholder="${esc(name)} name">

                                <input
                                    id="class10Marks${i}"
                                    type="text"
                                    inputmode="decimal"
                                    placeholder="Marks / 100">

                            </div>

                        </div>

                    `
                    )
                    .join("")
            }

        </div>

        <button
            type="button"
            class="primary-button calculate-button"
            id="calculateClass10GPA">

            Calculate GPA

        </button>

    `;


    $("#calculateClass10GPA")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const result = [];

                    for (
                        let i = 0;
                        i < subjects.length;
                        i++
                    ) {

                        const name =
                            $(
                                "#class10Name" +
                                i
                            )
                                .value
                                .trim();

                        if (!name) {

                            throw new Error(
                                `Please enter Subject ${i + 1} name.`
                            );

                        }

                        const marks =
                            num(
                                $(
                                    "#class10Marks" +
                                    i
                                ).value,
                                `${name} marks`
                            );

                        if (
                            marks < 0 ||
                            marks > 100
                        ) {

                            throw new Error(
                                `${name} must be between 0 and 100.`
                            );

                        }

                        const g =
                            gradeFor(
                                marks
                            );

                        result.push({

                            name,

                            marks,

                            grade:
                                g.grade,

                            point:
                                g.point

                        });

                    }

                    const gpa =
                        result.reduce(
                            (
                                total,
                                subject
                            ) =>
                                total +
                                subject.point,
                            0
                        ) /
                        result.length;

                    renderGPAResult(
                        result,
                        gpa,
                        "Class 10"
                    );

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


function renderClass11GPA(
    area,
    selectedClass
) {

    area.innerHTML = `

        <div class="calculator-info">

            <strong>
                Class ${selectedClass}
            </strong>

            <p>
                Choose a faculty.
                English and Nepali are
                included in every faculty.
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

                ${
                    Object.entries(
                        NEB_FACULTIES
                    )
                    .map(
                        ([key, faculty]) =>
                            `
                            <option value="${key}">
                                ${esc(
                                    faculty.name
                                )}
                            </option>
                            `
                    )
                    .join("")
                }

            </select>

        </div>

        <div id="facultySubjects"></div>

    `;


    $("#gpaFaculty")
        ?.addEventListener(
            "change",
            event => {

                const faculty =
                    NEB_FACULTIES[
                        event.target.value
                    ];

                const subjectArea =
                    $("#facultySubjects");

                if (!subjectArea) return;

                if (!faculty) {

                    subjectArea.innerHTML =
                        "";

                    return;

                }

                renderFacultySubjects(
                    subjectArea,
                    selectedClass,
                    faculty
                );

            }
        );

}


function renderFacultySubjects(
    area,
    selectedClass,
    faculty
) {

    const subjects =
        [
            ...new Set(
                [
                    ...COMMON_NEB_SUBJECTS,
                    ...faculty.subjects
                ]
            )
        ]
        .slice(0, 7);


    area.innerHTML = `

        <div class="calculator-info">

            <p>
                English and Nepali are included
                in this faculty.
                Enter final marks out of 100.
            </p>

        </div>

        <div class="subject-list">

            ${
                subjects
                    .map(
                        (subject, i) =>
                            `

                            <div
                                class="subject-row">

                                <div
                                    class="subject-number">

                                    ${i + 1}

                                </div>

                                <div
                                    class="subject-fields">

                                    <input
                                        id="nebName${i}"
                                        type="text"
                                        value="${esc(subject)}">

                                    <input
                                        id="nebMarks${i}"
                                        type="text"
                                        inputmode="decimal"
                                        placeholder="Marks / 100">

                                </div>

                            </div>

                            `
                    )
                    .join("")
            }

        </div>

        <button
            type="button"
            class="primary-button calculate-button"
            id="calculateNEBGPA">

            Calculate Class
            ${selectedClass} GPA

        </button>

    `;


    $("#calculateNEBGPA")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const result = [];

                    for (
                        let i = 0;
                        i < subjects.length;
                        i++
                    ) {

                        const name =
                            $(
                                "#nebName" +
                                i
                            )
                                .value
                                .trim();

                        if (!name) {

                            throw new Error(
                                `Please enter Subject ${i + 1} name.`
                            );

                        }

                        const marks =
                            num(
                                $(
                                    "#nebMarks" +
                                    i
                                ).value,
                                `${name} marks`
                            );

                        if (
                            marks < 0 ||
                            marks > 100
                        ) {

                            throw new Error(
                                `${name} must be between 0 and 100.`
                            );

                        }

                        const g =
                            gradeFor(
                                marks
                            );

                        result.push({

                            name,

                            marks,

                            grade:
                                g.grade,

                            point:
                                g.point

                        });

                    }

                    const gpa =
                        result.reduce(
                            (
                                total,
                                subject
                            ) =>
                                total +
                                subject.point,
                            0
                        ) /
                        result.length;

                    renderGPAResult(
                        result,
                        gpa,
                        `Class ${selectedClass}`
                    );

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


function renderGPAResult(
    rows,
    gpa,
    label
) {

    $("#toolResult").innerHTML = `

        <div class="result-header">

            <span>
                GPA RESULT
            </span>

            <strong>
                ${gpa.toFixed(2)}
            </strong>

            <small>
                ${esc(label)}
            </small>

        </div>

        <div class="result-table">

            ${
                rows
                    .map(
                        row => `

                        <div class="result-row">

                            <span>
                                ${esc(row.name)}
                            </span>

                            <span>
                                ${money(row.marks)}
                            </span>

                            <span>
                                ${row.grade}
                            </span>

                            <span>
                                ${row.point.toFixed(1)}
                            </span>

                        </div>

                        `
                    )
                    .join("")
            }

        </div>

    `;

}


/* =========================================================
   CGPA CALCULATOR
   ========================================================= */

function renderCGPATool() {

    return toolShell(

        "CGPA Calculator",

        "Use equal-credit or credit-weighted entries.",

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
                Number of entries
            </label>

            <input
                id="cgpaCount"
                type="text"
                inputmode="numeric"
                placeholder="Example: 6">

        </div>

        <div id="cgpaRows"></div>

        <div class="button-row">

            <button
                type="button"
                class="secondary-button"
                id="createCGPARows">

                Create Fields

            </button>

            <button
                type="button"
                class="primary-button"
                id="calculateCGPA">

                Calculate CGPA

            </button>

        </div>

        `

    );

}


function initCGPA() {

    $("#createCGPARows")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const count =
                        Number(
                            $("#cgpaCount").value
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

                    renderCGPARows(
                        count
                    );

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );


    $("#calculateCGPA")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const rows =
                        $$(".cgpa-row");

                    if (!rows.length) {

                        throw new Error(
                            "Create the fields first."
                        );

                    }

                    const weighted =
                        $(
                            "#cgpaMode"
                        ).value ===
                        "weighted";

                    let numerator = 0;
                    let denominator = 0;

                    rows.forEach(
                        (_, i) => {

                            const gp =
                                num(
                                    $(
                                        "#cgpaGP" +
                                        i
                                    ).value,
                                    `Grade point ${i + 1}`
                                );

                            if (
                                gp < 0 ||
                                gp > 4
                            ) {

                                throw new Error(
                                    `Grade point ${i + 1} must be between 0 and 4.`
                                );

                            }

                            if (weighted) {

                                const credit =
                                    num(
                                        $(
                                            "#cgpaCredit" +
                                            i
                                        ).value,
                                        `Credit ${i + 1}`
                                    );

                                if (
                                    credit <= 0
                                ) {

                                    throw new Error(
                                        `Credit ${i + 1} must be greater than 0.`
                                    );

                                }

                                numerator +=
                                    gp *
                                    credit;

                                denominator +=
                                    credit;

                            } else {

                                numerator +=
                                    gp;

                                denominator++;

                            }

                        }
                    );

                    const cgpa =
                        numerator /
                        denominator;

                    $("#toolResult")
                        .innerHTML = `

                        <div class="result-header">

                            <span>
                                CGPA
                            </span>

                            <strong>
                                ${cgpa.toFixed(2)}
                            </strong>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


function renderCGPARows(count) {

    const weighted =
        $("#cgpaMode").value ===
        "weighted";

    $("#cgpaRows")
        .innerHTML = `

        <div class="cgpa-list">

            ${
                Array.from(
                    { length: count },
                    (_, i) =>
                        `

                        <div
                            class="cgpa-row">

                            <span>
                                ${i + 1}
                            </span>

                            <input
                                id="cgpaGP${i}"
                                type="text"
                                inputmode="decimal"
                                placeholder="Grade Point">

                            ${
                                weighted
                                    ? `
                                    <input
                                        id="cgpaCredit${i}"
                                        type="text"
                                        inputmode="decimal"
                                        placeholder="Credit Hours">
                                    `
                                    : ""
                            }

                        </div>

                        `
                ).join("")
            }

        </div>

    `;

}


/* =========================================================
   PERCENTAGE
   ========================================================= */

function renderPercentageTool() {

    return toolShell(

        "Percentage Calculator",

        "Calculate percentage from obtained and total marks.",

        `

        ${inputField(
            "percentageObtained",
            "Obtained Marks",
            "Example: 425"
        )}

        ${inputField(
            "percentageTotal",
            "Total Marks",
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


function initPercentage() {

    $("#calculatePercentage")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const obtained =
                        num(
                            $(
                                "#percentageObtained"
                            ).value,
                            "Obtained marks"
                        );

                    const total =
                        num(
                            $(
                                "#percentageTotal"
                            ).value,
                            "Total marks"
                        );

                    if (
                        total <= 0 ||
                        obtained < 0 ||
                        obtained > total
                    ) {

                        throw new Error(
                            "Enter valid obtained and total marks."
                        );

                    }

                    const percentage =
                        obtained /
                        total *
                        100;

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                PERCENTAGE
                            </span>

                            <strong>
                                ${percentage.toFixed(2)}%
                            </strong>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   MARKS + GRADE
   ========================================================= */

function renderGradeTool() {

    return toolShell(

        "Marks & Grade",

        "Calculate percentage, grade and grade point.",

        `

        ${inputField(
            "gradeObtained",
            "Obtained Marks",
            "Example: 82"
        )}

        ${inputField(
            "gradeTotal",
            "Full Marks",
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


function initGrade() {

    $("#calculateGrade")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const obtained =
                        num(
                            $(
                                "#gradeObtained"
                            ).value,
                            "Obtained marks"
                        );

                    const total =
                        num(
                            $(
                                "#gradeTotal"
                            ).value,
                            "Full marks"
                        );

                    if (
                        total <= 0 ||
                        obtained < 0 ||
                        obtained > total
                    ) {

                        throw new Error(
                            "Enter valid marks."
                        );

                    }

                    const percent =
                        obtained /
                        total *
                        100;

                    const grade =
                        gradeFor(
                            percent
                        );

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

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

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   ATTENDANCE
   ========================================================= */

function renderAttendanceTool() {

    return toolShell(

        "Attendance Calculator",

        "Calculate your attendance and target.",

        `

        ${inputField(
            "attendancePresent",
            "Classes Attended",
            "Example: 42"
        )}

        ${inputField(
            "attendanceTotal",
            "Total Classes",
            "Example: 50"
        )}

        ${inputField(
            "attendanceTarget",
            "Target Attendance %",
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


function initAttendance() {

    $("#calculateAttendance")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const attended =
                        num(
                            $(
                                "#attendancePresent"
                            ).value,
                            "Attended classes"
                        );

                    const total =
                        num(
                            $(
                                "#attendanceTotal"
                            ).value,
                            "Total classes"
                        );

                    const target =
                        num(
                            $(
                                "#attendanceTarget"
                            ).value,
                            "Target attendance"
                        );

                    if (
                        total <= 0 ||
                        attended < 0 ||
                        attended > total ||
                        target < 0 ||
                        target > 100
                    ) {

                        throw new Error(
                            "Enter valid attendance values."
                        );

                    }

                    const current =
                        attended /
                        total *
                        100;

                    let message;

                    if (
                        current >= target
                    ) {

                        message =
                            `You meet the ${target}% target.`;

                    } else if (
                        target >= 100
                    ) {

                        message =
                            "A 100% target cannot be reached after missed classes.";

                    } else {

                        const needed =
                            Math.ceil(
                                (
                                    target *
                                    total /
                                    100 -
                                    attended
                                ) /
                                (
                                    1 -
                                    target /
                                    100
                                )
                            );

                        message =
                            `Attend about ${needed} more class(es) without missing one.`;

                    }

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                ATTENDANCE
                            </span>

                            <strong>
                                ${current.toFixed(2)}%
                            </strong>

                            <small>
                                ${esc(message)}
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   AGE
   ========================================================= */

function renderAgeTool() {

    return toolShell(

        "Age Calculator",

        "Calculate exact age from your date of birth.",

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


function initAge() {

    $("#calculateAge")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const value =
                        $("#dateOfBirth")
                        .value;

                    if (!value) {

                        throw new Error(
                            "Please select your date of birth."
                        );

                    }

                    const dob =
                        localDate(
                            value
                        );

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

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                YOUR AGE
                            </span>

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

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   DATE DIFFERENCE
   ========================================================= */

function renderDateTool() {

    return toolShell(

        "Date Difference",

        "Find the difference between two dates.",

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


function initDateDifference() {

    $("#calculateDateDifference")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const first =
                        $("#dateOne")
                        .value;

                    const second =
                        $("#dateTwo")
                        .value;

                    if (
                        !first ||
                        !second
                    ) {

                        throw new Error(
                            "Please select both dates."
                        );

                    }

                    const date1 =
                        localDate(first);

                    const date2 =
                        localDate(second);

                    const days =
                        Math.round(
                            Math.abs(
                                date2 - date1
                            ) /
                            86400000
                        );

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                DATE DIFFERENCE
                            </span>

                            <strong>
                                ${days.toLocaleString()}
                                days
                            </strong>

                            <small>
                                ${Math.floor(
                                    days / 7
                                ).toLocaleString()}
                                weeks
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   UNIT CONVERTER
   ========================================================= */

const UNITS = {

    length: {

        meter: 1,

        kilometer: 1000,

        centimeter: 0.01,

        millimeter: 0.001,

        mile: 1609.344,

        yard: 0.9144,

        foot: 0.3048,

        inch: 0.0254

    },

    weight: {

        kilogram: 1,

        gram: 0.001,

        milligram: 0.000001,

        pound: 0.45359237,

        ounce: 0.028349523125

    },

    time: {

        second: 1,

        minute: 60,

        hour: 3600,

        day: 86400

    },

    temperature: {

        celsius: 1,

        fahrenheit: 2,

        kelvin: 3

    }

};


function labelize(value) {

    return String(value)
        .replace(/-/g, " ")
        .replace(
            /\b\w/g,
            char =>
                char.toUpperCase()
        );

}


function renderUnitTool() {

    return toolShell(

        "Unit Converter",

        "Convert common units.",

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

        ${inputField(
            "unitValue",
            "Value",
            "Example: 12.5"
        )}

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


function initUnit() {

    const category =
        $("#unitCategory");

    const update =
        () => {

            const type =
                category.value;

            const options =
                Object.keys(
                    UNITS[type]
                );

            $("#unitFrom")
                .innerHTML =
                    options
                        .map(
                            option =>
                                `
                                <option value="${option}">
                                    ${labelize(option)}
                                </option>
                                `
                        )
                        .join("");

            $("#unitTo")
                .innerHTML =
                    options
                        .map(
                            option =>
                                `
                                <option value="${option}">
                                    ${labelize(option)}
                                </option>
                                `
                        )
                        .join("");

        };


    update();


    category?.addEventListener(
        "change",
        update
    );


    $("#convertUnit")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const value =
                        num(
                            $("#unitValue")
                                .value,
                            "Value"
                        );

                    const type =
                        category.value;

                    const from =
                        $("#unitFrom")
                            .value;

                    const to =
                        $("#unitTo")
                            .value;

                    let result;

                    if (
                        type !==
                        "temperature"
                    ) {

                        result =
                            value *
                            UNITS[type][from] /
                            UNITS[type][to];

                    } else {

                        let celsius =
                            value;

                        if (
                            from ===
                            "fahrenheit"
                        ) {

                            celsius =
                                (
                                    value -
                                    32
                                ) *
                                5 /
                                9;

                        }

                        if (
                            from ===
                            "kelvin"
                        ) {

                            celsius =
                                value -
                                273.15;

                        }

                        if (
                            to ===
                            "celsius"
                        ) {

                            result =
                                celsius;

                        } else if (
                            to ===
                            "fahrenheit"
                        ) {

                            result =
                                celsius *
                                9 /
                                5 +
                                32;

                        } else {

                            result =
                                celsius +
                                273.15;

                        }

                    }

                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                RESULT
                            </span>

                            <strong>
                                ${money(result)}
                            </strong>

                            <small>
                                ${labelize(from)}
                                →
                                ${labelize(to)}
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   BS ↔ AD CONVERTER
   ========================================================= */

/* =========================================================
   BS ↔ AD CONVERTER
   Uses @remotemerge/nepali-date-converter
   ========================================================= */

function renderBSADTool() {

    return toolShell(
        "BS ↔ AD Converter",
        "Convert Bikram Sambat and Gregorian dates.",
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

            <label
                for="calendarDate"
                id="calendarDateLabel">

                BS Date

            </label>

            <input
                type="text"
                id="calendarDate"
                inputmode="numeric"
                autocomplete="off"
                placeholder="2080-01-15">

            <small
                class="input-help"
                id="calendarDateHelp">

                Enter BS date as YYYY-MM-DD.

            </small>

        </div>


        <button
            type="button"
            class="primary-button"
            id="convertCalendar">

            Convert Date →

        </button>


        <div class="calculator-note">

            Example:
            2080-01-15 BS
            =
            2023-04-28 AD

        </div>

        `
    );

}


function initBSAD() {

    const direction =
        $("#calendarDirection");

    const dateInput =
        $("#calendarDate");

    const label =
        $("#calendarDateLabel");

    const help =
        $("#calendarDateHelp");


    const updateDirection = () => {

        const bsMode =
            direction.value === "bs-ad";


        label.textContent =
            bsMode
                ? "BS Date"
                : "AD Date";


        dateInput.placeholder =
            bsMode
                ? "2080-01-15"
                : "2023-04-28";


        help.textContent =
            bsMode
                ? "Enter BS date as YYYY-MM-DD."
                : "Enter AD date as YYYY-MM-DD.";


        clearError();


        const result =
            $("#toolResult");

        if (result) {
            result.innerHTML = "";
        }

    };


    direction?.addEventListener(
        "change",
        updateDirection
    );


    updateDirection();


    $("#convertCalendar")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();


                    let input =
                        normalizeDigits(
                            dateInput.value.trim()
                        );


                    input =
                        input
                            .replace(
                                /[\/\.\s]/g,
                                "-"
                            )
                            .replace(
                                /-{2,}/g,
                                "-"
                            );


                    if (
                        !/^\d{4}-\d{1,2}-\d{1,2}$/
                            .test(input)
                    ) {

                        throw new Error(
                            "Please use YYYY-MM-DD format."
                        );

                    }


                    const [
                        year,
                        month,
                        day
                    ] =
                        input
                            .split("-")
                            .map(Number);


                    /*
                     * IMPORTANT:
                     * The remotemerge library exposes
                     * window.DateConverter
                     */

                    const DateConverter =
                        window.DateConverter;


                    if (
                        typeof DateConverter !==
                        "function"
                    ) {

                        throw new Error(
                            "DateConverter did not load. Make sure the converter <script> is above script.js in index.html."
                        );

                    }


                    let converted;


                    /* =====================================
                       BS → AD
                       ===================================== */

                    if (
                        direction.value ===
                        "bs-ad"
                    ) {

                        const bsString =
                            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


                        const converter =
                            new DateConverter(
                                bsString
                            );


                        converted =
                            converter.toAd();


                        if (
                            !converted ||
                            typeof converted.year !==
                                "number" ||
                            typeof converted.month !==
                                "number" ||
                            typeof converted.date !==
                                "number"
                        ) {

                            throw new Error(
                                "Invalid BS date."
                            );

                        }


                    }


                    /* =====================================
                       AD → BS
                       ===================================== */

                    else {

                        const adString =
                            `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;


                        /*
                         * Validate actual Gregorian date
                         */

                        if (
                            !validISODate(
                                adString
                            )
                        ) {

                            throw new Error(
                                "Please enter a real Gregorian date."
                            );

                        }


                        const converter =
                            new DateConverter(
                                adString
                            );


                        converted =
                            converter.toBs();


                        if (
                            !converted ||
                            typeof converted.year !==
                                "number" ||
                            typeof converted.month !==
                                "number" ||
                            typeof converted.date !==
                                "number"
                        ) {

                            throw new Error(
                                "Invalid AD date."
                            );

                        }

                    }


                    const result =
                        `${converted.year}-${String(converted.month).padStart(2, "0")}-${String(converted.date).padStart(2, "0")}`;


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>

                                ${
                                    direction.value ===
                                    "bs-ad"

                                        ? "AD DATE"

                                        : "BS DATE"

                                }

                            </span>


                            <strong>

                                ${esc(result)}

                            </strong>


                            <small>

                                ${
                                    direction.value ===
                                    "bs-ad"

                                        ? "Bikram Sambat → Gregorian"

                                        : "Gregorian → Bikram Sambat"

                                }

                            </small>

                        </div>

                    `;


                } catch (error) {

                    showError(
                        error.message ||
                        "Date conversion failed."
                    );

                }

            }
        );

}


function normalizeDigits(value) {

    const map = {

        "०": "0",
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9"

    };


    return value.replace(
        /[०-९]/g,
        digit =>
            map[digit]
    );

}

function normalizeNepaliDigits(value) {

    const map = {

        "०": "0",
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9"

    };

    return value.replace(
        /[०-९]/g,
        digit =>
            map[digit]
    );

}


function initBSAD() {

    const direction =
        $("#calendarDirection");

    const dateInput =
        $("#calendarDate");

    const label =
        $("#calendarDateLabel");

    const help =
        $("#calendarDateHelp");


    const update =
        () => {

            const isBS =
                direction.value ===
                "bs-ad";

            label.textContent =
                isBS
                    ? "BS Date"
                    : "AD Date";

            dateInput.placeholder =
                isBS
                    ? "2080-01-15"
                    : "2023-04-28";

            help.textContent =
                isBS

                    ? "Enter BS date as YYYY-MM-DD."

                    : "Enter AD date as YYYY-MM-DD.";

            clearError();

            $("#toolResult")
                .innerHTML = "";

        };


    direction?.addEventListener(
        "change",
        update
    );


    update();


    $("#convertCalendar")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    let input =
                        normalizeNepaliDigits(
                            dateInput
                                .value
                                .trim()
                        );


                    input =
                        input
                            .replace(
                                /[\/\.\s]/g,
                                "-"
                            )
                            .replace(
                                /-{2,}/g,
                                "-"
                            );


                    if (
                        !/^\d{4}-\d{1,2}-\d{1,2}$/
                            .test(input)
                    ) {

                        throw new Error(
                            "Use YYYY-MM-DD format."
                        );

                    }


                    const [
                        year,
                        month,
                        day
                    ] =
                        input
                            .split("-")
                            .map(Number);


                    const NepaliDate =
                        window.NepaliDate;


                    if (
                        typeof NepaliDate !==
                        "function"
                    ) {

                        throw new Error(
                            "The Nepali date library did not load. Check the converter script in index.html."
                        );

                    }


                    let result;


                    /* -----------------------------------------
                       BS → AD
                       ----------------------------------------- */

                    if (
                        direction.value ===
                        "bs-ad"
                    ) {

                        if (
                            year < 1975 ||
                            year > 2100
                        ) {

                            throw new Error(
                                "BS year is outside the supported range."
                            );

                        }


                        const bs =
                            new NepaliDate(
                                `${
                                    year
                                }-${
                                    String(
                                        month
                                    ).padStart(
                                        2,
                                        "0"
                                    )
                                }-${
                                    String(
                                        day
                                    ).padStart(
                                        2,
                                        "0"
                                    )
                                }`
                            );


                        const ad =
                            bs.getAD();


                        if (
                            !ad ||
                            !Number.isFinite(
                                ad.year
                            ) ||
                            !Number.isFinite(
                                ad.month
                            ) ||
                            !Number.isFinite(
                                ad.date
                            )
                        ) {

                            throw new Error(
                                "Invalid BS date."
                            );

                        }


                        result =
                            `${
                                ad.year
                            }-${
                                String(
                                    ad.month
                                ).padStart(
                                    2,
                                    "0"
                                )
                            }-${
                                String(
                                    ad.date
                                ).padStart(
                                    2,
                                    "0"
                                )
                            }`;

                    }


                    /* -----------------------------------------
                       AD → BS
                       ----------------------------------------- */

                    else {

                        if (
                            !validISODate(
                                input
                            )
                        ) {

                            throw new Error(
                                "Please enter a real Gregorian date."
                            );

                        }


                        const adDate =
                            new Date(
                                year,
                                month - 1,
                                day
                            );


                        const bs =
                            new NepaliDate(
                                adDate
                            );


                        result =
                            `${
                                bs.getYear()
                            }-${
                                String(
                                    bs.getMonth()
                                ).padStart(
                                    2,
                                    "0"
                                )
                            }-${
                                String(
                                    bs.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                )
                            }`;

                    }


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                ${
                                    direction.value ===
                                    "bs-ad"
                                        ? "AD DATE"
                                        : "BS DATE"
                                }
                            </span>

                            <strong>
                                ${esc(result)}
                            </strong>

                            <small>
                                ${
                                    direction.value ===
                                    "bs-ad"

                                        ? "Bikram Sambat → Gregorian"

                                        : "Gregorian → Bikram Sambat"
                                }
                            </small>

                        </div>

                    `;


                } catch (error) {

                    showError(
                        error.message ||
                        "Date conversion failed."
                    );

                }

            }
        );

}


/* =========================================================
   SIMPLE INTEREST
   ========================================================= */

function renderSITool() {

    return toolShell(

        "Simple Interest",

        "Calculate simple interest and total amount.",

        `

        ${inputField(
            "siPrincipal",
            "Principal",
            "Example: 10000"
        )}

        ${inputField(
            "siRate",
            "Rate (%)",
            "Example: 5"
        )}

        ${inputField(
            "siTime",
            "Time (years)",
            "Example: 2"
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


function initSI() {

    $("#calculateSI")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const principal =
                        num(
                            $("#siPrincipal")
                                .value,
                            "Principal"
                        );

                    const rate =
                        num(
                            $("#siRate")
                                .value,
                            "Rate"
                        );

                    const time =
                        num(
                            $("#siTime")
                                .value,
                            "Time"
                        );

                    if (
                        principal < 0 ||
                        rate < 0 ||
                        time < 0
                    ) {

                        throw new Error(
                            "Values cannot be negative."
                        );

                    }

                    const interest =
                        principal *
                        rate *
                        time /
                        100;


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                SIMPLE INTEREST
                            </span>

                            <strong>
                                ${money(interest)}
                            </strong>

                            <small>
                                Total amount:
                                ${money(
                                    principal +
                                    interest
                                )}
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   COMPOUND INTEREST
   ========================================================= */

function renderCITool() {

    return toolShell(

        "Compound Interest",

        "Calculate compound interest.",

        `

        ${inputField(
            "ciPrincipal",
            "Principal",
            "Example: 10000"
        )}

        ${inputField(
            "ciRate",
            "Annual Rate (%)",
            "Example: 5"
        )}

        ${inputField(
            "ciTime",
            "Time (years)",
            "Example: 2"
        )}

        ${inputField(
            "ciFrequency",
            "Compounds per year",
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


function initCI() {

    $("#calculateCI")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const principal =
                        num(
                            $("#ciPrincipal")
                                .value,
                            "Principal"
                        );

                    const rate =
                        num(
                            $("#ciRate")
                                .value,
                            "Annual rate"
                        );

                    const time =
                        num(
                            $("#ciTime")
                                .value,
                            "Time"
                        );

                    const frequency =
                        num(
                            $("#ciFrequency")
                                .value,
                            "Frequency"
                        );


                    if (
                        principal < 0 ||
                        rate < 0 ||
                        time < 0 ||
                        frequency <= 0
                    ) {

                        throw new Error(
                            "Enter valid values."
                        );

                    }


                    const amount =
                        principal *
                        Math.pow(
                            1 +
                            rate /
                            (
                                100 *
                                frequency
                            ),
                            frequency *
                            time
                        );


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                COMPOUND INTEREST
                            </span>

                            <strong>
                                ${money(
                                    amount -
                                    principal
                                )}
                            </strong>

                            <small>
                                Total amount:
                                ${money(amount)}
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   DISCOUNT
   ========================================================= */

function renderDiscountTool() {

    return toolShell(

        "Discount Calculator",

        "Calculate discount and final price.",

        `

        ${inputField(
            "discountPrice",
            "Original Price",
            "Example: 2500"
        )}

        ${inputField(
            "discountRate",
            "Discount (%)",
            "Example: 15"
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


function initDiscount() {

    $("#calculateDiscount")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const price =
                        num(
                            $("#discountPrice")
                                .value,
                            "Original price"
                        );

                    const rate =
                        num(
                            $("#discountRate")
                                .value,
                            "Discount rate"
                        );


                    if (
                        price < 0 ||
                        rate < 0 ||
                        rate > 100
                    ) {

                        throw new Error(
                            "Enter valid discount values."
                        );

                    }


                    const discount =
                        price *
                        rate /
                        100;


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                DISCOUNT
                            </span>

                            <strong>
                                ${money(
                                    discount
                                )}
                            </strong>

                            <small>
                                Final price:
                                ${money(
                                    price -
                                    discount
                                )}
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   PROFIT / LOSS
   ========================================================= */

function renderProfitTool() {

    return toolShell(

        "Profit & Loss",

        "Calculate profit or loss.",

        `

        ${inputField(
            "costPrice",
            "Cost Price",
            "Example: 1000"
        )}

        ${inputField(
            "sellingPrice",
            "Selling Price",
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


function initProfit() {

    $("#calculateProfit")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const cost =
                        num(
                            $("#costPrice")
                                .value,
                            "Cost price"
                        );

                    const selling =
                        num(
                            $("#sellingPrice")
                                .value,
                            "Selling price"
                        );


                    if (
                        cost <= 0
                    ) {

                        throw new Error(
                            "Cost price must be greater than 0."
                        );

                    }


                    const difference =
                        selling -
                        cost;


                    const percentage =
                        Math.abs(
                            difference /
                            cost *
                            100
                        );


                    const type =
                        difference > 0
                            ? "PROFIT"
                            : difference < 0
                                ? "LOSS"
                                : "NO PROFIT / NO LOSS";


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                ${type}
                            </span>

                            <strong>
                                ${money(
                                    Math.abs(
                                        difference
                                    )
                                )}
                            </strong>

                            <small>
                                ${percentage.toFixed(2)}%
                            </small>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   WORD COUNTER
   ========================================================= */

function renderWordCounterTool() {

    return toolShell(

        "Word Counter",

        "Count words and characters in your text.",

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

                <strong
                    id="wordCount">
                    0
                </strong>

                <span>
                    Words
                </span>

            </div>


            <div>

                <strong
                    id="characterCount">
                    0
                </strong>

                <span>
                    Characters
                </span>

            </div>


            <div>

                <strong
                    id="characterNoSpaceCount">
                    0
                </strong>

                <span>
                    No Spaces
                </span>

            </div>


            <div>

                <strong
                    id="lineCount">
                    0
                </strong>

                <span>
                    Lines
                </span>

            </div>

        </div>

        `

    );

}


function initWordCounter() {

    const text =
        $("#wordCounterText");

    if (!text) return;


    const update =
        () => {

            const value =
                text.value;


            $("#wordCount")
                .textContent =
                    value.trim()
                        ? value
                            .trim()
                            .split(/\s+/)
                            .length
                        : 0;


            $("#characterCount")
                .textContent =
                    value.length;


            $("#characterNoSpaceCount")
                .textContent =
                    value.replace(
                        /\s/g,
                        ""
                    ).length;


            $("#lineCount")
                .textContent =
                    value
                        ? value.split("\n").length
                        : 0;

        };


    text.addEventListener(
        "input",
        update
    );

    update();

}


/* =========================================================
   CASE CONVERTER
   ========================================================= */

function renderCaseConverterTool() {

    return toolShell(

        "Case Converter",

        "Convert your text to different cases.",

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


function initCaseConverter() {

    $$("[data-case]")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const field =
                            $("#caseText");

                        if (!field) return;

                        const value =
                            field.value;

                        const type =
                            button.dataset.case;


                        if (
                            type ===
                            "upper"
                        ) {

                            field.value =
                                value.toUpperCase();

                        }


                        if (
                            type ===
                            "lower"
                        ) {

                            field.value =
                                value.toLowerCase();

                        }


                        if (
                            type ===
                            "title"
                        ) {

                            field.value =
                                value
                                    .toLowerCase()
                                    .replace(
                                        /\b\w/g,
                                        char =>
                                            char.toUpperCase()
                                    );

                        }


                        if (
                            type ===
                            "sentence"
                        ) {

                            field.value =
                                value
                                    .toLowerCase()
                                    .replace(
                                        /(^\s*\w|[.!?]\s+\w)/g,
                                        char =>
                                            char.toUpperCase()
                                    );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   TEXT CLEANER
   ========================================================= */

function renderTextCleanerTool() {

    return toolShell(

        "Text Cleaner",

        "Remove extra spaces and blank lines.",

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


function initTextCleaner() {

    $("#cleanTextButton")
        ?.addEventListener(
            "click",
            () => {

                const field =
                    $("#cleanText");

                if (!field) return;

                field.value =
                    field.value
                        .replace(
                            /[ \t]+/g,
                            " "
                        )
                        .replace(
                            /\n\s*\n\s*\n+/g,
                            "\n\n"
                        )
                        .trim();

                showToast(
                    "Text cleaned successfully."
                );

            }
        );


    $("#copyCleanText")
        ?.addEventListener(
            "click",
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        $("#cleanText").value
                    );

                    showToast(
                        "Text copied."
                    );

                } catch {

                    showToast(
                        "Copy was blocked by the browser.",
                        "error"
                    );

                }

            }
        );

}


/* =========================================================
   QR CODE
   ========================================================= */

function renderQRTool() {

    return toolShell(

        "QR Code Generator",

        "Create a QR code from text or a URL.",

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


function initQR() {

    $("#generateQR")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const value =
                        $("#qrText")
                            .value
                            .trim();

                    if (!value) {

                        throw new Error(
                            "Please enter text or a URL."
                        );

                    }


                    const src =
                        "https://api.qrserver.com/v1/create-qr-code/" +
                        "?size=250x250&data=" +
                        encodeURIComponent(
                            value
                        );


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="qr-result">

                            <img
                                src="${src}"
                                alt="Generated QR code">

                            <p>
                                QR code generated.
                            </p>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   PASSWORD GENERATOR
   ========================================================= */

function renderPasswordTool() {

    return toolShell(

        "Password Generator",

        "Generate a random password.",

        `

        ${inputField(
            "passwordLength",
            "Password Length",
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


function initPassword() {

    $("#generatePassword")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const length =
                        num(
                            $(
                                "#passwordLength"
                            ).value,
                            "Password length"
                        );


                    if (
                        !Number.isInteger(
                            length
                        ) ||
                        length < 4 ||
                        length > 128
                    ) {

                        throw new Error(
                            "Length must be a whole number from 4 to 128."
                        );

                    }


                    let characters = "";


                    if (
                        $("#includeUpper")
                            .checked
                    ) {

                        characters +=
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                    }


                    if (
                        $("#includeLower")
                            .checked
                    ) {

                        characters +=
                            "abcdefghijklmnopqrstuvwxyz";

                    }


                    if (
                        $("#includeNumbers")
                            .checked
                    ) {

                        characters +=
                            "0123456789";

                    }


                    if (
                        $("#includeSymbols")
                            .checked
                    ) {

                        characters +=
                            "!@#$%^&*()_+-=[]{}";

                    }


                    if (!characters) {

                        throw new Error(
                            "Select at least one character type."
                        );

                    }


                    let password = "";


                    if (
                        window.crypto &&
                        window.crypto.getRandomValues
                    ) {

                        const values =
                            new Uint32Array(
                                length
                            );

                        window.crypto.getRandomValues(
                            values
                        );


                        for (
                            let i = 0;
                            i < length;
                            i++
                        ) {

                            password +=
                                characters[
                                    values[i] %
                                    characters.length
                                ];

                        }

                    } else {

                        for (
                            let i = 0;
                            i < length;
                            i++
                        ) {

                            password +=
                                characters[
                                    Math.floor(
                                        Math.random() *
                                        characters.length
                                    )
                                ];

                        }

                    }


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="generated-output">

                            <input
                                type="text"
                                value="${esc(password)}"
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
                        ?.addEventListener(
                            "click",
                            async () => {

                                try {

                                    await navigator.clipboard.writeText(
                                        password
                                    );

                                    showToast(
                                        "Password copied."
                                    );

                                } catch {

                                    showToast(
                                        "Copy was blocked.",
                                        "error"
                                    );

                                }

                            }
                        );

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   RANDOM NUMBER
   ========================================================= */

function renderRandomTool() {

    return toolShell(

        "Random Number Generator",

        "Generate a random number between two values.",

        `

        ${inputField(
            "randomMin",
            "Minimum",
            "Example: 1"
        )}

        ${inputField(
            "randomMax",
            "Maximum",
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


function initRandom() {

    $("#generateRandom")
        ?.addEventListener(
            "click",
            () => {

                try {

                    clearError();

                    const min =
                        num(
                            $("#randomMin").value,
                            "Minimum"
                        );

                    const max =
                        num(
                            $("#randomMax").value,
                            "Maximum"
                        );


                    if (
                        min > max
                    ) {

                        throw new Error(
                            "Minimum cannot be greater than maximum."
                        );

                    }


                    const value =
                        Number.isInteger(min) &&
                        Number.isInteger(max)

                            ? Math.floor(
                                Math.random() *
                                (
                                    max -
                                    min +
                                    1
                                )
                            ) + min

                            : Math.random() *
                              (
                                  max -
                                  min
                              ) +
                              min;


                    $("#toolResult")
                        .innerHTML = `

                        <div
                            class="result-header">

                            <span>
                                RANDOM NUMBER
                            </span>

                            <strong>
                                ${money(value)}
                            </strong>

                        </div>

                    `;

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );

}


/* =========================================================
   STUDY HUB
   CLASS → FACULTY → SUBJECT → RESOURCE
   ========================================================= */

const STUDY_FACULTIES = {

    science: {

        name: "Science",

        icon: "SC",

        subjects: [

            "English",
            "Nepali",
            "Physics",
            "Chemistry",
            "Biology",
            "Mathematics",
            "Computer Science"

        ]

    },

    management: {

        name: "Management",

        icon: "MG",

        subjects: [

            "English",
            "Nepali",
            "Accounting",
            "Economics",
            "Business Studies",
            "Computer Science",
            "Mathematics"

        ]

    },

    humanities: {

        name: "Humanities",

        icon: "HU",

        subjects: [

            "English",
            "Nepali",
            "Sociology",
            "Rural Development",
            "Mass Communication",
            "Psychology",
            "Economics"

        ]

    },

    education: {

        name: "Education",

        icon: "ED",

        subjects: [

            "English",
            "Nepali",
            "Education",
            "Economics",
            "Computer Science"

        ]

    },

    law: {

        name: "Law",

        icon: "LW",

        subjects: [

            "English",
            "Nepali",
            "Legal Studies",
            "Social Studies",
            "Economics"

        ]

    }

};


let selectedStudyClass = null;

let selectedStudyFaculty = null;

let selectedStudySubject = null;


function studyShow(id) {

    $(id)
        ?.classList
        .remove("hidden");

}


function studyHide(id) {

    $(id)
        ?.classList
        .add("hidden");

}


function studyReset() {

    selectedStudyClass =
        null;

    selectedStudyFaculty =
        null;

    selectedStudySubject =
        null;


    studyShow(
        "#studyStepClass"
    );

    studyHide(
        "#studyStepFaculty"
    );

    studyHide(
        "#studyStepSubject"
    );

    studyHide(
        "#studyStepResource"
    );

}


function studyOpenFaculty(
    classNumber
) {

    selectedStudyClass =
        String(classNumber);

    selectedStudyFaculty =
        null;

    selectedStudySubject =
        null;


    $("#studyFacultyClassLabel")
        .textContent =
            selectedStudyClass;


    $("#studyFacultyGrid")
        .innerHTML =

            Object.entries(
                STUDY_FACULTIES
            )
            .map(
                ([key, faculty]) => `

                <button
                    type="button"
                    class="study-choice-card"
                    data-faculty="${key}">

                    <span
                        class="study-choice-icon">

                        ${faculty.icon}

                    </span>

                    <span>

                        <strong>
                            ${esc(
                                faculty.name
                            )}
                        </strong>

                        <small>
                            ${
                                faculty
                                    .subjects
                                    .length
                            }
                            subjects available
                        </small>

                    </span>

                    <span class="arrow">
                        →
                    </span>

                </button>

                `
            )
            .join("");


    studyHide(
        "#studyStepClass"
    );

    studyShow(
        "#studyStepFaculty"
    );

    studyHide(
        "#studyStepSubject"
    );

    studyHide(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


function studyOpenSubjects(
    facultyKey
) {

    const faculty =
        STUDY_FACULTIES[
            facultyKey
        ];

    if (!faculty) return;


    selectedStudyFaculty =
        facultyKey;

    selectedStudySubject =
        null;


    $("#studySubjectPath")
        .textContent =

            `CLASS ${
                selectedStudyClass
            } • ${
                faculty.name
                    .toUpperCase()
            }`;


    $("#studySubjectGrid")
        .innerHTML =

            faculty.subjects
                .map(
                    (
                        subject,
                        index
                    ) => `

                    <button
                        type="button"
                        class="study-choice-card"
                        data-subject-index="${index}">

                        <span
                            class="study-choice-icon">

                            ${
                                String(
                                    index + 1
                                ).padStart(
                                    2,
                                    "0"
                                )
                            }

                        </span>

                        <span>

                            <strong>
                                ${esc(subject)}
                            </strong>

                            <small>
                                Open
                                ${esc(subject)}
                                resources
                            </small>

                        </span>

                        <span class="arrow">
                            →
                        </span>

                    </button>

                    `
                )
                .join("");


    studyHide(
        "#studyStepFaculty"
    );

    studyShow(
        "#studyStepSubject"
    );

    studyHide(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


function studyOpenResources(
    subject
) {

    selectedStudySubject =
        subject;


    const faculty =
        STUDY_FACULTIES[
            selectedStudyFaculty
        ];


    $("#studyResourcePathClass")
        .textContent =
            `Class ${selectedStudyClass}`;


    $("#studyResourcePathFaculty")
        .textContent =
            faculty?.name ||
            "Faculty";


    $("#studyResourcePathSubject")
        .textContent =
            subject;


    $("#studyResourceTitle")
        .textContent =
            subject;


    $("#studyResourceDescription")
        .textContent =
            `Choose a resource for ${subject}.`;


    $("#studyResourceOutput")
        ?.classList
        .add("hidden");


    studyHide(
        "#studyStepSubject"
    );

    studyShow(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


const RESOURCE_TEXT = {

    notes: [

        "Notes",

        "Chapter notes, concepts, key definitions and revision material."

    ],

    questions: [

        "Questions",

        "Practice questions, short-answer questions and model questions."

    ],

    exam: [

        "Exam Preparation",

        "Use revision, topic practice and past-question review."

    ],

    neb: [

        "NEB Resources",

        "Board-focused resources for the selected class and subject."

    ]

};


function studyOpenResource(
    type
) {

    const data =
        RESOURCE_TEXT[type] ||
        [
            "Resource",
            "Selected study resource."
        ];


    const output =
        $("#studyResourceOutput");


    if (!output) return;


    output.innerHTML = `

        <h4>
            ${esc(data[0])}
        </h4>

        <p>
            ${esc(data[1])}
        </p>

        <p>

            <strong>
                Path:
            </strong>

            Class
            ${esc(
                selectedStudyClass
            )}

            →

            ${esc(
                STUDY_FACULTIES[
                    selectedStudyFaculty
                ]?.name ||
                "Faculty"
            )}

            →

            ${esc(
                selectedStudySubject
            )}

        </p>

    `;


    output.classList.remove(
        "hidden"
    );


    output.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* ---------- Study class buttons ---------- */

$$(".class-choice")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    studyOpenFaculty(
                        button.dataset.class
                    );

                }
            );

        }
    );


/* ---------- Faculty buttons ---------- */

$("#studyFacultyGrid")
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-faculty]"
                );

            if (!button) return;

            studyOpenSubjects(
                button.dataset.faculty
            );

        }
    );


/* ---------- Subject buttons ---------- */

$("#studySubjectGrid")
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-subject-index]"
                );

            const faculty =
                STUDY_FACULTIES[
                    selectedStudyFaculty
                ];

            if (
                !button ||
                !faculty
            ) {
                return;
            }


            const index =
                Number(
                    button.dataset
                        .subjectIndex
                );


            studyOpenResources(
                faculty.subjects[index]
            );

        }
    );


/* ---------- Resource buttons ---------- */

$$("[data-resource]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    studyOpenResource(
                        button.dataset.resource
                    );

                }
            );

        }
    );


/* ---------- Back buttons ---------- */

$$("[data-study-back]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset
                            .studyBack;


                    if (
                        target ===
                        "class"
                    ) {

                        studyReset();

                    }


                    if (
                        target ===
                        "faculty"
                    ) {

                        studyOpenFaculty(
                            selectedStudyClass
                        );

                    }


                    if (
                        target ===
                        "subject"
                    ) {

                        studyOpenSubjects(
                            selectedStudyFaculty
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   CODING HUB
   ========================================================= */

const CODING_CONTENT = {

    c: {

        title:
            "C Programming",

        html: `

            <p>
                Learn C from the basics:
                syntax, variables, input/output,
                conditions, loops, arrays,
                strings and functions.
            </p>

            <div
                class="coding-topic-list">

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


    algorithms: {

        title:
            "Algorithms",

        html: `

            <p>
                Learn problem analysis,
                flowcharts, pseudocode
                and step-by-step solutions.
            </p>

        `

    },


    concepts: {

        title:
            "Programming Concepts",

        html: `

            <p>
                Understand variables,
                operators, conditions,
                loops, arrays, strings
                and functions.
            </p>

        `

    },


    examples: {

        title:
            "C Examples",

        html: `

            <p>
                Practice beginner C programs
                such as largest number,
                factorial, Fibonacci,
                palindrome and menu programs.
            </p>

        `

    },


    practice: {

        title:
            "Practice Problems",

        html: `

            <p>
                Start with easy problems
                and gradually combine
                several programming concepts.
            </p>

        `

    },


    guides: {

        title:
            "Beginner Guides",

        html: `

            <p>
                Understand the problem first,
                write an algorithm, code it,
                test it and improve it.
            </p>

        `

    }

};


const CODING_TOPICS = {

    variables: {

        title:
            "Variables & Data Types",

        text:
            "Variables store values. Common C data types include int, float, double and char."

    },


    input: {

        title:
            "Input & Output",

        text:
            "printf() displays information while scanf() receives input from the user."

    },


    conditions: {

        title:
            "Conditions",

        text:
            "if, else if and else help a program make decisions based on conditions."

    },


    loops: {

        title:
            "Loops",

        text:
            "for, while and do-while loops repeat code while a condition remains valid."

    },


    arrays: {

        title:
            "Arrays",

        text:
            "Arrays store multiple values of the same type. C array indexing starts at 0."

    },


    strings: {

        title:
            "Strings",

        text:
            "A C string is a sequence of characters ending with the null character."

    },


    functions: {

        title:
            "Functions",

        text:
            "Functions divide a program into reusable sections and may accept parameters or return values."

    }

};


let selectedCodingId =
    "c";


function openCoding(id) {

    const item =
        CODING_CONTENT[id];

    const content =
        $("#codingContent");


    if (
        !item ||
        !content
    ) {
        return;
    }


    selectedCodingId =
        id;


    content.innerHTML = `

        <div
            class="coding-content-header">

            <span class="section-label">
                CODING
            </span>

            <h3>
                ${esc(item.title)}
            </h3>

        </div>

        <div
            class="coding-content-body">

            ${item.html}

        </div>

    `;


    content.classList.remove(
        "hidden"
    );


    content.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


$$(".coding-option")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    openCoding(
                        button.dataset.coding
                    );

                }
            );

        }
    );


$("#codingContent")
    ?.addEventListener(
        "click",
        event => {

            const topicButton =
                event.target.closest(
                    "[data-topic]"
                );

            const backButton =
                event.target.closest(
                    "[data-coding-back]"
                );


            if (backButton) {

                openCoding(
                    selectedCodingId
                );

                return;

            }


            if (!topicButton) {
                return;
            }


            const topic =
                CODING_TOPICS[
                    topicButton.dataset.topic
                ];


            if (!topic) {
                return;
            }


            $("#codingContent")
                .innerHTML = `

                <div
                    class="coding-content-header">

                    <span
                        class="section-label">

                        CODING TOPIC

                    </span>

                    <h3>
                        ${esc(topic.title)}
                    </h3>

                </div>


                <div
                    class="coding-content-body">

                    <p>
                        ${esc(topic.text)}
                    </p>


                    <button
                        type="button"
                        class="secondary-button"
                        data-coding-back>

                        ← Back to Coding Topics

                    </button>

                </div>

            `;

        }
    );


/* =========================================================
   ARTICLES
   ========================================================= */

const ARTICLES = {

    "neb-gpa": {

        category:
            "ACADEMICS",

        title:
            "How NEB GPA Calculation Works",

        html: `

            <p>
                GPA summarizes grade-point
                performance across subjects.
            </p>

            <p>
                In a credit-weighted calculation,
                grade points are multiplied by
                credit values before dividing by
                total credits.
            </p>

        `

    },


    "gpa-cgpa": {

        category:
            "ACADEMICS",

        title:
            "GPA vs CGPA",

        html: `

            <p>
                GPA generally represents a specific
                group or period of study while CGPA
                combines multiple grade-point entries.
            </p>

        `

    },


    "c-programming": {

        category:
            "PROGRAMMING",

        title:
            "Starting C Programming",

        html: `

            <p>
                Start with variables, input/output,
                conditions and loops before moving
                to arrays, strings and functions.
            </p>

        `

    },


    "study-routine": {

        category:
            "STUDY",

        title:
            "Building a Better Study Routine",

        html: `

            <p>
                Break large subjects into smaller
                topics and combine active recall,
                practice and revision.
            </p>

        `

    },


    "computer-science": {

        category:
            "COMPUTER SCIENCE",

        title:
            "Why Computer Science Matters",

        html: `

            <p>
                Computer science covers algorithms,
                data, computer systems, programming
                and problem solving.
            </p>

        `

    },


    website: {

        category:
            "TECHNOLOGY",

        title:
            "What Happens When You Open a Website?",

        html: `

            <p>
                A browser requests website resources
                such as HTML, CSS and JavaScript and
                then builds the page.
            </p>

        `

    },


    "stupivot-tools": {

        category:
            "TOOLS",

        title:
            "Using StuPivot Effectively",

        html: `

            <p>
                Use the calculators for quick academic
                calculations, Study Hub for resources
                and Coding Hub for programming.
            </p>

        `

    },


    "bs-ad": {

        category:
            "CALENDAR",

        title:
            "BS and AD Calendar Conversion",

        html: `

            <p>
                BS and AD use different calendar systems.
                Accurate conversion requires calendar data
                rather than simply subtracting a fixed number
                of years.
            </p>

        `

    }

};


$$(".read-article")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const article =
                        ARTICLES[
                            button.dataset.article
                        ];


                    if (
                        !article ||
                        !articleContent
                    ) {
                        return;
                    }


                    articleContent
                        .innerHTML = `

                        <span
                            class="section-label">

                            ${article.category}

                        </span>

                        <h2>
                            ${esc(
                                article.title
                            )}
                        </h2>

                        ${article.html}

                    `;


                    openModal(
                        articleModal
                    );

                }
            );

        }
    );


/* =========================================================
   SEARCH
   ========================================================= */

const SEARCH_ITEMS = [

    [
        "GPA Calculator",
        "Class 10, 11 and 12 GPA",
        "tool",
        "gpa"
    ],

    [
        "CGPA Calculator",
        "Equal or weighted CGPA",
        "tool",
        "cgpa"
    ],

    [
        "Percentage Calculator",
        "Calculate percentage",
        "tool",
        "percentage"
    ],

    [
        "Marks & Grade",
        "Calculate grade",
        "tool",
        "grade"
    ],

    [
        "Attendance",
        "Calculate attendance",
        "tool",
        "attendance"
    ],

    [
        "Age Calculator",
        "Calculate age",
        "tool",
        "age"
    ],

    [
        "Date Difference",
        "Difference between dates",
        "tool",
        "date"
    ],

    [
        "Unit Converter",
        "Convert units",
        "tool",
        "unit"
    ],

    [
        "BS AD Converter",
        "Convert Nepali and Gregorian dates",
        "tool",
        "bs-ad"
    ],

    [
        "Simple Interest",
        "Simple interest",
        "tool",
        "simple-interest"
    ],

    [
        "Compound Interest",
        "Compound interest",
        "tool",
        "compound-interest"
    ],

    [
        "Discount Calculator",
        "Calculate discounts",
        "tool",
        "discount"
    ],

    [
        "Profit & Loss",
        "Calculate profit and loss",
        "tool",
        "profit"
    ],

    [
        "Word Counter",
        "Count words and characters",
        "tool",
        "word-counter"
    ],

    [
        "Case Converter",
        "Change text case",
        "tool",
        "case-converter"
    ],

    [
        "Text Cleaner",
        "Clean spaces and formatting",
        "tool",
        "text-cleaner"
    ],

    [
        "QR Code Generator",
        "Generate QR codes",
        "tool",
        "qr"
    ],

    [
        "Password Generator",
        "Generate passwords",
        "tool",
        "password"
    ],

    [
        "Random Number",
        "Generate random numbers",
        "tool",
        "random"
    ],

    [
        "Study Hub",
        "Class 11 and 12 study resources",
        "section",
        "study"
    ],

    [
        "Coding Hub",
        "Programming resources",
        "section",
        "coding"
    ],

    [
        "Articles",
        "Student learning articles",
        "section",
        "articles"
    ]

];


function performSearch() {

    const searchInput =
        $("#siteSearch");

    const results =
        $("#searchResults");


    if (
        !searchInput ||
        !results
    ) {
        return;
    }


    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    if (!query) {

        results.innerHTML =
            "";

        return;

    }


    const matches =
        SEARCH_ITEMS.filter(
            item =>
                `${item[0]} ${item[1]}`
                    .toLowerCase()
                    .includes(query)
        );


    if (!matches.length) {

        results.innerHTML = `

            <div class="search-empty">

                No matching StuPivot
                content found.

            </div>

        `;

        return;

    }


    results.innerHTML =

        matches
            .map(
                (item, index) =>
                    `

                    <button
                        type="button"
                        class="search-result-item"
                        data-search-index="${index}">

                        <strong>
                            ${esc(item[0])}
                        </strong>

                        <small>
                            ${esc(item[1])}
                        </small>

                    </button>

                    `
            )
            .join("");


    $$(".search-result-item", results)
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const item =
                            matches[
                                Number(
                                    button.dataset
                                        .searchIndex
                                )
                            ];


                        if (!item) {
                            return;
                        }


                        if (
                            item[2] ===
                            "tool"
                        ) {

                            openTool(
                                item[3]
                            );

                        } else {

                            scrollToId(
                                item[3]
                            );

                        }

                    }
                );

            }
        );

}


$("#searchButton")
    ?.addEventListener(
        "click",
        performSearch
    );


$("#siteSearch")
    ?.addEventListener(
        "input",
        performSearch
    );


$("#siteSearch")
    ?.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                performSearch();

            }

        }
    );


/* =========================================================
   LEGAL
   ========================================================= */

const LEGAL = {

    privacy: {

        title:
            "Privacy Policy",

        html: `

            <p>
                StuPivot is designed as a student
                utility website. Information submitted
                through contact and feedback forms is
                sent through the configured form service.
            </p>

            <p>
                Do not submit passwords, financial
                information or other sensitive information
                through the forms.
            </p>

        `

    },


    terms: {

        title:
            "Terms of Use",

        html: `

            <p>
                StuPivot provides calculators,
                tools and educational information
                for general student use.
            </p>

            <p>
                Important academic results should
                be checked against official school
                or board records.
            </p>

        `

    }

};


$$(".legal-card")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        LEGAL[
                            button.dataset.legal
                        ];


                    if (
                        !item ||
                        !legalContent
                    ) {
                        return;
                    }


                    legalContent
                        .innerHTML = `

                        <span
                            class="section-label">

                            INFORMATION

                        </span>

                        <h2>
                            ${esc(
                                item.title
                            )}
                        </h2>

                        ${item.html}

                    `;


                    openModal(
                        legalModal
                    );

                }
            );

        }
    );


/* =========================================================
   FORMSPREE
   ========================================================= */

function setupForm(id) {

    const form =
        document.getElementById(id);

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const button =
                form.querySelector(
                    '[type="submit"]'
                );


            const original =
                button?.textContent ||
                "Send";


            if (button) {

                button.disabled =
                    true;

                button.textContent =
                    "Sending...";

            }


            try {

                const response =
                    await fetch(
                        form.action,
                        {

                            method:
                                "POST",

                            body:
                                new FormData(
                                    form
                                ),

                            headers: {

                                Accept:
                                    "application/json"

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

                if (button) {

                    button.disabled =
                        false;

                    button.textContent =
                        original;

                }

            }

        }
    );

}


setupForm(
    "feedbackForm"
);

setupForm(
    "contactForm"
);


/* =========================================================
   NUMERIC INPUT CLEANUP
   ========================================================= */

document.addEventListener(
    "input",
    event => {

        const input =
            event.target;


        if (
            input.tagName !==
            "INPUT"
        ) {
            return;
        }


        if (
            input.getAttribute(
                "inputmode"
            ) !==
            "decimal"
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
   READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "StuPivot initialized successfully."
        );

    }
);
