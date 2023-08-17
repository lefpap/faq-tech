package org.app.faqtech.service;

import org.app.faqtech.entity.Question;
import org.app.faqtech.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
