/* =========================================================
   STUPIVOT — FINAL script.js
   ========================================================= */
"use strict";

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const esc = v => String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const scrollToId = id =>
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

const fmt = n =>
    Number(n).toLocaleString(undefined, {
        maximumFractionDigits: 6
    });

const localDate = s => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
};

const validAD = s => {

    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        return false;
    }

    const [y, m, d] =
        s.split("-").map(Number);

    const x =
        new Date(y, m - 1, d);

    return (
        x.getFullYear() === y &&
        x.getMonth() === m - 1 &&
        x.getDate() === d
    );
};

const readNum = (
    v,
    label = "Value"
) => {

    v = String(v ?? "").trim();

    if (!v) {
        throw Error(
            `${label} is required.`
        );
    }

    if (
        !/^-?(?:\d+(?:\.\d+)?|\.\d+)$/
            .test(v)
    ) {
        throw Error(
            `${label} must be a valid number.`
        );
    }

    const n = Number(v);

    if (!Number.isFinite(n)) {
        throw Error(
            `${label} is invalid.`
        );
    }

    return n;
};

/* ======================== UI ======================== */

let toastTimer;

function toast(
    message,
    type = "normal"
) {

    const t = $("#toast");

    if (!t) return;

    t.textContent = message;
    t.className = "toast show";

    if (type === "error") {
        t.classList.add(
            "toast-error"
        );
    }

    clearTimeout(
        toastTimer
    );

    toastTimer = setTimeout(
        () =>
            t.classList.remove(
                "show"
            ),
        3200
    );
}


function clearToolError() {

    const e =
        $("#toolError");

    if (!e) return;

    e.textContent = "";

    e.classList.remove(
        "visible"
    );
}


function toolError(msg) {

    const e =
        $("#toolError");

    if (!e) return;

    e.textContent =
        msg;

    e.classList.add(
        "visible"
    );
}


/* ======================== MODALS ======================== */

const toolModal =
    $("#toolModal");

const articleModal =
    $("#articleModal");

const legalModal =
    $("#legalModal");


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


    const anyOpen =
        [
            toolModal,
            articleModal,
            legalModal
        ].some(
            item =>
                item?.classList.contains(
                    "active"
                )
        );


    if (!anyOpen) {

        document.body.classList.remove(
            "modal-open"
        );

    }
}


$("#modalClose")
    ?.addEventListener(
        "click",
        () =>
            closeModal(toolModal)
    );


$("#articleClose")
    ?.addEventListener(
        "click",
        () =>
            closeModal(articleModal)
    );


$("#legalClose")
    ?.addEventListener(
        "click",
        () =>
            closeModal(legalModal)
    );


$$(".modal")
    .forEach(modal => {

        $(".modal-overlay", modal)
            ?.addEventListener(
                "click",
                () =>
                    closeModal(modal)
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


/* ======================== NAVIGATION ======================== */

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


$$(`#navLinks a`)
    .forEach(a => {

        a.addEventListener(
            "click",
            () => {

                navLinks?.classList.remove(
                    "active"
                );

                menuBtn?.classList.remove(
                    "active"
                );

            }
        );

    });


$$(".quick-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.dataset.scroll
                ) {

                    scrollToId(
                        button.dataset.scroll
                    );

                }

            }
        );

    });


/* ======================== THEME ======================== */

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


$("#searchOpen")
    ?.addEventListener(
        "click",
        () => {

            scrollToId("search");

            setTimeout(
                () =>
                    $("#siteSearch")
                        ?.focus(),
                400
            );

        }
    );


if ($("#year")) {

    $("#year").textContent =
        new Date().getFullYear();

}


/* ======================== HELPERS ======================== */

