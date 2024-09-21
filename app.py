from flask import Flask, render_template, request, jsonify
from routine import Routine

app = Flask(__name__)

table = [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
]

checker_list = []


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/dummy", methods=["POST", "GET"])
def dummy():
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
        table[0] = [" ", " ", " ", " ", " ", " ", " "]
        table[1] = [" ", " ", " ", " ", " ", " ", " "]
        table[2] = [" ", " ", " ", " ", " ", " ", " "]
        table[3] = [" ", " ", " ", " ", " ", " ", " "]
        table[4] = [" ", " ", " ", " ", " ", " ", " "]
        checker_list.clear()
        return jsonify(table)
    
    return render_template("index.html")


# main driver function
if __name__ == "__main__":
    app.run(debug=True)
