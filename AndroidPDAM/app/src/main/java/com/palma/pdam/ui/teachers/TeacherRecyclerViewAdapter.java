package com.palma.pdam.ui.teachers;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.palma.pdam.R;
import com.palma.pdam.data.response.UserResponse;
import com.palma.pdam.ui.teachers.oneTeacher.TeacherProfile;

import java.util.List;
import java.util.Objects;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

public class TeacherRecyclerViewAdapter extends RecyclerView.Adapter<TeacherRecyclerViewAdapter.ViewHolder> {

    private List<UserResponse> mValues;
    private final Context ctx;
    private final Fragment fragment;

    TeacherRecyclerViewAdapter(List<UserResponse> items, Context context, Fragment f) {
        mValues = items;
        ctx = context;
        fragment = f;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_teacher, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tv_teacher_name.setText(holder.mItem.getName());
        Glide.with(ctx).load(holder.mItem.getPicture()).into(holder.iv_teacher_picture);

        holder.mView.setOnClickListener(v -> {
                Intent i = new Intent(fragment.getActivity(), TeacherProfile.class);
                i.putExtra("selectedTeacher", holder.mItem);
                Objects.requireNonNull(fragment.getActivity()).startActivityForResult(i, 10);
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        final ImageView iv_teacher_picture;
        final TextView tv_teacher_name;
        UserResponse mItem;

        ViewHolder(View view) {
            super(view);
            mView = view;
            iv_teacher_picture = view.findViewById(R.id.iv_teacher_picture);
            tv_teacher_name = view.findViewById(R.id.tv_teacher_name);
        }

        @NonNull
        @Override
        public String toString() {
            return super.toString() + " '" + tv_teacher_name.getText() + "'";
        }
    }

    public void setList(List<UserResponse> list) {
        this.mValues = list;
        notifyDataSetChanged();
    }

    void addAll(List<UserResponse> newList) {
        int lastIndex = mValues.size();
        mValues.addAll(newList);
        notifyItemRangeInserted(lastIndex, newList.size());
    }
}
