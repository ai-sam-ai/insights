# samai_python_dependencies - Frequently Asked Questions

> **AI-Discoverable FAQ** - Common questions and troubleshooting

---

## General Questions

### What is samai_python_dependencies?
A utility module that provides centralized Python dependency management for the SAM AI ecosystem. It tracks all required packages, handles import name mapping, and provides helper functions.

### What version is this module?
Version 18.0.1.1.0

### What are the dependencies?
Only `base`. The external Python dependencies are what this module manages.

### Why does this module exist?
To solve the "scattered dependencies" problem where every module had its own external_dependencies, leading to confusion and inconsistent installations.

---

## Installation Questions

### How do I install all Python dependencies?
```bash
pip install -r samai_python_dependencies/requirements.txt
```

### What packages are required?
Required (enforced at module install):
- markdown, python-docx, PyPDF2, openpyxl
- requests, httpx, beautifulsoup4, lxml

### What packages are optional?
Not enforced but tracked:
- pandas, numpy (data processing)
- openai, anthropic (AI integrations)

### Can I install just the required packages?
Yes, the manifest's `external_dependencies` only lists required packages. Optional ones are commented out in requirements.txt.

---

## Usage Questions

### How do I use this in my module?
1. Add to your manifest:
```python
'depends': ['samai_python_dependencies']
```

2. Use in your code:
```python
from odoo.addons.samai_python_dependencies import check_dependency

if check_dependency('markdown'):
    import markdown
    # safe to use
```

### How do I check if a package is available?
```python
from odoo.addons.samai_python_dependencies import check_dependency

if check_dependency('pandas'):
    import pandas as pd
    # use pandas
else:
    # fallback behavior
```

### How do I get the pip package name for an import?
```python
from odoo.addons.samai_python_dependencies import get_package_name

# Returns 'python-docx'
package = get_package_name('docx')
```

### How do I get all missing dependencies?
```python
from odoo.addons.samai_python_dependencies import get_missing_dependencies

# Check specific dependencies
missing = get_missing_dependencies(['markdown', 'pandas', 'openai'])

# Check all registered dependencies
all_missing = get_missing_dependencies()
```

---

## Troubleshooting

### "ImportError: No module named 'docx'"
**Cause:** python-docx not installed. Note: the pip package is `python-docx`, not `docx`.
**Solution:** `pip install python-docx`

### "ImportError: No module named 'bs4'"
**Cause:** beautifulsoup4 not installed. Note: pip package is `beautifulsoup4`, import is `bs4`.
**Solution:** `pip install beautifulsoup4`

### Post-init hook shows missing required dependencies
**Cause:** Required packages weren't installed before module installation.
**Solution:** Run `pip install -r requirements.txt` then restart Odoo or reinstall the module.

### check_dependency() returns False but package is installed
**Cause:** Package installed after Odoo started, and result is cached.
**Solution:** Restart Odoo to clear the `_dependency_cache`.

### install_dependency() fails in Docker
**Cause:** Container filesystem is read-only or pip has no write access.
**Solution:** Install dependencies at Docker image build time, not runtime:
```dockerfile
COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
```

### How do I clear the dependency cache?
```python
from odoo.addons.samai_python_dependencies import _dependency_cache
_dependency_cache.clear()
```
Or restart Odoo.

---

## Development Questions

### How do I add a new dependency?
1. Add to `DEPENDENCIES` dict in `__init__.py`:
```python
'new_package': {
    'package': 'new-package-name',
    'description': 'What it does',
    'category': 'category',
    'required': True/False,
}
```

2. If required, add to manifest `external_dependencies`:
```python
'external_dependencies': {
    'python': [
        ...
        'new_package',
    ],
}
```

3. Add to `requirements.txt`:
```
new-package-name>=version  # Description
```

### How do I handle packages with different import names?
Add to `PACKAGE_TO_IMPORT` dict:
```python
PACKAGE_TO_IMPORT = {
    ...
    'pip-name': 'import_name',
}
```

### Can I use install_dependency() in production?
Not recommended. It runs pip at runtime which can fail in containerized environments. Use requirements.txt at build time instead.

### Why separate required vs optional?
Required packages are enforced by Odoo's module installer - it won't install if they're missing. Optional packages are tracked for convenience but don't block installation.

---

## Integration Questions

### Can other modules depend on specific packages through this?
Yes, that's the pattern. Instead of each module declaring `external_dependencies`, they depend on this module which ensures all packages are available.

### Does this work with virtual environments?
Yes, the module uses standard Python imports. As long as packages are installed in the active environment, they'll be found.

### How does the post_init_hook work?
After module installation, it:
1. Checks all registered dependencies
2. Logs available dependencies (info level)
3. Logs missing required dependencies (warning level with pip command)
4. Logs missing optional dependencies (info level)

---

## Security Questions

### Is install_dependency() safe?
It runs `pip install` via subprocess. Only use in controlled environments where pip access is appropriate. Never expose this function to untrusted users.

### Are dependency versions pinned?
requirements.txt includes minimum versions (e.g., `markdown>=3.4`). For strict reproducibility, pin exact versions in your deployment requirements.

---

**Last Updated:** 2025-01-26
**Module Version:** 18.0.1.1.0
