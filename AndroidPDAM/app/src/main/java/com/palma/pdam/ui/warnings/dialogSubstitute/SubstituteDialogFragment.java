package com.palma.pdam.ui.warnings.dialogSubstitute;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.palma.pdam.R;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.UserService;
import com.palma.pdam.util.UtilToken;

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

public class SubstituteDialogFragment extends DialogFragment {

    private Context ctx;
    private List<UserResponse> items;
    private Map<String, String> queryMap;
    private Spinner spinner_guards;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        ctx = context;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        @SuppressLint("InflateParams") View v = Objects.requireNonNull(getActivity()).getLayoutInflater().inflate(R.layout.fragment_dialog_substitute, null);
        queryMap = new HashMap<>();
        queryMap.put("timeInterval", String.valueOf(Objects.requireNonNull(getArguments()).getInt("timeInterval")));
        queryMap.put("date", Objects.requireNonNull(getArguments().getString("date")));
        spinner_guards = v.findViewById(R.id.spinner_guards);
        getDataRest();
        AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
        builder.setTitle(R.string.substitutorTeacher)
                .setView(v)
                .setPositiveButton(R.string.accept, (dialog, id) -> {
                    Intent i = new Intent();
                    i.putExtra("teacherId", ((UserResponse)spinner_guards.getSelectedItem()).getId());
                    i.putExtra("subId", getArguments().getString("subId"));
                    Objects.requireNonNull(getTargetFragment()).onActivityResult(getTargetRequestCode(), Activity.RESULT_OK, i);
                })
                .setNegativeButton(R.string.cancel, (dialog, id) -> dismiss());
        return builder.create();
    }


    private void getDataRest() {
        items = new ArrayList<>();
        UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx), AuthType.JWT);
        Call<List<UserResponse>> call = service.getGuards(queryMap);
        call.enqueue(new Callback<List<UserResponse>>() {
            @Override
            public void onResponse(@NonNull Call<List<UserResponse>> call, @NonNull Response<List<UserResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                } else {
                    items = response.body();
                    ArrayAdapter<UserResponse> adapter = new ArrayAdapter<>(ctx, android.R.layout.simple_spinner_dropdown_item, Objects.requireNonNull(items));
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                    spinner_guards.setAdapter(adapter);
                }
            }
            @Override
            public void onFailure(@NonNull Call<List<UserResponse>> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
            }
        });
    }

}
