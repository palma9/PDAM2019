package com.palma.pdam.ui.schedule;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.palma.pdam.R;
import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.ScheduleResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.ScheduleService;
import com.palma.pdam.util.OnSwipeTouchListener;
import com.palma.pdam.util.UtilToken;

import org.joda.time.LocalDate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ScheduleFragment extends Fragment {

    private View view;
    private LinearLayoutManager mAdapter;
    private ScheduleRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;
    private SwipeRefreshLayout swipeContainer;
    private Context ctx;
    private TextView tv_schedule_day;

    // Retrofit Params
    private List<ScheduleResponse> items;
    private Map<String, String> queryData;
    private int weekday;

    // LoadMore
    private boolean mIsLoading = false;
    private boolean mIsLastPage = false;
    private int pageSize = 30;
    private int mCurrentPage = 1;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_schedule_list, container, false);
        setViewIds();
        return view;
    }

    private void setViewIds() {
        ctx = getContext();
        weekday = new LocalDate().getDayOfWeek();
        recyclerView = view.findViewById(R.id.list);
        mAdapter = new LinearLayoutManager(ctx);
        recyclerView.setLayoutManager(mAdapter);

        swipeContainer = view.findViewById(R.id.swipeContainer);
        swipeContainer.setOnRefreshListener(() -> {
            mCurrentPage = 1;
            weekday = new LocalDate().getDayOfWeek();
            items.clear();
            setQueryData();
            if (swipeContainer.isRefreshing()) {
                swipeContainer.setRefreshing(false);
            }
        });
        tv_schedule_day = view.findViewById(R.id.tv_schedule_day);
        setWeekDayText();
        ImageButton ib_schedule_left = view.findViewById(R.id.ib_schedule_left);
        ImageButton ib_schedule_right = view.findViewById(R.id.ib_schedule_right);
        ib_schedule_left.setOnClickListener(v -> subWeekDay());
        ib_schedule_right.setOnClickListener(v -> addWeekDay());
        onScreenSwipe();
        onScroll();
        mCurrentPage = 1;
        setQueryData();
    }

    private void onScroll() {
        // initialise loading state
        mIsLoading = false;
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
                // number of visible items
                int visibleItemCount = mAdapter.getChildCount();
                // number of items in layout
                int totalItemCount = mAdapter.getItemCount();
                // the position of first visible item
                int firstVisibleItemPosition = mAdapter.findFirstVisibleItemPosition();

                boolean isNotLoadingOrIsLastPage = !mIsLoading && !mIsLastPage;
                // flag if number of visible items is at the last
                boolean isAtLastItem = firstVisibleItemPosition + visibleItemCount >= totalItemCount;
                // validate non negative values
                boolean isValidFirstItem = firstVisibleItemPosition >= 0;
                // validate total items are more than possible visible items
                boolean totalIsMoreThanVisible = totalItemCount >= pageSize;
                // flag to know whether to load more
                boolean shouldLoadMore = isValidFirstItem && isAtLastItem && totalIsMoreThanVisible && isNotLoadingOrIsLastPage;
                if (shouldLoadMore) loadMoreItems();
            }
        });
    }

    private void loadMoreItems() {
        if (!mIsLoading) {
            mCurrentPage = mCurrentPage + 1;
            setQueryData();
        }
        mIsLoading = true;
    }

    private void setQueryData() {
        queryData = new HashMap<>();
        queryData.put("limit", String.valueOf(pageSize));
        queryData.put("page", String.valueOf(mCurrentPage));
        queryData.put("weekday", String.valueOf(weekday));

        getDataRest();
    }

    private void getDataRest() {
        view.findViewById(R.id.connection_fails).setVisibility(View.GONE);
        view.findViewById(R.id.progressBar).setVisibility(View.VISIBLE);
        items = new ArrayList<>();
        ScheduleService service = ServiceGenerator.createService(ScheduleService.class, UtilToken.getToken(ctx), AuthType.JWT);
        Call<ResponseContainer<ScheduleResponse>> call = service.getDaily(queryData);
        call.enqueue(new Callback<ResponseContainer<ScheduleResponse>>() {
            @Override
            public void onResponse(@NonNull Call<ResponseContainer<ScheduleResponse>> call, @NonNull Response<ResponseContainer<ScheduleResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                    if (items.isEmpty()) {
                        view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                        view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
                    }
                } else {
                    items = Objects.requireNonNull(response.body()).getRows();

                    // If first page, init, else add to the list
                    if (mCurrentPage == 1) {
                        adapter = new ScheduleRecyclerViewAdapter(items);
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.addAll(items);
                        mIsLoading = false;
                    }

                    // Stop loading more pages
                    if (adapter != null && response.body().getCount() == adapter.getItemCount())
                        mIsLastPage = true;


                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                }
            }
            @Override
            public void onFailure(@NonNull Call<ResponseContainer<ScheduleResponse>> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
                view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
            }
        });
    }

    private void onScreenSwipe() {
        view.findViewById(R.id.list).setOnTouchListener(new OnSwipeTouchListener(ctx) {
            public void onSwipeRight() {
                subWeekDay();
            }
            public void onSwipeLeft() {
                addWeekDay();
            }
        });
    }

    private void addWeekDay() {
        weekday = weekday >= 5 ? 1 : weekday+1;
        setWeekDayText();
        setQueryData();
    }

    private void subWeekDay() {
        weekday = weekday <= 1 ? 5 : weekday-1;
        setWeekDayText();
        setQueryData();
    }

    private void setWeekDayText() {
        switch (weekday) {
            case 1:
                tv_schedule_day.setText(R.string.monday);
                break;
            case 2:
                tv_schedule_day.setText(R.string.tuesday);
                break;
            case 3:
                tv_schedule_day.setText(R.string.wednesday);
                break;
            case 4:
                tv_schedule_day.setText(R.string.thursday);
                break;
            case 5:
                tv_schedule_day.setText(R.string.friday);
                break;
        }
    }
}
