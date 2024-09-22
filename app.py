from flask import Flask, render_template, request, jsonify
from routine import Routine

app = Flask(__name__)

# empty table
table = [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
]

checker_list = []  # list for inserted indexes


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/routine", methods=["POST", "GET"])
def routine():
    if request.method == "POST":
        course_code = request.form.get("course_code")
        course_type = request.form.get("course_type")
        course_day = request.form.get("course_day")
        course_time = request.form.get("course_time")

        return Routine.generator(
            table=table,
            checker_list=checker_list,
            name=course_code,
            day=course_day,
            ctype=course_type,
            time=course_time,
        )

    return render_template("index.html")


@app.route("/clear", methods=["POST", "GET"])
def clear():
    if request.method == "POST":
        try:
            in1 = checker_list.pop()
            in2 = checker_list.pop()

            for inx in (in1, in2):
                i1 = int(inx / 10)
                i2 = inx % 10
                table[i1][i2] = " "
            conflict = False
        except:
            conflict = True

        return jsonify({"table": table, "conflict": conflict})

    return render_template("index.html")


@app.route("/clear-all", methods=["POST", "GET"])
def clear_all():
    if request.method == "POST":
        table[0] = [" ", " ", " ", " ", " ", " ", " "]
        table[1] = [" ", " ", " ", " ", " ", " ", " "]
        table[2] = [" ", " ", " ", " ", " ", " ", " "]
        table[3] = [" ", " ", " ", " ", " ", " ", " "]
        table[4] = [" ", " ", " ", " ", " ", " ", " "]
        checker_list.clear()
        return jsonify(table)

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
