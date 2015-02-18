## Тестовое задание
- Написать одностраничное веб-приложение с простой системой постов.
- Пост состоит из заголовка (простой input) и тела (textarea);
- Реализовать 3 типа страниц: список постов, редактирование поста, просмотр поста;
- На странице списка должна быть возможность перехода на просмотр, редактирование и удаления поста и строка с фильтром постов по заголовку;
- На странице списка реализовать "бесконечную" прокрутку, т.е. элементы в список должны добавляться по мере скролла;
Хранить данные в localstorage;
- Необходимо реализовать реактивное отображение модели во всех вкладках (localstorage позволяет использовать модель подписки), т.е. изменение данных в одной вкладке должно менять их сразу и у других вкладках;
- Хранение и доступ к данным реализовать через модель с методами доступа и изменения данных;
- Использовать можно любые фреймворки и библиотеки, но постараться больше реализовать самостоятельно. Поощряется использование шаблонизаторов и различных библиотек вроде backbone, knockout, angular, reactjs и так далее. Использование отдельных url для различных страниц тоже является плюсом.



## Программные зависимости
- nodejs+npm

## Зависимости js модулей nodejs
В папке с проектом сделать npm install

## Пояснения по папкам
- app 			- Папка с приложением
- dist		    - Папка с компилированным приложением (обфусцированным, готовым к деплою)
- tasks			- Задания для сборщика Grunt
- Gruntfile.js	- Конфигурация сборщика Grunt
- package.json	- Зависимости для серверного приложения

## Сборка проекта и запуск локального сервера
npm install
- ./bin/deploy server 	- Запуск локального сервера [http://localhost:3021] для отладки app
- grunt build 	- Делает магию Yoman и собирает проект в папку dist