package org.app.faqtech.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByUserId(Long userId);

    @Query("SELECT q FROM questions q JOIN q.user u WHERE u.username = :username")
    List<Question> findAllByUserUsername(@Param("username") String username);
}
