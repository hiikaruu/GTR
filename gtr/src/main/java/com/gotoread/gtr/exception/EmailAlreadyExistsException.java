package com.gotoread.gtr.exception;

public class EmailAlreadyExistsException extends  RuntimeException{
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
