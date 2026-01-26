# samai_python_dependencies - Technical Schema

> **Technical Truth File** - Exact specifications, no interpretation

---

## Module Identification

```
Technical Name: samai_python_dependencies
Version: 18.0.1.1.0
Category: Technical
License: LGPL-3
Application: False
```

---

## Dependencies

```python
'depends': ['base']

'external_dependencies': {
    'python': [
        # Document Processing
        'markdown',
        'docx',  # python-docx
        'PyPDF2',
        'openpyxl',
        # Web & API
        'requests',
        'httpx',
        'bs4',  # beautifulsoup4
        'lxml',
    ],
}
```

---

## Models

None. This is a utility-only module.

---

## Python API

**File:** `__init__.py`

### Constants

#### PACKAGE_TO_IMPORT
Maps pip package names to Python import names where they differ.

```python
PACKAGE_TO_IMPORT = {
    'python-docx': 'docx',
    'beautifulsoup4': 'bs4',
    'Pillow': 'PIL',
    'PyPDF2': 'PyPDF2',
    'scikit-learn': 'sklearn',
    'opencv-python': 'cv2',
}
```

#### IMPORT_TO_PACKAGE
Reverse mapping of the above.

#### DEPENDENCIES
Complete registry of all SAM AI ecosystem dependencies with metadata.

```python
DEPENDENCIES = {
    'markdown': {
        'package': 'markdown',
        'description': 'Markdown to HTML conversion',
        'category': 'document',
        'required': True,
    },
    'docx': {
        'package': 'python-docx',
        'description': 'Microsoft Word document processing',
        'category': 'document',
        'required': True,
    },
    # ... etc
}
```

**Categories:**
- `document` - Document processing libraries
- `web` - Web and API libraries
- `data` - Data processing (pandas, numpy)
- `ai` - AI/ML libraries (openai, anthropic)

### Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `check_dependency(name)` | str | bool | Check if import name is available |
| `get_missing_dependencies(names=None)` | list/None | list | Get list of missing dependencies |
| `get_dependency_info(name)` | str | dict/None | Get metadata for a dependency |
| `get_package_name(import_name)` | str | str | Convert import name to pip package |
| `get_requirements_txt()` | None | str | Generate requirements.txt content |
| `install_dependency(name, upgrade=False)` | str, bool | bool | Attempt pip install |
| `post_init_check_dependencies(env)` | env | None | Post-init hook |

### Function Details

#### check_dependency(name)
```python
def check_dependency(name):
    """
    Check if a Python dependency is available.
    Uses cached results for performance.

    Args:
        name: The import name (e.g., 'markdown', 'docx', 'bs4')

    Returns:
        bool: True if the dependency can be imported
    """
```

#### get_missing_dependencies(names=None)
```python
def get_missing_dependencies(names=None):
    """
    Get list of missing dependencies.

    Args:
        names: List of import names to check. If None, checks all.

    Returns:
        list: Names of missing dependencies
    """
```

#### install_dependency(name, upgrade=False)
```python
def install_dependency(name, upgrade=False):
    """
    Attempt to install a missing dependency via pip.

    Args:
        name: The import name
        upgrade: Whether to upgrade if already installed

    Returns:
        bool: True if installation succeeded
    """
```

---

## Hooks

### post_init_hook

```python
'post_init_hook': 'post_init_check_dependencies'
```

Called after module installation. Logs:
- Available dependencies
- Missing required dependencies (as warnings with pip install command)
- Missing optional dependencies (as info)

---

## Files

| File | Purpose |
|------|---------|
| `__init__.py` | All utility functions and dependency registry |
| `__manifest__.py` | Module definition and external_dependencies |
| `requirements.txt` | pip-installable file with all dependencies |
| `data/dependency_data.xml` | Placeholder data file |

---

## requirements.txt Content

```
# SAM AI Python Dependencies
# Install all: pip install -r requirements.txt

# Document Processing
markdown>=3.4
python-docx>=0.8.11
PyPDF2>=3.0.0
openpyxl>=3.1.0

# Web & API
requests>=2.28.0
httpx>=0.24.0
beautifulsoup4>=4.11.0
lxml>=4.9.0

# Data Processing (optional)
# pandas>=2.0.0
# numpy>=1.24.0

# AI & Machine Learning (optional)
# openai>=1.0.0
# anthropic>=0.18.0
```

---

## Dependency Categories

### Required (in manifest external_dependencies)
| Import Name | Package Name | Description |
|-------------|--------------|-------------|
| markdown | markdown | Markdown to HTML |
| docx | python-docx | Word documents |
| PyPDF2 | PyPDF2 | PDF handling |
| openpyxl | openpyxl | Excel handling |
| requests | requests | HTTP client |
| httpx | httpx | Async HTTP client |
| bs4 | beautifulsoup4 | HTML parsing |
| lxml | lxml | XML processing |

### Optional (in DEPENDENCIES dict only)
| Import Name | Package Name | Description |
|-------------|--------------|-------------|
| pandas | pandas | Data analysis |
| numpy | numpy | Numerical computing |
| openai | openai | OpenAI API |
| anthropic | anthropic | Claude API |

---

## Usage Examples

### Check Single Dependency
```python
from odoo.addons.samai_python_dependencies import check_dependency

if check_dependency('markdown'):
    import markdown
    html = markdown.markdown('# Hello')
```

### Check Multiple Dependencies
```python
from odoo.addons.samai_python_dependencies import get_missing_dependencies

missing = get_missing_dependencies(['markdown', 'docx', 'requests'])
if not missing:
    # All available, proceed
    pass
else:
    raise ImportError(f"Missing: {missing}")
```

### Get Package Name for pip
```python
from odoo.addons.samai_python_dependencies import get_package_name

# Returns 'python-docx' (what pip needs)
package = get_package_name('docx')
```

### Generate requirements.txt
```python
from odoo.addons.samai_python_dependencies import get_requirements_txt

content = get_requirements_txt()
with open('requirements.txt', 'w') as f:
    f.write(content)
```

---

**Last Updated:** 2025-01-26
**Verified Against:** __manifest__.py, __init__.py, requirements.txt
