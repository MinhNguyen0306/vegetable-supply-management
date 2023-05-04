package com.example.vegetablemanagementsupplybackend.Util;

import java.util.Optional;

public class FileUtil {
    public static Optional<String> getExtensionByStringHandling(String fileName) {
        return Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1));
    }
}
