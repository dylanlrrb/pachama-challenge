from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve
import mysql.connector
import time

app = Flask(__name__)
CORS(app)
config = {
        'user': 'root',
        'password': 'my-secret-pw',
        'host': 'database',
        # 'host': 'localhost', # set host to localhost for local development
        'port': '3306',
        'database': 'demo'
    }

@app.route("/")
def main():
    return jsonify(
        valid_routes={
            "/api/search": {"valid_qps": ["forest_type", "keywords", "page", "count"]},
            "/api/details": {"valid_qps": ["forest_name"]},
            "/api/carbon_details": {"valid_qps": ["forest_name", "from"]},
            "/api/forest_types":  {"valid_qps": []}},
    )

@app.route("/api/search")
def search():
    keywords = request.args.get("keywords")
    forest_type = request.args.get("forest_type") or "all"
    page = int(request.args.get("page") or 0)
    count = int(request.args.get("count") or 6)

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(buffered=True)
    hits = []

    # find forest by name if keywords present, otherwise return all results
    if keywords is not None:
        cursor.execute('SELECT * FROM forests where forest_name="{}"'.format(keywords))
        results = [*cursor]
        hits = [*map(lambda x: {"name": x[1], "thumbnail_image": x[2], "forest_type": x[3], "description_brief": x[4]}, results)]
    else:
        keywords = "All projects"
        cursor.execute('SELECT * FROM forests')
        results = [*cursor]
        hits = [*map(lambda x: {"name": x[1], "thumbnail_image": x[2], "forest_type": x[3], "description_brief": x[4]}, results)]

    cursor.close()
    connection.close()

    # filter by forest type
    if forest_type != "all":
        hits = [*filter(lambda x: x['forest_type'] == forest_type, hits)]

    total_results = len(hits)

    # pagination calculations based on params
    hits = hits[page*count:page*count+count]

    return jsonify(
        metadata={"page": page, "count": count, "total_results": total_results, "keywords": keywords, "forest_type": forest_type},
        hits=[*hits],
    )

@app.route("/api/details")
def forest_details():
    forest_name = request.args.get("id")

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(buffered=True)

    cursor.execute('SELECT * FROM forests where forest_name="{}"'.format(forest_name))
    results = cursor.fetchone()
    cursor.close()
    connection.close()

    return jsonify(
        name=results[1],
        thumbnail_image=results[2],
        description_long=results[5],
        latitude=results[6],
        longitude=results[7],
        hectares=results[8],
        country=results[9],
    )

@app.route("/api/carbon_details")
def carbon_details():
    forest_name = request.args.get("id")
    start_time = request.args.get("from")

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(buffered=True)

    cursor.execute("SELECT * FROM health_metrics WHERE forest_name='{}' AND collection_time >= '{}' ORDER BY collection_time".format(forest_name, start_time))
    results = [*cursor]
    cursor.close()
    connection.close()

    return jsonify(
        metadata={"y_units": "Carbon Sequestered (Tons)", "forest_name": forest_name},
        hits=[*map(lambda x: {"collection_time": time.mktime(x[2].timetuple()), "value": x[3]}, results)]
    )

@app.route("/api/forest_types")
def forest_types():
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(buffered=True)
    cursor.execute('SELECT DISTINCT forest_type FROM forests')
    results = [*cursor]
    cursor.close()
    connection.close()

    return jsonify(
        hits=['all', *map(lambda x: x[0], results)],
    )

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
