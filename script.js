/* =========================================================
   STUPIVOT — STUDY HUB JAVASCRIPT
   CLASS → FACULTY → SUBJECT → RESOURCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const classStep =
        document.getElementById("studyStepClass");

    const facultyStep =
        document.getElementById("studyStepFaculty");

    const subjectStep =
        document.getElementById("studyStepSubject");

    const resourceStep =
        document.getElementById("studyStepResource");


    const facultyTitle =
        document.getElementById("facultyTitle");

    const subjectTitle =
        document.getElementById("subjectTitle");

    const subjectDescription =
        document.getElementById("subjectDescription");

    const subjectGrid =
        document.getElementById("subjectGrid");


    const pathClass =
        document.getElementById("pathClass");

    const pathFaculty =
        document.getElementById("pathFaculty");


    const resourceTitle =
        document.getElementById("resourceTitle");

    const resourceDescription =
        document.getElementById("resourceDescription");


    const resourceClass =
        document.getElementById("resourceClass");

    const resourceFaculty =
        document.getElementById("resourceFaculty");

    const resourceSubject =
        document.getElementById("resourceSubject");


    const resourceContent =
        document.getElementById("resourceContent");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (
        !classStep ||
        !facultyStep ||
        !subjectStep ||
        !resourceStep ||
        !subjectGrid ||
        !resourceContent
    ) {

        console.error(
            "StuPivot Study Hub: Required HTML elements are missing."
        );

        return;
    }


    /* =====================================================
       CURRENT SELECTION
    ===================================================== */

    let selectedClass = "";
    let selectedFaculty = "";
    let selectedSubject = "";


    /* =====================================================
       SUBJECT DATA
    ===================================================== */

    const facultyData = {

        science: {

            name: "Science",

            description:
                "Science subjects with concepts, numerical problems and practical study.",

            subjects: [

                {
                    name: "Physics",
                    code: "PHY",
                    description:
                        "Mechanics, heat, waves, electricity and numerical problems."
                },

                {
                    name: "Chemistry",
                    code: "CHEM",
                    description:
                        "Chemical principles, reactions, matter and practical study."
                },

                {
                    name: "Biology",
                    code: "BIO",
                    description:
                        "Living organisms, cells, systems and biological processes."
                },

                {
                    name: "Mathematics",
                    code: "MATH",
                    description:
                        "Algebra, geometry, calculus and mathematical problem solving."
                },

                {
                    name: "Computer Science",
                    code: "CS",
                    description:
                        "Programming, computer systems, databases and information technology."
                }

            ]

        },


        management: {

            name: "Management",

            description:
                "Business, finance, economics and management-oriented subjects.",

            subjects: [

                {
                    name: "Accounting",
                    code: "ACC",
                    description:
                        "Journal, ledger, financial statements and accounting principles."
                },

                {
                    name: "Economics",
                    code: "ECO",
                    description:
                        "Microeconomics, macroeconomics and economic analysis."
                },

                {
                    name: "Business Studies",
                    code: "BUS",
                    description:
                        "Business organization, management and entrepreneurship."
                },

                {
                    name: "Finance",
                    code: "FIN",
                    description:
                        "Financial concepts, institutions and financial management."
                },

                {
                    name: "Business Mathematics",
                    code: "BM",
                    description:
                        "Mathematical techniques used in business and finance."
                },

                {
                    name: "Computer Science",
                    code: "CS",
                    description:
                        "Programming, computer systems and technology."
                }

            ]

        },


        humanities: {

            name: "Humanities & Social Studies",

            description:
                "Humanities and social-science-oriented subjects.",

            subjects: [

                {
                    name: "Sociology",
                    code: "SOC",
                    description:
                        "Society, culture, institutions and social change."
                },

                {
                    name: "History",
                    code: "HIS",
                    description:
                        "Historical events, civilizations and historical analysis."
                },

                {
                    name: "Geography",
                    code: "GEO",
                    description:
                        "Physical geography, human geography and environment."
                },

                {
                    name: "Political Science",
                    code: "POL",
                    description:
                        "Government, politics and political systems."
                },

                {
                    name: "Economics",
                    code: "ECO",
                    description:
                        "Economic concepts and analysis."
                }

            ]

        },


        education: {

            name: "Education",

            description:
                "Education-focused subjects and related study areas.",

            subjects: [

                {
                    name: "Education",
                    code: "EDU",
                    description:
                        "Education systems, learning and educational development."
                },

                {
                    name: "Psychology",
                    code: "PSY",
                    description:
                        "Human behaviour, learning and psychological concepts."
                },

                {
                    name: "Sociology",
                    code: "SOC",
                    description:
                        "Society, culture and social relationships."
                },

                {
                    name: "Economics",
                    code: "ECO",
                    description:
                        "Economic concepts and applications."
                }

            ]

        },


        computer: {

            name: "Computer Science & Technology",

            description:
                "Computing-focused subjects and supporting mathematical study.",

            subjects: [

                {
                    name: "Computer Science",
                    code: "CS",
                    description:
                        "Programming, computer systems, databases and networking."
                },

                {
                    name: "Mathematics",
                    code: "MATH",
                    description:
                        "Mathematical concepts and problem solving."
                },

                {
                    name: "Applied Mathematics",
                    code: "AM",
                    description:
                        "Applied mathematical concepts and problem solving."
                },

                {
                    name: "Physics",
                    code: "PHY",
                    description:
                        "Physics concepts and numerical problem solving."
                }

            ]

        },


        law: {

            name: "Law",

            description:
                "Law-related subjects and legal study.",

            subjects: [

                {
                    name: "General Law",
                    code: "LAW",
                    description:
                        "Fundamental concepts of law and legal systems."
                },

                {
                    name: "Constitutional Law",
                    code: "CL",
                    description:
                        "Constitutional principles and legal structures."
                },

                {
                    name: "Human Rights",
                    code: "HR",
                    description:
                        "Human rights, freedoms and legal principles."
                },

                {
                    name: "Political Science",
                    code: "POL",
                    description:
                        "Government and political systems."
                }

            ]

        },


        hotel: {

            name: "Hotel & Hospitality",

            description:
                "Hospitality, tourism and hotel-management subjects.",

            subjects: [

                {
                    name: "Hotel Management",
                    code: "HM",
                    description:
                        "Hotel operations and hospitality management."
                },

                {
                    name: "Tourism",
                    code: "TOUR",
                    description:
                        "Tourism, travel and hospitality concepts."
                },

                {
                    name: "Marketing",
                    code: "MKT",
                    description:
                        "Marketing principles and applications."
                },

                {
                    name: "Finance",
                    code: "FIN",
                    description:
                        "Financial concepts and management."
                },

                {
                    name: "Computer Science",
                    code: "CS",
                    description:
                        "Computing and programming where offered."
                }

            ]

        },


        agriculture: {

            name: "Agriculture & Environment",

            description:
                "Agriculture, environment and related science subjects.",

            subjects: [

                {
                    name: "Agriculture",
                    code: "AGR",
                    description:
                        "Agricultural science and production-related study."
                },

                {
                    name: "Environmental Science",
                    code: "ENV",
                    description:
                        "Environment, ecosystems and environmental issues."
                },

                {
                    name: "Biology",
                    code: "BIO",
                    description:
                        "Biological concepts and practical study."
                },

                {
                    name: "Chemistry",
                    code: "CHEM",
                    description:
                        "Chemical principles and practical study."
                }

            ]

        }

    };


    /* =====================================================
       GENERAL SUBJECTS
    ===================================================== */

    const generalSubjects = [

        {
            name: "Nepali",
            code: "NEP",
            description:
                "Nepali language and literature."
        },

        {
            name: "English",
            code: "ENG",
            description:
                "English language, literature and communication."
        },

        {
            name: "Social Studies",
            code: "SS",
            description:
                "Social studies, life skills and related topics."
        }

    ];


    /* =====================================================
       SHOW STEP
    ===================================================== */

    function showStep(step) {

        const steps = [
            classStep,
            facultyStep,
            subjectStep,
            resourceStep
        ];

        steps.forEach(item => {

            item.classList.add("hidden");

            item.classList.remove("active");

        });


        step.classList.remove("hidden");

        step.classList.add("active");


        window.setTimeout(() => {

            step.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 50);

    }


    /* =====================================================
       CLASS SELECTION
    ===================================================== */

    document
        .querySelectorAll(".class-choice")
        .forEach(button => {

            button.addEventListener("click", () => {

                selectedClass =
                    button.dataset.class;

                facultyTitle.textContent =
                    `Class ${selectedClass}`;

                showStep(facultyStep);

            });

        });


    /* =====================================================
       FACULTY SELECTION
    ===================================================== */

    document
        .querySelectorAll(".faculty-choice")
        .forEach(button => {

            button.addEventListener("click", () => {

                selectedFaculty =
                    button.dataset.faculty;


                const faculty =
                    facultyData[selectedFaculty];


                if (!faculty) {

                    console.error(
                        "Faculty data not found:",
                        selectedFaculty
                    );

                    return;
                }


                pathClass.textContent =
                    `Class ${selectedClass}`;


                pathFaculty.textContent =
                    faculty.name;


                subjectTitle.textContent =
                    `${faculty.name} subjects`;


                subjectDescription.textContent =
                    faculty.description;


                renderSubjects(
                    faculty.subjects
                );


                showStep(subjectStep);

            });

        });


    /* =====================================================
       RENDER SUBJECTS
    ===================================================== */

    function renderSubjects(subjects) {

        subjectGrid.innerHTML = "";


        const combinedSubjects = [
            ...generalSubjects,
            ...subjects
        ];


        const uniqueSubjects = [];

        const usedNames =
            new Set();


        combinedSubjects.forEach(subject => {

            if (
                !usedNames.has(
                    subject.name
                )
            ) {

                usedNames.add(
                    subject.name
                );

                uniqueSubjects.push(
                    subject
                );

            }

        });


        uniqueSubjects.forEach(
            (subject, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type = "button";

                button.className =
                    "choice-card";


                button.dataset.subject =
                    subject.name;


                button.innerHTML = `

                    <div class="card-top">

                        <span>
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <b>
                            ↗
                        </b>

                    </div>

                    <div class="card-icon">
                        ${escapeHTML(subject.code)}
                    </div>

                    <h3>
                        ${escapeHTML(subject.name)}
                    </h3>

                    <p>
                        ${escapeHTML(subject.description)}
                    </p>

                `;


                button.addEventListener(
                    "click",
                    () => {

                        selectSubject(
                            subject
                        );

                    }
                );


                subjectGrid.appendChild(
                    button
                );

            }
        );

    }


    /* =====================================================
       SUBJECT SELECTION
    ===================================================== */

    function selectSubject(subject) {

        selectedSubject =
            subject.name;


        const faculty =
            facultyData[
                selectedFaculty
            ];


        resourceTitle.textContent =
            selectedSubject;


        resourceDescription.textContent =
            `Choose a study resource for ${selectedSubject}.`;


        resourceClass.textContent =
            `Class ${selectedClass}`;


        resourceFaculty.textContent =
            faculty
                ? faculty.name
                : selectedFaculty;


        resourceSubject.textContent =
            selectedSubject;


        resourceContent.classList.add(
            "hidden"
        );


        resourceContent.innerHTML = "";


        showStep(resourceStep);

    }


    /* =====================================================
       RESOURCE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".resource-card")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const resource =
                        button.dataset.resource;


                    openResource(
                        resource
                    );

                }
            );

        });


    /* =====================================================
       OPEN RESOURCE
    ===================================================== */

    function openResource(resource) {

        let html = "";


        if (resource === "notes") {

            html =
                createNotes();

        }


        if (resource === "questions") {

            html =
                createQuestions();

        }


        if (resource === "exam") {

            html =
                createExamPreparation();

        }


        if (!html) {

            return;

        }


        resourceContent.innerHTML =
            html;


        resourceContent.classList.remove(
            "hidden"
        );


        resourceContent.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* =====================================================
       NOTES
    ===================================================== */

    function createNotes() {

        return `

            <span class="resource-badge">
                NOTES
            </span>

            <h3>
                ${escapeHTML(selectedSubject)}
            </h3>

            <p>
                Class ${escapeHTML(selectedClass)}
                · ${escapeHTML(
                    facultyData[selectedFaculty]?.name ||
                    selectedFaculty
                )}
            </p>


            <h4>
                Chapter Notes
            </h4>

            <ul>

                <li>
                    Introduction and basic concepts
                </li>

                <li>
                    Important definitions and terminology
                </li>

                <li>
                    Main concepts and explanations
                </li>

                <li>
                    Examples and applications
                </li>

                <li>
                    Important points for revision
                </li>

            </ul>


            <h4>
                Quick Revision
            </h4>

            <p>
                Use this section for important concepts,
                formulas, definitions and points that need
                to be remembered before an examination.
            </p>

        `;

    }


    /* =====================================================
       QUESTIONS
    ===================================================== */

    function createQuestions() {

        return `

            <span class="resource-badge">
                QUESTIONS
            </span>

            <h3>
                ${escapeHTML(selectedSubject)}
                Practice Questions
            </h3>

            <p>
                Class ${escapeHTML(selectedClass)}
                · Practice material
            </p>


            <h4>
                Multiple Choice Questions
            </h4>


            <div class="question-box">

                <strong>
                    1. Which statement best describes
                    ${escapeHTML(selectedSubject)}?
                </strong>

                <p>
                    A. A basic concept of the subject
                </p>

                <p>
                    B. An unrelated concept
                </p>

                <p>
                    C. A non-academic activity
                </p>

                <p>
                    D. None of the above
                </p>

            </div>


            <div class="question-box">

                <strong>
                    2. Write two important concepts
                    you have learned in this subject.
                </strong>

            </div>


            <h4>
                Short-Answer Questions
            </h4>


            <ol>

                <li>
                    Define an important term from the chapter.
                </li>

                <li>
                    Explain the main concept in your own words.
                </li>

                <li>
                    Write two applications or examples.
                </li>

            </ol>


            <h4>
                Long-Answer Practice
            </h4>

            <ol>

                <li>
                    Explain the major concepts of the chapter
                    with suitable examples.
                </li>

                <li>
                    Compare two important concepts studied
                    in the subject.
                </li>

            </ol>

        `;

    }


    /* =====================================================
       EXAM PREPARATION
    ===================================================== */

    function createExamPreparation() {

        return `

            <span class="resource-badge">
                EXAM PREPARATION
            </span>

            <h3>
                ${escapeHTML(selectedSubject)}
                Exam Preparation
            </h3>

            <p>
                Class ${escapeHTML(selectedClass)}
                · Revision workspace
            </p>


            <h4>
                Before the Exam
            </h4>

            <ul>

                <li>
                    Review all chapter notes.
                </li>

                <li>
                    Memorize important definitions,
                    formulas and key concepts.
                </li>

                <li>
                    Practice short-answer questions.
                </li>

                <li>
                    Practice long-answer questions.
                </li>

                <li>
                    Solve model and previous-style questions.
                </li>

            </ul>


            <h4>
                Important Revision Areas
            </h4>

            <ol>

                <li>
                    Basic concepts and definitions
                </li>

                <li>
                    Important theories and principles
                </li>

                <li>
                    Examples and applications
                </li>

                <li>
                    Numerical or practical problems where applicable
                </li>

                <li>
                    Frequently asked question patterns
                </li>

            </ol>


            <h4>
                Final Revision Checklist
            </h4>

            <ul>

                <li>
                    ✓ Notes completed
                </li>

                <li>
                    ✓ Questions practiced
                </li>

                <li>
                    ✓ Difficult topics revised
                </li>

                <li>
                    ✓ Model questions solved
                </li>

                <li>
                    ✓ Final revision completed
                </li>

            </ul>

        `;

    }


    /* =====================================================
       BACK BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-back]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.back;


                    if (
                        target === "class"
                    ) {

                        showStep(
                            classStep
                        );

                    }


                    else if (
                        target === "faculty"
                    ) {

                        showStep(
                            facultyStep
                        );

                    }


                    else if (
                        target === "subject"
                    ) {

                        showStep(
                            subjectStep
                        );

                    }

                }
            );

        });


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =====================================================
       START
    ===================================================== */

    console.log(
        "StuPivot Study Hub loaded successfully."
    );

});
