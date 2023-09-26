package org.app.faqtech.repository;

import org.app.faqtech.entity.Question;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>{
    List<Question> findAllByUserId(Long userId);
    List<Question> findAllByUserId(Long userId, Sort sort);

    @Query("SELECT q FROM questions q LEFT JOIN q.answers a GROUP BY q ORDER BY COUNT(a) DESC, q.createdAt DESC")
    List<Question> findTopQuestions(Pageable pageable);
}
