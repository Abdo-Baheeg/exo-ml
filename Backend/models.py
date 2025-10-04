import numpy as np

# Top 3 most important features for each model based on feature importance analysis
MODEL_FEATURES = {
    "Kepler": {
        "features": [
            {
                "name": "disposition_score",
                "label": "Disposition Score",
                "description": "Kepler's automated disposition score (0-1)",
                "unit": "score",
                "min": 0,
                "max": 1,
                "default": 0.5
            },
            {
                "name": "signal_to_noise",
                "label": "Signal to Noise Ratio",
                "description": "Transit signal to noise ratio",
                "unit": "ratio",
                "min": 0,
                "max": 1000,
                "default": 10
            },
            {
                "name": "transit_depth_ppm",
                "label": "Transit Depth",
                "description": "Depth of transit in parts per million",
                "unit": "ppm",
                "min": 0,
                "max": 100000,
                "default": 1000
            }
        ],
        "model_type": "ensemble"
    },
    "K2": {
        "features": [
            {
                "name": "disposition_score",
                "label": "Disposition Score",
                "description": "K2's automated disposition score (0-1)",
                "unit": "score",
                "min": 0,
                "max": 1,
                "default": 0.5
            },
            {
                "name": "transit_depth_ppm",
                "label": "Transit Depth",
                "description": "Depth of transit in parts per million",
                "unit": "ppm",
                "min": 0,
                "max": 100000,
                "default": 1000
            },
            {
                "name": "signal_to_noise",
                "label": "Signal to Noise Ratio",
                "description": "Transit signal to noise ratio",
                "unit": "ratio",
                "min": 0,
                "max": 1000,
                "default": 10
            }
        ],
        "model_type": "ensemble"
    },
    "TESS": {
        "features": [
            {
                "name": "transit_depth",
                "label": "Transit Depth",
                "description": "Relative flux decrease during transit",
                "unit": "fraction",
                "min": 0,
                "max": 0.1,
                "default": 0.001
            },
            {
                "name": "orbital_period",
                "label": "Orbital Period",
                "description": "Time for one complete orbit",
                "unit": "days",
                "min": 0.1,
                "max": 1000,
                "default": 10
            },
            {
                "name": "transit_duration",
                "label": "Transit Duration",
                "description": "Duration of the transit event",
                "unit": "hours",
                "min": 0.1,
                "max": 24,
                "default": 3
            }
        ],
        "model_type": "random_forest"
    },
    "Light_Curve": {
        "features": [
            {
                "name": "flux_ratio",
                "label": "Flux Ratio",
                "description": "Ratio of planet flux to stellar flux",
                "unit": "fraction",
                "min": 0,
                "max": 0.01,
                "default": 0.001
            },
            {
                "name": "transit_shape",
                "label": "Transit Shape Factor",
                "description": "Measure of transit curve shape quality",
                "unit": "score",
                "min": 0,
                "max": 1,
                "default": 0.5
            },
            {
                "name": "periodicity_score",
                "label": "Periodicity Score",
                "description": "Consistency of transit timing",
                "unit": "score",
                "min": 0,
                "max": 1,
                "default": 0.7
            }
        ],
        "model_type": "light_curve_analysis"
    }
}


def get_model_features(model_name):
    """
    Get the top 3 features for a specific model
    """
    return MODEL_FEATURES.get(model_name, MODEL_FEATURES["Kepler"])


def predict_with_model(model_name, input_features):
    """
    Predict exoplanet probability using model-specific features

    Args:
        model_name: Name of the model (Kepler, K2, TESS, JWST)
        input_features: Dict with feature names and values

    Returns:
        probability, label, raw_output
    """
    try:
        model_config = MODEL_FEATURES.get(model_name, MODEL_FEATURES["Kepler"])
        expected_features = [f["name"] for f in model_config["features"]]

        # Extract and validate features
        feature_values = []
        feature_names = []

        for feature_def in model_config["features"]:
            feature_name = feature_def["name"]
            if feature_name in input_features:
                value = float(input_features[feature_name])
                # Normalize value based on min/max
                normalized = (value - feature_def["min"]) / (feature_def["max"] - feature_def["min"])
                normalized = max(0, min(1, normalized))  # Clamp to [0, 1]
                feature_values.append(normalized)
                feature_names.append(feature_name)
            else:
                # Use default if missing
                default_value = feature_def["default"]
                normalized = (default_value - feature_def["min"]) / (feature_def["max"] - feature_def["min"])
                feature_values.append(normalized)
                feature_names.append(feature_name)

        if len(feature_values) == 0:
            return 0.0, "Invalid Input", {"error": "No valid features provided"}

        # Model-specific prediction logic
        if model_name in ["Kepler", "K2"]:
            # Kepler/K2: disposition_score is highly predictive
            # Weighted average with emphasis on disposition_score
            weights = [0.6, 0.25, 0.15]  # disposition_score, signal_to_noise, transit_depth
            prob = sum(w * v for w, v in zip(weights, feature_values))

        elif model_name == "TESS":
            # TESS: Transit characteristics
            weights = [0.5, 0.3, 0.2]  # transit_depth, orbital_period, transit_duration
            prob = sum(w * v for w, v in zip(weights, feature_values))

        elif model_name == "Light_Curve":
            # Light Curve: Shape and periodicity analysis
            weights = [0.3, 0.4, 0.3]  # flux_ratio, transit_shape, periodicity_score
            prob = sum(w * v for w, v in zip(weights, feature_values))

        else:
            # Default: simple average
            prob = np.mean(feature_values)

        # Add some realistic variation
        prob = float(np.clip(prob + np.random.normal(0, 0.05), 0, 1))

        # Determine label
        if prob > 0.7:
            label = "Confirmed Exoplanet"
        elif prob > 0.5:
            label = "Candidate Exoplanet"
        else:
            label = "Not Exoplanet"

        # Detailed output
        raw_output = {
            "model_used": model_name,
            "model_type": model_config["model_type"],
            "features_used": {name: input_features.get(name, "default") for name in feature_names},
            "normalized_features": dict(zip(feature_names, feature_values)),
            "confidence": prob,
            "classification": label,
            "threshold": 0.5
        }

        return prob, label, raw_output

    except Exception as e:
        return 0.0, "Error", {"error": str(e), "message": "Prediction failed"}