import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, roc_auc_score
import shap  # pyright: ignore[reportMissingImports]
import os

def load_model(dataset_name, model_name):
    path = f"Backend/Note books/{dataset_name}_models/{model_name}.pkl"
    data_path = f"Data Sources/{dataset_name}.csv"

    model = joblib.load(path)
    data = pd.read_csv(data_path)
    X = data.drop("target", axis=1)
    y = data["target"]
    return model, X, y

def get_top_features(model, X):
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
    else:
        explainer = shap.Explainer(model, X)
        shap_values = explainer(X)
        importances = np.abs(shap_values.values).mean(axis=0)

    top_idx = np.argsort(importances)[::-1][:5]
    return list(X.columns[top_idx])

def make_prediction(model, inputs):
    arr = np.array(inputs).reshape(1, -1)
    return model.predict(arr)[0]

def get_metrics(model, X, y):
    y_pred = model.predict(X)
    return {
        "accuracy": float(accuracy_score(y, y_pred)),
        "precision": float(precision_score(y, y_pred)),
        "recall": float(recall_score(y, y_pred)),
        "auc": float(roc_auc_score(y, y_pred))
    }
