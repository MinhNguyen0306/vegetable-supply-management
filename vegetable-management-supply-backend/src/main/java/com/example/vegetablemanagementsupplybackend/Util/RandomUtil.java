package com.example.vegetablemanagementsupplybackend.Util;

import java.util.Random;

public class RandomUtil {
    final String lexicon = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345674890";

    public String randomMartName() {
        Random rand = new Random();
        StringBuilder builder = new StringBuilder();
        builder.append("mart_");
        int length = rand.nextInt(5)+5;
        for(int i = 0; i < length; i++) {
            builder.append(lexicon.charAt(rand.nextInt(lexicon.length())));
        }
        return builder.toString();
    }
    
    public String randomProviderName() {
        Random rand = new Random();
        StringBuilder builder = new StringBuilder();
        builder.append("provider_");
        int length = rand.nextInt(5)+5;
        for(int i = 0; i < length; i++) {
            builder.append(lexicon.charAt(rand.nextInt(lexicon.length())));
        }
        return builder.toString();
    }
}
