Для настройки автофикса в текущем файле (ctrl + S)

в паллете (ctrl + sft + P) найти settings ( выбрать юзера или рабочего пространства )

вставить 

"stylelint.config": null,
"stylelint.enable": true,
"css.validate": false,
"scss.validate": false,
"stylelint.validate": [
    "css",
    "less",
    "postcss",
    "scss"
],
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
],
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true,
},