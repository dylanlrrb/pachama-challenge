from flask import Flask, request, jsonify
from flask_cors import CORS
from waitress import serve

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return jsonify(
        valid_routes={
            "/api/search": {"valid_qps": ["forest_type", "keywords", "page", "count"]},
            "/api/details": {"valid_qps": ["id"]},
            "/api/carbon_details": {"valid_qps": ["id", "from"]},
            "/api/forest_types":  {"valid_qps": []}},
    )

# defailts for forest_type, start, and count, alternate query for empty keywords
@app.route("/api/search") # qp = forest_type keywords start count
def search():
    keywords = request.args.get("keywords")
    forest_type = request.args.get("forest_type") or "all"
    page = request.args.get("page") or 0
    count = request.args.get("count") or 6
    return jsonify(
        metadata={"page": "0", "count": "6", "total_results": "9", "keywords": "All projects", "forest_type": "All"},
        hits=[
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
            {"id": 1, "name": "Amazon", "forest_type": "conservation", "thumbnail_image": "https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true", "description_brief": "The Amazon rainforest is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America"},
        ],
    )

@app.route("/api/details") # qp forest id
def forest_details():
    forest_id = request.args.get("id")
    return jsonify(
        name="Amazon",
        thumbnail_image="https://github.com/dylanlrrb/P-C-Y-Assets/blob/master/0/docker.png?raw=true",
        description_long="The Amazon rainforest, alternatively, the Amazon jungle[a] or Amazonia, is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America. This basin encompasses 7,000,000 km2 (2,700,000 sq mi), of which 5,500,000 km2 (2,100,000 sq mi) are covered by the rainforest. This region includes territory belonging to nine nations and 3,344 formally acknowledged indigenous territories. The majority of the forest is contained within Brazil, with 60 percent of the rainforest, followed by Peru with 13 percent, Colombia with 10 percent, and with minor amounts in Bolivia, Ecuador, French Guiana, Guyana, Suriname, and Venezuela. Four nations have 'Amazonas' as the name of one of their first-level administrative regions, and France uses the name 'Guiana Amazonian Park' for its rainforest protected area. The Amazon represents over half of the planet's remaining rainforests,[2] and comprises the largest and most biodiverse tract of tropical rainforest in the world, with an estimated 390 billion individual trees divided into 16,000 species.[3]",
        latitude="3.4653° S",
        longitude="2.2159° W",
        hectares="634 Million",
        country="Brazil",
    )

@app.route("/api/carbon_details") # qp forest id, from timestamp
def carbon_details():
    forest_id = request.args.get("id")
    start_timestamp = request.args.get("from")
    return jsonify(
        metadata={"y_units": "Carbon Sequestered (Tons)", "start": "1623195479", "end": "1625787651"},
        hits=[
            {"timestamp": "1623281879", "value": "123"},
            {"timestamp": "1623541079", "value": "136"},
            {"timestamp": "1623800279", "value": "135"},
            {"timestamp": "1624059479", "value": "139"},
            {"timestamp": "1624318679", "value": "145"},
            {"timestamp": "1624577879", "value": "150"},
            {"timestamp": "1624837079", "value": "160"},
            {"timestamp": "1625096279", "value": "160"},
            {"timestamp": "1625269079", "value": "155"},
            {"timestamp": "1625528279", "value": "162"},
        ],
    )

@app.route("/api/forest_types")
def forest_types():
    return jsonify(
        hits=['all', 'conservation', 'reforestation'],
    )

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
