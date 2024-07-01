package com.gotoread.gtr;

import com.gotoread.gtr.services.AuthenticationService;
import com.gotoread.gtr.services.BookService;
import com.gotoread.gtr.tgbot.GoToReadBot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@SpringBootApplication
public class GtrApplication {

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private BookService bookService;

	public static void main(String[] args) {
		SpringApplication.run(GtrApplication.class, args);
	}

	@Bean
	public GoToReadBot goToReadBot() {
		try {
			TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
			GoToReadBot bot = new GoToReadBot(authenticationService, bookService);
			botsApi.registerBot(bot);
			return bot;
		} catch (TelegramApiException e) {
			e.printStackTrace();
			return null;
		}
	}
}
