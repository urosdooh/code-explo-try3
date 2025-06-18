// ВЕРСИЯ 9: Читает настройки из глобального файла file-explorer.config.json

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import dagre from "dagre";

// --- Конфигурация путей ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..", ".."); // Определяем корневую директорию проекта

// Загружаем глобальную конфигурацию из корня проекта
const configPath = path.join(rootDir, "config.json");
let config;
try {
  const globalConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  config = globalConfig.analyzer; // Используем только секцию "analyzer"
  if (!config) {
    throw new Error('Секция "analyzer" не найдена в конфигурационном файле.');
  }
} catch (error) {
  console.error(
    "Ошибка: не удалось прочитать или найти настройки анализатора в file-explorer.config.json.",
    error
  );
  process.exit(1);
}

// Определяем пути на основе загруженной конфигурации
const projectPath = path.resolve(rootDir, config.projectToAnalyze);
const outputPath = path.resolve(rootDir, config.graphDataOutput);
const dataDir = path.dirname(outputPath);

// --- Функции-помощники (без изменений) ---

function walkSync(dir) {
  let fileList = [];
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        fileList = fileList.concat(walkSync(filePath));
      } else if ([".ts", ".tsx"].includes(path.extname(file))) {
        fileList.push(filePath);
      }
    });
  } catch (error) {
    console.error(`Ошибка чтения директории ${dir}:`, error);
  }
  return fileList;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const exports = [];
  const imports = [];
  try {
    const ast = parser.parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    traverse.default(ast, {
      ExportNamedDeclaration(path) {
        if (path.node.declaration) {
          const d = path.node.declaration;
          if (d.declarations)
            d.declarations.forEach((decl) =>
              exports.push({ name: decl.id.name, type: "named" })
            );
          else if (d.id) exports.push({ name: d.id.name, type: "named" });
        }
      },
      ExportDefaultDeclaration(path) {
        exports.push({
          name: path.node.declaration.id
            ? path.node.declaration.id.name
            : "default",
          type: "default",
        });
      },
      ImportDeclaration(path) {
        imports.push({
          source: path.node.source.value,
          specifiers: path.node.specifiers.map((s) => ({
            local: s.local.name,
            imported:
              s.type === "ImportSpecifier" ? s.imported.name : "default",
          })),
        });
      },
    });
  } catch (error) {
    console.error(`\nОшибка парсинга файла: ${filePath}`, error.message);
  }
  return { exports, imports };
}

function resolveImportPath(importerPath, importSource) {
  const extensions = [".ts", ".tsx", "/index.ts", "/index.tsx"];
  if (path.extname(importSource))
    return path.resolve(path.dirname(importerPath), importSource);
  for (const ext of extensions) {
    const fullPath = path.resolve(
      path.dirname(importerPath),
      importSource + ext
    );
    if (fs.existsSync(fullPath)) return fullPath;
  }
  return null;
}

// --- Основная логика (без изменений) ---

function main() {
  console.log(`Начинаем анализ проекта по пути: ${projectPath}`);
  const allFiles = walkSync(projectPath);
  const nodes = [];
  const edges = [];
  const fileAnalysisResults = new Map();
  const externalLibraries = new Set();

  for (const filePath of allFiles) {
    const analysis = analyzeFile(filePath);
    fileAnalysisResults.set(filePath, analysis);
    analysis.imports.forEach((imp) => {
      if (!imp.source.startsWith(".")) externalLibraries.add(imp.source);
    });
  }

  for (const [filePath, { exports }] of fileAnalysisResults.entries()) {
    const fileId = path.relative(projectPath, filePath).replace(/\\/g, "/");
    nodes.push({
      id: fileId,
      type: "file",
      position: { x: 0, y: 0 },
      data: { label: path.basename(fileId), type: "file", fullPath: fileId },
    });
    exports.forEach((exp) => {
      const exportId = `${fileId}::${exp.name}`;
      nodes.push({
        id: exportId,
        type: "member",
        position: { x: 0, y: 0 },
        data: { label: exp.name, type: "member", fullPath: exportId },
      });
      edges.push({
        id: `e-defines-${fileId}-to-${exportId}`.replace(/\//g, "-"),
        source: fileId,
        target: exportId,
        type: "definedIn",
      });
    });
  }

  externalLibraries.forEach((libName) => {
    nodes.push({
      id: libName,
      type: "library",
      position: { x: 0, y: 0 },
      data: { label: libName, type: "library", fullPath: libName },
    });
  });

  for (const [importerPath, { imports }] of fileAnalysisResults.entries()) {
    const importerId = path
      .relative(projectPath, importerPath)
      .replace(/\\/g, "/");
    for (const imp of imports) {
      if (imp.source.startsWith(".")) {
        const targetFilePath = resolveImportPath(importerPath, imp.source);
        if (!targetFilePath) continue;
        const targetFileId = path
          .relative(projectPath, targetFilePath)
          .replace(/\\/g, "/");
        imp.specifiers.forEach((spec) => {
          const sourceExportId = `${targetFileId}::${spec.imported}`;
          if (nodes.some((n) => n.id === sourceExportId)) {
            edges.push({
              id: `e-imports-${sourceExportId}-to-${importerId}`.replace(
                /\//g,
                "-"
              ),
              source: sourceExportId,
              target: importerId,
              type: "imports",
            });
          }
        });
      } else {
        const libraryName = imp.source;
        if (nodes.some((n) => n.id === libraryName)) {
          edges.push({
            id: `e-lib-imports-${libraryName}-to-${importerId}`.replace(
              /\//g,
              "-"
            ),
            source: libraryName,
            target: importerId,
            type: "imports",
          });
        }
      }
    }
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 70, ranksep: 50 });
  const nodeWidth = 220,
    nodeHeight = 70;
  nodes.forEach((node) =>
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  );
  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
  dagre.layout(dagreGraph);
  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    if (nodeWithPosition)
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
  });

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify({ nodes, edges }, null, 2));
  console.log(`\nАнализ завершен! Данные сохранены в ${outputPath}`);
  console.log(`Найдено узлов: ${nodes.length}, связей: ${edges.length}`);
}

main();
