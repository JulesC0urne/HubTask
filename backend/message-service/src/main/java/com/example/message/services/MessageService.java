package com.example.message.services;

import com.example.message.entities.Message;
import com.example.message.repositories.MessageRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service de gestion des messages.
 * 
 * Cette classe contient la logique métier pour l'envoi et la récupération des messages.
 * Elle interagit directement avec le repository `MessageRepository` pour effectuer les 
 * opérations CRUD (création, lecture) sur les messages stockés en base de données.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Service
public class MessageService {

    /**
     * Le repository utilisé pour interagir avec la base de données des messages.
     * Ce composant est responsable des opérations CRUD sur les entités `Message`.
     */
    private final MessageRepository messageRepository;

    /**
     * Constructeur de la classe `MessageService`.
     * 
     * @param messageRepository Le repository utilisé pour interagir avec la base de données des messages.
     */
    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    /**
     * Envoie un message et le sauvegarde en base de données.
     * 
     * Cette méthode appelle le repository pour sauvegarder un message dans la base de données.
     * 
     * @param message Le message à envoyer et à sauvegarder dans la base de données.
     */
    public void sendMessage(Message message) {
        messageRepository.save(message);  
    }

    /**
     * Récupère tous les messages d'une conversation spécifique.
     * 
     * Cette méthode utilise le repository pour récupérer la liste des messages associés à 
     * une conversation identifiée par son ID.
     * 
     * @param conversationId L'ID de la conversation pour laquelle les messages sont récupérés.
     * @return Une liste de messages associés à la conversation spécifiée.
     */
    public List<Message> getMessagesByConvId(String conversationId) {
        return messageRepository.findByConversationId(conversationId); 
    }
}
