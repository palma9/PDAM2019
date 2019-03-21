package com.palma.pdam.ui.teachers.oneTeacher;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.palma.pdam.R;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.ui.profile.edit.EditProfileActivity;

import java.util.Objects;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.FragmentManager;

public class TeacherProfile extends AppCompatActivity {

    private UserResponse teacher;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_profile);
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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        System.out.println(requestCode);
        System.out.println(resultCode);
        if (resultCode == RESULT_OK && requestCode == 11) reloadTeacherData();
    }

    private void setViewIds() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Objects.requireNonNull(getSupportActionBar()).setDisplayHomeAsUpEnabled(true);

        teacher = (UserResponse) Objects.requireNonNull(getIntent().getExtras()).getSerializable("selectedTeacher");

        TextView tv_profile_name = findViewById(R.id.tv_profile_name);
        tv_profile_name.setText(teacher.getName());
        TextView tv_profile_email = findViewById(R.id.tv_profile_email);
        tv_profile_email.setText(teacher.getEmail());
        TextView tv_profile_absenses = findViewById(R.id.tv_profile_absenses);
        tv_profile_absenses.setText(String.valueOf(teacher.getSubstituted().size()));
        TextView tv_profile_substitutions = findViewById(R.id.tv_profile_substitutions);
        tv_profile_substitutions.setText(String.valueOf(teacher.getSubstitutionsDone()));
        ImageView iv_profile_avatar = findViewById(R.id.iv_profile_avatar);
        Glide.with(this).load(teacher.getPicture()).into(iv_profile_avatar);
        Button btn_edit_profile = findViewById(R.id.btn_edit_profile);
        btn_edit_profile.setOnClickListener(v -> {
            Intent i = new Intent(this, EditProfileActivity.class);
            i.putExtra("loggedUser", teacher);
            this.startActivityForResult(i, 11);
        });
        Button btn_newAbsence = findViewById(R.id.btn_newAbsence);
        btn_newAbsence.setOnClickListener(v -> {
            Bundle bundle = new Bundle();
            bundle.putSerializable("loggedUser", teacher);
            FragmentManager fm = getSupportFragmentManager();
            DialogFragment newFragment = new AbsenceDialogFragment();
            newFragment.setArguments(bundle);
            newFragment.show(fm, "asd");
        });
    }

    private void reloadTeacherData() {
        // TODO get teacher data
    }
}
