/* =========================================================
   StuPivot - Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- BASIC HELPERS ---------- */

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const show = (element) => {
    if (element) element.style.display = "";
  };

  const hide = (element) => {
    if (element) element.style.display = "none";
  };

  /* ---------- MOBILE MENU ---------- */

  const menuButton = $(
    "#menu-toggle, .menu-toggle, .hamburger, [data-menu-toggle]"
  );

  const navigation = $(
    "#main-nav, .main-nav, nav ul, .nav-links, [data-navigation]"
  );

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("active");
      menuButton.classList.toggle("active");
    });
  }

  /* ---------- SMOOTH NAVIGATION ---------- */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetID = link.getAttribute("href");

      if (!targetID || targetID === "#") return;

      const target = document.querySelector(targetID);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        if (navigation) navigation.classList.remove("active");
        if (menuButton) menuButton.classList.remove("active");
      }
    });
  });

  /* =========================================================
     SEARCH
     ========================================================= */

  const searchableContent = [
    {
      title: "GPA Calculator",
      keywords: "gpa grade point average calculator marks education",
      target: "#calculators"
    },
    {
      title: "Percentage Calculator",
      keywords: "percentage marks calculate student",
      target: "#calculators"
    },
    {
      title: "CGPA Calculator",
      keywords: "cgpa grade point calculator",
      target: "#calculators"
    },
    {
      title: "Marks and Grade Calculator",
      keywords: "marks grade calculator result",
      target: "#calculators"
    },
    {
      title: "Attendance Calculator",
      keywords: "attendance calculator percentage classes",
      target: "#calculators"
    },
    {
      title: "Age Calculator",
      keywords: "age calculator birthday date",
      target: "#calculators"
    },
    {
      title: "Date Difference Calculator",
      keywords: "date difference days calculator",
      target: "#calculators"
    },
    {
      title: "Unit Converter",
      keywords: "unit conversion length weight temperature",
      target: "#tools"
    },
    {
      title: "Simple Interest Calculator",
      keywords: "simple interest money finance calculator",
      target: "#calculators"
    },
    {
      title: "Compound Interest Calculator",
      keywords: "compound interest money finance calculator",
      target: "#calculators"
    },
    {
      title: "Discount Calculator",
      keywords: "discount price calculator",
      target: "#calculators"
    },
    {
      title: "Profit Loss Calculator",
      keywords: "profit loss calculator business",
      target: "#calculators"
    },
    {
      title: "Study Hub",
      keywords:
        "study notes class 11 class 12 neb computer science mathematics english nepali accountancy questions exam",
      target: "#study"
    },
    {
      title: "Coding Hub",
      keywords:
        "coding c programming algorithms programming concepts examples practice",
      target: "#coding"
    },
    {
      title: "Online Tools",
      keywords:
        "word counter character counter case converter text cleaner qr password random number",
      target: "#tools"
    },
    {
      title: "Articles",
      keywords: "articles technology education programming study tips",
      target: "#articles"
    },
    {
      title: "Feedback",
      keywords: "feedback review rating suggestion",
      target: "#feedback"
    },
    {
      title: "Contact",
      keywords: "contact get in touch message email",
      target: "#contact"
    }
  ];

  function setupSearch(input) {
    if (!input) return;

    let resultBox = input.parentElement.querySelector(".search-results");

    if (!resultBox) {
      resultBox = document.createElement("div");
      resultBox.className = "search-results";

      resultBox.style.position = "absolute";
      resultBox.style.left = "0";
      resultBox.style.right = "0";
      resultBox.style.top = "100%";
      resultBox.style.zIndex = "9999";
      resultBox.style.background = "#101827";
      resultBox.style.borderRadius = "10px";
      resultBox.style.overflow = "hidden";

      if (getComputedStyle(input.parentElement).position === "static") {
        input.parentElement.style.position = "relative";
      }

      input.parentElement.appendChild(resultBox);
    }

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();

      resultBox.innerHTML = "";

      if (!query) {
        hide(resultBox);
        return;
      }

      const results = searchableContent.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query)
        );
      });

      if (results.length === 0) {
        resultBox.innerHTML = `
          <div style="padding:14px;color:#aaa;">
            No StuPivot results found.
          </div>
        `;

        show(resultBox);
        return;
      }

      results.slice(0, 8).forEach((item) => {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = item.title;

        button.style.display = "block";
        button.style.width = "100%";
        button.style.padding = "13px 15px";
        button.style.border = "0";
        button.style.background = "transparent";
        button.style.color = "#fff";
        button.style.textAlign = "left";
        button.style.cursor = "pointer";

        button.addEventListener("mouseenter", () => {
          button.style.background = "#18263a";
        });

        button.addEventListener("mouseleave", () => {
          button.style.background = "transparent";
        });

        button.addEventListener("click", () => {
          const target = document.querySelector(item.target);

          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }

          input.value = "";
          hide(resultBox);
        });

        resultBox.appendChild(button);
      });

      show(resultBox);
    });

    document.addEventListener("click", (event) => {
      if (!input.parentElement.contains(event.target)) {
        hide(resultBox);
      }
    });
  }

  $$(
    'input[type="search"], input[name="search"], #search, .search-input'
  ).forEach(setupSearch);

  /* =========================================================
     CALCULATOR HELPERS
     ========================================================= */

  function getNumber(id) {
    const element = document.getElementById(id);

    if (!element) return NaN;

    return parseFloat(element.value);
  }

  function result(id, value) {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = value;
      element.classList.add("calculated");

      setTimeout(() => {
        element.classList.remove("calculated");
      }, 500);
    }
  }

  function calculatePercentage() {
    const obtained =
      getNumber("obtainedMarks") ||
      getNumber("obtained") ||
      getNumber("percentageObtained");

    const total =
      getNumber("totalMarks") ||
      getNumber("total") ||
      getNumber("percentageTotal");

    if (isNaN(obtained) || isNaN(total) || total === 0) {
      alert("Please enter valid marks.");
      return;
    }

    const percentage = (obtained / total) * 100;

    result(
      "percentageResult",
      `${percentage.toFixed(2)}%`
    );
  }

  function calculateSimpleInterest() {
    const principal =
      getNumber("principal") ||
      getNumber("simplePrincipal");

    const rate =
      getNumber("rate") ||
      getNumber("simpleRate");

    const time =
      getNumber("time") ||
      getNumber("simpleTime");

    if (
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(time)
    ) {
      alert("Please enter all values.");
      return;
    }

    const interest = (principal * rate * time) / 100;
    const total = principal + interest;

    const output = `Interest: ${interest.toFixed(
      2
    )} | Amount: ${total.toFixed(2)}`;

    result("simpleInterestResult", output);
  }

  function calculateCompoundInterest() {
    const principal =
      getNumber("compoundPrincipal") ||
      getNumber("ciPrincipal");

    const rate =
      getNumber("compoundRate") ||
      getNumber("ciRate");

    const time =
      getNumber("compoundTime") ||
      getNumber("ciTime");

    if (
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(time)
    ) {
      alert("Please enter all values.");
      return;
    }

    const amount =
      principal * Math.pow(1 + rate / 100, time);

    const interest = amount - principal;

    result(
      "compoundInterestResult",
      `Interest: ${interest.toFixed(
        2
      )} | Amount: ${amount.toFixed(2)}`
    );
  }

  function calculateDiscount() {
    const price =
      getNumber("originalPrice") ||
      getNumber("discountPrice");

    const discount =
      getNumber("discountPercent") ||
      getNumber("discountRate");

    if (isNaN(price) || isNaN(discount)) {
      alert("Please enter valid values.");
      return;
    }

    const saved = price * (discount / 100);
    const finalPrice = price - saved;

    result(
      "discountResult",
      `You save ${saved.toFixed(
        2
      )}. Final price: ${finalPrice.toFixed(2)}`
    );
  }

  function calculateProfitLoss() {
    const cost =
      getNumber("costPrice") ||
      getNumber("purchasePrice");

    const selling =
      getNumber("sellingPrice") ||
      getNumber("salePrice");

    if (isNaN(cost) || isNaN(selling) || cost === 0) {
      alert("Please enter valid prices.");
      return;
    }

    if (selling > cost) {
      const profit = selling - cost;
      const percentage = (profit / cost) * 100;

      result(
        "profitLossResult",
        `Profit: ${profit.toFixed(
          2
        )} (${percentage.toFixed(2)}%)`
      );
    } else if (cost > selling) {
      const loss = cost - selling;
      const percentage = (loss / cost) * 100;

      result(
        "profitLossResult",
        `Loss: ${loss.toFixed(
          2
        )} (${percentage.toFixed(2)}%)`
      );
    } else {
      result("profitLossResult", "No profit, no loss.");
    }
  }

  function calculateCGPA() {
    const inputs = $$(
      ".cgpa-grade, .cgpa-input, [data-cgpa]"
    );

    if (!inputs.length) return;

    let total = 0;
    let count = 0;

    inputs.forEach((input) => {
      const value = parseFloat(input.value);

      if (!isNaN(value)) {
        total += value;
        count++;
      }
    });

    if (!count) {
      alert("Enter at least one grade point.");
      return;
    }

    result(
      "cgpaResult",
      (total / count).toFixed(2)
    );
  }

  function calculateAttendance() {
    const attended =
      getNumber("classesAttended") ||
      getNumber("attendedClasses");

    const total =
      getNumber("classesHeld") ||
      getNumber("totalClasses");

    if (isNaN(attended) || isNaN(total) || total === 0) {
      alert("Please enter valid class numbers.");
      return;
    }

    const percentage = (attended / total) * 100;

    result(
      "attendanceResult",
      `${percentage.toFixed(2)}%`
    );
  }

  function calculateAge() {
    const input =
      $("#birthDate") ||
      $("#dob") ||
      $('input[type="date"][name="birthdate"]');

    if (!input || !input.value) {
      alert("Please enter your birth date.");
      return;
    }

    const birth = new Date(input.value);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference =
      today.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    result("ageResult", `${age} years old`);
  }

  function calculateDateDifference() {
    const first =
      $("#startDate") ||
      $("#date1") ||
      $('input[type="date"][name="start"]');

    const second =
      $("#endDate") ||
      $("#date2") ||
      $('input[type="date"][name="end"]');

    if (!first || !second || !first.value || !second.value) {
      alert("Please select both dates.");
      return;
    }

    const date1 = new Date(first.value);
    const date2 = new Date(second.value);

    const difference = Math.abs(date2 - date1);
    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    result(
      "dateDifferenceResult",
      `${days} day${days === 1 ? "" : "s"}`
    );
  }

  /* ---------- BUTTON DETECTION ---------- */

  const calculatorButtons = $$(
    "button, .calculate-btn, [data-calculator]"
  );

  calculatorButtons.forEach((button) => {
    const text = button.textContent.toLowerCase();

    if (
      text.includes("percentage") ||
      button.dataset.calculator === "percentage"
    ) {
      button.addEventListener("click", calculatePercentage);
    }

    if (
      text.includes("simple interest") ||
      button.dataset.calculator === "simple-interest"
    ) {
      button.addEventListener(
        "click",
        calculateSimpleInterest
      );
    }

    if (
      text.includes("compound interest") ||
      button.dataset.calculator === "compound-interest"
    ) {
      button.addEventListener(
        "click",
        calculateCompoundInterest
      );
    }

    if (
      text.includes("discount") ||
      button.dataset.calculator === "discount"
    ) {
      button.addEventListener("click", calculateDiscount);
    }

    if (
      text.includes("profit") ||
      text.includes("loss") ||
      button.dataset.calculator === "profit-loss"
    ) {
      button.addEventListener(
        "click",
        calculateProfitLoss
      );
    }

    if (
      text.includes("attendance") ||
      button.dataset.calculator === "attendance"
    ) {
      button.addEventListener(
        "click",
        calculateAttendance
      );
    }

    if (
      text.includes("age calculator") ||
      button.dataset.calculator === "age"
    ) {
      button.addEventListener("click", calculateAge);
    }

    if (
      text.includes("date difference") ||
      button.dataset.calculator === "date-difference"
    ) {
      button.addEventListener(
        "click",
        calculateDateDifference
      );
    }

    if (
      text.includes("cgpa") ||
      button.dataset.calculator === "cgpa"
    ) {
      button.addEventListener("click", calculateCGPA);
    }
  });

  /* =========================================================
     ONLINE TOOLS
     ========================================================= */

  /* WORD + CHARACTER COUNTER */

  const textArea =
    $("#counterText") ||
    $("#textInput") ||
    $(".counter-textarea") ||
    $('textarea[data-counter]');

  if (textArea) {
    const updateCounter = () => {
      const text = textArea.value;

      const words = text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

      const characters = text.length;

      const wordOutput =
        $("#wordCount") ||
        $("#words");

      const characterOutput =
        $("#characterCount") ||
        $("#characters");

      if (wordOutput) wordOutput.textContent = words;
      if (characterOutput)
        characterOutput.textContent = characters;
    };

    textArea.addEventListener(
      "input",
      updateCounter
    );

    updateCounter();
  }

  /* CASE CONVERTER */

  const caseInput =
    $("#caseInput") ||
    $("#caseText") ||
    $(".case-input");

  if (caseInput) {
    const output =
      $("#caseOutput") ||
      $("#caseResult") ||
      caseInput;

    $$(
      "[data-case], .case-button, .case-btn"
    ).forEach((button) => {
      button.addEventListener("click", () => {
        const type =
          button.dataset.case ||
          button.textContent
            .trim()
            .toLowerCase();

        const text = caseInput.value;

        if (
          type.includes("upper")
        ) {
          output.value = text.toUpperCase();
        } else if (
          type.includes("lower")
        ) {
          output.value = text.toLowerCase();
        } else if (
          type.includes("title")
        ) {
          output.value = text.replace(
            /\w\S*/g,
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1).toLowerCase()
          );
        } else if (
          type.includes("sentence")
        ) {
          output.value =
            text.charAt(0).toUpperCase() +
            text.slice(1).toLowerCase();
        }
      });
    });
  }

  /* TEXT CLEANER */

  $$(
    "#cleanText, .clean-text, [data-tool='clean-text']"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      const input =
        $("#cleanerInput") ||
        $("#textCleanerInput") ||
        $(".text-cleaner-input");

      const output =
        $("#cleanerOutput") ||
        $("#textCleanerOutput") ||
        $(".text-cleaner-output");

      if (!input) return;

      const cleaned = input.value
        .replace(/\s+/g, " ")
        .trim();

      if (output) {
        output.value = cleaned;
      } else {
        input.value = cleaned;
      }
    });
  });

  /* RANDOM NUMBER */

  $$(
    "#randomNumber, .random-number, [data-tool='random-number']"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      const min =
        getNumber("randomMin") || 1;

      const max =
        getNumber("randomMax") || 100;

      if (max < min) {
        alert("Maximum must be greater than minimum.");
        return;
      }

      const number =
        Math.floor(
          Math.random() * (max - min + 1)
        ) + min;

      result("randomResult", number);
    });
  });

  /* PASSWORD GENERATOR */

  $$(
    "#generatePassword, .generate-password, [data-tool='password']"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      const lengthInput =
        $("#passwordLength");

      const output =
        $("#passwordResult") ||
        $("#generatedPassword");

      const length = lengthInput
        ? parseInt(lengthInput.value, 10)
        : 16;

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

      let password = "";

      for (let i = 0; i < length; i++) {
        password +=
          characters[
            Math.floor(
              Math.random() *
                characters.length
            )
          ];
      }

      if (output) {
        if ("value" in output) {
          output.value = password;
        } else {
          output.textContent = password;
        }
      }
    });
  });

  /* UNIT CONVERTER */

  $$(
    "[data-unit-converter], .unit-convert"
  ).forEach((button) => {
    button.addEventListener("click", () => {
      const value =
        getNumber("unitValue") ||
        getNumber("convertValue");

      const from =
        $("#fromUnit")?.value ||
        $("#unitFrom")?.value;

      const to =
        $("#toUnit")?.value ||
        $("#unitTo")?.value;

      if (isNaN(value) || !from || !to) {
        alert("Enter a value and select both units.");
        return;
      }

      const factors = {
        m: 1,
        km: 1000,
        cm: 0.01,
        mm: 0.001,
        ft: 0.3048,
        in: 0.0254
      };

      if (
        factors[from] === undefined ||
        factors[to] === undefined
      ) {
        alert(
          "This converter currently supports length units."
        );
        return;
      }

      const meters =
        value * factors[from];

      const converted =
        meters / factors[to];

      result(
        "unitResult",
        converted.toFixed(4)
      );
    });
  });

  /* =========================================================
     CARD / SECTION NAVIGATION
     ========================================================= */

  $$(
    "[data-target], [data-section], .tool-card, .calculator-card"
  ).forEach((element) => {
    element.addEventListener("click", (event) => {
      const targetID =
        element.dataset.target ||
        element.dataset.section;

      if (!targetID) return;

      const target =
        document.querySelector(targetID);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  /* =========================================================
     FORMS
     ========================================================= */

  function setupForm(form) {
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const button =
        form.querySelector(
          'button[type="submit"], input[type="submit"]'
        );

      const originalText =
        button?.textContent || "Submit";

      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          form.reset();

          alert(
            "Thank you! Your message has been sent successfully."
          );
        } else {
          alert(
            "The message could not be sent. Please try again."
          );
        }
      } catch (error) {
        alert(
          "Something went wrong. Please check your internet connection."
        );
      }

      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  }

  $$(
    'form[action*="formspree"], #contactForm, #feedbackForm, .contact-form, .feedback-form'
  ).forEach(setupForm);

  /* =========================================================
     STAR RATING
     ========================================================= */

  $$(".rating-star, [data-rating]").forEach((star) => {
    star.addEventListener("click", () => {
      const rating =
        star.dataset.rating ||
        star.textContent.trim();

      const hidden =
        $("#rating") ||
        $('input[name="rating"]');

      if (hidden) {
        hidden.value = rating;
      }

      const stars = $$(".rating-star");

      stars.forEach((item) => {
        if (
          Number(item.dataset.rating) <=
          Number(rating)
        ) {
          item.classList.add("selected");
        } else {
          item.classList.remove("selected");
        }
      });
    });
  });

  /* =========================================================
     BACK TO TOP
     ========================================================= */

  const backToTop =
    $("#backToTop") ||
    $(".back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  $$(
    "#currentYear, .current-year"
  ).forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });

  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements = $$(
    ".reveal, .fade-in, .animate-on-scroll"
  );

  if ("IntersectionObserver" in window) {
    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  /* =========================================================
     FALLBACK FOR BUTTONS WITH JAVASCRIPT LINKS
     ========================================================= */

  $$(
    'a[href="#"], button[type="button"]'
  ).forEach((element) => {
    if (
      element.dataset.noAction === "true"
    ) {
      return;
    }

    const text =
      element.textContent
        .trim()
        .toLowerCase();

    if (
      text.includes("explore") ||
      text.includes("learn more")
    ) {
      element.addEventListener(
        "click",
        () => {
          const firstSection =
            $("#study") ||
            $("#calculators") ||
            $("#tools");

          if (firstSection) {
            firstSection.scrollIntoView({
              behavior: "smooth"
            });
          }
        }
      );
    }
  });

  console.log(
    "StuPivot JavaScript loaded successfully."
  );
});
