import numpy as np

def predict_with_model(model_name, input_features):
    """
    نموذج تنبؤ وهمي - استبدل هذا بالنماذج الحقيقية من notebooks
    """
    try:
        # تحويل المدخلات إلى مصفوفة أرقام
        if isinstance(input_features, dict):
            features = np.array([float(x) for x in input_features.values()])
        elif isinstance(input_features, list):
            features = np.array([float(x) for x in input_features])
        else:
            features = np.array([float(input_features)])
        
        # إزالة القيم غير الصحيحة
        features = features[~np.isnan(features)]
        
        if len(features) == 0:
            return 0.0, "Invalid Input", {"error": "No valid features"}
        
        # حساب احتمال وهمي (استبدل بنموذجك الحقيقي)
        prob = float(np.tanh(np.mean(features)) * 0.5 + 0.5)
        prob = max(0.0, min(1.0, prob))  # التأكد من أن الاحتمال بين 0 و 1
        
        # تحديد التصنيف
        label = "Exoplanet" if prob > 0.5 else "Not Exoplanet"
        
        # تفاصيل إضافية
        raw_output = {
            "model_used": model_name,
            "input_features": features.tolist(),
            "confidence": prob,
            "feature_count": len(features)
        }
        
        return prob, label, raw_output
        
    except Exception as e:
        return 0.0, "Error", {"error": str(e)}