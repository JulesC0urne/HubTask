package com.example.project_service.repositories;

import com.example.project_service.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByOwner(String owner);
    List<Project> findByMembersContaining(String memberEmail);
}
