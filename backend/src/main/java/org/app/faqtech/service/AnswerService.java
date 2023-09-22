package org.app.faqtech.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.app.faqtech.dto.answer.AnswerCreateRequest;
import org.app.faqtech.entity.Answer;
import org.app.faqtech.entity.Question;
import org.app.faqtech.entity.User;
import org.app.faqtech.repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionService questionService;
    private final UserService userService;

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

        return answerRepository.save(answer);
    }

    @Transactional
    public void deleteAnswer(Long id) {
        Answer answer = getAnswer(id);
        answerRepository.delete(answer);
    }
}
