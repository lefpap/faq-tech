package org.app.faqtech.controller;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.question.QuestionResponse;
import org.app.faqtech.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
@CrossOrigin
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<QuestionResponse> getQuestions() {
        return QuestionResponse.fromQuestions(questionService.getAllQuestions());
    }

    @GetMapping("/user/{id}")
    public List<QuestionResponse> getAllQuestionsFromUser(@PathVariable Long id) {
        return QuestionResponse.fromQuestions(questionService.getAllQuestionsFromUser(id));
    }
}