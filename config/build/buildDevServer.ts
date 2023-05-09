import { BuildOptions } from "./types/config";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buidDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port,
        // Автоматически в браузере открывает окно
        open: true,
        // Позволяет проксировать запросы через корневую старницу (если обновить страницу не на / выдаст ошибку)
        historyApiFallback: true,
        // Обновление приложения без обновления страницы при внесении изменений
        hot: true
    }
}