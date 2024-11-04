# main.py
from flask import Flask, jsonify, request, abort

app = Flask(__name__)

user_data = {
    1: {"id": 1, "name": "Jack", "email": "jack@example.com"},
    2: {"id": 2, "name": "Bob", "email": "bob@example.com"},
    3: {"id": 3, "name": "Clara", "email": "clara@example.com"}
}

@app.route('/users', methods=['GET'])
def list_users():
    return jsonify(list(user_data.values()))

@app.route('/users/<int:user_id>', methods=['GET'])
def retrieve_user(user_id):
    user = user_data.get(user_id)
    if user is None:
        abort(404, description="User does not exist")
    return jsonify(user)

@app.route('/users', methods=['POST'])
def add_user():
    if not request.json or 'name' not in request.json or 'email' not in request.json:
        abort(400, description="Both name and email are required fields")
    
    new_id = max(user_data.keys()) + 1
    user_data[new_id] = {
        "id": new_id,
        "name": request.json['name'],
        "email": request.json['email']
    }
    return jsonify(user_data[new_id]), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def modify_user(user_id):
    user = user_data.get(user_id)
    if user is None:
        abort(404, description="User does not exist")
    if not request.json:
        abort(400, description="Update data missing")
    
    user['name'] = request.json.get('name', user['name'])
    user['email'] = request.json.get('email', user['email'])
    return jsonify(user)

@app.route('/users/<int:user_id>', methods=['DELETE'])
def remove_user(user_id):
    if user_id not in user_data:
        abort(404, description="User does not exist")
    del user_data[user_id]
    return jsonify({"message": "User successfully removed"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