function shell(
    title,
    sub,
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
                    ${esc(sub)}
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


function input(
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
                autocomplete="off"
                placeholder="${esc(
                    placeholder
                )}">

        </div>

    `;
}


function result(
    title,
    big,
    small = ""
) {

    return `

        <div class="result-header">

            <span>
                ${esc(title)}
            </span>

            <strong>
                ${esc(big)}
            </strong>

            ${
                small
                    ? `
                        <small>
                            ${esc(small)}
                        </small>
                    `
                    : ""
            }

        </div>

    `;
}


/* ======================== GRADE SCALE ======================== */

const GRADES = [

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


const gradeOf =
    p =>
        GRADES.find(
            g =>
                p >= g.min
        ) ||
        GRADES.at(-1);


/* ======================== FACULTIES ======================== */

/*
   IMPORTANT:
   English and Nepali are individual subjects
   in EVERY faculty.
*/

const NEB_FACULTIES = {

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
            "Computer Science",
            "Mathematics",
            "Social Studies & Life Skills"

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
            "Economics",
            "Mathematics",
            "Computer Science"

        ]

    }

};


/* ======================== TOOL REGISTRY ======================== */

const TOOL_RENDERERS = {};

const TOOL_INITIALIZERS = {};


function registerTool(
    id,
    render,
    init
) {

    TOOL_RENDERERS[id] =
        render;

    TOOL_INITIALIZERS[id] =
        init;

}


function openTool(tool) {

    if (
        !TOOL_RENDERERS[tool]
    ) {

        toast(
            "This tool is not available.",
            "error"
        );

        return;

    }


    $("#modalContent")
        .innerHTML =
            TOOL_RENDERERS[tool]();


    openModal(
        toolModal
    );


    try {

        TOOL_INITIALIZERS[tool]
            ?.();

    } catch (error) {

        toolError(
            error.message ||
            "Could not initialize this tool."
        );

    }

}


$$(".open-tool")
    .forEach(button => {

        button.addEventListener(
            "click",
            () =>
                openTool(
                    button.dataset.tool
                )
        );

    });


/* ======================== GPA ======================== */

registerTool(

    "gpa",

    () =>
        shell(
            "NEB GPA Calculator",
            "Choose your class and enter subject marks.",

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
        ),

    () => {

        $("#gpaClass")
            ?.addEventListener(
                "change",
                event => {

                    const area =
                        $("#gpaDynamicArea");


                    if (!area) {
                        return;
                    }


                    if (
                        event.target.value ===
                        "10"
                    ) {

                        renderGPA10(
                            area
                        );

                    } else if (
                        event.target.value
                    ) {

                        renderGPA11(
                            area,
                            event.target.value
                        );

                    } else {

                        area.innerHTML =
                            "";

                    }

                }
            );

    }

);


function renderGPA10(area) {

    const names = [

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
                for seven subjects.
            </p>

        </div>


        <div class="subject-list">

            ${
                names
                    .map(
                        (name, i) =>
                            `

                            <div class="subject-row">

                                <div
                                    class="subject-number">

                                    ${i + 1}

                                </div>

                                <div
                                    class="subject-fields">

                                    <input
                                        id="g10n${i}"
                                        value=""
                                        placeholder="${esc(
                                            name
                                        )} name">

                                    <input
                                        id="g10m${i}"
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
            class="primary-button calculate-button"
            id="g10c"
            type="button">

            Calculate GPA

        </button>

    `;


    $("#g10c")
        .addEventListener(
            "click",
            () => {

                calculateRows(
                    names,

                    i =>
                        ({

                            name:
                                $(
                                    "#g10n" +
                                    i
                                )
                                .value
                                .trim(),

                            marks:
                                $(
                                    "#g10m" +
                                    i
                                )
                                .value

                        }),

                    "Class 10"
                );

            }
        );

}


function renderGPA11(
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
                separate subjects in every faculty.
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
                        ([key, value]) =>
                            `

                            <option
                                value="${key}">

                                ${esc(
                                    value.name
                                )}

                            </option>

                            `
                    )
                    .join("")
                }

            </select>

        </div>


        <div
            id="facultySubjects">
        </div>

    `;


    $("#gpaFaculty")
        .addEventListener(
            "change",
            event => {

                const faculty =
                    NEB_FACULTIES[
                        event.target.value
                    ];

                const subjectArea =
                    $("#facultySubjects");


                if (!faculty) {

                    subjectArea.innerHTML =
                        "";

                    return;

                }


                const names =
                    faculty.subjects.slice();


                subjectArea.innerHTML = `

                    <div class="subject-list">

                        ${
                            names
                                .map(
                                    (
                                        subject,
                                        i
                                    ) =>
                                        `

                                        <div
                                            class="subject-row">

                                            <div
                                                class="subject-number">

                                                ${
                                                    i +
                                                    1
                                                }

                                            </div>

                                            <div
                                                class="subject-fields">

                                                <input
                                                    id="nebN${i}"
                                                    value="${esc(
                                                        subject
                                                    )}">

                                                <input
                                                    id="nebM${i}"
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
                        class="primary-button calculate-button"
                        id="nebc"
                        type="button">

                        Calculate Class
                        ${selectedClass}
                        GPA

                    </button>

                `;


                $("#nebc")
                    .addEventListener(
                        "click",
                        () => {

                            calculateRows(

                                names,

                                i =>
                                    ({

                                        name:
                                            $(
                                                "#nebN" +
                                                i
                                            )
                                            .value
                                            .trim(),

                                        marks:
                                            $(
                                                "#nebM" +
                                                i
                                            )
                                            .value

                                    }),

                                `Class ${
                                    selectedClass
                                }`

                            );

                        }
                    );

            }
        );

}


function calculateRows(
    names,
    getRow,
    label
) {

    try {

        clearToolError();


        const rows =
            names.map(
                (_, i) => {

                    const row =
                        getRow(i);


                    if (!row.name) {

                        throw Error(
                            `Please enter Subject ${i + 1} name.`
                        );

                    }


                    const marks =
                        readNum(
                            row.marks,
                            `${row.name} marks`
                        );


                    if (
                        marks < 0 ||
                        marks > 100
                    ) {

                        throw Error(
                            `${row.name} must be between 0 and 100.`
                        );

                    }


                    const grade =
                        gradeOf(
                            marks
                        );


                    return {

                        ...row,

                        marks,

                        grade:
                            grade.grade,

                        point:
                            grade.point

                    };

                }
            );


        const gpa =
            rows.reduce(
                (
                    sum,
                    row
                ) =>
                    sum +
                    row.point,
                0
            ) /
            rows.length;


        $("#toolResult")
            .innerHTML =

                result(
                    "GPA RESULT",
                    gpa.toFixed(2),
                    label
                ) +

                `

                <div class="result-table">

                    ${
                        rows
                            .map(
                                row =>
                                    `

                                    <div
                                        class="result-row">

                                        <span>
                                            ${esc(
                                                row.name
                                            )}
                                        </span>

                                        <span>
                                            ${fmt(
                                                row.marks
                                            )}
                                        </span>

                                        <span>
                                            ${row.grade}
                                        </span>

                                        <span>
                                            ${row.point.toFixed(
                                                1
                                            )}
                                        </span>

                                    </div>

                                    `
                            )
                            .join("")
                    }

                </div>

                `;


    } catch (error) {

        toolError(
            error.message
        );

    }

}


/* ======================== CGPA ======================== */

registerTool(

    "cgpa",

    () =>
        shell(
            "CGPA Calculator",
            "Calculate equal-credit or credit-weighted CGPA.",

            `

            <div class="form-group">

                <label for="cgpaMode">
                    Method
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


            ${input(
                "cgpaCount",
                "Number of entries",
                "Example: 6"
            )}


            <div
                id="cgpaRows">
            </div>


            <div class="button-row">

                <button
                    class="secondary-button"
                    id="makeCGPA"
                    type="button">

                    Create Fields

                </button>


                <button
                    class="primary-button"
                    id="calcCGPA"
                    type="button">

                    Calculate CGPA

                </button>

            </div>

            `
        ),

    () => {

        const make =
            () => {

                const count =
                    Number(
                        $("#cgpaCount")
                            .value
                    );


                if (
                    !Number.isInteger(
                        count
                    ) ||
                    count < 1 ||
                    count > 30
                ) {

                    throw Error(
                        "Enter a whole number from 1 to 30."
                    );

                }


                const weighted =
                    $("#cgpaMode")
                        .value ===
                    "weighted";


                $("#cgpaRows")
                    .innerHTML = `

                    <div class="cgpa-list">

                        ${
                            Array.from(
                                {
                                    length:
                                        count
                                },
                                (_, i) =>
                                    `

                                    <div
                                        class="cgpa-row">

                                        <span>
                                            ${
                                                i +
                                                1
                                            }
                                        </span>

                                        <input
                                            id="cg${i}"
                                            inputmode="decimal"
                                            placeholder="Grade Point">


                                        ${
                                            weighted
                                                ? `

                                                    <input
                                                        id="cr${i}"
                                                        inputmode="decimal"
                                                        placeholder="Credit Hours">

                                                    `
                                                : ""
                                        }

                                    </div>

                                    `
                            )
                            .join("")
                        }

                    </div>

                    `;

            };


        $("#makeCGPA")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();

                        make();

                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );


        $("#cgpaMode")
            .addEventListener(
                "change",
                () => {

                    if (
                        $$(".cgpa-row")
                            .length
                    ) {

                        try {

                            make();

                        } catch (
                            error
                        ) {

                            toolError(
                                error.message
                            );

                        }

                    }

                }
            );


        $("#calcCGPA")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const rows =
                            $$(".cgpa-row");


                        if (
                            !rows.length
                        ) {

                            throw Error(
                                "Create the fields first."
                            );

                        }


                        const weighted =
                            $("#cgpaMode")
                                .value ===
                            "weighted";


                        let a = 0;
                        let b = 0;


                        rows.forEach(
                            (_, i) => {

                                const gp =
                                    readNum(
                                        $(
                                            "#cg" +
                                            i
                                        ).value,

                                        `Grade point ${
                                            i + 1
                                        }`
                                    );


                                if (
                                    gp < 0 ||
                                    gp > 4
                                ) {

                                    throw Error(
                                        `Grade point ${
                                            i + 1
                                        } must be between 0 and 4.`
                                    );

                                }


                                if (
                                    weighted
                                ) {

                                    const cr =
                                        readNum(
                                            $(
                                                "#cr" +
                                                i
                                            ).value,

                                            `Credit ${
                                                i + 1
                                            }`
                                        );


                                    if (
                                        cr <= 0
                                    ) {

                                        throw Error(
                                            `Credit ${
                                                i + 1
                                            } must be greater than 0.`
                                        );

                                    }


                                    a +=
                                        gp *
                                        cr;

                                    b +=
                                        cr;

                                } else {

                                    a +=
                                        gp;

                                    b++;

                                }

                            }
                        );


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "CGPA",
                                    (
                                        a /
                                        b
                                    ).toFixed(
                                        2
                                    )
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== PERCENTAGE ======================== */

registerTool(

    "percentage",

    () =>
        shell(
            "Percentage Calculator",
            "Calculate percentage.",

            `

            ${input(
                "po",
                "Obtained Marks",
                "Example: 425"
            )}


            ${input(
                "pt",
                "Total Marks",
                "Example: 500"
            )}


            <button
                class="primary-button"
                id="pc"
                type="button">

                Calculate Percentage

            </button>

            `
        ),

    () => {

        $("#pc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const obtained =
                            readNum(
                                $("#po")
                                    .value,
                                "Obtained marks"
                            );


                        const total =
                            readNum(
                                $("#pt")
                                    .value,
                                "Total marks"
                            );


                        if (
                            total <= 0 ||
                            obtained < 0 ||
                            obtained > total
                        ) {

                            throw Error(
                                "Enter valid marks."
                            );

                        }


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "PERCENTAGE",

                                    `${(
                                        obtained /
                                        total *
                                        100
                                    ).toFixed(
                                        2
                                    )}%`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== MARKS + GRADE ======================== */

registerTool(

    "grade",

    () =>
        shell(
            "Marks & Grade",
            "Calculate percentage, grade and grade point.",

            `

            ${input(
                "go",
                "Obtained Marks",
                "Example: 82"
            )}


            ${input(
                "gt",
                "Full Marks",
                "Example: 100"
            )}


            <button
                class="primary-button"
                id="gc"
                type="button">

                Calculate Grade

            </button>

            `
        ),

    () => {

        $("#gc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const obtained =
                            readNum(
                                $("#go")
                                    .value,
                                "Obtained marks"
                            );


                        const total =
                            readNum(
                                $("#gt")
                                    .value,
                                "Full marks"
                            );


                        if (
                            total <= 0 ||
                            obtained < 0 ||
                            obtained > total
                        ) {

                            throw Error(
                                "Enter valid marks."
                            );

                        }


                        const percent =
                            obtained /
                            total *
                            100;


                        const grade =
                            gradeOf(
                                percent
                            );


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    `${percent.toFixed(
                                        2
                                    )}%`,

                                    grade.grade,

                                    `Grade Point: ${
                                        grade.point.toFixed(
                                            1
                                        )
                                    }`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== ATTENDANCE ======================== */

registerTool(

    "attendance",

    () =>
        shell(
            "Attendance Calculator",
            "Calculate current attendance and target.",

            `

            ${input(
                "ap",
                "Classes Attended",
                "Example: 42"
            )}


            ${input(
                "at",
                "Total Classes",
                "Example: 50"
            )}


            ${input(
                "tar",
                "Target Attendance %",
                "Example: 75"
            )}


            <button
                class="primary-button"
                id="ac"
                type="button">

                Calculate Attendance

            </button>

            `
        ),

    () => {

        $("#ac")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const attended =
                            readNum(
                                $("#ap")
                                    .value,
                                "Attended classes"
                            );


                        const total =
                            readNum(
                                $("#at")
                                    .value,
                                "Total classes"
                            );


                        const target =
                            readNum(
                                $("#tar")
                                    .value,
                                "Target"
                            );


                        if (
                            total <= 0 ||
                            attended < 0 ||
                            attended > total ||
                            target < 0 ||
                            target > 100
                        ) {

                            throw Error(
                                "Enter valid attendance values."
                            );

                        }


                        const percent =
                            attended /
                            total *
                            100;


                        let message;


                        if (
                            percent >=
                            target
                        ) {

                            message =
                                `You meet the ${
                                    target
                                }% target.`;

                        } else if (
                            target >= 100
                        ) {

                            message =
                                "A 100% target cannot be reached after missed classes.";

                        } else {

                            message =
                                `Attend about ${
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
                                    )
                                } more class(es) without missing one.`;

                        }


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "ATTENDANCE",

                                    `${percent.toFixed(
                                        2
                                    )}%`,

                                    message
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== AGE ======================== */

registerTool(

    "age",

    () =>
        shell(
            "Age Calculator",
            "Calculate exact age from date of birth.",

            `

            <div class="form-group">

                <label for="dob">
                    Date of Birth
                </label>

                <input
                    type="date"
                    id="dob">

            </div>


            <button
                class="primary-button"
                id="agec"
                type="button">

                Calculate Age

            </button>

            `
        ),

    () => {

        $("#agec")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const value =
                            $("#dob")
                                .value;


                        if (!value) {

                            throw Error(
                                "Please select your date of birth."
                            );

                        }


                        const dob =
                            localDate(
                                value
                            );


                        const today =
                            new Date();


                        if (
                            dob >
                            today
                        ) {

                            throw Error(
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


                        if (
                            days < 0
                        ) {

                            months--;

                            days +=
                                new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    0
                                ).getDate();

                        }


                        if (
                            months < 0
                        ) {

                            years--;

                            months += 12;

                        }


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "YOUR AGE",

                                    `${years} years`,

                                    `${months} months and ${days} days`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== DATE DIFFERENCE ======================== */

registerTool(

    "date",

    () =>
        shell(
            "Date Difference",
            "Find the difference between two dates.",

            `

            <div class="form-group">

                <label for="d1">
                    Start Date
                </label>

                <input
                    type="date"
                    id="d1">

            </div>


            <div class="form-group">

                <label for="d2">
                    End Date
                </label>

                <input
                    type="date"
                    id="d2">

            </div>


            <button
                class="primary-button"
                id="ddc"
                type="button">

                Calculate Difference

            </button>

            `
        ),

    () => {

        $("#ddc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const a =
                            $("#d1")
                                .value;


                        const b =
                            $("#d2")
                                .value;


                        if (
                            !a ||
                            !b
                        ) {

                            throw Error(
                                "Please select both dates."
                            );

                        }


                        const days =
                            Math.round(
                                Math.abs(
                                    localDate(b) -
                                    localDate(a)
                                ) /
                                86400000
                            );


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "DATE DIFFERENCE",

                                    `${days.toLocaleString()} days`,

                                    `${Math.floor(
                                        days / 7
                                    ).toLocaleString()} weeks`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== UNIT CONVERTER ======================== */

const UNIT = {

    length: {

        meter: 1,
        kilometer: 1000,
        centimeter: .01,
        millimeter: .001,
        mile: 1609.344,
        yard: .9144,
        foot: .3048,
        inch: .0254

    },


    weight: {

        kilogram: 1,
        gram: .001,
        milligram: .000001,
        pound: .45359237,
        ounce: .028349523125

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


const nice =
    value =>
        String(value)
            .replace(
                /-/g,
                " "
            )
            .replace(
                /\b\w/g,
                c =>
                    c.toUpperCase()
            );


registerTool(

    "unit",

    () =>
        shell(
            "Unit Converter",
            "Convert common length, weight, temperature and time units.",

            `

            <div class="form-group">

                <label for="ucat">
                    Category
                </label>

                <select id="ucat">

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


            ${input(
                "uval",
                "Value",
                "Example: 12.5"
            )}


            <div class="form-group">

                <label for="ufrom">
                    From
                </label>

                <select id="ufrom">
                </select>

            </div>


            <div class="form-group">

                <label for="uto">
                    To
                </label>

                <select id="uto">
                </select>

            </div>


            <button
                class="primary-button"
                id="uc"
                type="button">

                Convert

            </button>

            `
        ),

    () => {

        const update =
            () => {

                const options =
                    Object.keys(
                        UNIT[
                            $(
                                "#ucat"
                            ).value
                        ]
                    );


                $("#ufrom")
                    .innerHTML =
                        options
                            .map(
                                x =>
                                    `<option value="${x}">
                                        ${nice(x)}
                                    </option>`
                            )
                            .join("");


                $("#uto")
                    .innerHTML =
                        options
                            .map(
                                x =>
                                    `<option value="${x}">
                                        ${nice(x)}
                                    </option>`
                            )
                            .join("");

            };


        update();


        $("#ucat")
            .addEventListener(
                "change",
                update
            );


        $("#uc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const value =
                            readNum(
                                $("#uval")
                                    .value,
                                "Value"
                            );


                        const category =
                            $("#ucat")
                                .value;


                        const from =
                            $("#ufrom")
                                .value;


                        const to =
                            $("#uto")
                                .value;


                        let converted;


                        if (
                            category !==
                            "temperature"
                        ) {

                            converted =
                                value *
                                UNIT[
                                    category
                                ][from] /
                                UNIT[
                                    category
                                ][to];

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

                            } else if (
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

                                converted =
                                    celsius;

                            } else if (
                                to ===
                                "fahrenheit"
                            ) {

                                converted =
                                    celsius *
                                    9 /
                                    5 +
                                    32;

                            } else {

                                converted =
                                    celsius +
                                    273.15;

                            }

                        }


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "RESULT",

                                    fmt(
                                        converted
                                    ),

                                    nice(from) +
                                    " → " +
                                    nice(to)
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== BS ↔ AD ======================== */

/*
   The correct package exposes:
   window.DateConverter

   and supports:
   new DateConverter("2080-01-15").toAd()
   new DateConverter("2023-04-28").toBs()
*/

let converterLoad = null;


function normalizeNepaliDigits(
    value
) {

    const digits = {

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
            digits[digit]
    );

}


function loadDateConverter() {

    if (
        typeof window.DateConverter ===
        "function"
    ) {

        return Promise.resolve(
            window.DateConverter
        );

    }


    if (
        converterLoad
    ) {

        return converterLoad;

    }


    converterLoad =
        new Promise(
            (resolve, reject) => {

                const existing =
                    document.querySelector(
                        'script[data-stupivot-date-converter="true"]'
                    );


                if (existing) {

                    existing.addEventListener(
                        "load",
                        () => {

                            if (
                                typeof window.DateConverter ===
                                "function"
                            ) {

                                resolve(
                                    window.DateConverter
                                );

                            } else {

                                reject(
                                    Error(
                                        "DateConverter did not load."
                                    )
                                );

                            }

                        },
                        {
                            once: true
                        }
                    );


                    existing.addEventListener(
                        "error",
                        () =>
                            reject(
                                Error(
                                    "Nepali date converter failed to load."
                                )
                            ),
                        {
                            once: true
                        }
                    );


                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdn.jsdelivr.net/npm/@remotemerge/nepali-date-converter@1/dist/ndc-browser.js";


                script.async =
                    true;


                script.dataset.stupivotDateConverter =
                    "true";


                script.onload =
                    () => {

                        if (
                            typeof window.DateConverter ===
                            "function"
                        ) {

                            resolve(
                                window.DateConverter
                            );

                        } else {

                            reject(
                                Error(
                                    "DateConverter did not load."
                                )
                            );

                        }

                    };


                script.onerror =
                    () => {

                        reject(
                            Error(
                                "Could not load the Nepali date converter. Check your internet connection."
                            )
                        );

                    };


                document.head.appendChild(
                    script
                );

            }
        );


    return converterLoad;

}


registerTool(

    "bs-ad",

    () =>
        shell(
            "BS ↔ AD Converter",
            "Convert Bikram Sambat and Gregorian dates.",

            `

            <div class="form-group">

                <label for="calDir">
                    Conversion
                </label>

                <select id="calDir">

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
                    id="calLabel"
                    for="calDate">

                    BS Date

                </label>


                <input
                    id="calDate"
                    type="text"
                    inputmode="numeric"
                    autocomplete="off"
                    placeholder="2080-01-15">


                <small
                    id="calHelp"
                    class="input-help">

                    Enter BS date as YYYY-MM-DD.

                </small>

            </div>


            <button
                class="primary-button"
                id="calBtn"
                type="button">

                Convert Date →

            </button>


            <div class="calculator-note">

                Example:
                2080-01-15 BS
                =
                2023-04-28 AD

            </div>

            `
        ),

    () => {

        const direction =
            $("#calDir");

        const inputEl =
            $("#calDate");

        const label =
            $("#calLabel");

        const help =
            $("#calHelp");


        const update =
            () => {

                const bs =
                    direction.value ===
                    "bs-ad";


                label.textContent =
                    bs
                        ? "BS Date"
                        : "AD Date";


                inputEl.placeholder =
                    bs
                        ? "2080-01-15"
                        : "2023-04-28";


                help.textContent =
                    bs
                        ? "Enter BS date as YYYY-MM-DD."
                        : "Enter AD date as YYYY-MM-DD.";


                clearToolError();


                $("#toolResult")
                    .innerHTML =
                        "";

            };


        update();


        direction.addEventListener(
            "change",
            update
        );


        $("#calBtn")
            .addEventListener(
                "click",
                async () => {

                    try {

                        clearToolError();


                        let value =
                            normalizeNepaliDigits(
                                inputEl
                                    .value
                                    .trim()
                            );


                        value =
                            value
                                .replace(
                                    /[\/\.\s]+/g,
                                    "-"
                                )
                                .replace(
                                    /-{2,}/g,
                                    "-"
                                );


                        if (
                            !/^\d{4}-\d{1,2}-\d{1,2}$/
                                .test(value)
                        ) {

                            throw Error(
                                "Please use YYYY-MM-DD format."
                            );

                        }


                        const [
                            y,
                            m,
                            d
                        ] =
                            value
                                .split("-")
                                .map(
                                    Number
                                );


                        if (
                            m < 1 ||
                            m > 12 ||
                            d < 1 ||
                            d > 32
                        ) {

                            throw Error(
                                "Please enter a valid date."
                            );

                        }


                        const DateConverter =
                            await loadDateConverter();


                        let converted;


                        let resultValue;


                        /* BS → AD */

                        if (
                            direction.value ===
                            "bs-ad"
                        ) {

                            const bsString =
                                `${y}-${
                                    String(
                                        m
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }-${
                                    String(
                                        d
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }`;


                            converted =
                                new DateConverter(
                                    bsString
                                )
                                .toAd();


                            resultValue =
                                `${
                                    converted.year
                                }-${
                                    String(
                                        converted.month
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }-${
                                    String(
                                        converted.date
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }`;

                        }


                        /* AD → BS */

                        else {

                            const adString =
                                `${y}-${
                                    String(
                                        m
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }-${
                                    String(
                                        d
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }`;


                            if (
                                !validAD(
                                    adString
                                )
                            ) {

                                throw Error(
                                    "Please enter a real Gregorian date."
                                );

                            }


                            converted =
                                new DateConverter(
                                    adString
                                )
                                .toBs();


                            resultValue =
                                `${
                                    converted.year
                                }-${
                                    String(
                                        converted.month
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }-${
                                    String(
                                        converted.date
                                    )
                                    .padStart(
                                        2,
                                        "0"
                                    )
                                }`;

                        }


                        if (
                            !converted
                        ) {

                            throw Error(
                                "The date could not be converted."
                            );

                        }


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    direction.value ===
                                    "bs-ad"

                                        ? "AD DATE"

                                        : "BS DATE",

                                    resultValue,

                                    direction.value ===
                                    "bs-ad"

                                        ? "Bikram Sambat → Gregorian"

                                        : "Gregorian → Bikram Sambat"
                                );


                    } catch (error) {

                        toolError(
                            error.message ||
                            "Date conversion failed."
                        );

                    }

                }
            );

    }

);


/* ======================== SIMPLE INTEREST ======================== */

registerTool(

    "simple-interest",

    () =>
        shell(
            "Simple Interest",
            "Calculate simple interest and total amount.",

            `

            ${input(
                "sip",
                "Principal",
                "10000"
            )}


            ${input(
                "sir",
                "Rate (%)",
                "5"
            )}


            ${input(
                "sit",
                "Time (years)",
                "2"
            )}


            <button
                class="primary-button"
                id="sic"
                type="button">

                Calculate

            </button>

            `
        ),

    () => {

        $("#sic")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const p =
                            readNum(
                                $("#sip")
                                    .value,
                                "Principal"
                            );


                        const r =
                            readNum(
                                $("#sir")
                                    .value,
                                "Rate"
                            );


                        const t =
                            readNum(
                                $("#sit")
                                    .value,
                                "Time"
                            );


                        if (
                            p < 0 ||
                            r < 0 ||
                            t < 0
                        ) {

                            throw Error(
                                "Values cannot be negative."
                            );

                        }


                        const interest =
                            p *
                            r *
                            t /
                            100;


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "SIMPLE INTEREST",

                                    fmt(
                                        interest
                                    ),

                                    `Total amount:
                                    ${fmt(
                                        p +
                                        interest
                                    )}`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== COMPOUND INTEREST ======================== */

registerTool(

    "compound-interest",

    () =>
        shell(
            "Compound Interest",
            "Calculate compound interest.",

            `

            ${input(
                "cip",
                "Principal",
                "10000"
            )}


            ${input(
                "cir",
                "Annual Rate (%)",
                "5"
            )}


            ${input(
                "cit",
                "Time (years)",
                "2"
            )}


            ${input(
                "cin",
                "Compounds per year",
                "4"
            )}


            <button
                class="primary-button"
                id="cic"
                type="button">

                Calculate

            </button>

            `
        ),

    () => {

        $("#cic")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const p =
                            readNum(
                                $("#cip")
                                    .value,
                                "Principal"
                            );


                        const r =
                            readNum(
                                $("#cir")
                                    .value,
                                "Annual rate"
                            );


                        const t =
                            readNum(
                                $("#cit")
                                    .value,
                                "Time"
                            );


                        const frequency =
                            readNum(
                                $("#cin")
                                    .value,
                                "Frequency"
                            );


                        if (
                            p < 0 ||
                            r < 0 ||
                            t < 0 ||
                            frequency <= 0
                        ) {

                            throw Error(
                                "Enter valid values."
                            );

                        }


                        const amount =
                            p *
                            Math.pow(
                                1 +
                                r /
                                (
                                    100 *
                                    frequency
                                ),
                                frequency *
                                t
                            );


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "COMPOUND INTEREST",

                                    fmt(
                                        amount -
                                        p
                                    ),

                                    `Total amount:
                                    ${fmt(
                                        amount
                                    )}`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== DISCOUNT ======================== */

registerTool(

    "discount",

    () =>
        shell(
            "Discount Calculator",
            "Calculate discount and final price.",

            `

            ${input(
                "dp",
                "Original Price",
                "2500"
            )}


            ${input(
                "dr",
                "Discount (%)",
                "15"
            )}


            <button
                class="primary-button"
                id="dc"
                type="button">

                Calculate

            </button>

            `
        ),

    () => {

        $("#dc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const price =
                            readNum(
                                $("#dp")
                                    .value,
                                "Original price"
                            );


                        const rate =
                            readNum(
                                $("#dr")
                                    .value,
                                "Discount rate"
                            );


                        if (
                            price < 0 ||
                            rate < 0 ||
                            rate > 100
                        ) {

                            throw Error(
                                "Enter valid discount values."
                            );

                        }


                        const discount =
                            price *
                            rate /
                            100;


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "DISCOUNT",

                                    fmt(
                                        discount
                                    ),

                                    `Final price:
                                    ${fmt(
                                        price -
                                        discount
                                    )}`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== PROFIT / LOSS ======================== */

registerTool(

    "profit",

    () =>
        shell(
            "Profit & Loss",
            "Calculate profit or loss.",

            `

            ${input(
                "cpp",
                "Cost Price",
                "1000"
            )}


            ${input(
                "spp",
                "Selling Price",
                "1250"
            )}


            <button
                class="primary-button"
                id="plc"
                type="button">

                Calculate

            </button>

            `
        ),

    () => {

        $("#plc")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const cost =
                            readNum(
                                $("#cpp")
                                    .value,
                                "Cost price"
                            );


                        const selling =
                            readNum(
                                $("#spp")
                                    .value,
                                "Selling price"
                            );


                        if (
                            cost <= 0
                        ) {

                            throw Error(
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
                            .innerHTML =

                                result(
                                    type,

                                    fmt(
                                        Math.abs(
                                            difference
                                        )
                                    ),

                                    `${percentage.toFixed(
                                        2
                                    )}%`
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== WORD COUNTER ======================== */

registerTool(

    "word-counter",

    () =>
        shell(
            "Word Counter",
            "Count words and characters.",

            `

            <textarea
                id="wct"
                rows="12"
                placeholder="Start writing here...">
            </textarea>


            <div class="live-stats">

                <div>

                    <strong id="wcw">
                        0
                    </strong>

                    <span>
                        Words
                    </span>

                </div>


                <div>

                    <strong id="wcc">
                        0
                    </strong>

                    <span>
                        Characters
                    </span>

                </div>


                <div>

                    <strong id="wcn">
                        0
                    </strong>

                    <span>
                        No Spaces
                    </span>

                </div>


                <div>

                    <strong id="wcl">
                        0
                    </strong>

                    <span>
                        Lines
                    </span>

                </div>

            </div>

            `
        ),

    () => {

        $("#wct")
            .addEventListener(
                "input",
                () => {

                    const value =
                        $("#wct")
                            .value;


                    $("#wcw")
                        .textContent =
                            value.trim()

                                ? value
                                    .trim()
                                    .split(
                                        /\s+/
                                    )
                                    .length

                                : 0;


                    $("#wcc")
                        .textContent =
                            value.length;


                    $("#wcn")
                        .textContent =
                            value.replace(
                                /\s/g,
                                ""
                            ).length;


                    $("#wcl")
                        .textContent =
                            value
                                ? value.split(
                                    "\n"
                                ).length
                                : 0;

                }
            );

    }

);


/* ======================== CASE CONVERTER ======================== */

registerTool(

    "case-converter",

    () =>
        shell(
            "Case Converter",
            "Convert your text into different cases.",

            `

            <textarea
                id="caseText"
                rows="12"
                placeholder="Write your text here...">
            </textarea>


            <div class="button-row">

                <button
                    class="secondary-button"
                    data-case="upper"
                    type="button">

                    UPPERCASE

                </button>


                <button
                    class="secondary-button"
                    data-case="lower"
                    type="button">

                    lowercase

                </button>


                <button
                    class="secondary-button"
                    data-case="title"
                    type="button">

                    Title Case

                </button>


                <button
                    class="secondary-button"
                    data-case="sentence"
                    type="button">

                    Sentence case

                </button>

            </div>

            `
        ),

    () => {

        $$("[data-case]")
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const field =
                                $("#caseText");


                            if (!field) {
                                return;
                            }


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
                                            c =>
                                                c.toUpperCase()
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
                                            c =>
                                                c.toUpperCase()
                                        );

                            }

                        }
                    );

                }
            );

    }

);


/* ======================== TEXT CLEANER ======================== */

registerTool(

    "text-cleaner",

    () =>
        shell(
            "Text Cleaner",
            "Remove extra spaces and blank lines.",

            `

            <textarea
                id="cleanText"
                rows="14"
                placeholder="Paste or write your text here...">
            </textarea>


            <div class="button-row">

                <button
                    class="primary-button"
                    id="clean"
                    type="button">

                    Clean Text

                </button>


                <button
                    class="secondary-button"
                    id="copyclean"
                    type="button">

                    Copy

                </button>

            </div>

            `
        ),

    () => {

        $("#clean")
            .addEventListener(
                "click",
                () => {

                    const field =
                        $("#cleanText");


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


                    toast(
                        "Text cleaned."
                    );

                }
            );


        $("#copyclean")
            .addEventListener(
                "click",
                async () => {

                    try {

                        await navigator
                            .clipboard
                            .writeText(
                                $(
                                    "#cleanText"
                                )
                                .value
                            );


                        toast(
                            "Text copied."
                        );

                    } catch {

                        toast(
                            "Copy was blocked.",
                            "error"
                        );

                    }

                }
            );

    }

);


/* ======================== QR ======================== */

registerTool(

    "qr",

    () =>
        shell(
            "QR Code Generator",
            "Create a QR code from text or a URL.",

            `

            <textarea
                id="qrText"
                rows="6"
                placeholder="https://example.com">
            </textarea>


            <button
                class="primary-button"
                id="qrbtn"
                type="button">

                Generate QR

            </button>

            `
        ),

    () => {

        $("#qrbtn")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const value =
                            $("#qrText")
                                .value
                                .trim();


                        if (!value) {

                            throw Error(
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

                            <div class="qr-result">

                                <img
                                    src="${src}"
                                    alt="Generated QR code">

                                <p>
                                    QR code generated.
                                </p>

                            </div>

                            `;


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== PASSWORD ======================== */

registerTool(

    "password",

    () =>
        shell(
            "Password Generator",
            "Generate a random password.",

            `

            ${input(
                "pwlen",
                "Password Length",
                "16"
            )}


            <div class="checkbox-grid">

                <label>

                    <input
                        type="checkbox"
                        id="pwu"
                        checked>

                    Uppercase

                </label>


                <label>

                    <input
                        type="checkbox"
                        id="pwl"
                        checked>

                    Lowercase

                </label>


                <label>

                    <input
                        type="checkbox"
                        id="pwn"
                        checked>

                    Numbers

                </label>


                <label>

                    <input
                        type="checkbox"
                        id="pws"
                        checked>

                    Symbols

                </label>

            </div>


            <button
                class="primary-button"
                id="pwbtn"
                type="button">

                Generate Password

            </button>

            `
        ),

    () => {

        $("#pwbtn")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const length =
                            readNum(
                                $("#pwlen")
                                    .value,
                                "Password length"
                            );


                        if (
                            !Number.isInteger(
                                length
                            ) ||
                            length < 4 ||
                            length > 128
                        ) {

                            throw Error(
                                "Length must be a whole number from 4 to 128."
                            );

                        }


                        let chars = "";


                        if (
                            $("#pwu")
                                .checked
                        ) {

                            chars +=
                                "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                        }


                        if (
                            $("#pwl")
                                .checked
                        ) {

                            chars +=
                                "abcdefghijklmnopqrstuvwxyz";

                        }


                        if (
                            $("#pwn")
                                .checked
                        ) {

                            chars +=
                                "0123456789";

                        }


                        if (
                            $("#pws")
                                .checked
                        ) {

                            chars +=
                                "!@#$%^&*()_+-=[]{}";

                        }


                        if (!chars) {

                            throw Error(
                                "Select at least one character type."
                            );

                        }


                        let password = "";


                        const random =
                            new Uint32Array(
                                length
                            );


                        if (
                            window.crypto &&
                            window.crypto
                                .getRandomValues
                        ) {

                            window.crypto
                                .getRandomValues(
                                    random
                                );

                        }


                        for (
                            let i = 0;
                            i < length;
                            i++
                        ) {

                            password +=
                                chars[
                                    random[i] %
                                    chars.length
                                ];

                        }


                        $("#toolResult")
                            .innerHTML = `

                            <div
                                class="generated-output">

                                <input
                                    type="text"
                                    value="${esc(
                                        password
                                    )}"
                                    readonly>


                                <button
                                    class="secondary-button"
                                    id="pwc"
                                    type="button">

                                    Copy

                                </button>

                            </div>

                            `;


                        $("#pwc")
                            .addEventListener(
                                "click",
                                async () => {

                                    try {

                                        await navigator
                                            .clipboard
                                            .writeText(
                                                password
                                            );

                                        toast(
                                            "Password copied."
                                        );

                                    } catch {

                                        toast(
                                            "Copy was blocked.",
                                            "error"
                                        );

                                    }

                                }
                            );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* ======================== RANDOM NUMBER ======================== */

registerTool(

    "random",

    () =>
        shell(
            "Random Number Generator",
            "Generate a random number between two values.",

            `

            ${input(
                "rmin",
                "Minimum",
                "1"
            )}


            ${input(
                "rmax",
                "Maximum",
                "100"
            )}


            <button
                class="primary-button"
                id="rbtn"
                type="button">

                Generate

            </button>

            `
        ),

    () => {

        $("#rbtn")
            .addEventListener(
                "click",
                () => {

                    try {

                        clearToolError();


                        const min =
                            readNum(
                                $("#rmin")
                                    .value
                            );


                        const max =
                            readNum(
                                $("#rmax")
                                    .value
                            );


                        if (
                            min >
                            max
                        ) {

                            throw Error(
                                "Minimum cannot be greater than maximum."
                            );

                        }


                        const value =
                            Number.isInteger(
                                min
                            ) &&
                            Number.isInteger(
                                max
                            )

                                ? Math.floor(
                                    Math.random() *
                                    (
                                        max -
                                        min +
                                        1
                                    )
                                ) +
                                min

                                : Math.random() *
                                    (
                                        max -
                                        min
                                    ) +
                                    min;


                        $("#toolResult")
                            .innerHTML =

                                result(
                                    "RANDOM NUMBER",
                                    fmt(value)
                                );


                    } catch (error) {

                        toolError(
                            error.message
                        );

                    }

                }
            );

    }

);


/* =========================================================
   STUDY HUB
   Class → Faculty → Subject → Resource
   ========================================================= */

let selectedStudyClass =
    null;

let selectedStudyFaculty =
    null;

let selectedStudySubject =
    null;


function showStudy(id) {

    $(id)
        ?.classList
        .remove(
            "hidden"
        );

}


function hideStudy(id) {

    $(id)
        ?.classList
        .add(
            "hidden"
        );

}


function resetStudy() {

    selectedStudyClass =
        null;

    selectedStudyFaculty =
        null;

    selectedStudySubject =
        null;


    showStudy(
        "#studyStepClass"
    );

    hideStudy(
        "#studyStepFaculty"
    );

    hideStudy(
        "#studyStepSubject"
    );

    hideStudy(
        "#studyStepResource"
    );

}


function studyFaculty(
    classNumber
) {

    selectedStudyClass =
        String(
            classNumber
        );


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
            NEB_FACULTIES
        )
        .map(
            (
                [
                    key,
                    faculty
                ]
            ) =>
                `

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


                    <span
                        class="arrow">

                        →

                    </span>

                </button>

                `
        )
        .join("");


    hideStudy(
        "#studyStepClass"
    );

    showStudy(
        "#studyStepFaculty"
    );

    hideStudy(
        "#studyStepSubject"
    );

    hideStudy(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


function studySubjects(
    facultyKey
) {

    const faculty =
        NEB_FACULTIES[
            facultyKey
        ];


    if (!faculty) {
        return;
    }


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


    /*
       Every subject has its OWN
       separate card.

       English = separate card
       Nepali   = separate card
       Physics  = separate card
       etc.
    */


    $("#studySubjectGrid")
        .innerHTML =

        faculty.subjects
            .map(
                (
                    subject,
                    index
                ) =>
                    `

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
                                ${esc(
                                    subject
                                )}
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


    hideStudy(
        "#studyStepFaculty"
    );

    showStudy(
        "#studyStepSubject"
    );

    hideStudy(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


function studyResources(
    subject
) {

    selectedStudySubject =
        subject;


    const faculty =
        NEB_FACULTIES[
            selectedStudyFaculty
        ];


    $("#studyResourcePathClass")
        .textContent =
            `Class ${
                selectedStudyClass
            }`;


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
            `Choose a resource for ${
                subject
            }.`;


    $("#studyResourceOutput")
        ?.classList
        .add(
            "hidden"
        );


    hideStudy(
        "#studyStepSubject"
    );

    showStudy(
        "#studyStepResource"
    );


    scrollToId(
        "study"
    );

}


const RESOURCES = {

    notes: [

        "Notes",

        "Chapter notes, concepts and revision material."

    ],

    questions: [

        "Questions",

        "Practice and model questions for the selected subject."

    ],

    exam: [

        "Exam Preparation",

        "Revision and exam-focused practice."

    ],

    neb: [

        "NEB Resources",

        "Board-focused resources for the selected class and subject."

    ]

};


function studyResource(
    type
) {

    const resource =
        RESOURCES[type];


    const output =
        $("#studyResourceOutput");


    if (
        !resource ||
        !output
    ) {
        return;
    }


    output.innerHTML = `

        <h4>
            ${esc(
                resource[0]
            )}
        </h4>


        <p>
            ${esc(
                resource[1]
            )}
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
                NEB_FACULTIES[
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
        behavior:
            "smooth",

        block:
            "nearest"

    });

}


/* ---------- Class ---------- */

$$(".class-choice")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () =>
                    studyFaculty(
                        button.dataset.class
                    )
            );

        }
    );


/* ---------- Faculty ---------- */

$("#studyFacultyGrid")
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-faculty]"
                );


            if (!button) {
                return;
            }


            studySubjects(
                button.dataset.faculty
            );

        }
    );


/* ---------- Subject ---------- */

$("#studySubjectGrid")
    ?.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-subject-index]"
                );


            const faculty =
                NEB_FACULTIES[
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


            const subject =
                faculty.subjects[
                    index
                ];


            if (subject) {

                studyResources(
                    subject
                );

            }

        }
    );


/* ---------- Resources ---------- */

$$("[data-resource]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () =>
                    studyResource(
                        button.dataset.resource
                    )
            );

        }
    );


