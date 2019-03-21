package com.palma.pdam.retrofit.generator;

import okhttp3.Credentials;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ServiceGenerator {
    private static final String BASE_URL = "https://teachup.herokuapp.com/";
    public static String MASTER_KEY = "0R3GkOXhOd4ttUzOIVKWo757A4OQewzF";


    public static String jwtToken = null;

    private static Retrofit.Builder builder =
            new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create());

    private static Retrofit retrofit = null;
    private static AuthType currentType = null;

    // Interceptor que imprime por el Log todas las peticiones y respuestas
    private static HttpLoggingInterceptor logging =
            new HttpLoggingInterceptor()
                    .setLevel(HttpLoggingInterceptor.Level.BODY);

    private static OkHttpClient.Builder httpClientBuilder =
            new OkHttpClient.Builder();

    public static <S> S createService(Class<S> serviceClass) {
        return createService(serviceClass, null, AuthType.NO_AUTH);
    }

    public static <S> S createService(Class<S> serviceClass, String username, String password) {
        if (!(username.isEmpty() || password.isEmpty())) {
            String credentials = Credentials.basic(username, password);
            return createService(serviceClass, credentials, AuthType.BASIC);
        }
        return createService(serviceClass, null, AuthType.NO_AUTH);
    }


    public static <S> S createService(Class<S> serviceClass, final String authtoken, final AuthType type) {

        httpClientBuilder.interceptors().clear();

        httpClientBuilder.addInterceptor(logging);

        // Adding interceptor with two headers
        httpClientBuilder.addInterceptor(chain -> {
            Request original = chain.request();

            Request request = original.newBuilder()
                    .header("User-Agent", "TeachUp")
                    .header("Accept", "application/json")
                    .method(original.method(), original.body())
                    .build();

            return chain.proceed(request);
        });

        if (type == AuthType.NO_AUTH || type == AuthType.BASIC) {
            // Adding master key interceptor
            httpClientBuilder.addInterceptor(chain -> {
                Request original = chain.request();
                HttpUrl originalUrl = original.url();

                HttpUrl url = originalUrl.newBuilder()
                        .addQueryParameter("access_token", MASTER_KEY)
                        .build();

                Request request = original.newBuilder()
                        .url(url)
                        .build();


                return chain.proceed(request);
            });
        }

        if (authtoken != null) {


            httpClientBuilder.addInterceptor(chain -> {
                Request original = chain.request();

                String token = null;
                if (type == AuthType.JWT && !authtoken.startsWith("Bearer "))
                    token = "Bearer " + authtoken;
                else
                    token = authtoken;


                Request request = original.newBuilder()
                        .header("Authorization", token)
                        .build();

                return chain.proceed(request);
            });
        }

        currentType = type;

        builder.client(httpClientBuilder.build());
        retrofit = builder.build();

        return retrofit.create(serviceClass);
    }
}
