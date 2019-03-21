package com.palma.pdam.retrofit.service;

import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.ScheduleResponse;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

public interface ScheduleService {
    String BASE_URL = "/schedules";

    @GET(BASE_URL + "/daily")
    Call<ResponseContainer<ScheduleResponse>> getDaily(@QueryMap Map<String, String> options);

    @GET(BASE_URL + "/oneday")
    Call<List<ScheduleResponse>> getOneDay(@QueryMap Map<String, String> options);

}
