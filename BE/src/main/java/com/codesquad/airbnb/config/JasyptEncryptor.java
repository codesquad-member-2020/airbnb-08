package com.codesquad.airbnb.config;

import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.jasypt.salt.StringFixedSaltGenerator;

import java.util.Scanner;

public class JasyptEncryptor {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String password = System.getenv("JASYPT_PASSWORD");

        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword(password); // 암호화에 사용할 키
        config.setAlgorithm("PBEWithMD5AndDES"); //사용할 알고리즘
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setSaltGenerator(new StringFixedSaltGenerator("FixedSalt"));
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        while(true) {
            System.out.println("암호화를 그만하려면 x를 입력해주세요!");

            String str = sc.nextLine();

            if(str.equals("x")) {
                break;
            }

            String encStr = encryptor.encrypt(str);
            String decStr = encryptor.decrypt(encStr);

            System.out.println("str = " + str);
            System.out.println("encStr = " + encStr);
            System.out.println("decStr = " + decStr);
        }
    }
}