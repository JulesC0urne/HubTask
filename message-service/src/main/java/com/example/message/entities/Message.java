package com.example.message.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "message_dt")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String senderEmail;
    private List<String> allowedEmails;
    private String conversationId;

    public Message(){

    }

    // Constructeur
    public Message(String content, String senderEmail, List<String> allowedEmails, String conversationId) {
        this.content = content;
        this.senderEmail = senderEmail;
        this.allowedEmails = allowedEmails;
        this.conversationId = conversationId;
    }

    public Long getId(){
        return id;
    }

    // Getters et setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public List<String> getAllowedEmails() {
        return allowedEmails;
    }

    public void setAllowedEmails(List<String> allowedEmails){
        this.allowedEmails = allowedEmails;
    }

    public String getConversationId(){
        return this.conversationId;
    }

    public void setConversationId(String conversationId){
        this.conversationId = conversationId;
    }
}
