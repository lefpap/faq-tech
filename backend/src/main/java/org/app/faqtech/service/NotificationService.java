package org.app.faqtech.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private static final String SIMPLE_PUSH_URL = "https://api.simplepush.io/send";

    private final RestTemplate restTemplate;
    public void sendNotification(String key, String title, String message, String event) {

        if (key == null || key.isBlank()) {
            // there is no key to send notification
            return;
        }

        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.ALL));

        // Create request body
        var body = new LinkedMultiValueMap<String, String>();
        body.add("key", key);
        body.add("title", title);
        body.add("msg", message);
        if (Objects.nonNull(event)) {
            body.add("event", event);
        }

        // Create the HTTP entity
        var entity = new HttpEntity<>(body, headers);

        // Send the request
        restTemplate.postForEntity(SIMPLE_PUSH_URL, entity, String.class);
    }

    public void sendNotification(String key, String title, String message) {
        this.sendNotification(key, title, message, null);
    }

}
