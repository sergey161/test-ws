#!/bin/bash

# Функция для вывода сообщения об ошибке и завершения скрипта
error_exit() {
    echo "Ошибка: $1" >&2
    exit 1
}

# Останавливаем и удаляем существующий контейнер, если он есть
echo "Остановка существующего контейнера..."
docker stop user-comments-app 2>/dev/null
docker rm user-comments-app 2>/dev/null

# Собираем новый образ
echo "Сборка образа..."
if ! docker build -t user-comments-app .; then
    error_exit "Сборка образа не удалась"
fi

# Запускаем контейнер
echo "Запуск контейнера..."
if ! docker run -d \
    --name user-comments-app \
    -p 3000:3000 \
    user-comments-app; then
    error_exit "Запуск контейнера не удался"
fi

echo "Приложение успешно запущено и доступно по адресу: http://localhost:3000" 