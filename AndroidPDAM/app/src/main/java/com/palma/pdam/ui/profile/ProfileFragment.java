package com.palma.pdam.ui.profile;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.palma.pdam.R;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.UserService;
import com.palma.pdam.ui.auth.LoginActivity;
import com.palma.pdam.ui.profile.edit.EditProfileActivity;
import com.palma.pdam.util.UtilToken;

import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ProfileFragment extends Fragment {

    private Context ctx;
    private View view;
    private TextView tv_profile_name, tv_profile_email, tv_profile_absenses, tv_profile_substitutions;
    private ImageView iv_profile_avatar;
    private Button btn_edit_profile;
    private UserResponse user;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        ctx = context;
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_profile, container, false);
        setViewIds();
        loadUserData();
        return view;
    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        inflater.inflate(R.menu.menu_profile, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == R.id.menu_profile_logout) {
            UtilToken.clearAll(ctx);
            startActivity(new Intent(getActivity(), LoginActivity.class));
            Objects.requireNonNull(getActivity()).finish();
        }
        return super.onOptionsItemSelected(item);
    }

    private void setViewIds() {
        setHasOptionsMenu(true);
        tv_profile_name = view.findViewById(R.id.tv_profile_name);
        tv_profile_email = view.findViewById(R.id.tv_profile_email);
        tv_profile_absenses = view.findViewById(R.id.tv_profile_absenses);
        tv_profile_substitutions = view.findViewById(R.id.tv_profile_substitutions);
        iv_profile_avatar = view.findViewById(R.id.iv_profile_avatar);
        btn_edit_profile = view.findViewById(R.id.btn_edit_profile);
    }

    private void loadUserData() {
        view.findViewById(R.id.progressBar).setVisibility(View.VISIBLE);
        view.findViewById(R.id.content).setVisibility(View.GONE);
        view.findViewById(R.id.connection_fails).setVisibility(View.GONE);
        String jwt = UtilToken.getToken(ctx);
        UserService service = ServiceGenerator.createService(UserService.class, jwt, AuthType.JWT);
        Call<UserResponse> call = service.getMe();
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                    view.findViewById(R.id.content).setVisibility(View.GONE);
                    view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
                } else {
                    user = response.body();
                    setUserData();
                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                    view.findViewById(R.id.content).setVisibility(View.VISIBLE);
                    view.findViewById(R.id.connection_fails).setVisibility(View.GONE);
                }
            }

            @Override
            public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
                view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                view.findViewById(R.id.content).setVisibility(View.GONE);
                view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
            }
        });
    }

    private void setUserData() {
        tv_profile_name.setText(user.getName());
        tv_profile_email.setText(user.getEmail());
        tv_profile_absenses.setText(String.valueOf(user.getSubstituted().size()));
        tv_profile_substitutions.setText(String.valueOf(user.getSubstitutionsDone()));
        Glide.with(ctx).load(user.getPicture()).into(iv_profile_avatar);
        btn_edit_profile.setOnClickListener(v -> goEditProfile());
    }

    private void goEditProfile() {
        Intent i = new Intent(getActivity(), EditProfileActivity.class);
        i.putExtra("loggedUser", user);
        Objects.requireNonNull(getActivity()).startActivityForResult(i, 3);
    }
}
