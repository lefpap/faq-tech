INSERT INTO users (firstname, lastname, username, password, email, role, active) VALUES
('Lefteris', 'Papaioannou', 'lefpap', '$2a$10$BUxi1A6PxQCDn79fTB4qsO7yvn3SoSHhmEcS8RILypqKhJjLfnzy2', 'lefpap@test.com', 'ADMIN', true),
('John', 'Doe', 'johndoe', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'johndoe@example.com', 'USER', true),
('Jane', 'Smith', 'janesmith', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'janesmith@example.com', 'USER', true),
('Alice', 'Johnson', 'alicej', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'alicej@example.com', 'USER', true),
('Bob', 'Williams', 'bobw', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'bobw@example.com', 'USER', true),
('Charlie', 'Brown', 'charlieb', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'charlieb@example.com', 'USER', true),
('David', 'Davis', 'davidd', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'davidd@example.com', 'USER', true),
('Emily', 'Evans', 'emilye', 'pass133', 'emilye@example.com', 'USER', true),
('Frank', 'Franklin', 'frankf', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'frankf@example.com', 'USER', true),
('Grace', 'Green', 'graceg', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'graceg@example.com', 'USER', true),
('Harry', 'Harrison', 'harryh', '$2a$10$tQallNTGFQcFqvIz0coMgui5241.fvKM0G0TGbEiN1QxH1/.7Vkza', 'harryh@example.com', 'USER', true);


INSERT INTO questions (title, text, created_at, user_id) VALUES
('How to use Spring Boot?', 'I am new to Spring Boot and want to learn how to use it. Can anyone help?', '2023-01-01', (SELECT id FROM users WHERE username = 'lefpap')),
('What is JPA?', 'I heard about JPA in a Java course. Can anyone explain what it is?', '2023-01-02', (SELECT id FROM users WHERE username = 'janesmith')),
('How to create a React app?', 'I want to create a new React app. What are the steps?', '2023-01-03', (SELECT id FROM users WHERE username = 'janesmith')),
('What is Docker?', 'I heard about Docker in a DevOps course. Can anyone explain what it is?', '2023-01-04', (SELECT id FROM users WHERE username = 'johndoe')),
('How to use Python for data analysis?', 'I want to use Python for data analysis. What libraries should I use?', '2023-01-05', (SELECT id FROM users WHERE username = 'johndoe')),
('What is machine learning?', 'I heard about machine learning in a data science course. Can anyone explain what it is?', '2023-01-06', (SELECT id FROM users WHERE username = 'bobw')),
('How to create a Vue.js app?', 'I want to create a new Vue.js app. What are the steps?', '2023-01-07', (SELECT id FROM users WHERE username = 'harryh')),
('What is Kubernetes?', 'I heard about Kubernetes in a DevOps course. Can anyone explain what it is?', '2023-01-08', (SELECT id FROM users WHERE username = 'davidd')),
('How to use R for data analysis?', 'I want to use R for data analysis. What libraries should I use?', '2023-01-09', (SELECT id FROM users WHERE username = 'harryh')),
('What is deep learning?', 'I heard about deep learning in a data science course. Can anyone explain what it is?', '2023-01-10', (SELECT id FROM users WHERE username = 'davidd'));


INSERT INTO answers (text, created_at, user_id, question_id) VALUES
('Spring Boot is a framework that simplifies the setup of Spring applications.', '2023-01-02', 2, 1),
('JPA stands for Java Persistence API. It is a specification for accessing, persisting, and managing data between Java objects and a relational database.', '2023-01-03', 1, 2),
('You can create a new React app using the Create React App command line tool.', '2023-01-04', 4, 3),
('Docker is a platform that allows you to automate the deployment, scaling, and management of applications using containerization.', '2023-01-05', 5, 4),
('For data analysis in Python, you can use libraries like pandas, numpy, and matplotlib.', '2023-01-06', 6, 5),
('Machine learning is a field of artificial intelligence that uses statistical techniques to give computer systems the ability to learn from data.', '2023-01-07', 7, 6),
('You can create a new Vue.js app using the Vue CLI command line tool.', '2023-01-08', 8, 7),
('Kubernetes is an open-source platform designed to automate deploying, scaling, and operating application containers.', '2023-01-09', 9, 8),
('For data analysis in R, you can use libraries like dplyr, ggplot2, and tidyr.', '2023-01-10', 10, 9),
('Deep learning is a subset of machine learning that uses neural networks with many layers (hence "deep") to model and understand complex patterns.', '2023-01-11', 1, 10);




