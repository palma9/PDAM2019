package com.palma.pdam.ui.notifications;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.palma.pdam.R;
import com.palma.pdam.data.response.ResponseContainer;
import com.palma.pdam.data.response.SubstitutionResponse;
import com.palma.pdam.retrofit.generator.AuthType;
import com.palma.pdam.retrofit.generator.ServiceGenerator;
import com.palma.pdam.retrofit.service.NotificationService;
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

public class NotificationFragment extends Fragment {

    private View view;
    private LinearLayoutManager mAdapter;
    private MyNotificationRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;
    private SwipeRefreshLayout swipeContainer;
    private Context ctx;

    // Retrofit Params
    private List<SubstitutionResponse> items;
    private Map<String, String> queryData;

    // LoadMore
    private boolean mIsLoading = false;
    private boolean mIsLastPage = false;
    private int pageSize = 30;
    private int mCurrentPage = 1;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_notification_list, container, false);
        setViewIds();
        return view;
    }

    private void setViewIds() {
        ctx = getContext();
        recyclerView = view.findViewById(R.id.list);
        mAdapter = new LinearLayoutManager(ctx);
        recyclerView.setLayoutManager(mAdapter);

        swipeContainer = view.findViewById(R.id.swipeContainer);
        swipeContainer.setOnRefreshListener(() -> {
            mCurrentPage = 1;
            items.clear();
            setQueryData();
            if (swipeContainer.isRefreshing()) {
                swipeContainer.setRefreshing(false);
            }
        });
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
        queryData.put("date", new LocalDate().toString());
        getDataRest();
    }

    private void getDataRest() {
        view.findViewById(R.id.connection_fails).setVisibility(View.GONE);
        view.findViewById(R.id.progressBar).setVisibility(View.VISIBLE);
        items = new ArrayList<>();
        NotificationService service = ServiceGenerator.createService(NotificationService.class, UtilToken.getToken(ctx), AuthType.JWT);
        Call<ResponseContainer<SubstitutionResponse>> call = service.getAllMines(queryData);
        call.enqueue(new Callback<ResponseContainer<SubstitutionResponse>>() {
            @Override
            public void onResponse(@NonNull Call<ResponseContainer<SubstitutionResponse>> call, @NonNull Response<ResponseContainer<SubstitutionResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                    if (mAdapter.getItemCount() == 0) {
                        view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                        view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
                        view.findViewById(R.id.list_empty).setVisibility(View.GONE);
                    }
                } else {
                    items = Objects.requireNonNull(response.body()).getRows();

                    // If first page, init, else add to the list
                    if (mCurrentPage == 1) {
                        adapter = new MyNotificationRecyclerViewAdapter(items);
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.addAll(items);
                        mIsLoading = false;
                    }

                    if (mAdapter.getItemCount() == 0) {
                        view.findViewById(R.id.list_empty).setVisibility(View.VISIBLE);
                    } else {
                        view.findViewById(R.id.list_empty).setVisibility(View.GONE);
                    }

                    // Stop loading more pages
                    if (adapter != null && response.body().getCount() == adapter.getItemCount())
                        mIsLastPage = true;


                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                }
            }
            @Override
            public void onFailure(@NonNull Call<ResponseContainer<SubstitutionResponse>> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
                if (mAdapter.getItemCount() == 0) {
                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                    view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
                    view.findViewById(R.id.list_empty).setVisibility(View.GONE);
                }
            }
        });
    }
}
