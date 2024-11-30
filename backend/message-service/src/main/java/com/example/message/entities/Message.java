package com.example.message.entities;

import jakarta.persistence.*;
import java.util.List;

/**
 * Entité représentant un message dans une conversation.
 * Cette classe est mappée sur la table "message_dt" de la base de données.
 * Un message contient du contenu, un expéditeur, une liste d'adresses électroniques autorisées,
 * et l'ID de la conversation à laquelle il appartient.
 * 
 * @author Courné Jules
 * @version 1.0
 */
@Entity
@Table(name = "message_dt")
public class Message {

    /**
     * Déclare le champ id comme identifiant principal de l'entité.
     * La valeur de l'id est générée automatiquement par la base de données
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Déclare le champ content comme contenu du message.
     */
    private String content;

    /**
     * Déclare le champ senderEmail comme l'expéditeur du message.
     */
    private String senderEmail;

    /**
     * Déclare le champ allowedEmails comme la liste des emails qui
     * recevront le message. 
     */
    private List<String> allowedEmails;

    /**
     * Déclare le champ conversationId comme l'id de la conversation
     * à laquelle appartient ce message.
     */
    private String conversationId;

    /**
     * Constructeur par défaut.
     * Nécessaire pour la persistance JPA.
     */
    public Message(){

    }

    /**
     * Constructeur avec paramètres.
     * Utilisé pour créer un message avec des valeurs spécifiées.
     * 
     * @param content Le contenu du message.
     * @param senderEmail L'email de l'expéditeur.
     * @param allowedEmails Liste des emails autorisés à accéder au message.
     * @param conversationId L'ID de la conversation à laquelle le message appartient.
     */

    public Message(String content, String senderEmail, List<String> allowedEmails, String conversationId) {
        this.content = content;
        this.senderEmail = senderEmail;
        this.allowedEmails = allowedEmails;
        this.conversationId = conversationId;
    }

        /**
     * Récupère l'ID du message.
     * 
     * @return l'ID du message
     */
    public Long getId() {
        return id;
    }

    /**
     * Récupère le contenu du message.
     * 
     * @return le contenu du message
     */
    public String getContent() {
        return content;
    }

    /**
     * Définit le contenu du message.
     * 
     * @param content le contenu à définir pour ce message
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Récupère l'email de l'expéditeur du message.
     * 
     * @return l'email de l'expéditeur
     */
    public String getSenderEmail() {
        return senderEmail;
    }

    /**
     * Définit l'email de l'expéditeur du message.
     * 
     * @param senderEmail l'email à définir pour l'expéditeur
     */
    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    /**
     * Récupère la liste des emails autorisés à voir ce message.
     * 
     * @return la liste des emails autorisés
     */
    public List<String> getAllowedEmails() {
        return allowedEmails;
    }

    /**
     * Définit la liste des emails autorisés à voir ce message.
     * 
     * @param allowedEmails la liste des emails à définir comme autorisés
     */
    public void setAllowedEmails(List<String> allowedEmails) {
        this.allowedEmails = allowedEmails;
    }

    /**
     * Récupère l'ID de la conversation à laquelle ce message appartient.
     * 
     * @return l'ID de la conversation
     */
    public String getConversationId() {
        return this.conversationId;
    }

    /**
     * Définit l'ID de la conversation à laquelle ce message appartient.
     * 
     * @param conversationId l'ID de la conversation à définir
     */
    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

}
