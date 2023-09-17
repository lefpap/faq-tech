package org.app.faqtech.controller;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.entity.Question;
import org.app.faqtech.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Question> getQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/user/{id}")
    public List<Question> getAllQuestionsFromUser(@PathVariable Long id) {
        return questionService.getAllQuestionsFromUser(id);
    }
}