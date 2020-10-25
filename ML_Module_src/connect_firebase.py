import os
import cv2
import time
import imutils
import pyrebase
import numpy as np
from utils import *


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
#################### Initialize  ####################

print("Start looping")

while(1):
    print("Loop ======================================================================", loop)

    files = storage.list_files()

    for file in files:

        if file.name == "screenShot/undefined":

            img_local_name = "imgs/" + os.path.basename(file.name) + ".png"

            storage.child(file.name).download(img_local_name)

            gray_img = cv2.imread(img_local_name, cv2.IMREAD_GRAYSCALE)

            faces = facecasc.detectMultiScale(
                gray_img, scaleFactor=1.3, minNeighbors=5)

            for (x, y, w, h) in faces:

                roi_gray = gray_img[y:y + h, x:x + w]
                cropped_img = np.expand_dims(np.expand_dims(
                    cv2.resize(roi_gray, (48, 48)), -1), 0)

                prediction = model.predict(cropped_img)
                maxindex = int(np.argmax(prediction))

                print(emotion_dict[maxindex])

                data = {'cur_emotion': emotion_dict[maxindex]}

                db.child("CUR_EMOTION").set(data)

    loop += 1
    time.sleep(5)
