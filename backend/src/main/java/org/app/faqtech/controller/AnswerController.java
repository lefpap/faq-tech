package org.app.faqtech.controller;

import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.answer.AnswerCreateRequest;
import org.app.faqtech.dto.answer.AnswerResponse;
import org.app.faqtech.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/answers")
@RequiredArgsConstructor
@CrossOrigin
public class AnswerController {

    private final AnswerService answerService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AnswerResponse> getAnswers() {
        return AnswerResponse.fromEntities(answerService.getAnswers());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AnswerResponse getAnswer(@PathVariable("id") Long id) {
        return AnswerResponse.fromEntity(answerService.getAnswer(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createAnswer(@RequestBody AnswerCreateRequest request) {
        return answerService.createAnswer(request).getId();
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAnswer(@PathVariable("id") Long id) {
        answerService.deleteAnswer(id);
    }
}
