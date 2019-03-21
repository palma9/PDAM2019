package com.palma.pdam.ui.dashboard;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.palma.pdam.R;
import com.palma.pdam.ui.notifications.NotificationFragment;
import com.palma.pdam.ui.profile.ProfileFragment;
import com.palma.pdam.ui.schedule.ScheduleFragment;
import com.palma.pdam.ui.teachers.TeacherListFragment;
import com.palma.pdam.ui.warnings.WarningFragment;
import com.palma.pdam.util.UtilToken;

import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;

import static com.google.android.material.bottomnavigation.BottomNavigationView.OnNavigationItemSelectedListener;

public class DashboardActivity extends AppCompatActivity {

    private BottomNavigationView navigation;
    private Fragment f, schedule, teacherList, warning, notifications, profile;
    private OnNavigationItemSelectedListener mOnNavigationItemSelectedListener = new OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_schedule:
                    f = schedule;
                    break;
                case R.id.navigation_teachers:
                    f = teacherList;
                    break;
                case R.id.navigation_unsubstitutes:
                    f = warning;
                    break;
                case R.id.navigation_notifications:
                    f = notifications;
                    break;
                case R.id.navigation_profile:
                    f = profile;
                    break;
            }
            if (f == null)
                return false;
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.dashboard_container, f)
                    .commit();
            return true;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        createFragments();
        navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        setNavigationMenuItems();
        navigation.setSelectedItemId(R.id.navigation_schedule);
    }

    private void createFragments() {
        schedule = new ScheduleFragment();
        teacherList = new TeacherListFragment();
        warning = new WarningFragment();
        notifications = new NotificationFragment();
        profile = new ProfileFragment();
    }

    private void setNavigationMenuItems() {
        if (UtilToken.getRole(this).equals("teacher")) {
            navigation.getMenu().getItem(1).setVisible(false);
            navigation.getMenu().getItem(2).setVisible(false);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (resultCode == Activity.RESULT_OK && requestCode == 3) {
            Fragment frg = getSupportFragmentManager().findFragmentById(R.id.dashboard_container);
            getSupportFragmentManager().beginTransaction().detach(Objects.requireNonNull(frg)).attach(frg).commitAllowingStateLoss();
        }
    }
}
