/* =========================================================
   STUPIVOT — NEW SCRIPT.JS
   ========================================================= */
"use strict";

const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const esc=v=>String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/'/g,"&#039;");
const n=(v,l="Value")=>{
    v=String(v??"").trim();
    if(!v)throw Error(`${l} is required.`);
    if(!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(v))
        throw Error(`${l} must be a valid number.`);
    v=Number(v);
    if(!Number.isFinite(v))throw Error(`${l} is invalid.`);
    return v;
};
const money=v=>Number(v).toLocaleString(undefined,{maximumFractionDigits:2});
const scroll=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
const localDate=s=>{
    const [y,m,d]=s.split("-").map(Number);
    return new Date(y,m-1,d);
};
const isoValid=s=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
    const [y,m,d]=s.split("-").map(Number);
    const x=new Date(y,m-1,d);
    return x.getFullYear()===y &&
           x.getMonth()===m-1 &&
           x.getDate()===d;
};

/* ---------------- Toast ---------------- */

let toastTimer;

function toast(msg,type="normal"){
    const t=$("#toast");
    if(!t)return;

    t.textContent=msg;
    t.className="toast show";

    if(type==="error"){
        t.classList.add("toast-error");
    }

    clearTimeout(toastTimer);

    toastTimer=setTimeout(()=>{
        t.classList.remove("show");
    },3200);
}

function error(msg){
    const e=$("#toolError");

    if(e){
        e.textContent=msg;
        e.classList.add("visible");
    }
}

function clearError(){
    const e=$("#toolError");

    if(e){
        e.textContent="";
        e.classList.remove("visible");
    }
}

if($("#year")){
    $("#year").textContent=new Date().getFullYear();
}

/* ---------------- Modals ---------------- */

const toolModal=$("#toolModal");
const articleModal=$("#articleModal");
const legalModal=$("#legalModal");

const modalContent=$("#modalContent");
const articleContent=$("#articleContent");
const legalContent=$("#legalContent");

function openModal(m){
    if(!m)return;

    m.classList.add("active");
    m.setAttribute("aria-hidden","false");

    document.body.classList.add("modal-open");
}

function closeModal(m){
    if(!m)return;

    m.classList.remove("active");
    m.setAttribute("aria-hidden","true");

    if(
        ![toolModal,articleModal,legalModal]
        .some(x=>x?.classList.contains("active"))
    ){
        document.body.classList.remove("modal-open");
    }
}

$("#modalClose")?.addEventListener(
    "click",
    ()=>closeModal(toolModal)
);

$("#articleClose")?.addEventListener(
    "click",
    ()=>closeModal(articleModal)
);

$("#legalClose")?.addEventListener(
    "click",
    ()=>closeModal(legalModal)
);

$$(".modal").forEach(m=>{
    $(".modal-overlay",m)?.addEventListener(
        "click",
        ()=>closeModal(m)
    );
});

document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
        closeModal(toolModal);
        closeModal(articleModal);
        closeModal(legalModal);
    }
});

/* ---------------- Navigation ---------------- */

const menuBtn=$("#menuBtn");
const navLinks=$("#navLinks");

menuBtn?.addEventListener("click",()=>{
    navLinks?.classList.toggle("active");
    menuBtn.classList.toggle("active");

    menuBtn.setAttribute(
        "aria-expanded",
        String(navLinks?.classList.contains("active"))
    );
});

