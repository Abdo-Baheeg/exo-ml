"""
Notebook Execution Parser
Extracts meaningful information from notebook execution results
"""

import os
import json
import re
from datetime import datetime


def parse_notebook_output(notebook_name, result, execution_start_time):
    """
    Parse notebook execution result and return user-friendly output
    
    Args:
        notebook_name: Name of the executed notebook
        result: subprocess.CompletedProcess result
        execution_start_time: When execution started
        
    Returns:
        dict: Formatted output for API response
    """
    execution_time = (datetime.now() - execution_start_time).total_seconds()
    
    # Determine dataset name from notebook
    dataset_name = notebook_name.replace('_Exoplanet_Modeling_FlaskReady.ipynb', '')
    
    # Check if execution was successful
    if result.returncode == 0:
        return parse_success(notebook_name, dataset_name, execution_time)
    else:
        return parse_failure(notebook_name, result, execution_time)


def parse_success(notebook_name, dataset_name, execution_time):
    """Parse successful notebook execution"""
    
    # Try to load metrics from saved JSON file
    metrics_file = os.path.join('static', 'results', f'{dataset_name}_metrics.json')
    training_cols_file = os.path.join('static', 'results', f'{dataset_name}_training_columns.json')
    medians_file = os.path.join('static', 'results', f'{dataset_name}_feature_medians.json')
    
    results = {
        "models_trained": [],
        "best_model": None,
        "metrics": {}
    }
    
    artifacts = {
        "models": {
            "count": 0,
            "files": []
        },
        "plots": {
            "count": 0,
            "by_type": {
                "confusion_matrices": [],
                "roc_curves": [],
                "feature_importance": [],
                "other": []
            }
        },
        "data_files": {
            "metrics": None,
            "training_columns": None,
            "feature_medians": None,
            "top_features": []
        }
    }
    
    # Read metrics if available
    if os.path.exists(metrics_file):
        try:
            with open(metrics_file, 'r') as f:
                metrics_data = json.load(f)
                
                # Handle both simple dict and nested 'results' structure
                if 'results' in metrics_data:
                    model_metrics = metrics_data['results']
                else:
                    model_metrics = metrics_data
                
                # Extract model names and find best model
                best_accuracy = 0
                for model_name, model_data in model_metrics.items():
                    if isinstance(model_data, dict):
                        results["models_trained"].append(model_name)
                        
                        accuracy = model_data.get('accuracy', 0)
                        if accuracy > best_accuracy:
                            best_accuracy = accuracy
                            results["best_model"] = model_name
                            results["metrics"] = {
                                "accuracy": round(accuracy * 100, 2),
                                "precision": round(model_data.get('precision', 0) * 100, 2),
                                "recall": round(model_data.get('recall', 0) * 100, 2),
                                "f1_score": round(model_data.get('f1', 0) * 100, 2),
                                "auc": round(model_data.get('auc', 0) * 100, 2) if model_data.get('auc') else None
                            }
                
                artifacts["data_files"]["metrics"] = metrics_file.replace('\\', '/')
        except Exception as e:
            print(f"Error reading metrics file: {e}")
    
    # Check for training columns file
    if os.path.exists(training_cols_file):
        artifacts["data_files"]["training_columns"] = training_cols_file.replace('\\', '/')
    
    # Check for medians file
    if os.path.exists(medians_file):
        artifacts["data_files"]["feature_medians"] = medians_file.replace('\\', '/')
    
    # Find top features files
    results_dir = os.path.join('static', 'results')
    if os.path.exists(results_dir):
        for file in os.listdir(results_dir):
            if file.startswith(dataset_name) and 'top_features' in file and file.endswith('.json'):
                artifacts["data_files"]["top_features"].append(os.path.join('static', 'results', file).replace('\\', '/'))
    
    # Find saved models
    models_dir = os.path.join('static', 'models')
    if os.path.exists(models_dir):
        for file in os.listdir(models_dir):
            # Match both "ModelName_pipeline.pkl" and "Dataset_ModelName_pipeline.pkl" patterns
            if file.endswith('_pipeline.pkl'):
                model_path = os.path.join('static', 'models', file).replace('\\', '/')
                artifacts["models"]["files"].append(model_path)
        artifacts["models"]["count"] = len(artifacts["models"]["files"])
    
    # Find generated plots and categorize them
    plots_dir = os.path.join('static', 'plots')
    if os.path.exists(plots_dir):
        for file in os.listdir(plots_dir):
            if file.startswith(dataset_name) and file.endswith('.png'):
                plot_path = os.path.join('static', 'plots', file).replace('\\', '/')
                
                # Categorize plot by type
                if 'confusion' in file.lower():
                    artifacts["plots"]["by_type"]["confusion_matrices"].append(plot_path)
                elif 'roc' in file.lower():
                    artifacts["plots"]["by_type"]["roc_curves"].append(plot_path)
                elif 'topk' in file.lower() or 'feature' in file.lower():
                    artifacts["plots"]["by_type"]["feature_importance"].append(plot_path)
                else:
                    artifacts["plots"]["by_type"]["other"].append(plot_path)
        
        # Calculate total plot count
        artifacts["plots"]["count"] = sum([
            len(plots) for plots in artifacts["plots"]["by_type"].values()
        ])
    
    # Generate comprehensive next steps
    next_steps = []
    
    if artifacts["models"]["count"] > 0:
        next_steps.append(f"✅ {artifacts['models']['count']} trained model(s) ready for predictions")
        next_steps.append(f"🔮 Use /api/predict endpoint with model name: {', '.join(results['models_trained'])}")
    
    if results["best_model"]:
        next_steps.append(f"🏆 Best performing model: {results['best_model']} ({results['metrics']['accuracy']:.1f}% accuracy)")
    
    if artifacts["plots"]["count"] > 0:
        cm_count = len(artifacts["plots"]["by_type"]["confusion_matrices"])
        roc_count = len(artifacts["plots"]["by_type"]["roc_curves"])
        feat_count = len(artifacts["plots"]["by_type"]["feature_importance"])
        
        plots_summary = []
        if cm_count > 0:
            plots_summary.append(f"{cm_count} confusion matrix")
        if roc_count > 0:
            plots_summary.append(f"{roc_count} ROC curve")
        if feat_count > 0:
            plots_summary.append(f"{feat_count} feature importance")
        
        next_steps.append(f"� {artifacts['plots']['count']} visualization(s) generated: {', '.join(plots_summary)}")
    
    if artifacts["data_files"]["metrics"]:
        next_steps.append(f"📈 Detailed metrics available at /{artifacts['data_files']['metrics']}")
    
    if artifacts["data_files"]["training_columns"]:
        next_steps.append(f"🔧 Training configuration saved - ready for production use")
    
    if not next_steps:
        next_steps.append("✅ Notebook executed successfully")
    
    return {
        "success": True,
        "message": f"Successfully trained {len(results['models_trained'])} model(s) for {dataset_name} dataset",
        "notebook": notebook_name,
        "dataset": dataset_name,
        "execution_time": round(execution_time, 1),
        "timestamp": datetime.now().isoformat(),
        "results": results,
        "artifacts": artifacts,
        "warnings": [],
        "next_steps": next_steps
    }


