package org.app.faqtech.controller;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.question.QuestionCreateRequest;
import org.app.faqtech.dto.question.QuestionResponse;
import org.app.faqtech.dto.question.QuestionWithAnswersResponse;
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
        return QuestionResponse.fromEntities(questionService.getQuestions());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public QuestionWithAnswersResponse getQuestion(@PathVariable("id") Long id) {
        return QuestionWithAnswersResponse.fromEntity(questionService.getQuestion(id));
    }

    @GetMapping("/user/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<QuestionResponse> getQuestionsFromUser(@PathVariable Long id) {
        return QuestionResponse.fromEntities(questionService.getQuestionsFromUser(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createQuestion(@RequestBody QuestionCreateRequest request) {
        questionService.createQuestion(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteQuestion(@PathVariable("id") Long id) {
        questionService.deleteQuestion(id);
    }
}