/* ---------- Back ---------- */

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

                        resetStudy();

                    }


                    if (
                        target ===
                        "faculty"
                    ) {

                        studyFaculty(
                            selectedStudyClass
                        );

                    }


                    if (
                        target ===
                        "subject"
                    ) {

                        studySubjects(
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

const CODING = {

    c: {

        title:
            "C Programming",

        html: `

            <p>
                Learn C from variables,
                input/output, conditions,
                loops, arrays, strings
                and functions.
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
                Practice beginner programs
                such as factorial, Fibonacci,
                largest number and palindrome.
            </p>

        `

    },


    practice: {

        title:
            "Practice Problems",

        html: `

            <p>
                Start with simple problems
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
                Understand the problem,
                write an algorithm, code it,
                test it and improve it.
            </p>

        `

    }

};


const TOPICS = {

    variables: [

        "Variables & Data Types",

        "Variables store values. Common C types include int, float, double and char."

    ],


    input: [

        "Input & Output",

        "printf() displays information and scanf() receives input."

    ],


    conditions: [

        "Conditions",

        "if, else if and else help a program make decisions."

    ],


    loops: [

        "Loops",

        "for, while and do-while repeat code based on conditions."

    ],


    arrays: [

        "Arrays",

        "Arrays store multiple values of the same data type. C indexing starts at 0."

    ],


    strings: [

        "Strings",

        "A C string is a sequence of characters ending with the null character."

    ],


    functions: [

        "Functions",

        "Functions divide a program into reusable sections and may accept parameters or return values."

    ]

};


let selectedCoding =
    "c";


function openCoding(
    id
) {

    const item =
        CODING[id];


    const output =
        $("#codingContent");


    if (
        !item ||
        !output
    ) {
        return;
    }


    selectedCoding =
        id;


    output.innerHTML = `

        <div
            class="coding-content-header">

            <span class="section-label">
                CODING
            </span>

            <h3>
                ${esc(
                    item.title
                )}
            </h3>

        </div>


        <div
            class="coding-content-body">

            ${item.html}

        </div>

    `;


    output.classList.remove(
        "hidden"
    );


    output.scrollIntoView({
        behavior:
            "smooth",

        block:
            "nearest"

    });

}


$$(".coding-option")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () =>
                    openCoding(
                        button.dataset.coding
                    )
            );

        }
    );


