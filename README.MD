# Server-photo

Приложение для работы со своей фотогалерей на сервере. Актуально для фотографий с большим разрешением, высокого качества и т.д. Т.е. для фото большого размера.

## Настройка

В src/backend/config - настроить root-папки
Для prod необходимо создать файл config.production.json

```json
    {
        "folders": {
            "pic": "/home/user/Pictures/",
            "party": "/home/user/pholder/party"
        }
    }
```

## Разработка
```
npm run dev - express server
npm start - webpack dev-server
```

## Build
```
npm run build
npm run prod
```
Приложение доступно на порту 4100

