package com.gotoread.gtr.tgbot;

import com.gotoread.gtr.dto.AppUserAuthenticationDto;
import com.gotoread.gtr.dto.AppUserRegistrationDto;
import com.gotoread.gtr.models.Book;
import com.gotoread.gtr.services.AuthenticationService;
import com.gotoread.gtr.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendDocument;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.InputFile;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoToReadBot extends TelegramLongPollingBot {
    private final AuthenticationService authenticationService;
    private final BookService bookService;

    private final Map<String, String> chatIdToUserIdMap = new HashMap<>();
    private final Map<String, Boolean> authenticatedUsers = new HashMap<>();

    @Override
    public String getBotUsername() {
        return "go_to_read_bot"; // Ваше имя пользователя бота
    }

    @Override
    public String getBotToken() {
        return "7388306552:AAFykQ8PBH-W8pZG6_OSOt7vCHca6d70ZRA"; // Ваш токен бота
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            handleTextMessage(update.getMessage());
        }
    }

    private void handleTextMessage(Message message) {
        String chatId = message.getChatId().toString();
        String text = message.getText();

        if (text.startsWith("/register ")) {
            handleRegister(chatId, text);
        } else if (text.startsWith("/login ")) {
            handleLogin(chatId, text);
        } else if (isAuthenticated(chatId)) {
            if (text.startsWith("/get_book ")) {
                String bookTitle = text.substring("/get_book".length()).trim();
                getBook(chatId, bookTitle);
            } else {
                switch (text) {
                    case "/add_book":
                        sendTextMessage(chatId, "Пожалуйста, отправьте файл книги.");
                        break;
                    case "/list_books":
                        listBooks(chatId);
                        break;
                    case "/get_book":
                        sendTextMessage(chatId, "Пожалуйста, укажите название книги.");
                        break;
                    case "/help":
                        sendHelpMessage(chatId);
                        break;
                    default:
                        sendTextMessage(chatId, "Неизвестная команда. Используйте /help для списка доступных команд.");
                        break;
                }
            }
        } else {
            sendTextMessage(chatId, "Пожалуйста, авторизуйтесь, используя команду /login <email> <password>");
        }
    }


    private void handleRegister(String chatId, String text) {
        String[] parts = text.split(" ");
        if (parts.length == 4) {
            String username = parts[1];
            String email = parts[2];
            String password = parts[3];

            AppUserRegistrationDto registrationDto = new AppUserRegistrationDto();
            registrationDto.setUsername(username);
            registrationDto.setEmail(email);
            registrationDto.setPassword(password);

            try {
                authenticationService.register(registrationDto);
                sendTextMessage(chatId, "Регистрация успешна!");
            } catch (Exception e) {
                sendTextMessage(chatId, "Ошибка регистрации: " + e.getMessage());
            }
        } else {
            sendTextMessage(chatId, "Неправильный формат. Используйте: /register <username> <email> <password>");
        }
    }

    private void handleLogin(String chatId, String text) {
        String[] parts = text.split(" ");
        if (parts.length == 3) {
            String email = parts[1];
            String password = parts[2];

            AppUserAuthenticationDto authenticationDto = new AppUserAuthenticationDto();
            authenticationDto.setEmail(email);
            authenticationDto.setPassword(password);

            try {

                authenticatedUsers.put(chatId, true);
                chatIdToUserIdMap.put(chatId, email);  // Сохраняем email вместо userId
                sendTextMessage(chatId, "Авторизация успешна! Ваш email: " + email);
            } catch (Exception e) {
                sendTextMessage(chatId, "Ошибка авторизации: " + e.getMessage());
            }
        } else {
            sendTextMessage(chatId, "Неправильный формат. Используйте: /login <email> <password>");
        }
    }

    private boolean isAuthenticated(String chatId) {
        return authenticatedUsers.getOrDefault(chatId, false);
    }

    private void sendTextMessage(String chatId, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText(text);

        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private void listBooks(String chatId) {
        String email = chatIdToUserIdMap.get(chatId);
        if (email == null) {
            sendTextMessage(chatId, "Ошибка: не найден пользователь.");
            return;
        }

        List<Book> books = bookService.getBooksByUser(email);

        if (books.isEmpty()) {
            sendTextMessage(chatId, "У вас пока нет книг. Ваш email: " + email);
        } else {
            StringBuilder response = new StringBuilder("Список ваших книг (Email: " + email + "):\n");
            for (Book book : books) {
                response.append(book.getTitle()).append("\n");
            }
            sendTextMessage(chatId, response.toString());
        }
    }

    private void getBook(String chatId, String bookTitle) {
        String email = chatIdToUserIdMap.get(chatId);
        if (email == null) {
            sendTextMessage(chatId, "Ошибка: не найден пользователь.");
            return;
        }

        Optional<Book> optionalBook = bookService.getBookByTitleAndUser(bookTitle, email);
        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();
            String fileUrl = book.getFile_url();
            String fullFileUrl = "https://res.cloudinary.com/dg0ibsz9h/raw/upload/v1/gtr/" + fileUrl + ".docx";

            // Логи для проверки
            System.out.println("Отправка ссылки на книгу: " + book.getTitle());
            System.out.println("URL файла: " + fullFileUrl);

            sendTextMessage(chatId, "Вот ссылка на вашу книгу \"" + book.getTitle() + "\": " + fullFileUrl);
        } else {
            sendTextMessage(chatId, "Книга с названием \"" + bookTitle + "\" не найдена.");
        }
    }


    private void sendHelpMessage(String chatId) {
        String helpMessage = "/register Введите никнейм, email и пароль - Зарегистрироваться\n"
                + "/login Введите email и пароль - Войти/Сменить аккаунт\n"
                + "/add_book - Добавить книгу\n"
                + "/list_books - Показать список книг\n"
                + "/get_book Введите наименование книги - Получить книгу\n"
                + "/help - Получить справку";

        sendTextMessage(chatId, helpMessage);
    }
}
