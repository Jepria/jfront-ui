# jfront-ui
JFront component library

Добавлена первичная функциональность экспорта компонентов из модуля с последующим импортом в другие проекты.

### Installing from github

Using master.
```
npm i https://github.com/Jepria/jfront-ui.git
```
Using branch/tag.
```
npm i https://github.com/Jepria/jfront-ui.git#branch
```

### Использование компонентов из локальной сборки в прикладном проекте:
  
  TODO

### Добавление новых компонентов:
- Написать *ts*, *tsx* код в подходящем файле (например, *src/components/NewComponent.tsx*)
- `jfront-ui>npm run build` —
    *ts* и *tsx* файлы из папки *src* компилируются и попадают в папку *dist*
- Добавить экспорт в файл *index.js* из скомпилированного *js*-файла: 
    ```
    export * from './dist/components/NewComponent.js';
    ```
