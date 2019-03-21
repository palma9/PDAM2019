package com.palma.pdam.ui.teachers;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SearchView;
import android.widget.Toast;

import com.palma.pdam.R;
import com.palma.pdam.data.response.ResponseContainer;
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
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.RecyclerView.OnScrollListener;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TeacherListFragment extends Fragment implements SearchView.OnQueryTextListener {

    private View view;
    private Fragment f;
    private GridLayoutManager mAdapter;
    private TeacherRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;
    private SwipeRefreshLayout swipeContainer;
    private Context ctx;

    // Retrofit Params
    private List<UserResponse> teacherList;
    private Map<String, String> queryData;
    private String filter;

    // LoadMore
    private boolean mIsLoading = false;
    private boolean mIsLastPage = false;
    private int pageSize = 30;
    private int mCurrentPage = 1;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_teacher_list, container, false);
        setViewIds();
        return view;
    }

    private void setViewIds() {
        ctx = getContext();
        f = this;
        setHasOptionsMenu(true);
        recyclerView = view.findViewById(R.id.list);
        mAdapter = new GridLayoutManager(ctx, 3);
        recyclerView.setLayoutManager(mAdapter);

        swipeContainer = view.findViewById(R.id.swipeContainer);
        swipeContainer.setOnRefreshListener(() -> {
            mCurrentPage = 1;
            mIsLastPage = false;
            teacherList.clear();
            setQueryData();
            if (swipeContainer.isRefreshing()) {
                swipeContainer.setRefreshing(false);
            }
        });
        onScroll();
        mCurrentPage = 1;
        setQueryData();
    }

    @Override
    public void onCreateOptionsMenu(@NonNull Menu menu, @NonNull MenuInflater inflater) {
        inflater.inflate(R.menu.menu_people_list, menu);
        SearchView item = (SearchView) menu.findItem(R.id.menu_people_search).getActionView();
        item.setOnQueryTextListener(this);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_people_search:
                break;
        }

        return super.onOptionsItemSelected(item);
    }

    private void onScroll() {
        // initialise loading state
        mIsLoading = false;
        recyclerView.addOnScrollListener(new OnScrollListener() {
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
        if (filter != null)
            queryData.put("q", filter);
        getTeachersData();
    }

    private void getTeachersData() {
        view.findViewById(R.id.connection_fails).setVisibility(View.GONE);
        view.findViewById(R.id.progressBar).setVisibility(View.VISIBLE);
        teacherList = new ArrayList<>();
        UserService service = ServiceGenerator.createService(UserService.class, UtilToken.getToken(ctx), AuthType.JWT);
        Call<ResponseContainer<UserResponse>> call = service.getAll(queryData);
        call.enqueue(new Callback<ResponseContainer<UserResponse>>() {
            @Override
            public void onResponse(@NonNull Call<ResponseContainer<UserResponse>> call, @NonNull Response<ResponseContainer<UserResponse>> response) {
                if (response.code() != 200) {
                    Toast.makeText(ctx, "Request Error", Toast.LENGTH_SHORT).show();
                    if (teacherList.isEmpty()) {
                        view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                        view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
                    }
                } else {
                    teacherList = Objects.requireNonNull(response.body()).getRows();

                    // If first page, init, else add to the list
                    if (mCurrentPage == 1) {
                        adapter = new TeacherRecyclerViewAdapter(teacherList, ctx, f);
                        recyclerView.setAdapter(adapter);
                    } else {
                        adapter.addAll(teacherList);
                        mIsLoading = false;
                    }

                    // Stop loading more pages
                    if (adapter != null && response.body().getCount() == adapter.getItemCount())
                        mIsLastPage = true;


                    view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                }
            }
            @Override
            public void onFailure(@NonNull Call<ResponseContainer<UserResponse>> call, @NonNull Throwable t) {
                Log.e("Network Failure", t.getMessage());
                Toast.makeText(ctx, "Network Error", Toast.LENGTH_SHORT).show();
                view.findViewById(R.id.progressBar).setVisibility(View.GONE);
                view.findViewById(R.id.connection_fails).setVisibility(View.VISIBLE);
            }
        });
    }


    @Override
    public boolean onQueryTextSubmit(String query) {
        filter = query;
        setQueryData();
        return true;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        if (newText.toLowerCase().equals("") || newText.toLowerCase().isEmpty()) {
            filter = null;
            setQueryData();
        }
        return false;
    }
}
