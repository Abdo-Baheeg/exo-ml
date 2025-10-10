# 📊 Notebook Execution Output Specification

## Purpose
Define the standard output format for the `/api/run-notebook` endpoint to provide users with clear, actionable information about notebook execution.

---

## 🎯 Output Structure

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Notebook executed successfully",
  "notebook": "Kepler_Exoplanet_Modeling_FlaskReady.ipynb",
  "execution_time": 127.3,
  "timestamp": "2025-10-10T14:30:45Z",
  "summary": {
    "total_cells": 45,
    "executed_cells": 45,
    "skipped_cells": 0,
    "failed_cells": 0
  },
  "results": {
    "models_trained": [
      "RandomForest",
      "XGBoost", 
      "LogisticRegression"
    ],
    "best_model": "RandomForest",
    "metrics": {
      "accuracy": 0.9876,
      "precision": 0.9823,
      "recall": 0.9901,
      "f1_score": 0.9862
    },
    "dataset": {
      "name": "Kepler",
      "total_samples": 9564,
      "training_samples": 7651,
      "testing_samples": 1913,
      "exoplanets_found": 2341,
      "false_positives": 47
    }
  },
  "artifacts": {
    "models_saved": [
      "static/models/Kepler_RandomForest.pkl",
      "static/models/Kepler_XGBoost.pkl",
      "static/models/Kepler_LogisticRegression.pkl"
    ],
    "plots_generated": [
      "static/plots/Kepler_confusion_matrix.png",
      "static/plots/Kepler_roc_curve.png",
      "static/plots/Kepler_feature_importance.png"
    ],
    "metrics_file": "static/results/Kepler_metrics.json",
    "training_columns_file": "static/results/Kepler_training_columns.json"
  },
  "warnings": [],
  "next_steps": [
    "✅ Models are ready for predictions at /api/predict",
    "📊 View detailed metrics at /api/static/results/Kepler_metrics.json",
    "📈 Access plots in /api/static/plots/ directory"
  ]
}
```

### Partial Success with Warnings (200 OK)

```json
{
  "success": true,
  "message": "Notebook executed with warnings",
  "notebook": "TESS_Exoplanet_Modeling_FlaskReady.ipynb",
  "execution_time": 98.5,
  "timestamp": "2025-10-10T14:35:22Z",
  "summary": {
    "total_cells": 42,
    "executed_cells": 41,
    "skipped_cells": 1,
    "failed_cells": 0
  },
  "results": {
    "models_trained": ["RandomForest", "LogisticRegression"],
    "best_model": "RandomForest",
    "metrics": {
      "accuracy": 0.9654,
      "precision": 0.9543,
      "recall": 0.9721,
      "f1_score": 0.9631
    },
    "dataset": {
      "name": "TESS",
      "total_samples": 5123,
      "training_samples": 4098,
      "testing_samples": 1025
    }
  },
  "warnings": [
    {
      "type": "DataWarning",
      "severity": "low",
      "message": "Some features have missing values (filled with median)",
      "cell_number": 12,
      "suggestion": "Review data quality in the source CSV file"
    },
    {
      "type": "PerformanceWarning", 
      "severity": "medium",
      "message": "High memory usage detected during training (2.3 GB)",
      "cell_number": 28,
      "suggestion": "Consider reducing batch size or using fewer features"
    }
  ],
  "artifacts": {
    "models_saved": [
      "static/models/TESS_RandomForest.pkl",
      "static/models/TESS_LogisticRegression.pkl"
    ],
    "plots_generated": [
      "static/plots/TESS_confusion_matrix.png"
    ]
  },
  "next_steps": [
    "✅ Models are ready for predictions",
    "⚠️ Review 2 warnings in the execution log",
    "📊 Check metrics file for detailed results"
  ]
}
```

### Failure Response (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Execution failed",
  "message": "ModuleNotFoundError: No module named 'xgboost'",
  "notebook": "K2_Exoplanet_Modeling_FlaskReady.ipynb",
  "execution_time": 12.3,
  "timestamp": "2025-10-10T14:40:15Z",
  "summary": {
    "total_cells": 38,
    "executed_cells": 22,
    "failed_cells": 1
  },
  "error_details": {
    "cell_number": 23,
    "cell_type": "code",
    "error_type": "ModuleNotFoundError",
    "error_message": "No module named 'xgboost'",
    "traceback": [
      "Traceback (most recent call last):",
      "  File \"<cell>\", line 1, in <module>",
      "    import xgboost as xgb",
      "ModuleNotFoundError: No module named 'xgboost'"
    ]
  },
  "troubleshooting": [
    "📦 Install missing package: pip install xgboost",
    "✅ Verify all dependencies in requirements.txt are installed",
    "🔧 Check that the correct Python environment is activated",
    "🔄 Try running: pip install -r requirements.txt"
  ],
  "artifacts": {
    "partial_results": null
  }
}
```

### Timeout Response (500 Internal Server Error)

