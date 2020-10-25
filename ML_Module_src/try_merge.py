import os
import cv2
import time
import imutils
import pyrebase
import numpy as np
from utils import *

import sys
import dlib
from skimage import io

#################### Initialize  ####################
print("Start initializing")

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful",
                3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

firebase = init_firebase()
storage = firebase.storage()
db = firebase.database()
model, facecasc = init_model()

history_list = []

loop = 0


predictor_path = "./shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(predictor_path)

reset_counter = 0

#################### Initialize  ####################

print("Start looping")

data = {'cur_emotion': "None"}
db.child("CUR_EMOTION").set(data)

while(1):
    print("Loop ======================================================================", loop)

    files = storage.list_files()

    reset_counter += 1

    for file in files:

        if (file.name)[0] == "s" and file.name != "screenShot/":

            if file.name not in history_list:

                reset_counter = 0
                history_list.append(file.name)

                img_local_name = "imgs/" + os.path.basename(file.name) + ".png"

                print(img_local_name)

                storage.child(file.name).download(img_local_name)

                gray_img = cv2.imread(
                    img_local_name, cv2.IMREAD_GRAYSCALE)
                img = cv2.imread(img_local_name)

                dets = detector(img, 1)
                vec = np.empty([68, 2], dtype=int)

                status = "Not Sleeping"

                for k, d in enumerate(dets):

                    shape = predictor(img, d)

                    for b in range(68):
                        vec[b][0] = shape.part(b).x
                        vec[b][1] = shape.part(b).y

                    right_ear = compute_EAR(vec[42:48])
                    left_ear = compute_EAR(vec[36:42])

                    if (right_ear+left_ear)/2 < 0.2:
                        status = "sleeping"

                    print(status)

                faces = facecasc.detectMultiScale(
                    gray_img, scaleFactor=1.3, minNeighbors=5)

                for (x, y, w, h) in faces:
                    print("Detect Face")
                    roi_gray = gray_img[y:y + h, x:x + w]
                    cropped_img = np.expand_dims(np.expand_dims(
                        cv2.resize(roi_gray, (48, 48)), -1), 0)

                    prediction = model.predict(cropped_img)
                    maxindex = int(np.argmax(prediction))

                    if maxindex == 0 or maxindex == 1 or maxindex == 2 or maxindex == 4:
                        maxindex = 5

                    print(emotion_dict[maxindex])

                    if status == "sleeping":
                        data = {'cur_emotion': "sleeping"}
                    else:
                        data = {'cur_emotion': emotion_dict[maxindex]}

                    db.child("CUR_EMOTION").set(data)

    if reset_counter >= 100:
        reset_counter = 0
        data = {'cur_emotion': "None"}
        db.child("CUR_EMOTION").set(data)

    loop += 1
    # time.sleep(1))
