package com.palma.pdam.retrofit.service;

import com.palma.pdam.data.dto.EditPasswordDto;
import com.palma.pdam.data.dto.EditProfileDto;
import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.UserResponse;

import java.util.List;
import java.util.Map;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;

public interface UserService {
    String TEACHER_URL = "/teachers";
    String USER_URL = "/users";

    @GET(TEACHER_URL)
    Call<ResponseContainer<UserResponse>> getAll(@QueryMap Map<String, String> options);

    @GET(TEACHER_URL + "/{id}")
    Call<UserResponse> getOne(@Path("id") String id);

    @GET(TEACHER_URL + "/guard")
    Call<List<UserResponse>> getGuards(@QueryMap Map<String, String> options);

    @GET(USER_URL + "/me")
    Call<UserResponse> getMe();

    @Multipart
    @PUT(USER_URL + "/photo/{id}")
    Call<UserResponse> photo(@Path("id") String id, @Part MultipartBody.Part photo);

    @PUT(USER_URL + "/{id}")
    Call<UserResponse> edit(@Path("id") String id, @Body EditProfileDto data);

    @PUT(USER_URL + "/{id}/password")
    Call<UserResponse> editPassword(@Path("id") String id, @Body EditPasswordDto data);
}
