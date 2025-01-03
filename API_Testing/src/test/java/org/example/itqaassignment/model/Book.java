package org.example.itqaassignment.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Book {
    private String id;
    private String title;
    private String author;
    
    public static Book fromMap(Map<String, String> map) {
        return Book.builder()
                .id(map.get("id"))
                .title(map.get("title"))
                .author(map.get("author"))
                .build();
    }

    public Map<String, String> toMap() {
        Map<String, String> map = new HashMap<>();
        if (id != null) map.put("id", id);
        map.put("title", title);
        map.put("author", author);
        return map;
    }
} 