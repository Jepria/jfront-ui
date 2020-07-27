# jfront-components
JFront component library

Добавлена первичная функциональность экспорта компонентов из модуля с последующим импортом в другие проекты.

### Installing from github

Using master.
```
npm i https://github.com/Jepria/jfront-components.git
```
Using branch/tag.
```
npm i https://github.com/Jepria/jfront-components.git#branch
```

### Использование компонентов из локальной сборки в прикладном проекте:
- `jfront-components>npm run build` —
    *ts* и *tsx* файлы из папки *src* компилируются и попадают в папку *dist*
- `jfront-components>npm link` —
    создаётся [npm-link](https://docs.npmjs.com/cli/link.html) для работы с *jfront-components* как с npm-модулем в другом проекте
- `another-app>npm link jfront-components` —
    *jfront-components* подтягивается в этот проект как npm-модуль (команда `npm install` аннулирует созданный прежде *npm link* в этом проекте, поэтому `npm link front-components` нужно повторно выполнять всякий раз после `npm install`)
- В код проекта добавляем использование компонента из jfront-components (например, src/App.tsx):
    ```
    import { ComboBox, ComboBoxInput, ComboBoxButton } from 'jfront-components';
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
- Добавить экспорт в файл *index.ts* из добавленных исходных файлов: 
    ```
    export * from './src/components/NewComponent.tsx';
    ```
- `jfront-components>npm run build` —
    *ts* и *tsx* файлы из папки *src* компилируются и попадают в папку *dist*
	
### Подключение сторонних библиотек
- Если предполагается, что библиотека не будет повторно использована в коде потребителя, то следует объявить ее в `devDependencies` в `package.json`
- Если возможно, что библиотека будет использована в прикладном коде, то нужно объявить ее в  `devDependencies` и `peerDependencies` в `package.json`и добавить исключение в сборку `webpack` (блок externals):

    ```
    module.exports = {
      ...
      module: {
      ...
      externals: {
        //'имя библиотеки' : 'имя библиотеки'
        'lib-name': 'lib-name',
      },
      ...
    };
    ```