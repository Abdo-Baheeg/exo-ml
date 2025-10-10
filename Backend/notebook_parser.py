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
    
    results = {
        "models_trained": [],
        "metrics": {}
    }
    
    artifacts = {
        "models_saved": [],
        "plots_generated": [],
        "metrics_file": None,
        "training_columns_file": None
    }
    
    # Read metrics if available
    if os.path.exists(metrics_file):
        try:
            with open(metrics_file, 'r') as f:
                metrics_data = json.load(f)
                
                # Extract model names and metrics
                if isinstance(metrics_data, dict):
                    for model_name, model_metrics in metrics_data.items():
                        results["models_trained"].append(model_name)
                        
                        # Store best model metrics
                        if not results["metrics"] or model_metrics.get('accuracy', 0) > results["metrics"].get('accuracy', 0):
                            results["best_model"] = model_name
                            results["metrics"] = {
                                "accuracy": round(model_metrics.get('accuracy', 0) * 100, 2),
                                "precision": round(model_metrics.get('precision', 0) * 100, 2),
                                "recall": round(model_metrics.get('recall', 0) * 100, 2),
                                "f1_score": round(model_metrics.get('f1_score', 0) * 100, 2)
                            }
                
                artifacts["metrics_file"] = metrics_file
        except Exception as e:
            pass  # Metrics file exists but couldn't be read
    
    # Check for training columns file
    if os.path.exists(training_cols_file):
        artifacts["training_columns_file"] = training_cols_file
    
    # Find saved models
    models_dir = os.path.join('static', 'models')
    if os.path.exists(models_dir):
        for file in os.listdir(models_dir):
            if file.startswith(dataset_name) and file.endswith('.pkl'):
                artifacts["models_saved"].append(os.path.join('static', 'models', file))
    
    # Find generated plots
    plots_dir = os.path.join('static', 'plots')
    if os.path.exists(plots_dir):
        for file in os.listdir(plots_dir):
            if file.startswith(dataset_name) and file.endswith('.png'):
                artifacts["plots_generated"].append(os.path.join('static', 'plots', file))
    
    # Generate next steps
    next_steps = []
    if artifacts["models_saved"]:
        next_steps.append(f"✅ {len(artifacts['models_saved'])} model(s) ready for predictions at /api/predict")
    if artifacts["metrics_file"]:
        next_steps.append(f"📊 View detailed metrics at /{metrics_file}")
    if artifacts["plots_generated"]:
        next_steps.append(f"📈 {len(artifacts['plots_generated'])} plot(s) available in /static/plots/")
    
    if not next_steps:
        next_steps.append("✅ Notebook executed successfully")
    
    return {
        "success": True,
        "message": "Notebook executed successfully",
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
