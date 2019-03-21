package com.palma.pdam.ui.teachers.oneTeacher;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CalendarView;
import android.widget.Spinner;
import android.widget.Toast;

import com.palma.pdam.R;
import com.palma.pdam.data.dto.NewAbsenceDto;
import com.palma.pdam.data.model.Substitution;
import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.ScheduleResponse;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.NotificationService;
import com.palma.pdam.retrofit.service.ScheduleService;
import com.palma.pdam.util.UtilToken;

import org.joda.time.LocalDate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.DialogFragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AbsenceDialogFragment extends DialogFragment {

    private Context ctx;
    private View v;
    private List<ScheduleResponse> items;
    private Map<String, String> queryMap;
    private Spinner spinner_guards;
    private LocalDate date;

    @SuppressLint("InflateParams")
    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        ctx = getContext();
        v = Objects.requireNonNull(getActivity()).getLayoutInflater().inflate(R.layout.fragment_dialog_absence, null);
        UserResponse user = (UserResponse) Objects.requireNonNull(getArguments()).getSerializable("loggedUser");
        queryMap = new HashMap<>();
        queryMap.put("teacher", Objects.requireNonNull(user).getId());
        spinner_guards = v.findViewById(R.id.spinner_guards);
        setFirstDate();
        onSubmit();
        onPickDate();
        return new AlertDialog.Builder(ctx).setTitle(R.string.createAbsence).setView(v).create();
    }

    private void setFirstDate() {
        date = new LocalDate();
        queryMap.put("date", date.toString());
        queryMap.put("weekday", String.valueOf(date.getDayOfWeek()));
        getDataRest();
    }

    private void onPickDate() {
        CalendarView cv_date_picker = v.findViewById(R.id.cv_date_picker);
        cv_date_picker.setOnDateChangeListener((view, year, month, dayOfMonth) -> {
            date = new LocalDate(year + "-" + (month+1) + "-" + dayOfMonth);
            queryMap.put("date", date.toString());
            queryMap.put("weekday", String.valueOf(date.getDayOfWeek()));
            getDataRest();
        });
    }

    private void getDataRest() {
        items = new ArrayList<>();
        ScheduleService service = ServiceGenerator.createService(ScheduleService.class, UtilToken.getToken(ctx), AuthType.JWT);
        Call<List<ScheduleResponse>> call = service.getOneDay(queryMap);
        call.enqueue(new Callback<List<ScheduleResponse>>() {
            @Override
            public void onResponse(@NonNull Call<List<ScheduleResponse>> call, @NonNull Response<List<ScheduleResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                } else {
                    items = response.body();
                    ArrayAdapter<ScheduleResponse> adapter = new ArrayAdapter<>(ctx, android.R.layout.simple_spinner_dropdown_item, Objects.requireNonNull(items));
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinner_guards.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(@NonNull Call<List<ScheduleResponse>> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void onSubmit() {
        Button btn_new_absence = v.findViewById(R.id.btn_add_absence);
        btn_new_absence.setOnClickListener(v1 -> {
            boolean valid = true;
            List<String> schedule = new ArrayList<>();
            schedule.add(((ScheduleResponse) spinner_guards.getSelectedItem()).getId());
            if (schedule.isEmpty()) {
                Toast.makeText(ctx, "You need to choose an schedule", Toast.LENGTH_SHORT).show();
                valid = false;
            }

            if (valid) {
                NewAbsenceDto absence = new NewAbsenceDto(date.toString(), schedule);
                NotificationService service = ServiceGenerator.createService(NotificationService.class, UtilToken.getToken(ctx), AuthType.JWT);
                Call<ResponseContainer<Substitution>> call = service.createAbsence(absence);
                call.enqueue(new Callback<ResponseContainer<Substitution>>() {
                    @Override
                    public void onResponse(@NonNull Call<ResponseContainer<Substitution>> call, @NonNull Response<ResponseContainer<Substitution>> response) {
                        if (response.isSuccessful()) {
                            dismiss();
                        } else {
                            Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(@NonNull Call<ResponseContainer<Substitution>> call, @NonNull Throwable t) {
                        Log.e("Network Failure", t.getMessage());
                        Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });
    }


}
