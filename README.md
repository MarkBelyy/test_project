# test_project

В проекте использовались Node.js, Express.js, MongoDB, EJS и др.
На главной странице реализована функция поиска с обращением в БД, возможность изменять статус работы прибора и уведомлений(просто сохраняется состояние в БД).
При нажаатии на прибор в окне поиска или в списке любимых происходит переход на страницу аналитики. На ней так же доступно изменение статуса, кроме того есть
есть возможность добавить/удалить прибор из любимых нажатием на кнопку лайка. В зависимости от выбранного периода времени (можно менять как с помощью кнопок
так и с помощью input), в таблице отображаются записи об использовании прибора (загружаются из БД). Есть возможность скачать таблицу в формате PDF. При попытке
перейти по неверному URl или другой ошибке происходит переход на страницу ошибки на которой есть навигация для возврата на главную страницу или страницу
аналитики.