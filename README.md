# jfront-ui
JFront component library!

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
- `jfront-ui>npm run build` —
    *ts* и *tsx* файлы из папки *src* компилируются и попадают в папку *dist*
- `jfront-ui>npm link` —
    создаётся [npm-link](https://docs.npmjs.com/cli/link.html) для работы с *jfront-ui* как с npm-модулем в другом проекте
- `another-app>npm link jfront-ui` —
    *jfront-ui* подтягивается в этот проект как npm-модуль (команда `npm install` аннулирует созданный прежде *npm link* в этом проекте, поэтому `npm link front-components` нужно повторно выполнять всякий раз после `npm install`)
- В код проекта добавляем использование компонента из jfront-ui (например, src/App.tsx):
    ```
    import { ComboBox, ComboBoxInput, ComboBoxButton } from 'jfront-ui';
    function App() {
      return (
      	...
        <ComboBox>
          <ComboBoxInput />
          <ComboBoxButton />
        </ComboBox>
        ...
      );
    }
    ```

### Добавление новых компонентов:
- Написать *ts*, *tsx* код в подходящем файле (например, *src/components/NewComponent.tsx*)
- `jfront-ui>npm run build` —
    *ts* и *tsx* файлы из папки *src* компилируются и попадают в папку *dist*
- Добавить экспорт в файл *index.js* из скомпилированного *js*-файла: 
    ```
    export * from './dist/components/NewComponent.js';
    ```
