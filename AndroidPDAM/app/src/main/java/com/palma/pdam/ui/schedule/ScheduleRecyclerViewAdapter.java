package com.palma.pdam.ui.schedule;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.palma.pdam.R;
import com.palma.pdam.data.response.ScheduleResponse;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

public class ScheduleRecyclerViewAdapter extends RecyclerView.Adapter<ScheduleRecyclerViewAdapter.ViewHolder> {

    private List<ScheduleResponse> mValues;

    ScheduleRecyclerViewAdapter(List<ScheduleResponse> items) {
        mValues = items;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_schedule, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tv_timeInterval.setText(String.valueOf(holder.mItem.getTimeInterval()));
        holder.tv_classroom.setText(String.valueOf(holder.mItem.getRoom().getClassNumber()));
        holder.tv_grades.setText(holder.mItem.getSubject().getGrade().getName());
        holder.tv_subject.setText(holder.mItem.getSubject().getName());
        holder.tv_teacherName.setText(holder.mItem.getTeacher().getName());
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        ScheduleResponse mItem;
        final TextView tv_timeInterval, tv_classroom, tv_grades, tv_subject, tv_teacherName;

        ViewHolder(View view) {
            super(view);
            mView = view;
            tv_timeInterval = mView.findViewById(R.id.tv_timeInterval);
            tv_classroom = mView.findViewById(R.id.tv_classroom);
            tv_grades = mView.findViewById(R.id.tv_grades);
            tv_subject = mView.findViewById(R.id.tv_subject);
            tv_teacherName = mView.findViewById(R.id.tv_teacherName);
        }
    }

    public void setList(List<ScheduleResponse> list) {
        this.mValues = list;
        notifyDataSetChanged();
    }

    void addAll(List<ScheduleResponse> newList) {
        int lastIndex = mValues.size();
        mValues.addAll(newList);
        notifyItemRangeInserted(lastIndex, newList.size());
    }
}
