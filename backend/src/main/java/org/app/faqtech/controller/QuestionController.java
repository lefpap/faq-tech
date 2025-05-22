package org.app.faqtech.controller;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.question.QuestionCreateRequest;
import org.app.faqtech.dto.question.QuestionResponse;
import org.app.faqtech.dto.question.QuestionWithAnswersResponse;
import org.app.faqtech.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
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

    @GetMapping("/top/{limit}")
    public List<QuestionResponse> getTopQuestions(@PathVariable("limit") Integer limit) {
        return QuestionResponse.fromEntities(questionService.getTopQuestions(limit));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(value = "hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public void createQuestion(@RequestBody QuestionCreateRequest request) {
        questionService.createQuestion(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize(value = "hasRole('ADMIN')")
    public void deleteQuestion(@PathVariable("id") Long id) {
        questionService.deleteQuestion(id);
    }
}