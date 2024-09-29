let selectedCourseType = ' ';   // for default selection while page loads 

// theory button actions
document.getElementById('theory-btn').addEventListener('click', function () {
    const t_day = document.getElementById('t-day');
    const l_day = document.getElementById('l-day');
    const t_time = document.getElementById('theory-time');
    const l_time = document.getElementById('lab-time');
    const labBtn = document.getElementById('lab-btn');
    const theoryBtn = document.getElementById('theory-btn');

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


// theory button actions
document.getElementById('lab-btn').addEventListener('click', function () {
    const t_day = document.getElementById('t-day');
    const l_day = document.getElementById('l-day');
    const t_time = document.getElementById('theory-time');
    const l_time = document.getElementById('lab-time');
    const labBtn = document.getElementById('lab-btn');
    const theoryBtn = document.getElementById('theory-btn');

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

// Helper function to generate the index
function makeIndex(x, y) {
    return (x * 10) + y;
}

// Routine generator logic directly in JS
class Routine {
    static generator(table, checkerList, name, day, ctype, time) {
        let conflict = false;
        const timeMap = {
            "8:00": 0,
            "9:25": 1,
            "10:50": 2,
            "12:15": 3,
            "1:40": 4,
            "3:05": 5,
            "4:30": 6
        };

        if (ctype === "theory") {
            const dayToIndex = { "sun": [0, 2], "mon": [1, 3] };

            if (day in dayToIndex) {
                const [day1, day2] = dayToIndex[day];

                if (time in timeMap) {
                    const idx = timeMap[time];

                    const in1 = makeIndex(day1, idx);
                    const in2 = makeIndex(day2, idx);

                    if (!checkerList.includes(in1) && !checkerList.includes(in2)) {
                        table[day1][idx] = name;
                        table[day2][idx] = name;
                        checkerList.push(in1, in2);
                    } else {
                        conflict = true;
                    }
                }
            }
        } else if (ctype === "lab") {
            const dayToIndex = { "sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4 };
            const labTimeMap = {
                "8:00": 0,
                "9:25": 1,
                "10:50": 2,
                "12:15": 3,
                "1:40": 4,
                "3:05": 5
            };

            if (day in dayToIndex && time in labTimeMap) {
                const day1 = dayToIndex[day];
                const idx = labTimeMap[time];

                const in1 = makeIndex(day1, idx);
                const in2 = makeIndex(day1, idx + 1);

                if (!checkerList.includes(in1) && !checkerList.includes(in2)) {
                    table[day1][idx] = name;
                    table[day1][idx + 1] = name;
                    checkerList.push(in1, in2);
                } else {
                    conflict = true;
                }
            }
        }

        return { table, conflict };
    }
}

// Initialize the table and checkerList
// let table = Array.from({ length: 5 }, () => Array(7).fill(null)); // 5 days, 7 time slots
let table = Array.from({ length: 5 }, () => Array(7).fill('')); // 5 days, 7 time slots
let checkerList = [];

// Course add button actions
document.getElementById('add-btn').addEventListener('click', function () {
    const course_code = document.getElementById('course-code').value;
    let course_type = ' ';

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

    // Call the JS version of Routine.generator instead of Flask backend
    const result = Routine.generator(table, checkerList, course_code, course_day, course_type, course_time);
    const conflict = result.conflict;

    if (conflict) {
        alert("Course conflict!! Select another course.");
    }

    // Update the table on the frontend
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${table[i][j]}</pre>`;
        }
    }
});

// Clear button to remove the last inserted course one by one
document.getElementById('clear-btn').addEventListener('click', function () {
    try {
        // Pop the last two inserted indexes from the checker list
        const in1 = checkerList.pop();
        const in2 = checkerList.pop();

        // Clear the corresponding table cells
        [in1, in2].forEach(index => {
            const row = Math.floor(index / 10);
            const col = index % 10;
            table[row][col] = " ";
        });

        // Update the table on the frontend
        for (let i = 0; i < table.length; i++) {
            for (let j = 0; j < 7; j++) {
                document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${table[i][j]}</pre>`;
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert("No courses to remove.");
    }
});


// Clear all button to remove all courses at once
document.getElementById('clear-all-btn').addEventListener('click', function () {
    // Reset everything
    table = Array.from({ length: 5 }, () => Array(7).fill(''));
    checkerList = [];

    // Update the table on the frontend
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < 7; j++) {
            document.getElementById(`cell-${i}-${j}`).innerHTML = `<pre>${table[i][j]}</pre>`;
        }
    }
});
