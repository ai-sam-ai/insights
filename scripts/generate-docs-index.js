/**
 * SAM AI Documentation Index Generator
 *
 * Generates index.html for every folder in /docs so AI can browse.
 * - Lists all markdown files with titles
 * - Lists all subfolders
 * - Strips numeric prefixes from display names
 * - Creates navigation breadcrumbs
 */

const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '..', 'docs');
const IGNORED = ['.git', 'node_modules', '_assets', '_archive'];

// Stats tracking
let stats = { folders: 0, files: 0 };

/**
 * Strip numeric prefix (00_, 01_, etc.) from folder/file name
 */
function stripPrefix(name) {
  return name.replace(/^\d+[_-]/, '');
}

/**
 * Convert filename to display title
 * ai_sam_base_META.md → AI Sam Base META
 */
function toDisplayName(name) {
  // Remove .md extension
  const base = name.replace(/\.md$/i, '');
  // Strip prefix
  const stripped = stripPrefix(base);
  // Convert underscores to spaces and capitalize
  return stripped
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Extract title from markdown file (first # heading)
 */
function extractTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^#\s+(.+)$/m);
    if (match) {
      return match[1].trim();
    }
  } catch (e) {
    // Ignore read errors
  }
  return null;
}

/**
 * Get folder metadata from _README.md or first line of description.md
 */
function getFolderDescription(folderPath) {
  const readmePath = path.join(folderPath, '_README.md');
  const descPath = path.join(folderPath, 'description.md');

  for (const p of [readmePath, descPath]) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, 'utf-8');
        // Get first paragraph or heading
        const match = content.match(/^#\s+(.+)$/m) || content.match(/^(.{1,200})/);
        if (match) return match[1].trim();
      } catch (e) {}
    }
  }
  return null;
}

/**
 * Generate breadcrumb HTML
 */
function generateBreadcrumbs(relativePath) {
  const parts = relativePath.split(path.sep).filter(Boolean);
  let breadcrumbs = '<a href="/insights/">Home</a>';
  let currentPath = '/insights/docs';

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    currentPath += '/' + part;
    const displayName = toDisplayName(part);

    if (i === parts.length - 1) {
      breadcrumbs += ` / <span>${displayName}</span>`;
    } else {
      breadcrumbs += ` / <a href="${currentPath}/">${displayName}</a>`;
    }
  }

  return breadcrumbs;
}

/**
 * Categorize files by type (META, SCHEMA, WOW, FAQ, other)
 */
function categorizeFiles(files) {
  const categories = {
    meta: [],
    schema: [],
    wow: [],
    faq: [],
    other: []
  };

  for (const file of files) {
    const upper = file.toUpperCase();
    if (upper.includes('META')) categories.meta.push(file);
    else if (upper.includes('SCHEMA')) categories.schema.push(file);
    else if (upper.includes('WOW')) categories.wow.push(file);
    else if (upper.includes('FAQ')) categories.faq.push(file);
    else categories.other.push(file);
  }

  return categories;
}

/**
 * Generate index.html for a folder
 */
