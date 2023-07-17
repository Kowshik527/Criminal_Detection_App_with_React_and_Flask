from flask import Flask,request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
import base64
import json
import cv2
import numpy as np
import pymysql
import face_recognition
import os
import datetime

@app.route('/register', methods=['POST'])
def register():
    name = request.json['name']
    crime = request.json['crime']
    image_data = base64.b64decode(request.json['image'])
    image_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    encoding = face_recognition.face_encodings(image)[0]
    encoding_bytes = encoding.tobytes()

    conn = pymysql.connect(host='localhost', user='root', password='', database='face_recognition')
    cursor = conn.cursor()

    cursor.execute('INSERT INTO faces (name, encoding, crime) VALUES (%s, %s, %s)', (name, encoding_bytes, crime))
    conn.commit()

    cursor.close()
    conn.close()

    return 'OK'

import datetime

@app.route('/recognize', methods=['POST'])
def recognize():
    image_data = base64.b64decode(request.json['image'])
    image_array = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    face_locations = face_recognition.face_locations(image)
    face_encodings = face_recognition.face_encodings(image, face_locations)

    conn = pymysql.connect(host='localhost', user='root', password='', database='face_recognition')
    cursor = conn.cursor()

    recognized_faces = []

    for face_encoding in face_encodings:
        cursor.execute('SELECT * FROM faces')
        rows = cursor.fetchall()

        distances = face_recognition.face_distance([np.frombuffer(row[2], dtype=np.float64) for row in rows], face_encoding)
        min_distance_idx = np.argmin(distances)
        min_distance = distances[min_distance_idx]

        if min_distance <= 0.6:
            name = rows[min_distance_idx][1]
            crime = rows[min_distance_idx][3]
            recognized_faces.append({
                'name': name,
                'crime': crime,
                'distance': float(min_distance)
            })

            # Add a new row to the recognitions table
            now = datetime.datetime.now()
            cursor.execute('INSERT INTO recognitions (name, time) VALUES (%s, %s)', (name, now))
            conn.commit()

    cursor.close()
    conn.close()

    return json.dumps(recognized_faces)

@app.route('/recognitions', methods=['GET'])
def get_recognitions():
    conn = pymysql.connect(host='localhost', user='root', password='', database='face_recognition')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM recognitions ORDER BY time DESC limit 10')
    rows = cursor.fetchall()

    recognitions = []

    for row in rows:
        recognitions.append({
            'name': row[1],
            'time': row[2].strftime('%Y-%m-%d %H:%M:%S')
        })

    cursor.close()
    conn.close()

    return json.dumps(recognitions)



if __name__ == "__main__":
    app.run(debug=True)