$$(".nav-links a").forEach(a=>{
    a.addEventListener("click",()=>{
        navLinks?.classList.remove("active");
        menuBtn?.classList.remove("active");

        menuBtn?.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});

$$(".quick-card").forEach(b=>{
    b.addEventListener(
        "click",
        ()=>scroll(b.dataset.scroll)
    );
});

const saved=localStorage.getItem("stupivot-theme");

if(saved==="light"){
    document.body.classList.add("light-mode");
}

$("#themeToggle")?.addEventListener("click",()=>{
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "stupivot-theme",
        document.body.classList.contains("light-mode")
            ? "light"
            : "dark"
    );
});

$("#searchOpen")?.addEventListener("click",()=>{
    scroll("search");

    setTimeout(()=>{
        $("#siteSearch")?.focus();
    },450);
});

/* ---------------- Tool shell ---------------- */

function shell(title,sub,body){

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

function field(id,label,ph,type="text"){

    return `
        <div class="form-group">

            <label for="${id}">
                ${esc(label)}
            </label>

            <input
                id="${id}"
                type="${type}"
                ${type==="text"?'inputmode="decimal"':''}
                placeholder="${esc(ph||"")}"
                autocomplete="off">

        </div>
    `;
}

/* ---------------- Grades ---------------- */

const GRADES=[
    {m:90,g:"A+",p:4},
    {m:80,g:"A",p:3.6},
    {m:70,g:"B+",p:3.2},
    {m:60,g:"B",p:2.8},
    {m:50,g:"C+",p:2.4},
    {m:40,g:"C",p:2},
    {m:35,g:"D",p:1.6},
    {m:0,g:"NG",p:0}
];

const gradeOf=p=>
    GRADES.find(x=>p>=x.m)||GRADES.at(-1);

/* ---------------- Faculties ---------------- */

const FACULTIES={

    science:{
        name:"Science",
        icon:"SC",
        subjects:[
            "English",
            "Nepali",
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
            "English",
            "Nepali",
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
            "English",
            "Nepali",
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
            "English",
            "Nepali",
            "Education",
            "Economics",
            "Computer Science"
        ]
    },

    law:{
        name:"Law",
        icon:"LW",
        subjects:[
            "English",
            "Nepali",
            "Legal Studies",
            "Social Studies",
            "Economics"
        ]
    }

};

const COMMON=[
    "Nepali",
    "English",
    "Social Studies & Life Skills",
    "Mathematics"
];

/* ---------------- Tools ---------------- */

const TOOLS={};

function registerTool(id,render,init){
    TOOLS[id]={
        render,
        init
    };
}

$$(".open-tool").forEach(b=>{
    b.addEventListener(
        "click",
        ()=>openTool(b.dataset.tool)
    );
});

function openTool(id){

    if(!TOOLS[id]){
        toast(
            "This tool is unavailable.",
            "error"
        );
        return;
    }

    modalContent.innerHTML=
        TOOLS[id].render();

    openModal(toolModal);

    try{

        TOOLS[id].init();

    }catch(e){

        error(
            e.message ||
            "Could not initialize this tool."
        );

    }
}

/* =========================================================
   GPA CALCULATOR
   ========================================================= */

registerTool(
    "gpa",

    ()=>shell(
        "NEB GPA Calculator",
        "Choose your class and enter marks.",

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

    ()=>{

        $("#gpaClass")?.addEventListener(
            "change",
            e=>{

                const a=
                    $("#gpaDynamicArea");

                if(!e.target.value){

                    a.innerHTML="";
                    return;

                }

                e.target.value==="10"
                    ? gpa10(a)
                    : gpa11(
                        a,
                        e.target.value
                    );

            }
        );

    }
);

function gpaRows(
    area,
    names,
    buttonLabel,
    callback
){

    area.innerHTML=`

        <div class="subject-list">

            ${
                names.map(
                    (s,i)=>`

                    <div class="subject-row">

                        <div class="subject-number">
                            ${i+1}
                        </div>

                        <div class="subject-fields">

                            <input
                                id="subName${i}"
                                type="text"
                                value="${esc(s)}"
                                placeholder="Subject name">

                            <input
                                id="subMarks${i}"
                                type="text"
                                inputmode="decimal"
                                placeholder="Marks / 100">

                        </div>

                    </div>

                `
                ).join("")
            }

        </div>

        <button
            type="button"
            class="primary-button calculate-button"
            id="gpaCalc">

            ${buttonLabel}

        </button>

    `;

    $("#gpaCalc")?.addEventListener(
        "click",
        callback
    );
}

function calculateGPA(names,label){

    const rows=[];

    names.forEach((_,i)=>{

        const name=
            $("#subName"+i)
            .value
            .trim();

        const marks=
            n(
                $("#subMarks"+i).value,
                `${name||`Subject ${i+1}`} marks`
            );

        if(!name){

            throw Error(
                `Please enter Subject ${i+1} name.`
            );

        }

        if(
            marks<0 ||
            marks>100
        ){

            throw Error(
                `${name} must be between 0 and 100.`
            );

        }

        const g=
            gradeOf(marks);

        rows.push({
            name,
            marks,
            grade:g.g,
            point:g.p
        });

    });

    const gpa=
        rows.reduce(
            (s,x)=>s+x.point,
            0
        ) /
        rows.length;

    $("#toolResult").innerHTML=`

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
                rows.map(x=>`

                    <div class="result-row">

                        <span>
                            ${esc(x.name)}
                        </span>

                        <span>
                            ${money(x.marks)}
                        </span>

                        <span>
                            ${x.grade}
                        </span>

                        <span>
                            ${x.point.toFixed(1)}
                        </span>

                    </div>

                `).join("")
            }

        </div>

    `;
}

function gpa10(area){

    const names=[

        "Compulsory Subject 1",
        "Compulsory Subject 2",
        "Compulsory Subject 3",
        "Compulsory Subject 4",
        "Compulsory Subject 5",
        "Optional Subject 1",
        "Optional Subject 2"

    ];

    gpaRows(
        area,
        names,
        "Calculate Class 10 GPA",
        ()=>{

            try{

                clearError();

                calculateGPA(
                    names,
                    "Class 10"
                );

            }catch(e){

                error(e.message);

            }

        }
    );
}

function gpa11(area,c){

    area.innerHTML=`

        <div class="calculator-info">

            <strong>
                Class ${c}
            </strong>

            <p>
                English and Nepali are included
                in every faculty.
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
                        FACULTIES
                    )
                    .map(
                        ([k,v])=>
                            `<option value="${k}">
                                ${v.name}
                            </option>`
                    )
                    .join("")
                }

            </select>

        </div>

        <div id="facultySubjects"></div>

    `;

    $("#gpaFaculty")?.addEventListener(
        "change",
        e=>{

            const f=
                FACULTIES[
                    e.target.value
                ];

            const a=
                $("#facultySubjects");

            if(!f){

                a.innerHTML="";
                return;

            }

            const names=
                [
                    ...new Set(
                        [
                            ...COMMON,
                            ...f.subjects
                        ]
                    )
                ].slice(0,7);

            a.innerHTML=`

                <div class="subject-list">

                    ${
                        names.map(
                            (s,i)=>`

                            <div class="subject-row">

                                <div class="subject-number">
                                    ${i+1}
                                </div>

                                <div class="subject-fields">

                                    <input
                                        id="subName${i}"
                                        type="text"
                                        value="${esc(s)}">

                                    <input
                                        id="subMarks${i}"
                                        type="text"
                                        inputmode="decimal"
                                        placeholder="Final marks / 100">

                                </div>

                            </div>

                        `
                        ).join("")
                    }

                </div>

                <button
                    type="button"
                    class="primary-button calculate-button"
                    id="gpaCalc">

                    Calculate Class ${c} GPA

                </button>

            `;

            $("#gpaCalc")?.addEventListener(
                "click",
                ()=>{

                    try{

                        clearError();

                        calculateGPA(
                            names,
                            `Class ${c}`
                        );

                    }catch(err){

                        error(err.message);

                    }

                }
            );

        }
    );
}

/* =========================================================
   CGPA
   ========================================================= */

registerTool(
    "cgpa",

    ()=>shell(
        "CGPA Calculator",
        "Equal-credit or credit-weighted.",

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

        ${field(
            "cgpaCount",
            "Number of entries",
            "Example: 6"
        )}

        <div id="cgpaRows"></div>

        <div class="button-row">

            <button
                type="button"
                class="secondary-button"
                id="makeCGPA">

                Create Fields

            </button>

            <button
                type="button"
                class="primary-button"
                id="calcCGPA">

                Calculate CGPA

            </button>

        </div>
        `
    ),

    ()=>{

        const make=()=>{

            const c=
                Number(
                    $("#cgpaCount").value
                );

            if(
                !Number.isInteger(c) ||
                c<1 ||
                c>30
            ){

                throw Error(
                    "Enter a whole number from 1 to 30."
                );

            }

            const w=
                $("#cgpaMode").value==="weighted";

            $("#cgpaRows").innerHTML=`

                <div class="cgpa-list">

                    ${
                        Array.from(
                            {length:c},
                            (_,i)=>`

                            <div class="cgpa-row">

                                <span>
                                    ${i+1}
                                </span>

                                <input
                                    id="cgpaGP${i}"
                                    type="text"
                                    inputmode="decimal"
                                    placeholder="Grade Point">

                                ${
                                    w
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
        };

        $("#makeCGPA")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();
                    make();

                }catch(e){

                    error(e.message);

                }

            }
        );

        $("#cgpaMode")?.addEventListener(
            "change",
            ()=>{

                if(
                    $("#cgpaRows")
                    .children
                    .length
                ){

                    try{

                        make();

                    }catch(e){

                        error(e.message);

                    }

                }

            }
        );

        $("#calcCGPA")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const rows=
                        $$(".cgpa-row");

                    if(!rows.length){

                        throw Error(
                            "Create the fields first."
                        );

                    }

                    const w=
                        $("#cgpaMode").value==="weighted";

                    let a=0;
                    let b=0;

                    rows.forEach((_,i)=>{

                        const gp=
                            n(
                                $("#cgpaGP"+i).value,
                                `Grade point ${i+1}`
                            );

                        if(
                            gp<0 ||
                            gp>4
                        ){

                            throw Error(
                                `Grade point ${i+1} must be between 0 and 4.`
                            );

                        }

                        if(w){

                            const cr=
                                n(
                                    $("#cgpaCredit"+i).value,
                                    `Credit ${i+1}`
                                );

                            if(cr<=0){

                                throw Error(
                                    `Credit ${i+1} must be greater than 0.`
                                );

                            }

                            a+=gp*cr;
                            b+=cr;

                        }else{

                            a+=gp;
                            b++;

                        }

                    });

                    const v=
                        a/b;

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                CGPA
                            </span>

                            <strong>
                                ${v.toFixed(2)}
                            </strong>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

/* =========================================================
   BASIC CALCULATORS
   ========================================================= */

registerTool(
    "percentage",

    ()=>shell(
        "Percentage Calculator",
        "Calculate percentage.",

        `
        ${field(
            "percentageObtained",
            "Obtained Marks",
            "425"
        )}

        ${field(
            "percentageTotal",
            "Total Marks",
            "500"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcPct">

            Calculate Percentage

        </button>
        `
    ),

    ()=>{

        $("#calcPct")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const a=
                        n(
                            $("#percentageObtained").value,
                            "Obtained marks"
                        );

                    const b=
                        n(
                            $("#percentageTotal").value,
                            "Total marks"
                        );

                    if(
                        b<=0 ||
                        a<0 ||
                        a>b
                    ){

                        throw Error(
                            "Enter valid obtained and total marks."
                        );

                    }

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                PERCENTAGE
                            </span>

                            <strong>
                                ${(a/b*100).toFixed(2)}%
                            </strong>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "grade",

    ()=>shell(
        "Marks & Grade",
        "Calculate grade and grade point.",

        `
        ${field(
            "gradeObtained",
            "Obtained Marks",
            "82"
        )}

        ${field(
            "gradeTotal",
            "Full Marks",
            "100"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcGrade">

            Calculate Grade

        </button>
        `
    ),

    ()=>{

        $("#calcGrade")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const a=
                        n(
                            $("#gradeObtained").value,
                            "Obtained marks"
                        );

                    const b=
                        n(
                            $("#gradeTotal").value,
                            "Full marks"
                        );

                    if(
                        b<=0 ||
                        a<0 ||
                        a>b
                    ){

                        throw Error(
                            "Enter valid marks."
                        );

                    }

                    const p=
                        a/b*100;

                    const g=
                        gradeOf(p);

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                ${p.toFixed(2)}%
                            </span>

                            <strong>
                                ${g.g}
                            </strong>

                            <small>
                                Grade Point:
                                ${g.p.toFixed(1)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "attendance",

    ()=>shell(
        "Attendance Calculator",
        "Calculate attendance and target.",

        `
        ${field(
            "attended",
            "Classes Attended",
            "42"
        )}

        ${field(
            "totalClasses",
            "Total Classes",
            "50"
        )}

        ${field(
            "attTarget",
            "Target Attendance %",
            "75"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcAtt">

            Calculate Attendance

        </button>
        `
    ),

    ()=>{

        $("#calcAtt")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const a=
                        n(
                            $("#attended").value,
                            "Attended classes"
                        );

                    const b=
                        n(
                            $("#totalClasses").value,
                            "Total classes"
                        );

                    const t=
                        n(
                            $("#attTarget").value,
                            "Target"
                        );

                    if(
                        b<=0 ||
                        a<0 ||
                        a>b ||
                        t<0 ||
                        t>100
                    ){

                        throw Error(
                            "Enter valid attendance values."
                        );

                    }

                    const p=
                        a/b*100;

                    let msg;

                    if(p>=t){

                        msg=
                            `You meet the ${t}% target.`;

                    }else if(t>=100){

                        msg=
                            "A 100% target cannot be reached after missed classes.";

                    }else{

                        msg=
                            `Attend about ${
                                Math.ceil(
                                    (t*b/100-a) /
                                    (1-t/100)
                                )
                            } more class(es) without missing one.`;

                    }

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                ATTENDANCE
                            </span>

                            <strong>
                                ${p.toFixed(2)}%
                            </strong>

                            <small>
                                ${esc(msg)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "age",

    ()=>shell(
        "Age Calculator",
        "Calculate exact age from date of birth.",

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
            id="calcAge">

            Calculate Age

        </button>
        `
    ),

    ()=>{

        $("#calcAge")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const s=
                        $("#dateOfBirth").value;

                    if(!s){

                        throw Error(
                            "Select your date of birth."
                        );

                    }

                    const d=
                        localDate(s);

                    const t=
                        new Date();

                    if(d>t){

                        throw Error(
                            "Date of birth cannot be in the future."
                        );

                    }

                    let y=
                        t.getFullYear() -
                        d.getFullYear();

                    let m=
                        t.getMonth() -
                        d.getMonth();

                    let day=
                        t.getDate() -
                        d.getDate();

                    if(day<0){

                        m--;

                        day +=
                            new Date(
                                t.getFullYear(),
                                t.getMonth(),
                                0
                            ).getDate();

                    }

                    if(m<0){

                        y--;
                        m+=12;

                    }

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                YOUR AGE
                            </span>

                            <strong>
                                ${y} years
                            </strong>

                            <small>
                                ${m} months and
                                ${day} days
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "date",

    ()=>shell(
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
            id="calcDateDiff">

            Calculate Difference

        </button>
        `
    ),

    ()=>{

        $("#calcDateDiff")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const a=
                        $("#dateOne").value;

                    const b=
                        $("#dateTwo").value;

                    if(!a||!b){

                        throw Error(
                            "Select both dates."
                        );

                    }

                    const days=
                        Math.round(
                            Math.abs(
                                localDate(b) -
                                localDate(a)
                            ) /
                            86400000
                        );

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                DATE DIFFERENCE
                            </span>

                            <strong>
                                ${days.toLocaleString()}
                                days
                            </strong>

                            <small>
                                ${Math.floor(days/7).toLocaleString()}
                                weeks
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

/* =========================================================
   INTEREST / DISCOUNT / PROFIT
   ========================================================= */

registerTool(
    "simple-interest",

    ()=>shell(
        "Simple Interest",
        "Calculate simple interest and total amount.",

        `
        ${field(
            "siP",
            "Principal",
            "10000"
        )}

        ${field(
            "siR",
            "Rate (%)",
            "5"
        )}

        ${field(
            "siT",
            "Time (years)",
            "2"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcSI">

            Calculate

        </button>
        `
    ),

    ()=>{

        $("#calcSI")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const p=
                        n(
                            $("#siP").value,
                            "Principal"
                        );

                    const r=
                        n(
                            $("#siR").value,
                            "Rate"
                        );

                    const t=
                        n(
                            $("#siT").value,
                            "Time"
                        );

                    if(
                        p<0 ||
                        r<0 ||
                        t<0
                    ){

                        throw Error(
                            "Values cannot be negative."
                        );

                    }

                    const i=
                        p*r*t/100;

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                SIMPLE INTEREST
                            </span>

                            <strong>
                                ${money(i)}
                            </strong>

                            <small>
                                Total amount:
                                ${money(p+i)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "compound-interest",

    ()=>shell(
        "Compound Interest",
        "Calculate compound interest.",

        `
        ${field(
            "ciP",
            "Principal",
            "10000"
        )}

        ${field(
            "ciR",
            "Annual Rate (%)",
            "5"
        )}

        ${field(
            "ciT",
            "Time (years)",
            "2"
        )}

        ${field(
            "ciN",
            "Compounds per year",
            "4"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcCI">

            Calculate

        </button>
        `
    ),

    ()=>{

        $("#calcCI")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const p=
                        n(
                            $("#ciP").value,
                            "Principal"
                        );

                    const r=
                        n(
                            $("#ciR").value,
                            "Rate"
                        );

                    const t=
                        n(
                            $("#ciT").value,
                            "Time"
                        );

                    const f=
                        n(
                            $("#ciN").value,
                            "Frequency"
                        );

                    if(
                        p<0 ||
                        r<0 ||
                        t<0 ||
                        f<=0
                    ){

                        throw Error(
                            "Enter valid values."
                        );

                    }

                    const a=
                        p*
                        Math.pow(
                            1+r/(100*f),
                            f*t
                        );

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                COMPOUND INTEREST
                            </span>

                            <strong>
                                ${money(a-p)}
                            </strong>

                            <small>
                                Total amount:
                                ${money(a)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "discount",

    ()=>shell(
        "Discount Calculator",
        "Calculate discount and final price.",

        `
        ${field(
            "discPrice",
            "Original Price",
            "2500"
        )}

        ${field(
            "discRate",
            "Discount (%)",
            "15"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcDiscount">

            Calculate

        </button>
        `
    ),

    ()=>{

        $("#calcDiscount")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const p=
                        n(
                            $("#discPrice").value,
                            "Original price"
                        );

                    const r=
                        n(
                            $("#discRate").value,
                            "Discount rate"
                        );

                    if(
                        p<0 ||
                        r<0 ||
                        r>100
                    ){

                        throw Error(
                            "Enter valid discount values."
                        );

                    }

                    const d=
                        p*r/100;

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                DISCOUNT
                            </span>

                            <strong>
                                ${money(d)}
                            </strong>

                            <small>
                                Final price:
                                ${money(p-d)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "profit",

    ()=>shell(
        "Profit & Loss",
        "Calculate profit or loss.",

        `
        ${field(
            "cp",
            "Cost Price",
            "1000"
        )}

        ${field(
            "sp",
            "Selling Price",
            "1250"
        )}

        <button
            type="button"
            class="primary-button"
            id="calcProfit">

            Calculate

        </button>
        `
    ),

    ()=>{

        $("#calcProfit")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const c=
                        n(
                            $("#cp").value,
                            "Cost price"
                        );

                    const s=
                        n(
                            $("#sp").value,
                            "Selling price"
                        );

                    if(c<=0){

                        throw Error(
                            "Cost price must be greater than 0."
                        );

                    }

                    const d=s-c;
                    const p=
                        Math.abs(
                            d/c*100
                        );

                    const typ=
                        d>0
                            ? "PROFIT"
                            : d<0
                                ? "LOSS"
                                : "NO PROFIT / NO LOSS";

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                ${typ}
                            </span>

                            <strong>
                                ${money(Math.abs(d))}
                            </strong>

                            <small>
                                ${p.toFixed(2)}%
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

/* =========================================================
   UNIT CONVERTER
   ========================================================= */

const UNIT={

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

    time:{
        second:1,
        minute:60,
        hour:3600,
        day:86400
    },

    temperature:{
        celsius:1,
        fahrenheit:2,
        kelvin:3
    }

};

function pretty(s){

    return s
        .replace(/-/g," ")
        .replace(/\b\w/g,c=>c.toUpperCase());

}

registerTool(
    "unit",

    ()=>shell(
        "Unit Converter",
        "Convert common measurements.",

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

        ${field(
            "unitValue",
            "Value",
            "12.5"
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
    ),

    ()=>{

        const update=()=>{

            const c=
                $("#unitCategory").value;

            const o=
                Object.keys(
                    UNIT[c]
                );

            $("#unitFrom").innerHTML=
                o
                .map(
                    x=>
                        `<option value="${x}">
                            ${pretty(x)}
                        </option>`
                )
                .join("");

            $("#unitTo").innerHTML=
                o
                .map(
                    x=>
                        `<option value="${x}">
                            ${pretty(x)}
                        </option>`
                )
                .join("");

        };

        update();

        $("#unitCategory")?.addEventListener(
            "change",
            update
        );

        $("#convertUnit")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const v=
                        n(
                            $("#unitValue").value,
                            "Value"
                        );

                    const c=
                        $("#unitCategory").value;

                    const f=
                        $("#unitFrom").value;

                    const t=
                        $("#unitTo").value;

                    let r;

                    if(c!=="temperature"){

                        r=
                            v*
                            UNIT[c][f] /
                            UNIT[c][t];

                    }else{

                        let x=v;

                        if(
                            f==="fahrenheit"
                        ){

                            x=
                                (v-32)*
                                5/9;

                        }

                        if(
                            f==="kelvin"
                        ){

                            x=
                                v-273.15;

                        }

                        r=
                            t==="celsius"
                                ? x
                                : t==="fahrenheit"
                                    ? x*9/5+32
                                    : x+273.15;

                    }

                    $("#toolResult").innerHTML=`

                        <div class="result-header">

                            <span>
                                RESULT
                            </span>

                            <strong>
                                ${money(r)}
                            </strong>

                            <small>
                                ${pretty(f)}
                                →
                                ${pretty(t)}
                            </small>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

/* =========================================================
   BS ↔ AD CONVERTER
   ========================================================= */

registerTool(
    "bs-ad",

    ()=>shell(
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
                id="calendarDate"
                type="text"
                inputmode="numeric"
                placeholder="2080-01-15"
                autocomplete="off">

            <small
                class="input-help"
                id="calendarDateHelp">

                Example: 2080-01-15

            </small>

        </div>

        <button
            type="button"
            class="primary-button"
            id="convertCalendar">

            Convert Date →

        </button>
        `
    ),

    ()=>{

        const d=
            $("#calendarDirection");

        const i=
            $("#calendarDate");

        const l=
            $("#calendarDateLabel");

        const h=
            $("#calendarDateHelp");

        const update=()=>{

            const bs=
                d.value==="bs-ad";

            l.textContent=
                bs
                    ? "BS Date"
                    : "AD Date";

            i.placeholder=
                bs
                    ? "2080-01-15"
                    : "2023-04-28";

            h.textContent=
                bs
                    ? "Enter BS date as YYYY-MM-DD."
                    : "Enter AD date as YYYY-MM-DD.";

            clearError();

            $("#toolResult").innerHTML="";

        };

        d?.addEventListener(
            "change",
            update
        );

        update();

        $("#convertCalendar")
            ?.addEventListener(
                "click",
                ()=>{

                    try{

                        clearError();

                        let s=
                            i.value
                            .trim()
                            .replace(
                                /[\/\.\s]/g,
                                "-"
                            );

                        s=
                            s.replace(
                                /-{2,}/g,
                                "-"
                            );

                        if(
                            !/^\d{4}-\d{1,2}-\d{1,2}$/
                                .test(s)
                        ){

                            throw Error(
                                "Use YYYY-MM-DD format."
                            );

                        }

                        const [
                            y,
                            m,
                            day
                        ]=
                            s
                            .split("-")
                            .map(Number);

                        const C=
                            window.NepaliDate;

                        if(
                            typeof C!=="function"
                        ){

                            throw Error(
                                "Nepali date library did not load. Keep its script before script.js."
                            );

                        }

                        let out;

                        /* BS → AD */

                        if(
                            d.value==="bs-ad"
                        ){

                            if(
                                y<1970 ||
                                y>2099
                            ){

                                throw Error(
                                    "BS year is outside the supported range."
                                );

                            }

                            const bs=
                                new C(
                                    `${y}-${String(m).padStart(2,"0")}-${String(day).padStart(2,"0")}`
                                );

                            const ad=
                                bs.getAD();

                            if(!ad){

                                throw Error(
                                    "Invalid BS date."
                                );

                            }

                            out=
                                `${ad.year}-${String(ad.month+1).padStart(2,"0")}-${String(ad.date).padStart(2,"0")}`;

                        }

                        /* AD → BS */

                        else{

                            if(
                                !isoValid(s)
                            ){

                                throw Error(
                                    "Enter a real Gregorian date."
                                );

                            }

                            const adDate=
                                new Date(
                                    y,
                                    m-1,
                                    day
                                );

                            const bs=
                                new C(adDate);

                            out=
                                `${bs.getYear()}-${String(bs.getMonth()+1).padStart(2,"0")}-${String(bs.getDate()).padStart(2,"0")}`;

                        }

                        $("#toolResult").innerHTML=`

                            <div class="result-header">

                                <span>
                                    ${
                                        d.value==="bs-ad"
                                            ? "AD DATE"
                                            : "BS DATE"
                                    }
                                </span>

                                <strong>
                                    ${esc(out)}
                                </strong>

                                <small>
                                    ${
                                        d.value==="bs-ad"
                                            ? "Bikram Sambat → Gregorian"
                                            : "Gregorian → Bikram Sambat"
                                    }
                                </small>

                            </div>

                        `;

                    }catch(e){

                        error(
                            e.message ||
                            "Date conversion failed."
                        );

                    }

                }
            );

    }
);

/* =========================================================
   TEXT TOOLS
   ========================================================= */

registerTool(
    "word-counter",

    ()=>shell(
        "Word Counter",
        "Count words and characters.",

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
                <strong id="wordCount">
                    0
                </strong>
                <span>
                    Words
                </span>
            </div>

            <div>
                <strong id="characterCount">
                    0
                </strong>
                <span>
                    Characters
                </span>
            </div>

            <div>
                <strong id="characterNoSpaceCount">
                    0
                </strong>
                <span>
                    No Spaces
                </span>
            </div>

            <div>
                <strong id="lineCount">
                    0
                </strong>
                <span>
                    Lines
                </span>
            </div>

        </div>
        `
    ),

    ()=>{

        const t=
            $("#wordCounterText");

        const u=()=>{

            const v=
                t.value;

            $("#wordCount").textContent=
                v.trim()
                    ? v.trim().split(/\s+/).length
                    : 0;

            $("#characterCount").textContent=
                v.length;

            $("#characterNoSpaceCount").textContent=
                v.replace(/\s/g,"").length;

            $("#lineCount").textContent=
                v
                    ? v.split("\n").length
                    : 0;

        };

        t?.addEventListener(
            "input",
            u
        );

        u();

    }
);

registerTool(
    "case-converter",

    ()=>shell(
        "Case Converter",
        "Convert text case.",

        `
        <div class="form-group">

            <label for="caseText">
                Your Text
            </label>

            <textarea
                id="caseText"
                rows="12"></textarea>

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
    ),

    ()=>{

        $$("[data-case]").forEach(b=>{

            b.addEventListener(
                "click",
                ()=>{

                    const t=
                        $("#caseText");

                    const v=
                        t.value;

                    const x=
                        b.dataset.case;

                    if(
                        x==="upper"
                    ){

                        t.value=
                            v.toUpperCase();

                    }

                    if(
                        x==="lower"
                    ){

                        t.value=
                            v.toLowerCase();

                    }

                    if(
                        x==="title"
                    ){

                        t.value=
                            v
                            .toLowerCase()
                            .replace(
                                /\b\w/g,
                                c=>c.toUpperCase()
                            );

                    }

                    if(
                        x==="sentence"
                    ){

                        t.value=
                            v
                            .toLowerCase()
                            .replace(
                                /(^\s*\w|[.!?]\s+\w)/g,
                                c=>c.toUpperCase()
                            );

                    }

                }
            );

        });

    }
);

registerTool(
    "text-cleaner",

    ()=>shell(
        "Text Cleaner",
        "Remove extra spaces and blank lines.",

        `
        <div class="form-group">

            <label for="cleanText">
                Your Text
            </label>

            <textarea
                id="cleanText"
                rows="14"></textarea>

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
    ),

    ()=>{

        $("#cleanTextButton")
            ?.addEventListener(
                "click",
                ()=>{

                    const t=
                        $("#cleanText");

                    t.value=
                        t.value
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

        $("#copyCleanText")
            ?.addEventListener(
                "click",
                async ()=>{

                    try{

                        await navigator.clipboard.writeText(
                            $("#cleanText").value
                        );

                        toast(
                            "Text copied."
                        );

                    }catch{

                        toast(
                            "Copy was blocked by the browser.",
                            "error"
                        );

                    }

                }
            );

    }
);

/* =========================================================
   QR / PASSWORD / RANDOM
   ========================================================= */

registerTool(
    "qr",

    ()=>shell(
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
    ),

    ()=>{

        $("#generateQR")?.addEventListener(
            "click",
            ()=>{

                try{

                    clearError();

                    const v=
                        $("#qrText")
                        .value
                        .trim();

                    if(!v){

                        throw Error(
                            "Enter text or a URL."
                        );

                    }

                    $("#toolResult").innerHTML=`

                        <div class="qr-result">

                            <img
                                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(v)}"
                                alt="Generated QR code">

                            <p>
                                QR code generated.
                            </p>

                        </div>

                    `;

                }catch(e){

                    error(e.message);

                }

            }
        );

    }
);

registerTool(
    "password",

    ()=>shell(
        "Password Generator",
        "Generate a random password.",

        `
        ${field(
            "passwordLength",
            "Password Length",
            "16"
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
    ),

    ()=>{

        $("#generatePassword")
            ?.addEventListener(
                "click",
                ()=>{

                    try{

                        clearError();

                        const len=
                            n(
                                $("#passwordLength")
                                .value,
                                "Password length"
                            );

                        if(
                            !Number.isInteger(len) ||
                            len<4 ||
                            len>128
                        ){

                            throw Error(
                                "Length must be a whole number from 4 to 128."
                            );

                        }

                        let chars="";

                        if(
                            $("#includeUpper")
                            .checked
                        ){

                            chars+=
                                "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

                        }

                        if(
                            $("#includeLower")
                            .checked
                        ){

                            chars+=
                                "abcdefghijklmnopqrstuvwxyz";

                        }

                        if(
                            $("#includeNumbers")
                            .checked
                        ){

                            chars+=
                                "0123456789";

                        }

                        if(
                            $("#includeSymbols")
                            .checked
                        ){

                            chars+=
                                "!@#$%^&*()_+-=[]{}";

                        }

                        if(!chars){

                            throw Error(
                                "Select at least one character type."
                            );

                        }

                        let p="";

                        const r=
                            new Uint32Array(len);

                        if(
                            window.crypto?.getRandomValues
                        ){

                            window.crypto.getRandomValues(
                                r
                            );

                        }

                        for(
                            let i=0;
                            i<len;
                            i++
                        ){

                            const index=
                                window.crypto?.getRandomValues
                                    ? r[i] % chars.length
                                    : Math.floor(
                                        Math.random() *
                                        chars.length
                                    );

                            p+=chars[index];

                        }

                        $("#toolResult").innerHTML=`

                            <div class="generated-output">

                                <input
                                    type="text"
                                    value="${esc(p)}"
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
                                async ()=>{

                                    try{

                                        await navigator.clipboard.writeText(
                                            p
                                        );

                                        toast(
                                            "Password copied."
                                        );

                                    }catch{

                                        toast(
                                            "Copy was blocked.",
                                            "error"
                                        );

                                    }

                                }
                            );

                    }catch(e){

                        error(e.message);

                    }

                }
            );

    }
);

registerTool(
    "random",

    ()=>shell(
        "Random Number Generator",
        "Generate a number between two values.",

        `
        ${field(
            "randomMin",
            "Minimum",
            "1"
        )}

        ${field(
            "randomMax",
            "Maximum",
            "100"
        )}

        <button
            type="button"
            class="primary-button"
            id="generateRandom">

            Generate

        </button>
        `
    ),

    ()=>{

        $("#generateRandom")
            ?.addEventListener(
                "click",
                ()=>{

                    try{

                        clearError();

                        const a=
                            n(
                                $("#randomMin").value,
                                "Minimum"
                            );

                        const b=
                            n(
                                $("#randomMax").value,
                                "Maximum"
                            );

                        if(a>b){

                            throw Error(
                                "Minimum cannot be greater than maximum."
                            );

                        }

                        const v=
                            Number.isInteger(a) &&
                            Number.isInteger(b)

                            ? Math.floor(
                                Math.random() *
                                (b-a+1)
                            ) + a

                            : Math.random() *
                                (b-a) + a;

                        $("#toolResult").innerHTML=`

                            <div class="result-header">

                                <span>
                                    RANDOM NUMBER
                                </span>

                                <strong>
                                    ${money(v)}
                                </strong>

                            </div>

                        `;

                    }catch(e){

                        error(e.message);

                    }

                }
            );

    }
);

/* =========================================================
   STUDY HUB
   ========================================================= */

let studyClass=null;
let studyFaculty=null;
let studySubject=null;

const STUDY=FACULTIES;

function show(id){
    $(id)?.classList.remove("hidden");
}

function hide(id){
    $(id)?.classList.add("hidden");
}

function studyClasses(){

    studyClass=null;
    studyFaculty=null;
    studySubject=null;

    show("#studyStepClass");

    hide("#studyStepFaculty");
    hide("#studyStepSubject");
    hide("#studyStepResource");

}

function studyToFaculty(c){

    studyClass=
        String(c);

    studyFaculty=null;
    studySubject=null;

    $("#studyFacultyClassLabel")
        .textContent=
            studyClass;

    $("#studyFacultyGrid")
        .innerHTML=

        Object.entries(STUDY)

        .map(
            ([k,f])=>`

                <button
                    type="button"
                    class="study-choice-card"
                    data-faculty="${k}">

                    <span
                        class="study-choice-icon">

                        ${f.icon}

                    </span>

                    <span>

                        <strong>
                            ${f.name}
                        </strong>

                        <small>
                            ${f.subjects.length}
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

    hide("#studyStepClass");
    show("#studyStepFaculty");

    hide("#studyStepSubject");
    hide("#studyStepResource");

    scroll("study");

}

function studyToSubject(k){

    const f=
        STUDY[k];

    if(!f)return;

    studyFaculty=k;

    $("#studySubjectPath")
        .textContent=
            `CLASS ${studyClass} • ${f.name.toUpperCase()}`;

    $("#studySubjectGrid")
        .innerHTML=

        f.subjects

        .map(
            (s,i)=>`

                <button
                    type="button"
                    class="study-choice-card"
                    data-subject-index="${i}">

                    <span
                        class="study-choice-icon">

                        ${String(i+1).padStart(2,"0")}

                    </span>

                    <span>

                        <strong>
                            ${esc(s)}
                        </strong>

                        <small>
                            Open
                            ${esc(s)}
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

    hide("#studyStepFaculty");
    show("#studyStepSubject");

    hide("#studyStepResource");

    scroll("study");

}

function studyToResource(s){

    studySubject=s;

    const f=
        STUDY[studyFaculty];

    $("#studyResourcePathClass")
        .textContent=
            `Class ${studyClass}`;

    $("#studyResourcePathFaculty")
        .textContent=
            f?.name ||
            "Faculty";

    $("#studyResourcePathSubject")
        .textContent=
            s;

    $("#studyResourceTitle")
        .textContent=
            s;

    $("#studyResourceDescription")
        .textContent=
            `Choose a resource for ${s}.`;

    $("#studyResourceOutput")
        ?.classList
        .add("hidden");

    hide("#studyStepSubject");
    show("#studyStepResource");

    scroll("study");

}

const RESOURCE={

    notes:[
        "Notes",
        "Chapter notes, key concepts and revision material."
    ],

    questions:[
        "Questions",
        "Practice and model questions for the selected subject."
    ],

    exam:[
        "Exam Preparation",
        "Revision and exam-focused practice."
    ],

    neb:[
        "NEB Resources",
        "Board-focused resources for the selected class and subject."
    ]

};

function openResource(k){

    const x=
        RESOURCE[k];

    const o=
        $("#studyResourceOutput");

    if(!x||!o)return;

    o.innerHTML=`

        <h4>
            ${x[0]}
        </h4>

        <p>
            ${x[1]}
        </p>

        <p>

            <strong>
                Path:
            </strong>

            Class ${studyClass}
            →
            ${STUDY[studyFaculty]?.name||"Faculty"}
            →
            ${studySubject}

        </p>

    `;

    o.classList.remove("hidden");

    o.scrollIntoView({
        behavior:"smooth",
        block:"nearest"
    });

}

$$(".class-choice").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>studyToFaculty(
                b.dataset.class
            )
        )
);

$("#studyFacultyGrid")
?.addEventListener(
    "click",
    e=>{

        const b=
            e.target.closest(
                "[data-faculty]"
            );

        if(b){

            studyToSubject(
                b.dataset.faculty
            );

        }

    }
);

$("#studySubjectGrid")
?.addEventListener(
    "click",
    e=>{

        const b=
            e.target.closest(
                "[data-subject-index]"
            );

        const f=
            STUDY[studyFaculty];

        if(
            b&&
            f
        ){

            studyToResource(
                f.subjects[
                    Number(
                        b.dataset.subjectIndex
                    )
                ]
            );

        }

    }
);

$$("[data-resource]").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>openResource(
                b.dataset.resource
            )
        )
);

$$("[data-study-back]").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>{

                if(
                    b.dataset.studyBack==="class"
                ){

                    studyClasses();

                }

                if(
                    b.dataset.studyBack==="faculty"
                ){

                    studyToFaculty(
                        studyClass
                    );

                }

                if(
                    b.dataset.studyBack==="subject"
                ){

                    studyToSubject(
                        studyFaculty
                    );

                }

            }
        )
);

/* =========================================================
   CODING HUB
   ========================================================= */

let codingId="c";

const CODING={

    c:{
        title:"C Programming",

        html:`

            <p>
                Learn C fundamentals with
                beginner-friendly topics.
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

        html:`

            <p>
                Learn problem analysis,
                pseudocode, flowcharts and
                step-by-step solutions.
            </p>

        `
    },

    concepts:{
        title:"Programming Concepts",

        html:`

            <p>
                Understand variables, operators,
                conditions, loops, arrays,
                strings and functions.
            </p>

        `
    },

    examples:{
        title:"C Examples",

        html:`

            <p>
                Practice factorial, Fibonacci,
                largest-number, palindrome and
                menu-driven programs.
            </p>

        `
    },

    practice:{
        title:"Practice Problems",

        html:`

            <p>
                Start with easy problems and
                gradually combine multiple
                programming concepts.
            </p>

        `
    },

    guides:{
        title:"Beginner Guides",

        html:`

            <p>
                Understand the problem,
                write an algorithm, code it,
                test it and improve it.
            </p>

        `
    }

};

const TOPICS={

    variables:[
        "Variables & Data Types",
        "Variables store values. Common types include int, float, double and char."
    ],

    input:[
        "Input & Output",
        "printf() displays output and scanf() receives input."
    ],

    conditions:[
        "Conditions",
        "if, else if and else let a program make decisions."
    ],

    loops:[
        "Loops",
        "for, while and do-while repeat code based on a condition."
    ],

    arrays:[
        "Arrays",
        "Arrays store multiple values of the same data type; C indexing starts at 0."
    ],

    strings:[
        "Strings",
        "A C string is a character sequence ending with the null character."
    ],

    functions:[
        "Functions",
        "Functions divide a program into reusable parts and may accept parameters and return values."
    ]

};

function openCoding(id){

    const c=
        CODING[id];

    const o=
        $("#codingContent");

    if(!c||!o)return;

    codingId=id;

    o.innerHTML=`

        <div class="coding-content-header">

            <span class="section-label">
                CODING
            </span>

            <h3>
                ${esc(c.title)}
            </h3>

        </div>

        <div class="coding-content-body">

            ${c.html}

        </div>

    `;

    o.classList.remove("hidden");

    o.scrollIntoView({
        behavior:"smooth",
        block:"nearest"
    });

}

$$(".coding-option").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>openCoding(
                b.dataset.coding
            )
        )
);

$("#codingContent")
?.addEventListener(
    "click",
    e=>{

        const back=
            e.target.closest(
                "[data-coding-back]"
            );

        const b=
            e.target.closest(
                "[data-topic]"
            );

        if(back){

            openCoding(
                codingId
            );

            return;

        }

        if(!b)return;

        const t=
            TOPICS[
                b.dataset.topic
            ];

        if(!t)return;

        $("#codingContent")
            .innerHTML=`

                <div
                    class="coding-content-header">

                    <span
                        class="section-label">

                        CODING TOPIC

                    </span>

                    <h3>
                        ${esc(t[0])}
                    </h3>

                </div>

                <div
                    class="coding-content-body">

                    <p>
                        ${esc(t[1])}
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

const ARTICLES={

    "neb-gpa":[
        "ACADEMICS",
        "How NEB GPA Calculation Works",
        "GPA summarizes grade-point performance across subjects. Weighted calculations use grade points and credit values."
    ],

    "gpa-cgpa":[
        "ACADEMICS",
        "GPA vs CGPA",
        "GPA usually represents one set or period of study; CGPA combines multiple grade-point entries."
    ],

    "c-programming":[
        "PROGRAMMING",
        "Starting C Programming",
        "Start with variables, input/output, conditions and loops before moving to arrays, strings and functions."
    ],

    "study-routine":[
        "STUDY",
        "Building a Better Study Routine",
        "Break subjects into smaller topics and combine active recall with practice and revision."
    ],

    "computer-science":[
        "COMPUTER SCIENCE",
        "Why Computer Science Matters",
        "Computer science covers algorithms, data, systems, programming and problem solving."
    ],

    website:[
        "TECHNOLOGY",
        "What Happens When You Open a Website?",
        "Your browser requests website resources such as HTML, CSS and JavaScript and then builds the page."
    ],

    "stupivot-tools":[
        "TOOLS",
        "Using StuPivot Effectively",
        "Use calculators for quick calculations, Study Hub for academic resources and Coding Hub for programming."
    ],

    "bs-ad":[
        "CALENDAR",
        "BS and AD Calendar Conversion",
        "BS and AD use different calendars. Accurate conversion uses calendar data rather than a fixed year offset."
    ]

};

$$(".read-article").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>{

                const a=
                    ARTICLES[
                        b.dataset.article
                    ];

                if(!a)return;

                articleContent.innerHTML=`

                    <span class="section-label">
                        ${a[0]}
                    </span>

                    <h2>
                        ${esc(a[1])}
                    </h2>

                    <p>
                        ${esc(a[2])}
                    </p>

                `;

                openModal(
                    articleModal
                );

            }
        )
);

/* =========================================================
   SEARCH
   ========================================================= */

const SEARCH=[

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
        "Convert BS and AD",
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
        "Discount",
        "Discount",
        "tool",
        "discount"
    ],

    [
        "Profit & Loss",
        "Profit and loss",
        "tool",
        "profit"
    ],

    [
        "Word Counter",
        "Count words",
        "tool",
        "word-counter"
    ],

    [
        "Case Converter",
        "Text case",
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
        "Generate a QR code",
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
        "Class 11 and 12 resources",
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
        "Learning articles",
        "section",
        "articles"
    ]

];

function search(){

    const q=
        $("#siteSearch");

    const r=
        $("#searchResults");

    if(!q||!r)return;

    const s=
        q.value
        .trim()
        .toLowerCase();

    if(!s){

        r.innerHTML="";
        return;

    }

    const m=
        SEARCH.filter(
            x=>
                `${x[0]} ${x[1]}`
                .toLowerCase()
                .includes(s)
        );

    if(!m.length){

        r.innerHTML=`

            <div class="search-empty">

                No matching StuPivot
                content found.

            </div>

        `;

        return;

    }

    r.innerHTML=

        m.map(
            (x,i)=>`

                <button
                    type="button"
                    class="search-result-item"
                    data-i="${i}">

                    <strong>
                        ${esc(x[0])}
                    </strong>

                    <small>
                        ${esc(x[1])}
                    </small>

                </button>

            `
        )
        .join("");

    $$(".search-result-item",r)
    .forEach(
        (b,i)=>
            b.addEventListener(
                "click",
                ()=>{

                    if(
                        m[i][2]==="tool"
                    ){

                        openTool(
                            m[i][3]
                        );

                    }else{

                        scroll(
                            m[i][3]
                        );

                    }

                }
            )
    );

}

$("#searchButton")
    ?.addEventListener(
        "click",
        search
    );

$("#siteSearch")
    ?.addEventListener(
        "input",
        search
    );

$("#siteSearch")
    ?.addEventListener(
        "keydown",
        e=>{

            if(
                e.key==="Enter"
            ){

                e.preventDefault();

                search();

            }

        }
    );

/* =========================================================
   LEGAL
   ========================================================= */

const LEGAL={

    privacy:[
        "Privacy Policy",
        "Information submitted through the contact and feedback forms is sent through the configured form service. Do not submit passwords or other sensitive information."
    ],

    terms:[
        "Terms of Use",
        "StuPivot provides calculators, tools and educational information for general student use. Important academic results should be checked against official school or board records."
    ]

};

$$(".legal-card").forEach(
    b=>
        b.addEventListener(
            "click",
            ()=>{

                const x=
                    LEGAL[
                        b.dataset.legal
                    ];

                if(!x)return;

                legalContent.innerHTML=`

                    <span class="section-label">
                        INFORMATION
                    </span>

                    <h2>
                        ${esc(x[0])}
                    </h2>

                    <p>
                        ${esc(x[1])}
                    </p>

                `;

                openModal(
                    legalModal
                );

            }
        )
);

/* =========================================================
   FORMSPREE
   ========================================================= */

function setupForm(id){

    const f=
        document.getElementById(id);

    if(!f)return;

    f.addEventListener(
        "submit",
        async e=>{

            e.preventDefault();

            const b=
                f.querySelector(
                    '[type="submit"]'
                );

            const old=
                b?.textContent ||
                "Send";

            if(b){

                b.disabled=true;
                b.textContent="Sending...";

            }

            try{

                const res=
                    await fetch(
                        f.action,
                        {
                            method:"POST",

                            body:
                                new FormData(f),

                            headers:{
                                Accept:
                                    "application/json"
                            }
                        }
                    );

                if(!res.ok){

                    throw Error(
                        "Message could not be sent."
                    );

                }

                f.reset();

                toast(
                    "Your message was sent successfully."
                );

            }catch(err){

                toast(
                    err.message ||
                    "Message could not be sent.",
                    "error"
                );

            }finally{

                if(b){

                    b.disabled=false;
                    b.textContent=old;

                }

            }

        }
    );

}

setupForm("feedbackForm");
setupForm("contactForm");

/* =========================================================
   NUMERIC INPUT CLEANUP
   ========================================================= */

document.addEventListener(
    "input",
    e=>{

        const x=
            e.target;

        if(
            x.tagName==="INPUT" &&
            x.getAttribute(
                "inputmode"
            )==="decimal"
        ){

            x.value=
                x.value.replace(
                    /[^0-9.\-]/g,
                    ""
                );

        }

    }
);

/* =========================================================
   READY
   ========================================================= */

console.log(
    "StuPivot initialized successfully."
);
