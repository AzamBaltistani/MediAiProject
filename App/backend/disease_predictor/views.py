from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import re
import numpy as np
import pickle
import tensorflow as tf
from tensorflow.keras.utils import custom_object_scope
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer
from tensorflow.keras import backend as K
from tensorflow.keras.saving import register_keras_serializable

# Define the attention layer again
@register_keras_serializable(package="Custom")
class AttentionLayer(Layer):
    def build(self, input_shape):
        self.W = self.add_weight(name="att_weight", shape=(input_shape[-1], 1), initializer="normal")
        self.b = self.add_weight(name="att_bias", shape=(input_shape[1], 1), initializer="zeros")
        super().build(input_shape)

    def call(self, inputs):
        e = K.tanh(K.dot(inputs, self.W) + self.b)
        a = K.softmax(e, axis=1)
        output = inputs * a
        return K.sum(output, axis=1)

# Load model and preprocessing files (with custom scope)
BASE_DIR = os.path.join(settings.BASE_DIR, 'disease_predictor', 'trained_ai_models')

with custom_object_scope({"AttentionLayer": AttentionLayer}):
    model = load_model(os.path.join(BASE_DIR, 'disease_prediction_model.keras'), compile=False)

tokenizer = pickle.load(open(os.path.join(BASE_DIR, 'tokenizer.pkl'), 'rb'))
label_encoder = pickle.load(open(os.path.join(BASE_DIR, 'label_encoder.pkl'), 'rb'))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

class PredictDiseaseView(APIView):
    def post(self, request):
        text = request.data.get("text", "")
        if not text:
            return Response({"error": "Text field is required."}, status=400)

        cleaned = clean_text(text)
        seq = tokenizer.texts_to_sequences([cleaned])
        padded = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100, padding='post')
        pred = model.predict(padded)
        pred_label = label_encoder.inverse_transform([np.argmax(pred)])[0]

        return Response({"prediction": pred_label})