```json
{
  "success": false,
  "error": "Execution timeout",
  "message": "Notebook execution exceeded 300 seconds timeout",
  "notebook": "Kepler_Exoplanet_Modeling_FlaskReady.ipynb",
  "execution_time": 300.0,
  "timestamp": "2025-10-10T14:45:30Z",
  "summary": {
    "total_cells": 45,
    "executed_cells": 28,
    "failed_cells": 0,
    "status": "timeout"
  },
  "troubleshooting": [
    "⏱️ Increase timeout in railway.json (current: 300s)",
    "🔧 Optimize notebook by reducing dataset size",
    "💻 Consider using a more powerful Railway plan",
    "📊 Review cell execution times to identify bottlenecks"
  ],
  "artifacts": {
    "partial_results": "static/results/Kepler_partial_metrics.json"
  }
}
```

---

## 🎨 Frontend Display Examples

### Success Display

```
┌─────────────────────────────────────────────────┐
│ ✅ Execution Successful                         │
├─────────────────────────────────────────────────┤
│ Notebook: Kepler Exoplanet Modeling            │
│ Time: 127.3 seconds                             │
│                                                 │
│ 📊 Results:                                     │
│ • Models Trained: RandomForest, XGBoost, LR     │
│ • Best Model: RandomForest                      │
│ • Accuracy: 98.76%                              │
│ • Dataset: 9,564 samples                        │
│ • Exoplanets Found: 2,341                       │
│                                                 │
│ 💾 Artifacts:                                   │
│ • 3 models saved                                │
│ • 3 plots generated                             │
│ • Metrics exported                              │
│                                                 │
│ Next Steps:                                     │
│ ✅ Models ready for predictions                │
│ 📊 View metrics in results folder              │
└─────────────────────────────────────────────────┘
```

### Warning Display

```
┌─────────────────────────────────────────────────┐
│ ⚠️ Execution Completed with Warnings            │
├─────────────────────────────────────────────────┤
│ Notebook: TESS Exoplanet Modeling              │
│                                                 │
│ ⚠️ Warnings (2):                                │
│ 1. Data Warning (Low)                           │
│    Missing values filled with median            │
│    → Review data quality                        │
│                                                 │
│ 2. Performance Warning (Medium)                 │
│    High memory usage: 2.3 GB                    │
│    → Consider optimizing                        │
│                                                 │
│ ✅ Models still saved successfully              │
└─────────────────────────────────────────────────┘
```

### Error Display

```
┌─────────────────────────────────────────────────┐
│ ❌ Execution Failed                             │
├─────────────────────────────────────────────────┤
│ Error: ModuleNotFoundError                      │
│ Module 'xgboost' not found                      │
│                                                 │
│ Failed at cell 23 of 38                         │
│                                                 │
│ 🔧 Troubleshooting:                             │
│ 1. Install: pip install xgboost                 │
│ 2. Verify requirements.txt dependencies         │
│ 3. Check Python environment activation          │
│                                                 │
│ 📋 View full traceback below                    │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Checklist

### Backend (app.py)

- [ ] Parse notebook output to extract metrics
- [ ] Read saved JSON files (metrics, training columns)
- [ ] Count cells and track execution status
- [ ] Capture warnings from stderr
- [ ] Format timestamps properly
- [ ] Generate user-friendly messages
- [ ] List generated artifacts
- [ ] Provide actionable next steps

### Additional Helper Function

Create `notebook_parser.py` to:
- Extract metrics from notebook output
- Parse error messages
- Count cells
- Read saved artifacts
- Generate summaries

### Frontend (NotebookRun.jsx)

- [x] Display success/warning/error states (already implemented)
- [ ] Show execution summary stats
- [ ] Display model metrics in cards
- [ ] List saved artifacts with links
- [ ] Show warnings in expandable sections
- [ ] Display troubleshooting steps for errors
- [ ] Add download buttons for results

---

## 📊 Key User Benefits

1. **Clear Status**: Immediate understanding of success/failure
2. **Actionable Info**: Know exactly what was produced
3. **Next Steps**: Clear guidance on what to do next
4. **Troubleshooting**: Specific help for errors
5. **Metrics Summary**: Quick view of model performance
6. **Artifact Links**: Direct access to generated files
7. **Progress Tracking**: See what cells executed
8. **Warning Awareness**: Understand potential issues

---

## 🎯 Priority Implementation

**Phase 1 (Essential):**
- ✅ Success/failure status
- ✅ Execution time
- ✅ Error messages with traceback
- ✅ Basic troubleshooting tips

**Phase 2 (Enhanced):**
- Extract metrics from saved JSON files
- List generated artifacts
- Parse notebook cell count
- Add next steps guidance

**Phase 3 (Advanced):**
- Parse warnings from output
- Provide performance metrics
- Generate execution report
- Add artifact preview/download

---

## 💡 Example Usage in Frontend

```javascript
// When successful
if (result.success) {
  showSuccess({
    title: result.message,
    metrics: result.results.metrics,
    artifacts: result.artifacts,
    nextSteps: result.next_steps
  });
}

// When failed
else {
  showError({
    title: result.error,
    message: result.message,
    troubleshooting: result.troubleshooting,
    details: result.error_details
  });
}
```

---

This specification ensures users get **meaningful, actionable information** instead of raw technical output!
