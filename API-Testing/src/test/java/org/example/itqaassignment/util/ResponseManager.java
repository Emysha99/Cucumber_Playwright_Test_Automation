package org.example.itqaassignment.util;

import com.microsoft.playwright.APIResponse;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseManager {
    private static ResponseManager instance;
    private APIResponse response;

    private ResponseManager() {}

    public static synchronized ResponseManager getInstance() {
        if (instance == null) {
            instance = new ResponseManager();
        }
        return instance;
    }

}