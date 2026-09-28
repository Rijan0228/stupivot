/* =========================================================
   STUPIVOT - MAIN JAVASCRIPT
   Matched to the current StuPivot index.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
       ===================================================== */

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    const toolModal = $("#toolModal");
    const modalContent = $("#modalContent");
    const articleModal = $("#articleModal");
    const articleContent = $("#articleContent");
    const toast = $("#toast");

    /* Current year */
    const year = $("#year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* Toast message */
    function showToast(message, duration = 3000) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, duration);
    }

    /* Escape HTML */
    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = $("#menuBtn");
    const navLinks = $("#navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        $$("#navLinks a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    /* =====================================================
       THEME TOGGLE
       ===================================================== */

    const themeToggle = $("#themeToggle");

    function applyTheme(theme) {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            if (themeToggle) themeToggle.textContent = "☀";
        } else {
            document.body.classList.remove("light-mode");
            if (themeToggle) themeToggle.textContent = "◐";
        }
    }

    const savedTheme = localStorage.getItem("stupivot-theme") || "dark";
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = document.body.classList.contains("light-mode");
            const newTheme = isLight ? "dark" : "light";

            applyTheme(newTheme);
            localStorage.setItem("stupivot-theme", newTheme);
        });
    }

    /* =====================================================
       SEARCH OPEN BUTTON
       ===================================================== */

    const searchOpen = $("#searchOpen");
    const siteSearch = $("#siteSearch");

    if (searchOpen) {
        searchOpen.addEventListener("click", () => {
            const searchSection = $("#search");

            if (searchSection) {
                searchSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            setTimeout(() => {
                if (siteSearch) {
                    siteSearch.focus();
                }
            }, 500);
        });
    }

    /* =====================================================
       MODAL FUNCTIONS
       ===================================================== */

    function openToolModal() {
        if (toolModal) {
            toolModal.classList.add("active");
            document.body.classList.add("modal-open");
        }
    }

    function closeToolModal() {
        if (toolModal) {
            toolModal.classList.remove("active");
            document.body.classList.remove("modal-open");
        }
    }

    function openArticleModal() {
        if (articleModal) {
            articleModal.classList.add("active");
            document.body.classList.add("modal-open");
        }
    }

    function closeArticleModal() {
        if (articleModal) {
            articleModal.classList.remove("active");
            document.body.classList.remove("modal-open");
        }
    }

    const modalClose = $("#modalClose");
    const articleClose = $("#articleClose");

    if (modalClose) {
        modalClose.addEventListener("click", closeToolModal);
    }

    if (articleClose) {
        articleClose.addEventListener("click", closeArticleModal);
    }

    if (toolModal) {
        toolModal.addEventListener("click", (event) => {
            if (event.target === toolModal) {
                closeToolModal();
            }
        });
    }

    if (articleModal) {
        articleModal.addEventListener("click", (event) => {
            if (event.target === articleModal) {
                closeArticleModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeToolModal();
            closeArticleModal();
        }
    });

    /* =====================================================
       TOOL UI
       ===================================================== */

    function toolShell(title, description, content) {
        return `
            <div class="generated-tool">
                <span class="eyebrow">STUPIVOT TOOL</span>
                <h2>${title}</h2>
                <p>${description}</p>
                <div class="generated-tool-content">
                    ${content}
                </div>
            </div>
        `;
    }

    function inputField(id, label, type = "number", placeholder = "") {
        return `
            <label>
                ${label}
                <input
                    id="${id}"
                    type="${type}"
                    ${placeholder ? `placeholder="${placeholder}"` : ""}
                >
            </label>
        `;
    }

    function resultBox(id) {
        return `<div class="tool-result" id="${id}"></div>`;
    }

    function numberValue(id) {
        const element = document.getElementById(id);
        if (!element) return NaN;
        return parseFloat(element.value);
    }

    /* =====================================================
       GPA CALCULATOR
       ===================================================== */

    function showGPA() {

        modalContent.innerHTML = toolShell(
            "GPA Calculator",
            "Enter subject credits and grade points to calculate your weighted GPA.",
            `
                <div id="gpaRows">

                    <div class="gpa-row">
                        <input type="text" placeholder="Subject">
                        <input type="number" class="gpa-credit" min="0" step="0.1" placeholder="Credit">
                        <input type="number" class="gpa-point" min="0" max="4" step="0.01" placeholder="Grade Point">
                    </div>

                    <div class="gpa-row">
                        <input type="text" placeholder="Subject">
                        <input type="number" class="gpa-credit" min="0" step="0.1" placeholder="Credit">
                        <input type="number" class="gpa-point" min="0" max="4" step="0.01" placeholder="Grade Point">
                    </div>

                    <div class="gpa-row">
                        <input type="text" placeholder="Subject">
                        <input type="number" class="gpa-credit" min="0" step="0.1" placeholder="Credit">
                        <input type="number" class="gpa-point" min="0" max="4" step="0.01" placeholder="Grade Point">
                    </div>

                </div>

                <button class="btn btn-secondary" id="addGPARow">+ Add Subject</button>
                <button class="btn btn-primary" id="calculateGPA">Calculate GPA</button>

                ${resultBox("gpaResult")}
            `
        );

        $("#addGPARow").addEventListener("click", () => {
            const row = document.createElement("div");
            row.className = "gpa-row";

            row.innerHTML = `
                <input type="text" placeholder="Subject">
                <input type="number" class="gpa-credit" min="0" step="0.1" placeholder="Credit">
                <input type="number" class="gpa-point" min="0" max="4" step="0.01" placeholder="Grade Point">
            `;

            $("#gpaRows").appendChild(row);
        });

        $("#calculateGPA").addEventListener("click", () => {

            const credits = [...document.querySelectorAll(".gpa-credit")];
            const points = [...document.querySelectorAll(".gpa-point")];

            let totalCredits = 0;
            let totalPoints = 0;

            for (let i = 0; i < credits.length; i++) {

                const credit = parseFloat(credits[i].value);
                const point = parseFloat(points[i].value);

                if (!isNaN(credit) && !isNaN(point)) {
                    totalCredits += credit;
                    totalPoints += credit * point;
                }
            }

            const result = $("#gpaResult");

            if (totalCredits <= 0) {
                result.innerHTML = "Please enter valid credits and grade points.";
                return;
            }

            const gpa = totalPoints / totalCredits;

            result.innerHTML = `
                <strong>Your GPA: ${gpa.toFixed(2)}</strong>
            `;
        });
    }

    /* =====================================================
       PERCENTAGE
       ===================================================== */

    function showPercentage() {

        modalContent.innerHTML = toolShell(
            "Percentage Calculator",
            "Calculate percentage from obtained marks and total marks.",
            `
                ${inputField("obtainedMarks", "Obtained Marks")}
                ${inputField("totalMarks", "Total Marks")}

                <button class="btn btn-primary" id="calculatePercentage">
                    Calculate
                </button>

                ${resultBox("percentageResult")}
            `
        );

        $("#calculatePercentage").addEventListener("click", () => {

            const obtained = numberValue("obtainedMarks");
            const total = numberValue("totalMarks");

            if (isNaN(obtained) || isNaN(total) || total <= 0) {
                $("#percentageResult").innerHTML =
                    "Please enter valid marks.";
                return;
            }

            const percentage = (obtained / total) * 100;

            $("#percentageResult").innerHTML =
                `<strong>Percentage: ${percentage.toFixed(2)}%</strong>`;
        });
    }

    /* =====================================================
       CGPA
       ===================================================== */

    function showCGPA() {

        modalContent.innerHTML = toolShell(
            "CGPA Calculator",
            "Enter your semester GPAs to calculate their average.",
            `
                <div id="cgpaRows">
                    <input type="number" class="cgpa-value" min="0" max="10" step="0.01" placeholder="Semester 1 GPA">
                    <input type="number" class="cgpa-value" min="0" max="10" step="0.01" placeholder="Semester 2 GPA">
                    <input type="number" class="cgpa-value" min="0" max="10" step="0.01" placeholder="Semester 3 GPA">
                </div>

                <button class="btn btn-secondary" id="addCGPA">
                    + Add Semester
                </button>

                <button class="btn btn-primary" id="calculateCGPA">
                    Calculate CGPA
                </button>

                ${resultBox("cgpaResult")}
            `
        );

        $("#addCGPA").addEventListener("click", () => {

            const input = document.createElement("input");

            input.type = "number";
            input.className = "cgpa-value";
            input.min = "0";
            input.max = "10";
            input.step = "0.01";
            input.placeholder = "Additional Semester GPA";

            $("#cgpaRows").appendChild(input);
        });

        $("#calculateCGPA").addEventListener("click", () => {

            const values = [...document.querySelectorAll(".cgpa-value")]
                .map(input => parseFloat(input.value))
                .filter(value => !isNaN(value));

            if (values.length === 0) {
                $("#cgpaResult").innerHTML =
                    "Please enter at least one GPA.";
                return;
            }

            const average =
                values.reduce((sum, value) => sum + value, 0) / values.length;

            $("#cgpaResult").innerHTML =
                `<strong>CGPA: ${average.toFixed(2)}</strong>`;
        });
    }

    /* =====================================================
       MARKS & GRADE
       ===================================================== */

    function showGrade() {

        modalContent.innerHTML = toolShell(
            "Marks & Grade Calculator",
            "Find your percentage and a basic letter grade.",
            `
                ${inputField("gradeObtained", "Obtained Marks")}
                ${inputField("gradeTotal", "Total Marks")}

                <button class="btn btn-primary" id="calculateGrade">
                    Calculate
                </button>

                ${resultBox("gradeResult")}

                <small>
                    Basic scale: A+ 90+, A 80+, B+ 70+, B 60+,
                    C+ 50+, C 40+, D 30+, F below 30.
                </small>
            `
        );

        $("#calculateGrade").addEventListener("click", () => {

            const obtained = numberValue("gradeObtained");
            const total = numberValue("gradeTotal");

            if (isNaN(obtained) || isNaN(total) || total <= 0) {
                $("#gradeResult").innerHTML =
                    "Please enter valid marks.";
                return;
            }

            const percentage = (obtained / total) * 100;

            let grade;

            if (percentage >= 90) grade = "A+";
            else if (percentage >= 80) grade = "A";
            else if (percentage >= 70) grade = "B+";
            else if (percentage >= 60) grade = "B";
            else if (percentage >= 50) grade = "C+";
            else if (percentage >= 40) grade = "C";
            else if (percentage >= 30) grade = "D";
            else grade = "F";

            $("#gradeResult").innerHTML = `
                <strong>${percentage.toFixed(2)}%</strong><br>
                Grade: <strong>${grade}</strong>
            `;
        });
    }

    /* =====================================================
       ATTENDANCE
       ===================================================== */

    function showAttendance() {

        modalContent.innerHTML = toolShell(
            "Attendance Calculator",
            "Calculate your attendance percentage and check classes needed for a target.",
            `
                ${inputField("attendedClasses", "Classes Attended")}
                ${inputField("totalClasses", "Total Classes")}
                ${inputField("targetAttendance", "Target Attendance (%)")}

                <button class="btn btn-primary" id="calculateAttendance">
                    Calculate
                </button>

                ${resultBox("attendanceResult")}
            `
        );

        $("#calculateAttendance").addEventListener("click", () => {

            const attended = numberValue("attendedClasses");
            const total = numberValue("totalClasses");
            let target = numberValue("targetAttendance");

            if (isNaN(attended) || isNaN(total) || total <= 0) {
                $("#attendanceResult").innerHTML =
                    "Please enter valid class numbers.";
                return;
            }

            if (isNaN(target)) target = 75;

            const percentage = (attended / total) * 100;

            let message = `
                Current Attendance:
                <strong>${percentage.toFixed(2)}%</strong>
            `;

            if (percentage >= target) {

                message += `
                    <br>You have reached the ${target}% target.
                `;

            } else {

                let additional = 0;

                while (
                    ((attended + additional) /
                        (total + additional)) * 100 < target
                    && additional < 100000
                ) {
                    additional++;
                }

                message += `
                    <br>You need to attend approximately
                    <strong>${additional}</strong> consecutive classes
                    to reach ${target}%.
                `;
            }

            $("#attendanceResult").innerHTML = message;
        });
    }

    /* =====================================================
       AGE CALCULATOR
       ===================================================== */

    function showAge() {

        modalContent.innerHTML = toolShell(
            "Age Calculator",
            "Calculate your age from your date of birth.",
            `
                ${inputField("birthDate", "Date of Birth", "date")}

                <button class="btn btn-primary" id="calculateAge">
                    Calculate Age
                </button>

                ${resultBox("ageResult")}
            `
        );

        $("#calculateAge").addEventListener("click", () => {

            const dob = new Date($("#birthDate").value);

            if (isNaN(dob.getTime())) {
                $("#ageResult").innerHTML =
                    "Please select your date of birth.";
                return;
            }

            const today = new Date();

            if (dob > today) {
                $("#ageResult").innerHTML =
                    "Date of birth cannot be in the future.";
                return;
            }

            let years = today.getFullYear() - dob.getFullYear();
            let months = today.getMonth() - dob.getMonth();
            let days = today.getDate() - dob.getDate();

            if (days < 0) {
                months--;
                const previousMonth =
                    new Date(today.getFullYear(), today.getMonth(), 0);

                days += previousMonth.getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            $("#ageResult").innerHTML = `
                <strong>
                    ${years} years, ${months} months, ${days} days
                </strong>
            `;
        });
    }

    /* =====================================================
       DATE DIFFERENCE
       ===================================================== */

    function showDateDifference() {

        modalContent.innerHTML = toolShell(
            "Date Difference",
            "Find the number of days between two dates.",
            `
                ${inputField("dateOne", "Start Date", "date")}
                ${inputField("dateTwo", "End Date", "date")}

                <button class="btn btn-primary" id="calculateDateDifference">
                    Calculate
                </button>

                ${resultBox("dateResult")}
            `
        );

        $("#calculateDateDifference").addEventListener("click", () => {

            const first = new Date($("#dateOne").value);
            const second = new Date($("#dateTwo").value);

            if (isNaN(first.getTime()) || isNaN(second.getTime())) {
                $("#dateResult").innerHTML =
                    "Please select both dates.";
                return;
            }

            const difference =
                Math.abs(second.getTime() - first.getTime());

            const days =
                Math.round(difference / (1000 * 60 * 60 * 24));

            $("#dateResult").innerHTML =
                `<strong>${days} day(s)</strong> between the dates.`;
        });
    }

    /* =====================================================
       UNIT CONVERTER
       ===================================================== */

    function showUnitConverter() {

        modalContent.innerHTML = toolShell(
            "Unit Converter",
            "Convert common length, weight and temperature units.",
            `
                <label>
                    Category
                    <select id="unitCategory">
                        <option value="length">Length</option>
                        <option value="weight">Weight</option>
                        <option value="temperature">Temperature</option>
                    </select>
                </label>

                <label>
                    Value
                    <input type="number" id="unitValue" placeholder="Enter value">
                </label>

                <label>
                    From
                    <select id="unitFrom"></select>
                </label>

                <label>
                    To
                    <select id="unitTo"></select>
                </label>

                <button class="btn btn-primary" id="convertUnit">
                    Convert
                </button>

                ${resultBox("unitResult")}
            `
        );

        const category = $("#unitCategory");
        const from = $("#unitFrom");
        const to = $("#unitTo");

        const units = {
            length: ["meter", "kilometer", "centimeter", "millimeter", "mile", "foot", "inch"],
            weight: ["kilogram", "gram", "milligram", "pound", "ounce"],
            temperature: ["celsius", "fahrenheit", "kelvin"]
        };

        function updateUnits() {

            const selected = units[category.value];

            from.innerHTML = "";
            to.innerHTML = "";

            selected.forEach(unit => {

                const option1 = document.createElement("option");
                option1.value = unit;
                option1.textContent = unit;

                const option2 = option1.cloneNode(true);

                from.appendChild(option1);
                to.appendChild(option2);
            });
        }

        updateUnits();

        category.addEventListener("change", updateUnits);

        $("#convertUnit").addEventListener("click", () => {

            const value = numberValue("unitValue");

            if (isNaN(value)) {
                $("#unitResult").innerHTML =
                    "Please enter a value.";
                return;
            }

            let result;

            if (category.value === "temperature") {

                if (from.value === to.value) {
                    result = value;
                }

                else if (
                    from.value === "celsius" &&
                    to.value === "fahrenheit"
                ) {
                    result = (value * 9 / 5) + 32;
                }

                else if (
                    from.value === "fahrenheit" &&
                    to.value === "celsius"
                ) {
                    result = (value - 32) * 5 / 9;
                }

                else if (
                    from.value === "celsius" &&
                    to.value === "kelvin"
                ) {
                    result = value + 273.15;
                }

                else if (
                    from.value === "kelvin" &&
                    to.value === "celsius"
                ) {
                    result = value - 273.15;
                }

                else if (
                    from.value === "fahrenheit" &&
                    to.value === "kelvin"
                ) {
                    result = (value - 32) * 5 / 9 + 273.15;
                }

                else {
                    result = (value - 273.15) * 9 / 5 + 32;
                }

            } else {

                const lengthToMeter = {
                    meter: 1,
                    kilometer: 1000,
                    centimeter: 0.01,
                    millimeter: 0.001,
                    mile: 1609.344,
                    foot: 0.3048,
                    inch: 0.0254
                };

                const weightToKg = {
                    kilogram: 1,
                    gram: 0.001,
                    milligram: 0.000001,
                    pound: 0.45359237,
                    ounce: 0.028349523125
                };

                const table =
                    category.value === "length"
                        ? lengthToMeter
                        : weightToKg;

                result = value * table[from.value] / table[to.value];
            }

            $("#unitResult").innerHTML = `
                <strong>
                    ${result.toFixed(6).replace(/\.?0+$/, "")}
                    ${to.value}
                </strong>
            `;
        });
    }

    /* =====================================================
       SIMPLE INTEREST
       ===================================================== */

    function showSimpleInterest() {

        modalContent.innerHTML = toolShell(
            "Simple Interest",
            "Calculate simple interest and total amount.",
            `
                ${inputField("siPrincipal", "Principal")}
                ${inputField("siRate", "Rate (%)")}
                ${inputField("siTime", "Time (years)")}

                <button class="btn btn-primary" id="calculateSI">
                    Calculate
                </button>

                ${resultBox("siResult")}
            `
        );

        $("#calculateSI").addEventListener("click", () => {

            const p = numberValue("siPrincipal");
            const r = numberValue("siRate");
            const t = numberValue("siTime");

            if ([p, r, t].some(value => isNaN(value))) {
                $("#siResult").innerHTML =
                    "Please enter valid values.";
                return;
            }

            const interest = (p * r * t) / 100;
            const amount = p + interest;

            $("#siResult").innerHTML = `
                Simple Interest:
                <strong>${interest.toFixed(2)}</strong><br>
                Total Amount:
                <strong>${amount.toFixed(2)}</strong>
            `;
        });
    }

    /* =====================================================
       COMPOUND INTEREST
       ===================================================== */

    function showCompoundInterest() {

        modalContent.innerHTML = toolShell(
            "Compound Interest",
            "Calculate compound interest and final amount.",
            `
                ${inputField("ciPrincipal", "Principal")}
                ${inputField("ciRate", "Rate (%)")}
                ${inputField("ciTime", "Time (years)")}
                ${inputField("ciFrequency", "Compounds per year")}

                <button class="btn btn-primary" id="calculateCI">
                    Calculate
                </button>

                ${resultBox("ciResult")}
            `
        );

        $("#calculateCI").addEventListener("click", () => {

            const p = numberValue("ciPrincipal");
            const r = numberValue("ciRate");
            const t = numberValue("ciTime");
            const n = numberValue("ciFrequency");

            if (
                [p, r, t, n].some(value => isNaN(value)) ||
                n <= 0
            ) {
                $("#ciResult").innerHTML =
                    "Please enter valid values.";
                return;
            }

            const amount =
                p * Math.pow(1 + (r / 100) / n, n * t);

            const interest = amount - p;

            $("#ciResult").innerHTML = `
                Compound Interest:
                <strong>${interest.toFixed(2)}</strong><br>
                Final Amount:
                <strong>${amount.toFixed(2)}</strong>
            `;
        });
    }

    /* =====================================================
       DISCOUNT
       ===================================================== */

    function showDiscount() {

        modalContent.innerHTML = toolShell(
            "Discount Calculator",
            "Calculate discount amount and final price.",
            `
                ${inputField("discountPrice", "Original Price")}
                ${inputField("discountRate", "Discount (%)")}

                <button class="btn btn-primary" id="calculateDiscount">
                    Calculate
                </button>

                ${resultBox("discountResult")}
            `
        );

        $("#calculateDiscount").addEventListener("click", () => {

            const price = numberValue("discountPrice");
            const rate = numberValue("discountRate");

            if (
                isNaN(price) ||
                isNaN(rate) ||
                price < 0
            ) {
                $("#discountResult").innerHTML =
                    "Please enter valid values.";
                return;
            }

            const discount = price * rate / 100;
            const finalPrice = price - discount;

            $("#discountResult").innerHTML = `
                Discount:
                <strong>${discount.toFixed(2)}</strong><br>
                Final Price:
                <strong>${finalPrice.toFixed(2)}</strong>
            `;
        });
    }

    /* =====================================================
       PROFIT & LOSS
       ===================================================== */

    function showProfitLoss() {

        modalContent.innerHTML = toolShell(
            "Profit & Loss Calculator",
            "Calculate profit/loss amount and percentage.",
            `
                ${inputField("costPrice", "Cost Price")}
                ${inputField("sellingPrice", "Selling Price")}

                <button class="btn btn-primary" id="calculateProfit">
                    Calculate
                </button>

                ${resultBox("profitResult")}
            `
        );

        $("#calculateProfit").addEventListener("click", () => {

            const cost = numberValue("costPrice");
            const selling = numberValue("sellingPrice");

            if (
                isNaN(cost) ||
                isNaN(selling) ||
                cost <= 0
            ) {
                $("#profitResult").innerHTML =
                    "Please enter valid prices.";
                return;
            }

            const difference = selling - cost;
            const percentage =
                Math.abs(difference / cost) * 100;

            if (difference > 0) {

                $("#profitResult").innerHTML = `
                    Profit:
                    <strong>${difference.toFixed(2)}</strong><br>
                    Profit Percentage:
                    <strong>${percentage.toFixed(2)}%</strong>
                `;

            } else if (difference < 0) {

                $("#profitResult").innerHTML = `
                    Loss:
                    <strong>${Math.abs(difference).toFixed(2)}</strong><br>
                    Loss Percentage:
                    <strong>${percentage.toFixed(2)}%</strong>
                `;

            } else {

                $("#profitResult").innerHTML =
                    "<strong>No Profit, No Loss.</strong>";
            }
        });
    }

    /* =====================================================
       WORD COUNTER
       ===================================================== */

    function showWordCounter() {

        modalContent.innerHTML = toolShell(
            "Word & Text Counter",
            "Count words, characters, lines and estimated reading time.",
            `
                <textarea
                    id="counterText"
                    rows="10"
                    placeholder="Type or paste your text here..."
                ></textarea>

                <button class="btn btn-primary" id="countText">
                    Analyze Text
                </button>

                ${resultBox("counterResult")}
            `
        );

        $("#countText").addEventListener("click", () => {

            const text = $("#counterText").value;

            const words =
                text.trim() === ""
                    ? 0
                    : text.trim().split(/\s+/).length;

            const characters = text.length;

            const lines =
                text === ""
                    ? 0
                    : text.split(/\r?\n/).length;

            const readingTime =
                words === 0
                    ? 0
                    : Math.ceil(words / 200);

            $("#counterResult").innerHTML = `
                Words: <strong>${words}</strong><br>
                Characters: <strong>${characters}</strong><br>
                Lines: <strong>${lines}</strong><br>
                Reading time: <strong>${readingTime} minute(s)</strong>
            `;
        });
    }

    /* =====================================================
       CASE CONVERTER
       ===================================================== */

    function showCaseConverter() {

        modalContent.innerHTML = toolShell(
            "Case Converter",
            "Convert your text into different letter cases.",
            `
                <textarea
                    id="caseText"
                    rows="9"
                    placeholder="Enter your text..."
                ></textarea>

                <div class="tool-buttons">
                    <button class="btn btn-secondary" id="upperCase">
                        UPPERCASE
                    </button>

                    <button class="btn btn-secondary" id="lowerCase">
                        lowercase
                    </button>

                    <button class="btn btn-secondary" id="titleCase">
                        Title Case
                    </button>

                    <button class="btn btn-secondary" id="sentenceCase">
                        Sentence case
                    </button>
                </div>

                <button class="btn btn-primary" id="copyCaseText">
                    Copy Text
                </button>
            `
        );

        const textBox = $("#caseText");

        $("#upperCase").addEventListener("click", () => {
            textBox.value = textBox.value.toUpperCase();
        });

        $("#lowerCase").addEventListener("click", () => {
            textBox.value = textBox.value.toLowerCase();
        });

        $("#titleCase").addEventListener("click", () => {
            textBox.value = textBox.value
                .toLowerCase()
                .replace(/\b\w/g, letter => letter.toUpperCase());
        });

        $("#sentenceCase").addEventListener("click", () => {

            textBox.value = textBox.value
                .toLowerCase()
                .replace(/(^\s*\w|[.!?]\s*\w)/g, match =>
                    match.toUpperCase()
                );
        });

        $("#copyCaseText").addEventListener("click", async () => {

            try {
                await navigator.clipboard.writeText(textBox.value);
                showToast("Text copied.");
            } catch {
                showToast("Copy failed. Please copy manually.");
            }
        });
    }

    /* =====================================================
       TEXT CLEANER
       ===================================================== */

    function showTextCleaner() {

        modalContent.innerHTML = toolShell(
            "Text Cleaner",
            "Remove extra spaces and clean copied text.",
            `
                <textarea
                    id="cleanText"
                    rows="10"
                    placeholder="Paste your text here..."
                ></textarea>

                <button class="btn btn-primary" id="cleanTextButton">
                    Clean Text
                </button>

                <button class="btn btn-secondary" id="copyCleanText">
                    Copy Clean Text
                </button>
            `
        );

        $("#cleanTextButton").addEventListener("click", () => {

            const box = $("#cleanText");

            box.value = box.value
                .replace(/[ \t]+/g, " ")
                .replace(/\n\s*\n+/g, "\n\n")
                .split("\n")
                .map(line => line.trim())
                .join("\n")
                .trim();

            showToast("Text cleaned.");
        });

        $("#copyCleanText").addEventListener("click", async () => {

            try {
                await navigator.clipboard.writeText(
                    $("#cleanText").value
                );

                showToast("Clean text copied.");
            } catch {
                showToast("Copy failed.");
            }
        });
    }

    /* =====================================================
       QR GENERATOR
       ===================================================== */

    function showQR() {

        modalContent.innerHTML = toolShell(
            "QR Code Generator",
            "Create a QR code from a URL or text.",
            `
                <input
                    id="qrText"
                    type="text"
                    placeholder="Enter URL or text..."
                >

                <button class="btn btn-primary" id="generateQR">
                    Generate QR
                </button>

                <div id="qrResult"></div>
            `
        );

        $("#generateQR").addEventListener("click", () => {

            const text = $("#qrText").value.trim();

            if (!text) {
                $("#qrResult").innerHTML =
                    "<p>Please enter some text or a URL.</p>";
                return;
            }

            const encoded = encodeURIComponent(text);

            $("#qrResult").innerHTML = `
                <div style="text-align:center;margin-top:20px;">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}"
                        alt="Generated QR Code"
                        style="max-width:300px;width:100%;border-radius:12px;"
                    >

                    <p style="margin-top:12px;">
                        QR code generated.
                    </p>
                </div>
            `;
        });
    }

    /* =====================================================
       PASSWORD GENERATOR
       ===================================================== */

    function showPasswordGenerator() {

        modalContent.innerHTML = toolShell(
            "Password Generator",
            "Generate a random password locally in your browser.",
            `
                <label>
                    Password Length
                    <input
                        id="passwordLength"
                        type="number"
                        min="6"
                        max="64"
                        value="16"
                    >
                </label>

                <label>
                    <input type="checkbox" id="includeUpper" checked>
                    Include uppercase letters
                </label>

                <label>
                    <input type="checkbox" id="includeNumbers" checked>
                    Include numbers
                </label>

                <label>
                    <input type="checkbox" id="includeSymbols" checked>
                    Include symbols
                </label>

                <button class="btn btn-primary" id="generatePassword">
                    Generate Password
                </button>

                <input
                    id="generatedPassword"
                    type="text"
                    readonly
                    placeholder="Generated password"
                >

                <button class="btn btn-secondary" id="copyPassword">
                    Copy Password
                </button>
            `
        );

        $("#generatePassword").addEventListener("click", () => {

            let length =
                parseInt($("#passwordLength").value, 10);

            if (isNaN(length)) length = 16;

            length = Math.min(64, Math.max(6, length));

            let characters =
                "abcdefghijklmnopqrstuvwxyz";

            if ($("#includeUpper").checked) {
                characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            }

            if ($("#includeNumbers").checked) {
                characters += "0123456789";
            }

            if ($("#includeSymbols").checked) {
                characters += "!@#$%^&*()_+-=[]{}";
            }

            const randomValues =
                new Uint32Array(length);

            crypto.getRandomValues(randomValues);

            let password = "";

            for (let i = 0; i < length; i++) {
                password +=
                    characters[randomValues[i] % characters.length];
            }

            $("#generatedPassword").value = password;
        });

        $("#copyPassword").addEventListener("click", async () => {

            const password = $("#generatedPassword").value;

            if (!password) {
                showToast("Generate a password first.");
                return;
            }

            try {
                await navigator.clipboard.writeText(password);
                showToast("Password copied.");
            } catch {
                showToast("Copy failed.");
            }
        });
    }

    /* =====================================================
       RANDOM NUMBER
       ===================================================== */

    function showRandomNumber() {

        modalContent.innerHTML = toolShell(
            "Random Number Generator",
            "Generate a random number between two values.",
            `
                ${inputField("randomMin", "Minimum")}
                ${inputField("randomMax", "Maximum")}

                <button class="btn btn-primary" id="generateRandom">
                    Generate
                </button>

                ${resultBox("randomResult")}
            `
        );

        $("#generateRandom").addEventListener("click", () => {

            const min = numberValue("randomMin");
            const max = numberValue("randomMax");

            if (
                isNaN(min) ||
                isNaN(max) ||
                min > max
            ) {
                $("#randomResult").innerHTML =
                    "Please enter a valid range.";
                return;
            }

            const result =
                Math.floor(Math.random() * (max - min + 1)) + min;

            $("#randomResult").innerHTML =
                `<strong>Random Number: ${result}</strong>`;
        });
    }

    /* =====================================================
       OPEN TOOL HANDLER
       ===================================================== */

    const toolFunctions = {
        "gpa": showGPA,
        "percentage": showPercentage,
        "cgpa": showCGPA,
        "grade": showGrade,
        "attendance": showAttendance,
        "age": showAge,
        "date": showDateDifference,
        "unit": showUnitConverter,
        "simple-interest": showSimpleInterest,
        "compound-interest": showCompoundInterest,
        "discount": showDiscount,
        "profit": showProfitLoss,
        "word-counter": showWordCounter,
        "case-converter": showCaseConverter,
        "text-cleaner": showTextCleaner,
        "qr": showQR,
        "password": showPasswordGenerator,
        "random": showRandomNumber
    };

    $$(".open-tool").forEach(button => {

        button.addEventListener("click", () => {

            const toolName = button.dataset.tool;

            if (toolFunctions[toolName]) {
                toolFunctions[toolName]();
                openToolModal();
            } else {
                showToast("This tool is not available yet.");
            }
        });

    });

    /* =====================================================
       STUDY HUB BUTTONS
       ===================================================== */

    $$(".browse-btn").forEach(button => {

        button.addEventListener("click", () => {

            const message =
                button.dataset.message ||
                "This resource will be added soon.";

            modalContent.innerHTML = toolShell(
                "Study Hub",
                "StuPivot study resources",
                `
                    <div class="tool-result">
                        ${escapeHTML(message)}
                    </div>

                    <p>
                        Actual notes and question files can be connected
                        here when they are added to the StuPivot resources
                        folder.
                    </p>
                `
            );

            openToolModal();
        });

    });

    /* =====================================================
       ARTICLES
       ===================================================== */

    const articles = {

        gpa: {
            tag: "STUDY",
            title: "How GPA Calculation Works",
            content: `
                <p>
                    GPA stands for Grade Point Average. It represents the
                    average grade point earned across subjects.
                </p>

                <p>
                    In a weighted GPA, each subject's grade point is
                    multiplied by its credit hour. The total is then
                    divided by the total number of credits.
                </p>

                <p>
                    <strong>Basic idea:</strong>
                    GPA = Total of (Grade Point × Credit) ÷ Total Credits.
                </p>

                <p>
                    Always check the grading and credit system used by
                    your school or examination board.
                </p>
            `
        },

        c: {
            tag: "CODING",
            title: "Starting C Programming",
            content: `
                <p>
                    C is a general-purpose programming language widely
                    used for learning programming fundamentals and
                    understanding how software works at a lower level.
                </p>

                <p>
                    Beginners usually start with variables, data types,
                    input/output, operators, conditions and loops.
                </p>

                <p>
                    A simple C program normally contains a
                    <code>main()</code> function where program execution
                    begins.
                </p>

                <p>
                    Practice is important: start with small programs and
                    gradually move toward arrays, strings, functions and
                    structures.
                </p>
            `
        },

        study: {
            tag: "STUDY",
            title: "Building a Better Study Routine",
            content: `
                <p>
                    A useful study routine does not need to be complicated.
                    Start by deciding what you want to complete during a
                    study session.
                </p>

                <p>
                    Break large chapters into smaller topics and use active
                    recall instead of only reading the same material again.
                </p>

                <p>
                    Practice questions can help you identify areas that
                    need more revision.
                </p>

                <p>
                    Regular breaks, enough sleep and a realistic schedule
                    can also make studying easier to maintain.
                </p>
            `
        },

        cs: {
            tag: "TECH",
            title: "Why Computer Science Matters",
            content: `
                <p>
                    Computer Science studies how information can be
                    represented, processed and solved using computers.
                </p>

                <p>
                    It includes areas such as programming, algorithms,
                    data structures, computer systems, networks and
                    software development.
                </p>

                <p>
                    Learning Computer Science also develops problem-solving
                    and logical thinking skills.
                </p>
            `
        },

        web: {
            tag: "WEB",
            title: "How Websites Work",
            content: `
                <p>
                    Websites are commonly built using three core
                    technologies: HTML, CSS and JavaScript.
                </p>

                <p>
                    HTML provides the structure of a page. CSS controls
                    its appearance and layout. JavaScript adds interaction
                    and dynamic behaviour.
                </p>

                <p>
                    When you open a website, your browser requests
                    resources from a server and then uses those resources
                    to display the page.
                </p>
            `
        },

        internet: {
            tag: "TECH",
            title: "What Happens When You Open a Website?",
            content: `
                <p>
                    When you enter a website address, the browser needs to
                    locate the appropriate server and request the page.
                </p>

                <p>
                    A URL identifies the resource you want to access.
                    DNS can translate a domain name into an IP address
                    used for network communication.
                </p>

                <p>
                    The browser then receives files such as HTML, CSS,
                    JavaScript and images and uses them to display the
                    website.
                </p>
            `
        }

    };

    $$(".read-article").forEach(button => {

        button.addEventListener("click", () => {

            const key = button.dataset.article;
            const article = articles[key];

            if (!article) {
                showToast("Article not found.");
                return;
            }

            articleContent.innerHTML = `
                <span class="eyebrow">${article.tag}</span>
                <h2>${article.title}</h2>

                <div class="article-body">
                    ${article.content}
                </div>
            `;

            openArticleModal();
        });

    });

    /* =====================================================
       SITE SEARCH
       ===================================================== */

    const searchButton = $("#searchButton");
    const searchResults = $("#searchResults");

    function performSearch() {

        const query = siteSearch.value
            .trim()
            .toLowerCase();

        if (!searchResults) return;

        if (!query) {
            searchResults.innerHTML = `
                <p>Type something to search StuPivot.</p>
            `;
            return;
        }

        const searchableElements =
            $$(".searchable, .calculator-card, .tool-card, .category-card");

        const results = [];

        searchableElements.forEach(element => {

            const title =
                element.querySelector("h3")?.textContent || "";

            const description =
                element.querySelector("p")?.textContent || "";

            const dataSearch =
                element.dataset.search || "";

            const combined =
                `${title} ${description} ${dataSearch}`
                    .toLowerCase();

            if (combined.includes(query)) {
                results.push({
                    element,
                    title,
                    description
                });
            }
        });

        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="search-result-item">
                    <h3>No results found</h3>
                    <p>
                        Try another keyword such as GPA, coding,
                        percentage, study or tools.
                    </p>
                </div>
            `;

            return;
        }

        searchResults.innerHTML = `
            <p>
                Found <strong>${results.length}</strong>
                result(s).
            </p>
        `;

        results.forEach(result => {

            const item = document.createElement("div");

            item.className = "search-result-item";

            item.innerHTML = `
                <h3>${escapeHTML(result.title)}</h3>
                <p>${escapeHTML(result.description)}</p>
            `;

            item.addEventListener("click", () => {

                result.element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                result.element.style.outline =
                    "2px solid #5de4ff";

                setTimeout(() => {
                    result.element.style.outline = "";
                }, 2000);

            });

            searchResults.appendChild(item);
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    if (siteSearch) {

        siteSearch.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                event.preventDefault();
                performSearch();
            }

        });

        siteSearch.addEventListener("input", () => {

            if (siteSearch.value.trim() === "") {
                searchResults.innerHTML = "";
            }

        });
    }

    /* =====================================================
       FORM SUBMISSION
       ===================================================== */

    async function handleFormSubmit(form, type) {

        const action = form.getAttribute("action");

        if (
            !action ||
            action.includes("YOUR_FORMSPREE_ID")
        ) {

            showToast(
                "This form is not connected yet. Add its Formspree endpoint first.",
                5000
            );

            return;
        }

        const submitButton =
            form.querySelector('button[type="submit"]');

        const originalText =
            submitButton ? submitButton.textContent : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            const formData = new FormData(form);

            const response = await fetch(action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                form.reset();

                showToast(
                    type === "feedback"
                        ? "Feedback sent successfully. Thank you!"
                        : "Message sent successfully. Thank you!",
                    5000
                );

            } else {

                let errorMessage =
                    "Could not send your message.";

                try {

                    const data = await response.json();

                    if (data?.errors?.length) {
                        errorMessage =
                            data.errors
                                .map(error => error.message)
                                .join(" ");
                    }

                } catch {
                    // Keep default error message.
                }

                showToast(errorMessage, 5000);
            }

        } catch (error) {

            console.error("Form submission error:", error);

            showToast(
                "Could not send the message. Check your internet connection and Formspree setup.",
                5000
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }

        }
    }

    const feedbackForm = $("#feedbackForm");
    const contactForm = $("#contactForm");

    if (feedbackForm) {

        feedbackForm.addEventListener("submit", event => {

            event.preventDefault();

            handleFormSubmit(
                feedbackForm,
                "feedback"
            );

        });

    }

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            handleFormSubmit(
                contactForm,
                "contact"
            );

        });

    }

    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target =
                document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

    /* =====================================================
       FINISHED
       ===================================================== */

    console.log("StuPivot JavaScript loaded successfully.");
});
