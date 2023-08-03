package org.app.faqtech.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;


    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getAllQuestionsFromUser(Long userId) {
        return questionRepository.findAllByUserId(userId);
    }

    public List<Question> getAllQuestionsFromUser(String username) {
        return questionRepository.findAllByUserUsername(username);
    }
}