$("#codingContent")
    ?.addEventListener(
        "click",
        event => {

            const back =
                event.target.closest(
                    "[data-coding-back]"
                );


            const topicButton =
                event.target.closest(
                    "[data-topic]"
                );


            if (back) {

                openCoding(
                    selectedCoding
                );

                return;

            }


            if (!topicButton) {
                return;
            }


            const topic =
                TOPICS[
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
                        ${esc(
                            topic[0]
                        )}
                    </h3>

                </div>


                <div
                    class="coding-content-body">

                    <p>
                        ${esc(
                            topic[1]
                        )}
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

    "neb-gpa": [

        "ACADEMICS",

        "How NEB GPA Calculation Works",

        "GPA summarizes grade-point performance across subjects. Weighted calculations use grade points together with credit values."

    ],


    "gpa-cgpa": [

        "ACADEMICS",

        "GPA vs CGPA",

        "GPA normally represents a specific group or academic period, while CGPA combines multiple grade-point entries."

    ],


    "c-programming": [

        "PROGRAMMING",

        "Starting C Programming",

        "Start with variables, input/output, conditions and loops before moving to arrays, strings and functions."

    ],


    "study-routine": [

        "STUDY",

        "Building a Better Study Routine",

        "Break large subjects into smaller topics and combine active recall with practice and revision."

    ],


    "computer-science": [

        "COMPUTER SCIENCE",

        "Why Computer Science Matters",

        "Computer science covers algorithms, data, computer systems, programming and problem solving."

    ],


    website: [

        "TECHNOLOGY",

        "What Happens When You Open a Website?",

        "Your browser requests website resources such as HTML, CSS and JavaScript and then builds the page."

    ],


    "stupivot-tools": [

        "TOOLS",

        "Using StuPivot Effectively",

        "Use calculators for quick academic calculations, Study Hub for resources and Coding Hub for programming."

    ],


    "bs-ad": [

        "CALENDAR",

        "BS and AD Calendar Conversion",

        "BS and AD use different calendar systems, so accurate conversion uses calendar data rather than a fixed year offset."

    ]

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


                    if (!article) {
                        return;
                    }


                    $("#articleContent")
                        .innerHTML = `

                        <span
                            class="section-label">

                            ${esc(
                                article[0]
                            )}

                        </span>


                        <h2>

                            ${esc(
                                article[1]
                            )}

                        </h2>


                        <p>

                            ${esc(
                                article[2]
                            )}

                        </p>

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

const SEARCH = [

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
        "Convert BS and AD dates",
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
        "Calculate discount",
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
        "Convert text case",
        "tool",
        "case-converter"
    ],

    [
        "Text Cleaner",
        "Clean text",
        "tool",
        "text-cleaner"
    ],

    [
        "QR Code Generator",
        "Generate QR code",
        "tool",
        "qr"
    ],

    [
        "Password Generator",
        "Generate a password",
        "tool",
        "password"
    ],

    [
        "Random Number",
        "Generate a random number",
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


function searchSite() {

    const input =
        $("#siteSearch");


    const output =
        $("#searchResults");


    if (
        !input ||
        !output
    ) {
        return;
    }


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        output.innerHTML =
            "";

        return;

    }


    const matches =
        SEARCH.filter(
            item =>
                `${item[0]} ${item[1]}`
                    .toLowerCase()
                    .includes(query)
        );


    if (!matches.length) {

        output.innerHTML = `

            <div class="search-empty">

                No matching StuPivot
                content found.

            </div>

        `;

        return;

    }


    output.innerHTML =
        matches
            .map(
                (
                    item,
                    index
                ) =>
                    `

                    <button
                        type="button"
                        class="search-result-item"
                        data-search-index="${index}">

                        <strong>
                            ${esc(
                                item[0]
                            )}
                        </strong>

                        <small>
                            ${esc(
                                item[1]
                            )}
                        </small>

                    </button>

                    `
            )
            .join("");


    $$(".search-result-item", output)
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
        searchSite
    );


$("#siteSearch")
    ?.addEventListener(
        "input",
        searchSite
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

                searchSite();

            }

        }
    );


/* =========================================================
   LEGAL
   ========================================================= */

const LEGAL = {

    privacy: [

        "Privacy Policy",

        "Information submitted through the contact and feedback forms is sent through the configured form service. Do not submit passwords or other sensitive information."

    ],


    terms: [

        "Terms of Use",

        "StuPivot provides calculators, tools and educational information for general student use. Important academic results should be checked against official records."

    ]

};


$$(".legal-card")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const item =
                        LEGAL[
                            button.dataset
                                .legal
                        ];


                    if (!item) {
                        return;
                    }


                    $("#legalContent")
                        .innerHTML = `

                        <span
                            class="section-label">

                            INFORMATION

                        </span>


                        <h2>

                            ${esc(
                                item[0]
                            )}

                        </h2>


                        <p>

                            ${esc(
                                item[1]
                            )}

                        </p>

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

function setupForm(
    id
) {

    const form =
        document.getElementById(
            id
        );


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


            const oldText =
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


                if (
                    !response.ok
                ) {

                    throw Error(
                        "Message could not be sent."
                    );

                }


                form.reset();


                toast(
                    "Your message was sent successfully."
                );


            } catch (error) {

                toast(
                    error.message ||
                    "Something went wrong.",
                    "error"
                );


            } finally {

                if (button) {

                    button.disabled =
                        false;

                    button.textContent =
                        oldText;

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
   INPUT GUARD
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

console.log(
    "StuPivot initialized successfully."
);
