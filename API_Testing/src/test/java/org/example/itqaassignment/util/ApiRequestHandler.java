package org.example.itqaassignment.util;

import com.microsoft.playwright.APIResponse;
import org.slf4j.Logger;

import java.util.function.Supplier;

public class ApiRequestHandler {

    public static APIResponse handleApiRequest(Supplier<APIResponse> apiCall, String actionDescription, Logger logger) {
        logger.info(actionDescription);
        try {
            APIResponse response = apiCall.get();
            ResponseManager.getInstance().setResponse(response);
            return response;
        } catch (Exception e) {
            logger.error("Error during {}: {}", actionDescription, e.getMessage());
            throw new RuntimeException("Failed to " + actionDescription.toLowerCase(), e);
        }
    }
} 