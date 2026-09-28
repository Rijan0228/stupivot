/* =========================================================
   STUPIVOT — STUDY HUB JAVASCRIPT
   Class → Faculty → Subject → Resource
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const classStep = document.getElementById("studyStepClass");
    const facultyStep = document.getElementById("studyStepFaculty");
    const subjectStep = document.getElementById("studyStepSubject");
    const resourceStep = document.getElementById("studyStepResource");

    const facultyTitle = document.getElementById("studyFacultyTitle");

    const subjectTitle = document.getElementById("studySubjectTitle");
    const subjectDescription =
        document.getElementById("studySubjectDescription");

    const subjectGrid =
        document.getElementById("studySubjectGrid");

    const pathClass =
        document.getElementById("studyPathClass");

    const pathFaculty =
        document.getElementById("studyPathFaculty");

    const resourceTitle =
        document.getElementById("studyResourceTitle");

    const resourceDescription =
        document.getElementById("studyResourceDescription");

    const resourcePathClass =
        document.getElementById("studyResourcePathClass");

    const resourcePathFaculty =
        document.getElementById("studyResourcePathFaculty");

    const resourcePathSubject =
        document.getElementById("studyResourcePathSubject");

    const resourceContent =
        document.getElementById("studyResourceContent");


    if (
        !classStep ||
        !facultyStep ||
        !subjectStep ||
        !resourceStep ||
        !subjectGrid
    ) {
        return;
    }


    /* =====================================================
       CURRENT SELECTION
    ===================================================== */

    let selectedClass = "";
    let selectedFaculty = "";
    let selectedSubject = "";


    /* =====================================================
       NEB SUBJECT DATA

       These are organized for StuPivot's browsing system.
       Subject combinations can vary by institution.
    ===================================================== */

    const subjects = {

        science: {

            name: "Science",

            description:
                "Science-focused subjects available through the NEB subject structure.",

            common: [
                {
                    name: "Physics",
                    code: "1011",
                    description: "Physics concepts, numerical problems and practical study."
                },
                {
                    name: "Chemistry",
                    code: "2011",
                    description: "Chemical principles, reactions and practical study."
                },
                {
                    name: "Biology",
                    code: "3011",
                    description: "Biological concepts, systems and practical study."
                },
                {
                    name: "Mathematics",
                    code: "4011",
                    description: "Mathematics, problem solving and numerical practice."
                },
                {
                    name: "Applied Mathematics",
                    code: "4031",
                    description: "Applied mathematical concepts and problem solving."
                },
                {
                    name: "Computer Science",
                    code: "4271",
                    description: "Programming, computer systems and information technology."
                }
            ]
        },


        management: {

            name: "Management",

            description:
                "Business and management-oriented subjects.",

            common: [
                {
                    name: "Accounting",
                    description: "Accounting concepts, journal, ledger and financial statements."
                },
                {
                    name: "Economics",
                    code: "3031",
                    description: "Microeconomics, macroeconomics and economic analysis."
                },
                {
                    name: "Business Mathematics",
                    code: "4051",
                    description: "Mathematical techniques used in business and finance."
                },
                {
                    name: "Finance",
                    code: "4171",
                    description: "Financial concepts, institutions and financial management."
                },
                {
                    name: "Marketing",
                    code: "3071",
                    description: "Marketing concepts, markets and promotional activities."
                },
                {
                    name: "Business Studies",
                    description: "Business organization, management and entrepreneurship."
                },
                {
                    name: "Computer Science",
                    code: "4271",
                    description: "Computer concepts and programming where offered."
                }
            ]
        },


        humanities: {

            name: "Humanities & Social Studies",

            description:
                "Humanities and social-science-oriented subjects.",

            common: [
                {
                    name: "Sociology",
                    description: "Society, culture, social institutions and social change."
                },
                {
                    name: "History",
                    description: "Historical events, civilizations and historical analysis."
                },
                {
                    name: "Geography",
                    description: "Physical and human geography."
                },
                {
                    name: "Political Science",
                    description: "Government, politics and political systems."
                },
                {
                    name: "Economics",
                    code: "3031",
                    description: "Economic concepts and analysis."
                },
                {
                    name: "Mass Communication",
                    description: "Communication, media and journalism-related study."
                },
                {
                    name: "Rural Development",
                    description: "Rural society, development and related issues."
                }
            ]
        },


        education: {

            name: "Education",

            description:
                "Education-focused subjects and related study.",

            common: [
                {
                    name: "Education and Development",
                    description: "Education systems, development and society."
                },
                {
                    name: "Instructional Pedagogy",
                    description: "Teaching-learning processes and instructional methods."
                },
                {
                    name: "Psychology",
                    description: "Human behaviour, learning and psychological concepts."
                },
                {
                    name: "Sociology",
                    description: "Society, culture and social relationships."
                },
                {
                    name: "Rural Development",
                    description: "Community and rural development concepts."
                },
                {
                    name: "Economics",
                    code: "3031",
                    description: "Economic concepts and applications."
                }
            ]
        },


        computer: {

            name: "Computer Science & Technology",

            description:
                "Computing-focused subjects and related mathematical study.",

            common: [
                {
                    name: "Computer Science",
                    code: "4271",
                    description: "Programming, databases, networking and computer systems."
                },
                {
                    name: "Mathematics",
                    code: "4011",
                    description: "Mathematical concepts and problem solving."
                },
                {
                    name: "Applied Mathematics",
                    code: "4031",
                    description: "Applied mathematical problem solving."
                },
                {
                    name: "Business Mathematics",
                    code: "4051",
                    description: "Business-oriented mathematical techniques."
                },
                {
                    name: "Physics",
                    code: "1011",
                    description: "Physics concepts and numerical problem solving."
                }
            ]
        },


        law: {

            name: "Law",

            description:
                "Law-related subjects available in the NEB subject structure.",

            common: [
                {
                    name: "General Law",
                    code: "4151",
                    description: "Fundamental concepts of law and legal systems."
                },
                {
                    name: "Constitutional Law",
                    code: "3171",
                    description: "Constitutional principles and legal structures."
                },
                {
                    name: "Human Rights",
                    code: "4071",
                    description: "Human rights, freedoms and legal principles."
                },
                {
                    name: "Political Science",
                    description: "Government and political systems."
                },
                {
                    name: "Economics",
                    code: "3031",
                    description: "Economic concepts and analysis."
                }
            ]
        },


        hotel: {

            name: "Hotel & Hospitality",

            description:
                "Hospitality and hotel-management-oriented subjects.",

            common: [
                {
                    name: "Hotel Management",
                    code: "4391",
                    description: "Hotel operations and hospitality management."
                },
                {
                    name: "Tourism and Mountaineering Studies",
                    code: "3051",
                    description: "Tourism, travel and mountaineering studies."
                },
                {
                    name: "Marketing",
                    code: "3071",
                    description: "Marketing principles and applications."
                },
                {
                    name: "Economics",
                    code: "3031",
                    description: "Economic concepts and applications."
                },
                {
                    name: "Finance",
                    code: "4171",
                    description: "Financial concepts and management."
                },
                {
                    name: "Computer Science",
                    code: "4271",
                    description: "Computing and programming where offered."
                }
            ]
        },


        agriculture: {

            name: "Agriculture & Environment",

            description:
                "Agriculture, environment and related technical subjects.",

            common: [
                {
                    name: "Environment Science",
                    code: "4131",
                    description: "Environment, ecosystems and environmental issues."
                },
                {
                    name: "Agriculture",
                    description: "Agricultural science and production-related study."
                },
                {
                    name: "Horticulture",
                    description: "Plant cultivation and horticultural practices."
                },
                {
                    name: "Food Technology",
                    description: "Food science, processing and preservation."
                },
                {
                    name: "Biology",
                    code: "3011",
                    description: "Biological concepts and practical study."
                },
                {
                    name: "Chemistry",
                    code: "2011",
                    description: "Chemical principles and practical study."
                }
            ]
        },


        arts: {

            name: "Fine Arts & Performing Arts",

            description:
                "Visual and performing arts subjects.",

            common: [
                {
                    name: "Applied Arts",
                    code: "3611",
                    description: "Applied visual-art concepts and practice."
                },
                {
                    name: "Sculpture",
                    code: "4231",
                    description: "Sculpture theory and practical work."
                },
                {
                    name: "Singing",
                    code: "4251",
                    description: "Vocal music theory and practical work."
                },
                {
                    name: "Painting",
                    description: "Painting theory and practical artistic work."
                },
                {
                    name: "Dance",
                    description: "Dance theory and practical performance."
                }
            ]
        },


        traditional: {

            name: "Traditional Education",

            description:
                "Traditional and language-oriented study areas.",

            common: [
                {
                    name: "Sanskrit",
                    description: "Sanskrit language and literature."
                },
                {
                    name: "Sanskrit Grammar",
                    code: "5101",
                    description: "Sanskrit grammar and language study."
                },
                {
                    name: "Vedic Studies",
                    description: "Vedic and traditional studies."
                },
                {
                    name: "Buddhist Studies",
                    code: "4211",
                    description: "Buddhist philosophy, literature and traditions."
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
            description: "Nepali language and literature."
        },
        {
            name: "English",
            description: "English language, literature and communication."
        },
        {
            name: "Social Studies",
            description: "Social studies, life skills and related topics."
        }
    ];


    /* =====================================================
       STEP DISPLAY
    ===================================================== */

    function showStep(step) {

        [
            classStep,
            facultyStep,
            subjectStep,
            resourceStep
        ].forEach(element => {

            if (!element) return;

            element.classList.add("hidden");
            element.classList.remove("active");

        });

        step.classList.remove("hidden");
        step.classList.add("active");

        step.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
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

                const data =
                    subjects[selectedFaculty];

                if (!data) return;

                pathClass.textContent =
                    `Class ${selectedClass}`;

                pathFaculty.textContent =
                    data.name;

                subjectTitle.textContent =
                    `${data.name} subjects`;

                subjectDescription.textContent =
                    data.description;

                renderSubjects(data.common);

                showStep(subjectStep);

            });

        });


    /* =====================================================
       SUBJECT RENDERING
    ===================================================== */

    function renderSubjects(list) {

        subjectGrid.innerHTML = "";

        const allSubjects = [
            ...generalSubjects,
            ...list
        ];

        const uniqueSubjects = [];

        const names = new Set();

        allSubjects.forEach(subject => {

            if (!names.has(subject.name)) {

                names.add(subject.name);
                uniqueSubjects.push(subject);

            }

        });


        uniqueSubjects.forEach((subject, index) => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "study-choice-card subject-choice-card";

            button.dataset.subject =
                subject.name;


            button.innerHTML = `

                <span class="choice-card-top">

                    <span class="choice-index">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="choice-arrow">
                        ↗
                    </span>

                </span>

                <span class="choice-icon">
                    ${getSubjectCode(subject.name)}
                </span>

                <strong>
                    ${escapeHTML(subject.name)}
                </strong>

                <small>
                    ${escapeHTML(subject.description || "")}
                </small>

            `;


            button.addEventListener(
                "click",
                () => selectSubject(subject)
            );


            subjectGrid.appendChild(button);

        });

    }


    /* =====================================================
       SUBJECT SELECTION
    ===================================================== */

    function selectSubject(subject) {

        selectedSubject =
            subject.name;

        const faculty =
            subjects[selectedFaculty];

        resourceTitle.textContent =
            subject.name;

        resourceDescription.textContent =
            `Choose a resource for ${subject.name}.`;

        resourcePathClass.textContent =
            `Class ${selectedClass}`;

        resourcePathFaculty.textContent =
            faculty
                ? faculty.name
                : selectedFaculty;

        resourcePathSubject.textContent =
            selectedSubject;

        resourceContent.classList.add("hidden");
        resourceContent.innerHTML = "";

        showStep(resourceStep);

    }


    /* =====================================================
       RESOURCE SELECTION
    ===================================================== */

    document
        .querySelectorAll(".resource-choice-card")
        .forEach(button => {

            button.addEventListener("click", () => {

                const resource =
                    button.dataset.resource;

                openResource(resource);

            });

        });


    function openResource(resource) {

        resourceContent.classList.remove("hidden");

        let title = "";
        let text = "";

        if (resource === "notes") {

            title = "Notes";

            text =
                `Notes for ${selectedSubject} — Class ${selectedClass}.`;

        }

        if (resource === "questions") {

            title = "Questions";

            text =
                `Practice questions for ${selectedSubject} — Class ${selectedClass}.`;

        }

        if (resource === "exam") {

            title = "Exam Preparation";

            text =
                `Exam preparation for ${selectedSubject} — Class ${selectedClass}.`;

        }


        resourceContent.innerHTML = `

            <div class="study-content-header">

                <span class="section-label">
                    ${escapeHTML(title)}
                </span>

                <h3>
                    ${escapeHTML(selectedSubject)}
                </h3>

                <p>
                    ${escapeHTML(text)}
                </p>

            </div>

            <div class="study-content-placeholder">

                <strong>
                    ${escapeHTML(title)} content area
                </strong>

                <p>
                    This area is ready for the actual
                    NEB chapter material, questions and
                    exam resources to be connected.
                </p>

            </div>

        `;

        resourceContent.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* =====================================================
       BACK BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-study-back]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const target =
                    button.dataset.studyBack;

                if (target === "class") {

                    showStep(classStep);

                    return;

                }

                if (target === "faculty") {

                    showStep(facultyStep);

                    return;

                }

                if (target === "subject") {

                    showStep(subjectStep);

                }

            });

        });


    /* =====================================================
       SUBJECT CODE / SHORT LABEL
    ===================================================== */

    function getSubjectCode(name) {

        const codes = {

            "Computer Science": "CS",
            "Mathematics": "MATH",
            "Applied Mathematics": "AM",
            "Business Mathematics": "BM",
            "Physics": "PHY",
            "Chemistry": "CHEM",
            "Biology": "BIO",
            "Accounting": "ACC",
            "Economics": "ECO",
            "Finance": "FIN",
            "Marketing": "MKT",
            "Business Studies": "BUS",
            "Sociology": "SOC",
            "History": "HIS",
            "Geography": "GEO",
            "Political Science": "POL",
            "Nepali": "NEP",
            "English": "ENG",
            "Social Studies": "SS",
            "General Law": "LAW",
            "Constitutional Law": "LAW",
            "Human Rights": "HR",
            "Hotel Management": "HM",
            "Environment Science": "ENV",
            "Agriculture": "AGR",
            "Horticulture": "HORT",
            "Food Technology": "FOOD",
            "Sculpture": "ART",
            "Singing": "MUS",
            "Painting": "ART",
            "Dance": "DANCE",
            "Sanskrit": "SAN",
            "Sanskrit Grammar": "SAN",
            "Vedic Studies": "VED",
            "Buddhist Studies": "BUD"
        };

        return codes[name] || "SUB";

    }


    /* =====================================================
       SAFE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});
