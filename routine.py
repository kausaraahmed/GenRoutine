from flask import jsonify


def make_index(x, y):
    return (x * 10) + y


class Routine:
    def __init__(self):
        pass

    def generator(table, checker_list, name, day, ctype, time):
        conflict = False
        time_map = {
            "8:00": 0,
            "9:25": 1,
            "10:50": 2,
            "12:15": 3,
            "1:40": 4,
            "3:05": 5,
            "4:30": 6,
        }

        if ctype == "theory":
            day_to_index = {"sun": (0, 2), "mon": (1, 3)}

            if day in day_to_index:
                day1, day2 = day_to_index[day]

                if time in time_map:
                    idx = time_map[time]

                    in1 = make_index(day1, idx)
                    in2 = make_index(day2, idx)

                    if in1 not in checker_list and in2 not in checker_list:
                        table[day1][idx] = name
                        table[day2][idx] = name
                        checker_list.extend([in1, in2])
                    else:
                        conflict = True

        elif ctype == "lab":
            day_to_index = {"sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4}
            time_map = {
                "8:00": 0,
                "9:25": 1,
                "10:50": 2,
                "12:15": 3,
                "1:40": 4,
                "3:05": 5,
            }

            # Ensure day and time are valid
            if day in day_to_index and time in time_map:
                day1 = day_to_index[day]
                idx = time_map[time]

                in1 = make_index(day1, idx)
                in2 = make_index(day1, idx + 1)

                if in1 not in checker_list and in2 not in checker_list:
                    table[day1][idx] = name
                    table[day1][idx + 1] = name

                    checker_list.extend([in1, in2])
                else:
                    conflict = True

        # return jsonify(table)
        if conflict:
            return jsonify({"table": table, "conflict": True})
        else:
            return jsonify({"table": table, "conflict": False})
