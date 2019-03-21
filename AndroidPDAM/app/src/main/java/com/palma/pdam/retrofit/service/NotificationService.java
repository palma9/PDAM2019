package com.palma.pdam.retrofit.service;

import com.palma.pdam.data.dto.NewAbsenceDto;
import com.palma.pdam.data.dto.NewTeacherDto;
import com.palma.pdam.data.model.Substitution;
import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.SubstitutionResponse;
import com.palma.pdam.data.response.UpdateSubstitutionResponse;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;

public interface NotificationService {
    String BASE_URL = "/substitutions";

    @GET(BASE_URL)
    Call<ResponseContainer<SubstitutionResponse>> getAllMines(@QueryMap Map<String, String> options);

    @GET(BASE_URL + "/all")
    Call<ResponseContainer<SubstitutionResponse>> GetAll(@QueryMap Map<String, String> options);

    @GET(BASE_URL + "/empty")
    Call<ResponseContainer<SubstitutionResponse>> getEmpties(@QueryMap Map<String, String> options);

    @PUT(BASE_URL + "/setguardteacher/{id}")
    Call <UpdateSubstitutionResponse> setGuardTeacher(@Path("id") String id, @Body NewTeacherDto teacher);

    @POST(BASE_URL + "/absence")
    Call<ResponseContainer<Substitution>> createAbsence(@Body NewAbsenceDto data);
}