function generateFolderIndex(folderPath, relativePath) {
  const items = fs.readdirSync(folderPath);

  // Separate files and folders
  const subfolders = [];
  const mdFiles = [];

  for (const item of items) {
    if (item === 'index.html' || item.startsWith('.') || IGNORED.includes(item)) continue;

    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      subfolders.push({
        name: item,
        displayName: toDisplayName(item),
        description: getFolderDescription(fullPath)
      });
    } else if (item.endsWith('.md')) {
      const title = extractTitle(fullPath) || toDisplayName(item);
      mdFiles.push({
        name: item,
        title: title
      });
      stats.files++;
    }
  }

  // Sort
  subfolders.sort((a, b) => a.name.localeCompare(b.name));
  mdFiles.sort((a, b) => a.name.localeCompare(b.name));

  // Categorize markdown files
  const categories = categorizeFiles(mdFiles.map(f => f.name));

  // Build folder display name
  const folderName = path.basename(relativePath) || 'Documentation';
  const displayName = toDisplayName(folderName);
  const description = getFolderDescription(folderPath);

  // Generate subfolders HTML
  let subfoldersHtml = '';
  if (subfolders.length > 0) {
    subfoldersHtml = `
    <div class="section">
      <h2>📁 Sections</h2>
      <div class="grid">
        ${subfolders.map(f => `
        <a href="${f.name}/" class="card">
          <strong>${f.displayName}</strong>
          ${f.description ? `<p>${f.description.substring(0, 100)}${f.description.length > 100 ? '...' : ''}</p>` : ''}
        </a>`).join('')}
      </div>
    </div>`;
  }

  // Generate files HTML by category
  let filesHtml = '';

  // Priority order: META first (start here), then SCHEMA, WOW, FAQ, then others
  const orderedCategories = [
    { key: 'meta', icon: '🎯', label: 'Start Here (META)' },
    { key: 'schema', icon: '📐', label: 'Technical (SCHEMA)' },
    { key: 'wow', icon: '✨', label: 'Benefits (WOW)' },
    { key: 'faq', icon: '❓', label: 'FAQ' },
    { key: 'other', icon: '📄', label: 'Documentation' }
  ];

  for (const cat of orderedCategories) {
    const catFiles = mdFiles.filter(f => categories[cat.key].includes(f.name));
    if (catFiles.length > 0) {
      filesHtml += `
      <div class="file-section">
        <h3>${cat.icon} ${cat.label}</h3>
        <ul>
          ${catFiles.map(f => `<li><a href="${f.name}">${f.title}</a></li>`).join('')}
        </ul>
      </div>`;
    }
  }

  if (filesHtml) {
    filesHtml = `<div class="section"><h2>📚 Documentation</h2>${filesHtml}</div>`;
  }

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayName} - SAM AI Documentation</title>
  <meta name="description" content="${description || `Documentation for ${displayName}`}">
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 1rem;
      line-height: 1.6;
      color: #333;
      background: #fafafa;
    }
    h1 {
      color: #1a1a1a;
      border-bottom: 3px solid #667eea;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }
    h2 { color: #444; margin-top: 2rem; }
    h3 { color: #667eea; margin: 1rem 0 0.5rem; }
    .breadcrumbs {
      color: #666;
      margin-bottom: 1rem;
      font-size: 0.9rem;
    }
    .breadcrumbs a { color: #667eea; }
    .description {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1.5rem 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .section h2 { margin-top: 0; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }
    .card {
      display: block;
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 1rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.2s;
    }
    .card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }
    .card strong { color: #333; }
    .card p {
      margin: 0.5rem 0 0;
      font-size: 0.85rem;
      color: #666;
    }
    .file-section { margin: 1rem 0; }
    .file-section ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .file-section li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
    }
    .file-section li:last-child { border-bottom: none; }
    .file-section a {
      color: #0066cc;
      text-decoration: none;
    }
    .file-section a:hover { text-decoration: underline; }
    .stats {
      display: flex;
      gap: 2rem;
      margin: 1rem 0;
      color: #666;
      font-size: 0.9rem;
    }
    .auto-gen {
      background: #e3f2fd;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.85rem;
      margin: 1rem 0;
    }
    footer {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 0.9rem;
    }
    footer a { color: #667eea; }
  </style>
</head>
<body>
  <div class="breadcrumbs">${generateBreadcrumbs(relativePath)}</div>

  <h1>${displayName}</h1>
  ${description ? `<p class="description">${description}</p>` : ''}

  <div class="stats">
    ${subfolders.length > 0 ? `<span>📁 ${subfolders.length} sections</span>` : ''}
    ${mdFiles.length > 0 ? `<span>📄 ${mdFiles.length} documents</span>` : ''}
  </div>

  <div class="auto-gen">
    🤖 <strong>AI-accessible</strong> - This index is auto-generated for AI navigation.
    <a href="/insights/llms.txt">View llms.txt</a>
  </div>

  ${subfoldersHtml}
  ${filesHtml}

  <footer>
    <p>
      <a href="/insights/">← Back to Documentation Home</a> |
      <a href="https://sme.ec/insights">Human-friendly version</a> |
      <a href="https://github.com/ai-sam-ai/insights">GitHub</a>
    </p>
  </footer>
</body>
</html>`;

  const indexPath = path.join(folderPath, 'index.html');
  fs.writeFileSync(indexPath, html);
  stats.folders++;
}

/**
 * Recursively process all folders
 */
function processFolder(folderPath, relativePath = '') {
  // Generate index for this folder
  generateFolderIndex(folderPath, relativePath);

  // Process subfolders
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    if (item.startsWith('.') || IGNORED.includes(item)) continue;

    const fullPath = path.join(folderPath, item);
    if (fs.statSync(fullPath).isDirectory()) {
      processFolder(fullPath, path.join(relativePath, item));
    }
  }
}

// Main execution
console.log('🤖 SAM AI Documentation Index Generator\n');
console.log(`Scanning: ${DOCS_ROOT}\n`);

if (!fs.existsSync(DOCS_ROOT)) {
  console.error('❌ docs folder not found!');
  process.exit(1);
}

processFolder(DOCS_ROOT);

console.log(`\n✅ Generated ${stats.folders} index.html files`);
console.log(`📄 Indexed ${stats.files} markdown documents`);
