package com.palma.pdam.ui.warnings;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.palma.pdam.R;
import com.palma.pdam.data.response.SubstitutionResponse;
import com.palma.pdam.ui.warnings.dialogSubstitute.SubstituteDialogFragment;

import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.util.List;

import androidx.annotation.NonNull;
import androidx.fragment.app.DialogFragment;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;

public class MyWarningRecyclerViewAdapter extends RecyclerView.Adapter<MyWarningRecyclerViewAdapter.ViewHolder> {

    private List<SubstitutionResponse> mValues;
    private final Context ctx;
    private final Fragment f;

    MyWarningRecyclerViewAdapter(List<SubstitutionResponse> items, Context context, Fragment fragment) {
        mValues = items;
        ctx = context;
        f = fragment;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_warning, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tv_timeInterval.setText(String.valueOf(holder.mItem.getSchedule().getTimeInterval()));
        holder.tv_classroom.setText(String.valueOf(holder.mItem.getSchedule().getRoom().getClassNumber()));
        holder.tv_grade.setText(holder.mItem.getSchedule().getSubject().getGrade().getName());
        holder.tv_subject.setText(holder.mItem.getSchedule().getSubject().getName());

        DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        LocalDate date = org.joda.time.LocalDate.parse(holder.mItem.getDate(), formatter);
        holder.tv_date.setText(date.toString());

        holder.mView.setOnClickListener(v ->{
            Bundle bundle = new Bundle();
            bundle.putString("date", date.toString());
            bundle.putInt("timeInterval", holder.mItem.getSchedule().getTimeInterval());
            bundle.putString("subId", holder.mItem.getId());
            DialogFragment df = new SubstituteDialogFragment();
            df.setArguments(bundle);
            df.setTargetFragment(f, 1);
            df.show(((FragmentActivity)ctx).getSupportFragmentManager(), "substituteDialog");
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        final TextView tv_timeInterval, tv_date, tv_classroom, tv_grade, tv_subject;
        SubstitutionResponse mItem;

        ViewHolder(View view) {
            super(view);
            mView = view;
            tv_timeInterval = view.findViewById(R.id.tv_timeInterval);
            tv_date = view.findViewById(R.id.tv_date);
            tv_classroom = view.findViewById(R.id.tv_classroom);
            tv_grade = view.findViewById(R.id.tv_grade);
            tv_subject = view.findViewById(R.id.tv_subject);
        }
    }

    public void setList(List<SubstitutionResponse> list) {
        this.mValues = list;
        notifyDataSetChanged();
    }

    void addAll(List<SubstitutionResponse> newList) {
        int lastIndex = mValues.size();
        mValues.addAll(newList);
        notifyItemRangeInserted(lastIndex, newList.size());
    }
}
