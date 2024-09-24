from flask import Flask, render_template, request, jsonify
# from flask_cors import CORS
from routine import Routine

app = Flask(__name__)
# CORS(app)

# empty table
table = [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " "],
]

checker_list = []  # list for inserted indexes


# home page route
@app.route("/")
def home():
    return render_template("index.html")


# routo to generate routine (main route)
@app.route("/routine", methods=["POST", "GET"])
def routine():
    if request.method == "POST":
        course_code = request.form.get("course_code")
        course_type = request.form.get("course_type")
        course_day = request.form.get("course_day")
        course_time = request.form.get("course_time")

        # call the python function with necessary params
        return Routine.generator(
            table=table,
            checker_list=checker_list,
            name=course_code,
            day=course_day,
            ctype=course_type,
            time=course_time,
        )

    return render_template("index.html")


# remove curses from last to first
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


# clear all the entry of the list
@app.route("/clear-all", methods=["POST", "GET"])
def clear_all():
    if request.method == "POST":
        # set tables to default
        table[0] = [" ", " ", " ", " ", " ", " ", " "]
        table[1] = [" ", " ", " ", " ", " ", " ", " "]
        table[2] = [" ", " ", " ", " ", " ", " ", " "]
        table[3] = [" ", " ", " ", " ", " ", " ", " "]
        table[4] = [" ", " ", " ", " ", " ", " ", " "]

        checker_list.clear()  # clear the whole list

        return jsonify(table)  # return the empty table

    return render_template("index.html")


# need this to run on local machines
if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)
