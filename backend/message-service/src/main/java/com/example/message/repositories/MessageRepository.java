package com.example.message.repositories;

import com.example.message.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Interface de repository pour l'entité Message.
 * 
 * Cette interface permet d'interagir avec la base de données pour effectuer des opérations CRUD 
 * sur les messages, en utilisant l'ORM (Object-Relational Mapping) de Spring Data JPA.
 * Elle étend JpaRepository pour bénéficier des méthodes de base pour la gestion des entités Message.
 * 
 * @author Courné Jules
 * @version 1.0
 */
public interface MessageRepository extends JpaRepository<Message, String> {

    /**
     * Récupère la liste des messages d'une conversation donnée, identifiée par son ID.
     * Cette méthode est dérivée d'une convention de nommage Spring Data JPA,
     * où 'findByConversationId' recherche les messages associés à une conversation particulière.
     * 
     * @param conversationId L'ID de la conversation pour laquelle on souhaite récupérer les messages.
     * @return une liste de Message contenant tous les messages associés à la conversation donnée.
     */
    List<Message> findByConversationId(String conversationId);
}
