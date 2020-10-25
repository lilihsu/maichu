
import cv2
import pyrebase
from scipy.spatial import distance

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator


def init_firebase():

    config = {
        "apiKey": "AIzaSyAuu9SFYDjZp7qrdLlzNw5G-5PdbWxKOZ8",
        "authDomain": "meichu-d3544.firebaseapp.com",
        "databaseURL": "https://meichu-d3544.firebaseio.com",
        "projectId": "meichu-d3544",
        "storageBucket": "meichu-d3544.appspot.com",
        "messagingSenderId": "72520882450",
        "appId": "1:72520882450:web:b5db23fac6657858e8fbcb",
        "measurementId": "G-RGEK4BMMJ3",
        "serviceAccount": "meichu-d3544-8562e2333a74.json"
    }

    firebase = pyrebase.initialize_app(config)

    return firebase


def init_model():

    model = Sequential()

    model.add(Conv2D(32, kernel_size=(3, 3),
                     activation='relu', input_shape=(48, 48, 1)))
    model.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    model.add(Flatten())
    model.add(Dense(1024, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(7, activation='softmax'))

    model.load_weights('model.h5')

    facecasc = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

    return model, facecasc


def compute_EAR(vec):

    a = distance.euclidean(vec[1], vec[5])
    b = distance.euclidean(vec[2], vec[4])
    c = distance.euclidean(vec[0], vec[3])
    # compute EAR
    ear = (a + b) / (2.0 * c)

    return ear
