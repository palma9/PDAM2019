package com.palma.pdam.ui.auth;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;
import com.palma.pdam.R;
import com.palma.pdam.data.response.LoginResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.AuthService;
import com.palma.pdam.ui.dashboard.DashboardActivity;
import com.palma.pdam.util.UtilToken;

import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Response;


public class LoginActivity extends AppCompatActivity {

    private Button btn_login;
    private TextInputEditText input_email, input_password;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme_Login);
        super.onCreate(savedInstanceState);
        if (UtilToken.getToken(this) != null) {
            startActivity(new Intent(LoginActivity.this, DashboardActivity.class));
            finish();
        }
        setContentView(R.layout.activity_login);
        setViewComponents();
    }

    private void setViewComponents() {
        btn_login = findViewById(R.id.btn_login);
        input_email = findViewById(R.id.input_email);
        input_password = findViewById(R.id.input_password);
        btn_login.setOnClickListener(v -> login());
    }

    private void login() {
        if (!validateFields()) {
            onLoginFailed();
            return;
        }

        btn_login.setEnabled(false);

        final ProgressDialog progressDialog = new ProgressDialog(this,
                R.style.AppTheme_Dialog);
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage("Authenticating...");
        progressDialog.show();

        String username_txt = input_email.getText().toString();
        String password_txt = input_password.getText().toString();
        String credentials = Credentials.basic(username_txt, password_txt);
        AuthService service = ServiceGenerator.createService(AuthService.class, credentials, AuthType.BASIC);
        Call<LoginResponse> call = service.doLogin(credentials);
        call.enqueue(new retrofit2.Callback<LoginResponse>() {
            @Override
            public void onResponse(@NonNull Call<LoginResponse> call, @NonNull Response<LoginResponse> response) {
                if (response.code() != 201) {
                    progressDialog.dismiss();
                    btn_login.setEnabled(true);
                    Log.e("RequestError", response.message());
                    Toast.makeText(LoginActivity.this, getString(R.string.error_login), Toast.LENGTH_SHORT).show();
                } else {
                    UtilToken.setToken(LoginActivity.this, Objects.requireNonNull(response.body()).getToken());
                    UtilToken.setId(LoginActivity.this, response.body().getUser().getId());
                    UtilToken.setRole(LoginActivity.this, response.body().getUser().getRole());
                    progressDialog.dismiss();
                    btn_login.setEnabled(true);
                    if (response.body().getUser().getRole().equals("admin")) {
                        Toast.makeText(LoginActivity.this, getString(R.string.error_admin_login), Toast.LENGTH_SHORT).show();
                    } else {
                        startActivity(new Intent(LoginActivity.this, DashboardActivity.class));
                        finish();
                    }
                }
            }
            @Override
            public void onFailure(@NonNull Call<LoginResponse> call, @NonNull Throwable t) {
                progressDialog.dismiss();
                btn_login.setEnabled(true);
                Log.e("NetworkFailure", t.getMessage());
                Toast.makeText(LoginActivity.this, getString(R.string.error_server_connection), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void onLoginFailed() {
        Toast.makeText(this, "Login failed", Toast.LENGTH_LONG).show();
        btn_login.setEnabled(true);
    }

    private boolean validateFields() {
        boolean valid = true;

        String email = input_email.getText().toString();
        String password = input_password.getText().toString();

        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            input_email.setError(getString(R.string.error_valid_email));
            valid = false;
        } else {
            input_email.setError(null);
        }

        if (password.isEmpty() || password.length() < 6) {
            input_password.setError(getString(R.string.error_short_password));
            valid = false;
        } else {
            input_password.setError(null);
        }

        return valid;
    }


}

