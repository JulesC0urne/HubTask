package com.example.task_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.task_service.entities.Task;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByCreateDate(LocalDateTime createDate);
    List<Task> findByUserMail(String userEmail);
    List<Task> findByProjectId(Long id);
}
