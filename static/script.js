let selectedCourseType = ' ';

document.getElementById('theory-btn').addEventListener('click', function () {
    const t_day = document.getElementById('t-day');
    const l_day = document.getElementById('l-day');
    const t_time = document.getElementById('theory-time');
    const l_time = document.getElementById('lab-time');
    const labBtn = document.getElementById('lab-btn');
    const theoryBtn = document.getElementById('theory-btn');

    // Set the selected course ctype to 'theory'
    selectedCourseType = 'theory';

    t_day.style.display = 'flex';
    l_day.style.display = 'none';
    t_time.style.display = 'flex';
    l_time.style.display = 'none';
    theoryBtn.style.backgroundColor = '#141619';
    theoryBtn.style.color = 'white';
    labBtn.style.border = '2px solid lightgray';
    labBtn.style.backgroundColor = 'transparent';
    labBtn.style.color = 'gray';
})

document.getElementById('lab-btn').addEventListener('click', function () {
    const t_day = document.getElementById('t-day');
    const l_day = document.getElementById('l-day');
    const t_time = document.getElementById('theory-time');
    const l_time = document.getElementById('lab-time');
    const labBtn = document.getElementById('lab-btn');
    const theoryBtn = document.getElementById('theory-btn');

    // Set the selected course ctype to 'lab'
    selectedCourseType = 'lab';

    console.log('lab');
    t_day.style.display = 'none';
    l_day.style.display = 'flex';
    t_time.style.display = 'none';
    l_time.style.display = 'flex';
    labBtn.style.backgroundColor = '#141619'
    labBtn.style.color = 'white'
    theoryBtn.style.border = '2px solid lightgray'
    theoryBtn.style.backgroundColor = 'transparent'
    theoryBtn.style.color = 'gray'
})

document.getElementById('add-btn').addEventListener('click', function () {
    const course_code = document.getElementById('course-code').value;
    let course_type = ' ';

    // Use the selected course ctype
    if (selectedCourseType == ' ') {
        course_type = 'theory';
    } else {
        course_type = selectedCourseType;
    }

    const course_day = document.querySelector('input[name="day"]:checked').value;
    const course_time = document.querySelector('input[name="time"]:checked').value;

    console.log(`Course Code: ${course_code}`);
    console.log(`Course Type: ${course_type}`);
    console.log(`Course Day: ${course_day}`);
    console.log(`Course Time: ${course_time}`);

    fetch('/dummy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `course_code=${course_code}&course_day=${course_day}&course_type=${course_type}&course_time=${course_time}`
    })
        .then(response => response.json())
        .then(data => {
            const table = data.table;
            const conflict = data.conflict;

            if (conflict) {
                alert("Course conflict!! Select another course.");
            }

            for (let i = 0; i < table.length; i++) {
                for (let j = 0; j < 7; j++) {
                    document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${table[i][j]}</pre>`;
                }
            }
        }).catch(error => console.error('Error:', error));
});

document.getElementById('clear-btn').addEventListener('click', function () {
    fetch('/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ``
    })
        .then(response => response.json())
        .then(data => {
            const table = data.table;
            const conflict = data.conflict;

            if (conflict) {
                alert("No courses added");
            }
            else {
                for (let i = 0; i < table.length; i++) {
                    for (let j = 0; j < 7; j++) {
                        document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${table[i][j]}</pre>`;
                    }
                }
            }
        })
        .catch(error => console.error('Error:', error));
});
document.getElementById('clear-all-btn').addEventListener('click', function () {
    fetch('/clear-all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: ``
    })
        .then(response => response.json())
        .then(data => {

            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < 7; j++) {
                    document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${data[i][j]}</pre>`;
                }
            }
        })
        .catch(error => console.error('Error:', error));
});