/* =========================================================
   STUPIVOT — STUDY HUB CSS
   Dark futuristic academic interface
========================================================= */

* {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    margin: 0;
    background:
        radial-gradient(
            circle at 15% 10%,
            rgba(58, 192, 200, 0.08),
            transparent 30%
        ),
        radial-gradient(
            circle at 85% 80%,
            rgba(120, 70, 255, 0.08),
            transparent 30%
        ),
        #050914;

    color: #ffffff;

    font-family:
        Arial,
        Helvetica,
        sans-serif;
}


/* =========================================================
   SECTION
========================================================= */

.study-section {
    width: 100%;
    min-height: 100vh;

    padding: 80px 20px;

    position: relative;
}


.study-section::before {
    content: "";

    position: absolute;

    inset: 0;

    pointer-events: none;

    background-image:
        linear-gradient(
            rgba(255,255,255,0.025) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,0.025) 1px,
            transparent 1px
        );

    background-size: 45px 45px;

    mask-image:
        linear-gradient(
            to bottom,
            black,
            transparent
        );
}


/* =========================================================
   SECTION HEADING
========================================================= */

.section-heading {
    position: relative;

    width: 100%;
    max-width: 1180px;

    margin: 0 auto 55px;

    text-align: center;
}


.section-label {
    display: inline-block;

    color: #3ac0c8;

    font-size: 0.72rem;
    font-weight: 800;

    letter-spacing: 0.16em;
}


.section-heading h1 {
    margin: 12px 0;

    color: #f7f9ff;

    font-size:
        clamp(
            2rem,
            5vw,
            3.7rem
        );

    line-height: 1.05;
}


.section-heading p {
    max-width: 680px;

    margin: 0 auto;

    color:
        rgba(
            220,
            225,
            240,
            0.65
        );

    line-height: 1.7;
}


/* =========================================================
   FLOW
========================================================= */

.study-flow {
    position: relative;

    width: 100%;
    max-width: 1180px;

    margin: auto;
}


/* =========================================================
   STEPS
========================================================= */

.study-step {
    animation:
        stepIn 0.4s ease;
}


.study-step.hidden {
    display: none !important;
}


@keyframes stepIn {

    from {
        opacity: 0;

        transform:
            translateY(25px)
            scale(0.98);
    }

    to {
        opacity: 1;

        transform:
            translateY(0)
            scale(1);
    }
}


/* =========================================================
   STEP HEADING
========================================================= */

.step-heading {
    display: flex;

    align-items: flex-start;

    gap: 18px;

    margin-bottom: 28px;
}


.step-heading > div {
    flex: 1;
}


.step-number {
    width: 48px;
    height: 48px;

    flex-shrink: 0;

    display: grid;

    place-items: center;

    border:
        1px solid
        rgba(
            58,
            192,
            200,
            0.35
        );

    border-radius: 14px;

    background:
        linear-gradient(
            135deg,
            rgba(58,192,200,0.14),
            rgba(120,70,255,0.12)
        );

    color: #3ac0c8;

    font-size: 0.78rem;
    font-weight: 900;

    box-shadow:
        0 0 30px
        rgba(
            58,
            192,
            200,
            0.07
        );
}


.step-heading h2 {
    margin: 5px 0 7px;

    color: #f7f9ff;

    font-size: 1.55rem;
}


.step-heading p {
    margin: 0;

    color:
        rgba(
            220,
            225,
            240,
            0.62
        );

    line-height: 1.6;
}


/* =========================================================
   BACK BUTTON
========================================================= */

.back-button {
    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.1
        );

    background:
        rgba(
            255,
            255,
            255,
            0.035
        );

    color: #aebbd0;

    border-radius: 12px;

    padding: 10px 15px;

    cursor: pointer;

    font: inherit;

    font-size: 0.84rem;

    transition:
        0.25s ease;
}


.back-button:hover {
    color: #ffffff;

    border-color:
        rgba(
            58,
            192,
            200,
            0.45
        );

    background:
        rgba(
            58,
            192,
            200,
            0.08
        );

    transform:
        translateX(-4px);
}


/* =========================================================
   CHOICE GRID
========================================================= */

.choice-grid {
    display: grid;

    grid-template-columns:
        repeat(
            2,
            minmax(0, 1fr)
        );

    gap: 18px;
}


/* =========================================================
   CHOICE CARD
========================================================= */

