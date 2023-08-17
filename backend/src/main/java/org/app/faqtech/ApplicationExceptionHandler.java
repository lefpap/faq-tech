package org.app.faqtech;

import jakarta.persistence.EntityNotFoundException;
import org.app.faqtech.exception.UnauthorizedActionException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleEntityNotFound(EntityNotFoundException ex) {
        // This method will be called when an EntityNotFoundException is thrown
        // It will return a 404 Not Found status
        return ex.getMessage();
    }

    @ExceptionHandler(UnauthorizedActionException.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String handleUnauthorizedAction(UnauthorizedActionException ex) {
        // This method will be called when an UnauthorizedActionException is thrown
        // It will return a 403 Forbidden status
        return ex.getMessage();
    }
}
