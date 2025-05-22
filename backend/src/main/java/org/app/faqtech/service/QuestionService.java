package org.app.faqtech.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.question.QuestionCreateRequest;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final NotificationService notificationService;

    @Value("${app.base-url}")
    private String baseUrl;


    public List<Question> getQuestions() {
        return questionRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
    }

    public Question getQuestion(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Question with Id: %d not found!".formatted(id)));
    }

    public List<Question> getQuestionsFromUser(Long userId) {
        return questionRepository.findAllByUserId(userId, Sort.by(Sort.Order.desc("createdAt")));
    }


    @Transactional
    public void createQuestion(QuestionCreateRequest request) {
        User user = userService.getUser(request.userId());
        Question question = request.toEntity(user);
        questionRepository.save(question);
        
        try {
            String questionUrl = "Find question at: " + baseUrl + "/questions/details/%d".formatted(question.getId());
            notificationService.sendNotification(user.getSimplePushKey(), question.getTitle(), questionUrl);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void deleteQuestion(Long id) {
        Question question = getQuestion(id);
        questionRepository.delete(question);
    }

    public List<Question> getTopQuestions(Integer limit) {

        // Define sorting and pagination
        PageRequest pageRequest = PageRequest.ofSize(limit);

        return questionRepository.findTopQuestions(pageRequest);
    }
}
