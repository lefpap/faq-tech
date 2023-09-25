package org.app.faqtech.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.answer.AnswerCreateRequest;
import org.app.faqtech.entity.Answer;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final UserService userService;
    private final NotificationService notificationService;

    @Value("${app.base-url}")
    private String baseUrl;

    public List<Answer> getAnswers() {
        return answerRepository.findAll();
    }

    public Answer getAnswer(Long id) {
        return answerRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Answer with Id: %d not found".formatted(id)));
    }

    @Transactional
    public Answer createAnswer(AnswerCreateRequest request) {
        User user = userService.getUser(request.userId());
        Question question = questionService.getQuestion(request.questionId());
        Answer answer = request.toEntity(user, question);


        Answer createdAnswer = answerRepository.save(answer);
        
        String answerUrl = baseUrl + "/questions/details/%d#answer-%d".formatted(question.getId(), createdAnswer.getId());
        notificationService.sendNotification(user.getSimplePushKey(), "REPLY:%s".formatted(question.getTitle()), "You can find the answer here: %s".formatted(answerUrl));
        return createdAnswer;
    }

    @Transactional
    public void deleteAnswer(Long id) {
        Answer answer = getAnswer(id);
        answerRepository.delete(answer);
    }
}