def parse_failure(notebook_name, result, execution_time):
    """Parse failed notebook execution"""
    
    dataset_name = notebook_name.replace('_Exoplanet_Modeling_FlaskReady.ipynb', '')
    error_output = result.stderr if result.stderr else result.stdout
    
    # Try to extract error type and message
    error_type = "ExecutionError"
    error_message = "Notebook execution failed"
    traceback_lines = []
    
    if error_output:
        lines = error_output.split('\n')
        
        # Look for common error patterns
        for i, line in enumerate(lines):
            if 'Error:' in line or 'Exception:' in line:
                error_type = line.split(':')[0].strip()
                error_message = ':'.join(line.split(':')[1:]).strip()
                
                # Get traceback context
                start = max(0, i - 3)
                end = min(len(lines), i + 4)
                traceback_lines = lines[start:end]
                break
            elif 'ModuleNotFoundError' in line or 'ImportError' in line:
                error_type = "ModuleNotFoundError"
                match = re.search(r"No module named '(\w+)'", line)
                if match:
                    module_name = match.group(1)
                    error_message = f"Missing Python package: {module_name}"
                break
    
    # Generate troubleshooting steps
    troubleshooting = []
    
    if "ModuleNotFoundError" in error_type or "ImportError" in error_type:
        troubleshooting = [
            "📦 Install missing packages: pip install -r requirements.txt",
            "🔧 Verify all dependencies are installed",
            "🔄 Restart the backend after installing packages"
        ]
    elif "FileNotFoundError" in error_type:
        troubleshooting = [
            "📁 Verify data files exist in Backend/Notebooks/Data Sources/",
            "✅ Check file paths use os.path.join() for cross-platform compatibility",
            "📂 Ensure all required CSV files are present"
        ]
    elif "MemoryError" in error_type:
        troubleshooting = [
            "💾 Reduce dataset size or use sampling",
            "🔧 Increase available memory (upgrade Railway plan)",
            "📊 Optimize model parameters to reduce memory usage"
        ]
    else:
        troubleshooting = [
            "📝 Review full error traceback below",
            "🔍 Check notebook code for syntax errors",
            "🔄 Try running the notebook locally first",
            "📞 Check Railway logs for more details"
        ]
    
    return {
        "success": False,
        "error": error_type,
        "message": error_message,
        "notebook": notebook_name,
        "dataset": dataset_name,
        "execution_time": round(execution_time, 1),
        "timestamp": datetime.now().isoformat(),
        "error_details": {
            "error_type": error_type,
            "error_message": error_message,
            "traceback": traceback_lines if traceback_lines else [error_output[:500]]
        },
        "troubleshooting": troubleshooting,
        "artifacts": {}
    }


def parse_timeout_error(notebook_name, execution_time, timeout_seconds):
    """Parse timeout error"""
    
    dataset_name = notebook_name.replace('_Exoplanet_Modeling_FlaskReady.ipynb', '')
    
    return {
        "success": False,
        "error": "Execution timeout",
        "message": f"Notebook execution exceeded {timeout_seconds} seconds timeout",
        "notebook": notebook_name,
        "dataset": dataset_name,
        "execution_time": round(execution_time, 1),
        "timestamp": datetime.now().isoformat(),
        "error_details": {
            "error_type": "TimeoutError",
            "error_message": f"Execution time exceeded {timeout_seconds}s limit",
            "timeout_limit": timeout_seconds
        },
        "troubleshooting": [
            f"⏱️ Increase timeout in railway.json (current: {timeout_seconds}s)",
            "🔧 Optimize notebook by reducing dataset size",
            "💻 Consider using a more powerful Railway plan",
            "📊 Review cell execution times to identify bottlenecks",
            "🎯 Consider splitting notebook into smaller chunks"
        ],
        "artifacts": {}
    }
