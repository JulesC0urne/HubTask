package com.example.task_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.task_service.repository.TaskRepository;
import com.example.task_service.entities.Task;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskService implements UserDetailsService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> getTaskByUserEmail(String userEmail) {
        List<Task> tasks = taskRepository.findByUserMail(userEmail); // Update to use userMail
        if (tasks.isEmpty()) {
            throw new RuntimeException("No tasks found for user with email: " + userEmail);
        }
        return tasks;
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task getTaskByCreateDate(LocalDateTime createDate) {
        return taskRepository.findByCreateDate(createDate);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    // Ajoutez cette méthode dans votre TaskService
    public List<Task> getTaskByProjectId(Long projectId) {
        // Implémentez la logique pour récupérer les tâches associées à un projectId
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }
}
