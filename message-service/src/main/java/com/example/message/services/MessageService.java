package com.example.message.services;

import com.example.message.entities.Message;
import com.example.message.repositories.MessageRepository;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Flux;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    //private final Sinks.Many<Message> messageSink = Sinks.many().multicast().onBackpressureBuffer();
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // Diffuser un message à tous les abonnés
    public void sendMessage(Message message) {
        messageRepository.save(message);
    }

    // Flux pour récupérer tous les messages d'une conversation spécifique
    public List<Message> getMessagesByConvId(String conversationId) {
        return messageRepository.findByConversationId(conversationId);
    }
}