.choice-card {
    position: relative;

    min-height: 190px;

    padding: 24px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.09
        );

    border-radius: 22px;

    background:
        linear-gradient(
            145deg,
            rgba(20,28,48,0.94),
            rgba(7,11,22,0.98)
        );

    color: white;

    text-align: left;

    cursor: pointer;

    overflow: hidden;

    transition:
        transform 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
}


.choice-card::before {
    content: "";

    position: absolute;

    width: 260px;
    height: 260px;

    left: -120px;
    top: -140px;

    border-radius: 50%;

    background:
        rgba(
            58,
            192,
            200,
            0.11
        );

    filter: blur(20px);

    opacity: 0;

    transition:
        opacity 0.3s ease;
}


.choice-card:hover {
    transform:
        translateY(-6px);

    border-color:
        rgba(
            58,
            192,
            200,
            0.45
        );

    box-shadow:
        0 20px 55px
        rgba(
            0,
            0,
            0,
            0.4
        ),
        0 0 35px
        rgba(
            58,
            192,
            200,
            0.08
        );
}


.choice-card:hover::before {
    opacity: 1;
}


.card-top {
    position: relative;

    z-index: 2;

    display: flex;

    justify-content:
        space-between;

    align-items: center;

    margin-bottom: 18px;
}


.card-top span {
    color:
        rgba(
            255,
            255,
            255,
            0.3
        );

    font-size: 0.7rem;

    font-weight: 900;

    letter-spacing: 0.1em;
}


.card-top b {
    width: 34px;
    height: 34px;

    display: grid;

    place-items: center;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.09
        );

    border-radius: 50%;

    color: #8290a7;

    font-size: 1rem;

    transition:
        0.25s ease;
}


.choice-card:hover .card-top b {
    color: #3ac0c8;

    transform:
        translate(
            3px,
            -3px
        );
}


.card-icon {
    position: relative;

    z-index: 2;

    width: 58px;
    height: 58px;

    display: grid;

    place-items: center;

    margin-bottom: 17px;

    border-radius: 16px;

    border:
        1px solid
        rgba(
            58,
            192,
            200,
            0.2
        );

    background:
        linear-gradient(
            135deg,
            rgba(58,192,200,0.16),
            rgba(120,70,255,0.16)
        );

    color: #55dce3;

    font-size: 0.72rem;

    font-weight: 900;

    letter-spacing: 0.05em;
}


.choice-card h3 {
    position: relative;

    z-index: 2;

    margin: 0 0 8px;

    color: #f7f9ff;

    font-size: 1.12rem;
}


.choice-card p {
    position: relative;

    z-index: 2;

    margin: 0;

    color:
        rgba(
            210,
            218,
            235,
            0.62
        );

    font-size: 0.84rem;

    line-height: 1.65;
}


/* =========================================================
   SUBJECT GRID
========================================================= */

.subject-grid {
    grid-template-columns:
        repeat(
            3,
            minmax(0, 1fr)
        );
}


.subject-grid .choice-card {
    min-height: 170px;
}


/* =========================================================
   PATH
========================================================= */

.path {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 9px;

    width: fit-content;

    max-width: 100%;

    margin:
        0 0 25px;

    padding:
        10px 15px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.08
        );

    border-radius: 999px;

    background:
        rgba(
            255,
            255,
            255,
            0.035
        );

    color: #9caac0;

    font-size: 0.8rem;
}


.path strong {
    color: #3ac0c8;
}


/* =========================================================
   RESOURCE GRID
========================================================= */

.resource-grid {
    display: grid;

    grid-template-columns:
        repeat(
            3,
            minmax(0, 1fr)
        );

    gap: 18px;
}


.resource-card {
    position: relative;

    min-height: 220px;

    padding: 25px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.09
        );

    border-radius: 22px;

    background:
        linear-gradient(
            145deg,
            rgba(19,28,48,0.95),
            rgba(7,11,22,0.99)
        );

    color: white;

    text-align: left;

    cursor: pointer;

    overflow: hidden;

    transition:
        0.25s ease;
}


.resource-card:hover {
    transform:
        translateY(-7px);

    border-color:
        rgba(
            120,
            70,
            255,
            0.45
        );

    box-shadow:
        0 20px 55px
        rgba(
            0,
            0,
            0,
            0.42
        );
}


.resource-number {
    display: block;

    margin-bottom: 18px;

    color:
        rgba(
            255,
            255,
            255,
            0.3
        );

    font-size: 0.7rem;

    font-weight: 900;
}


