src/
├── components/
│ ├── FileGraph/
│ │ ├── index.tsx
│ │ └── styles.ts
│ └── GraphNode/
│ ├── index.tsx
│ ├── styles.ts
│ └── types.ts
├── styles/
│ └── GlobalStyles.ts
└── App.tsx

А ──► 1
^ ├───► B
| └───► C
└3<─────│


доделать поле с клетками
исключить перекрытие элементов друг другом
сделать элементы адаптируемыми под размер сетки (мин/макс width height в % от gridsize + адаптация текста)
создавать доп "клетки" - места для элементов в поле
возможность добавлять flow эффект элементам
возможность расширение поля одним ползунком
добавить возможность создавать Элементы-заметки, в которых можно писать прямо так (наверное нужна какая-то библиотека)
добавить возможность создавать элемент-холст (наверное нужна какая-то библиотека)
добавить меню настроек
Добавить чтение файлов и зависимостей проекта в реальном времени, чтобы не нужно было запускать сканер-анализатор после каждого изменения в обозреваемом проекте
