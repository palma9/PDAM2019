package com.palma.pdam.ui.profile.edit;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.palma.pdam.R;
import com.palma.pdam.data.dto.EditPasswordDto;
import com.palma.pdam.data.dto.EditProfileDto;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.UserService;
import com.palma.pdam.util.UtilToken;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import okhttp3.Credentials;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditProfileActivity extends AppCompatActivity {

    private ImageView iv_editProfile_avatar;
    private TextView tv_editProfile_name, tv_editProfile_email, tv_editProfile_oldPass, tv_editProfile_newPass;
    private Uri imageUri;

    private UserResponse loggedUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        loggedUser = (UserResponse) Objects.requireNonNull(getIntent().getExtras()).getSerializable("loggedUser");
        setViewIds();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            super.onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void setViewIds() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayHomeAsUpEnabled(true);

        iv_editProfile_avatar = findViewById(R.id.iv_editProfile_avatar);
        Glide.with(this).load(loggedUser.getPicture()).into(iv_editProfile_avatar);
        tv_editProfile_name = findViewById(R.id.tv_editProfile_name);
        tv_editProfile_name.setText(loggedUser.getName());
        tv_editProfile_email = findViewById(R.id.tv_editProfile_email);
        tv_editProfile_email.setText(loggedUser.getEmail());
        tv_editProfile_oldPass = findViewById(R.id.tv_editProfile_oldPass);
        tv_editProfile_newPass = findViewById(R.id.tv_editProfile_newPass);

        LinearLayout editPicture = findViewById(R.id.editPicture);
        editPicture.setOnClickListener(v -> onEditPicture());
        Button btn_editProfile = findViewById(R.id.btn_EditProfile);
        btn_editProfile.setOnClickListener(v -> onEditProfile());
        Button btn_editPass = findViewById(R.id.btn_editPass);
        btn_editPass.setOnClickListener(v -> onEditPassword());
    }

    private void onEditProfile() {
        boolean valid = true;
        String name = tv_editProfile_name.getText().toString();
        String email = tv_editProfile_email.getText().toString();
        if (name.isEmpty()) {
            tv_editProfile_name.setError(getString(R.string.error_name_empty));
            valid = false;
        } else {
            tv_editProfile_name.setError(null);
        }
        if (email.isEmpty() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            tv_editProfile_email.setError(getString(R.string.error_valid_email));
            valid = false;
        } else {
            tv_editProfile_email.setError(null);
        }

        if (valid) {
            EditProfileDto ep = new EditProfileDto(name, email);
            UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(this), AuthType.JWT);
            Call<UserResponse> call = service.edit(loggedUser.getId(), ep);
            call.enqueue(new Callback<UserResponse>() {
                @Override
                public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                    if (response.isSuccessful()) {
                        setResult(RESULT_OK);
                        finish();
                        } else {
                        Toast.makeText(EditProfileActivity.this, "Request Error", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                    Log.e("Network Failure", t.getMessage());
                    Toast.makeText(EditProfileActivity.this, "Network Error", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private void onEditPassword() {
        boolean valid = true;
        String oldPass = tv_editProfile_oldPass.getText().toString();
        String newPass = tv_editProfile_newPass.getText().toString();
        if (oldPass.isEmpty() || oldPass.length() < 6) {
            tv_editProfile_oldPass.setError(getString(R.string.error_short_password));
            valid = false;
        } else tv_editProfile_oldPass.setError(null);
        if (newPass.isEmpty() || newPass.length() < 6) {
            tv_editProfile_newPass.setError(getString(R.string.error_valid_email));
            valid = false;
        } else tv_editProfile_newPass.setError(null);

        if (valid) {
            EditPasswordDto ep = new EditPasswordDto(newPass);
            String credentials = Credentials.basic(loggedUser.getEmail(), oldPass);
            UserService service = ServiceGenerator.createService(UserService.class, credentials, AuthType.BASIC);
            Call<UserResponse> call = service.editPassword(loggedUser.getId(), ep);
            call.enqueue(new Callback<UserResponse>() {
                @Override
                public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                    if (response.isSuccessful()) {
                        setResult(RESULT_OK);
                        finish();
                    } else {
                        Toast.makeText(EditProfileActivity.this, "Request Error", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                    Log.e("Network Failure", t.getMessage());
                    Toast.makeText(EditProfileActivity.this, "Network Error", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private void onEditPicture() {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, 4);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        iv_editProfile_avatar = findViewById(R.id.iv_editProfile_avatar);
        iv_editProfile_avatar.setScaleType(ImageView.ScaleType.CENTER_CROP);
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 4:
                if (resultCode == RESULT_OK) {
                    imageUri = data.getData();
                    uploadPhoto();
                }
                break;
        }
    }

    public void uploadPhoto() {
        try {
            InputStream inputStream = getContentResolver().openInputStream(imageUri);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
            int cantBytes;
            byte[] buffer = new byte[1024 * 4];

            while ((cantBytes = bufferedInputStream.read(buffer, 0, 1024 * 4)) != -1) {
                baos.write(buffer, 0, cantBytes);
            }

            RequestBody requestFile = RequestBody.create(MediaType.parse(Objects.requireNonNull(getContentResolver().getType(imageUri))), baos.toByteArray());

            MultipartBody.Part body = MultipartBody.Part.createFormData("photo", "photo", requestFile);

            UserService userService = ServiceGenerator.createService(UserService.class, UtilToken.getToken(this), AuthType.JWT);
            Call<UserResponse> callPhoto = userService.photo(loggedUser.getId(), body);
            callPhoto.enqueue(new Callback<UserResponse>() {
                @Override
                public void onResponse(@NonNull Call<UserResponse> call, @NonNull Response<UserResponse> response) {
                    if (response.isSuccessful()) {
                        setResult(RESULT_OK);
                        finish();
                    } else {
                        Log.e("Upload error", Objects.requireNonNull(response.errorBody()).toString());
                    }

                }

                @Override
                public void onFailure(@NonNull Call<UserResponse> call, @NonNull Throwable t) {
                    Log.e("Upload error", t.getMessage());
                }
            });

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
