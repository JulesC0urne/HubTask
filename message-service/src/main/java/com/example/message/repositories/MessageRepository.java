package com.example.message.repositories;

import com.example.message.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {
    // Méthode pour récupérer les messages d'une conversation donnée
    List<Message> findByConversationId(String conversationId);
}