.resource-icon {
    width: 56px;
    height: 56px;

    display: grid;

    place-items: center;

    margin-bottom: 18px;

    border-radius: 15px;

    border:
        1px solid
        rgba(
            58,
            192,
            200,
            0.2
        );

    background:
        linear-gradient(
            135deg,
            rgba(58,192,200,0.16),
            rgba(120,70,255,0.15)
        );

    color: #55dce3;

    font-size: 1.05rem;

    font-weight: 900;
}


.resource-card h3 {
    margin:
        0 0 7px;

    color: #f7f9ff;

    font-size: 1.1rem;
}


.resource-card p {
    margin: 0;

    max-width: 300px;

    color:
        rgba(
            210,
            218,
            235,
            0.62
        );

    line-height: 1.6;
}


.resource-arrow {
    position: absolute;

    top: 22px;
    right: 22px;

    color:
        rgba(
            255,
            255,
            255,
            0.4
        );

    font-size: 1.2rem;

    transition:
        0.25s ease;
}


.resource-card:hover .resource-arrow {
    color: #3ac0c8;

    transform:
        translate(
            4px,
            -4px
        );
}


/* =========================================================
   RESOURCE CONTENT
========================================================= */

.resource-content {
    margin-top: 25px;

    padding: 30px;

    border:
        1px solid
        rgba(
            58,
            192,
            200,
            0.17
        );

    border-radius: 22px;

    background:
        linear-gradient(
            145deg,
            rgba(12,22,38,0.96),
            rgba(5,10,20,0.99)
        );

    animation:
        contentIn 0.35s ease;
}


.resource-content.hidden {
    display: none !important;
}


@keyframes contentIn {

    from {
        opacity: 0;
        transform:
            translateY(15px);
    }

    to {
        opacity: 1;
        transform:
            translateY(0);
    }
}


.resource-content h3 {
    margin:
        8px 0 10px;

    color: #ffffff;

    font-size: 1.5rem;
}


.resource-content h4 {
    margin:
        25px 0 10px;

    color: #55dce3;

    font-size: 1.05rem;
}


.resource-content p,
.resource-content li {
    color:
        rgba(
            220,
            225,
            240,
            0.75
        );

    line-height: 1.75;
}


.resource-content ul,
.resource-content ol {
    padding-left: 22px;
}


.resource-content li {
    margin-bottom: 8px;
}


.resource-badge {
    display: inline-block;

    padding:
        6px 10px;

    border-radius: 999px;

    background:
        rgba(
            58,
            192,
            200,
            0.1
        );

    color: #3ac0c8;

    font-size: 0.7rem;

    font-weight: 900;

    letter-spacing: 0.08em;
}


/* =========================================================
   QUESTION BOXES
========================================================= */

.question-box {
    margin:
        12px 0;

    padding:
        16px 18px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.07
        );

    border-radius: 14px;

    background:
        rgba(
            255,
            255,
            255,
            0.025
        );
}


.question-box strong {
    color: #ffffff;
}


/* =========================================================
   STUDY NOTE
========================================================= */

.study-note {
    display: flex;

    gap: 12px;

    align-items: flex-start;

    margin-top: 28px;

    padding:
        15px 17px;

    border:
        1px solid
        rgba(
            255,
            255,
            255,
            0.07
        );

    border-radius: 15px;

    background:
        rgba(
            255,
            255,
            255,
            0.025
        );
}


.study-note > span {
    width: 25px;
    height: 25px;

    flex-shrink: 0;

    display: grid;

    place-items: center;

    border-radius: 50%;

    background:
        rgba(
            58,
            192,
            200,
            0.12
        );

    color: #3ac0c8;

    font-weight: 900;
}


.study-note p {
    margin: 2px 0 0;

    color:
        rgba(
            210,
            218,
            235,
            0.55
        );

    font-size: 0.77rem;

    line-height: 1.6;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 950px) {

    .subject-grid,
    .resource-grid {
        grid-template-columns:
            repeat(
                2,
                minmax(0, 1fr)
            );
    }

}


@media (max-width: 650px) {

    .study-section {
        padding:
            55px 15px;
    }


    .section-heading {
        margin-bottom: 40px;
    }


    .step-heading {
        flex-wrap: wrap;
    }


    .choice-grid,
    .subject-grid,
    .resource-grid {
        grid-template-columns: 1fr;
    }


    .choice-card {
        min-height: 165px;

        padding: 21px;
    }


    .resource-card {
        min-height: 190px;
    }


    .path {
        border-radius: 14px;

        line-height: 1.6;
    }


    .resource-content {
        padding: 21px;
    }

}


@media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

}
