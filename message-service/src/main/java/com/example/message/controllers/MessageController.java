package com.example.message.controllers;
import com.example.message.entities.Message;
import com.example.message.services.MessageService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final Sinks.Many<Map<String, Object>> messageSink;

    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
        this.messageSink = Sinks.many().multicast().onBackpressureBuffer();
    }

    /**
     * Endpoint pour récupérer les mises à jour des messages d'une conversation spécifique.
     * Utilise Server-Sent Events (SSE) pour envoyer un flux de messages en temps réel.
     *
     * @param conversationId l'ID de la conversation pour laquelle les messages sont envoyés
     * @return un flux des notifications de messages pour cette conversation
     */
    @GetMapping(value = "/stream/{conversationId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Map<String, Object>> getMessageUpdates() {
        return messageSink.asFlux(); // Retourner le flux des notifications
    }

    /**
     * Endpoint pour récupérer les messages d'une conversation spécifique.
     * 
     * @param id l'ID de la conversation
     * @return une réponse contenant la liste des messages de la conversation
     */
    @GetMapping("/{id}")
    public ResponseEntity<List<Message>> getMessagesByConvId(@PathVariable String id) {
        List<Message> message = messageService.getMessagesByConvId(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * Endpoint pour envoyer un message à une conversation.
     * 
     * @param message le message à envoyer, envoyé dans le corps de la requête
     * @return une réponse indiquant si l'envoi du message a réussi ou échoué
     */
    @PostMapping
    public String sendMessage(@RequestBody Message message) {
        // Sauvegarder le message dans la base de données
        try {
            messageService.sendMessage(message);
            messageSink.tryEmitNext(Map.of("type", "MESSAGE_RECEIVED", "message", message));
            return "Message sent";
        } catch (Exception e) {
            return "Error saving message: " + e.getMessage();
        }
    }
}
