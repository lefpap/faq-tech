package org.app.faqtech.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.question.QuestionCreateRequest;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.QuestionRepository;
import org.app.faqtech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserService userService;


    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestion(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Question with Id: %d not found!".formatted(id)));
    }

    public List<Question> getQuestionsFromUser(Long userId) {
        return questionRepository.findAllByUserId(userId);
    }


    @Transactional
    public void createQuestion(QuestionCreateRequest request) {
        User user = userService.getUser(request.userId());
        Question question = request.toEntity(user);
        questionRepository.save(question);
    }

    @Transactional
    public void deleteQuestion(Long id) {
        Question question = getQuestion(id);
        questionRepository.delete(question);
    }
}
