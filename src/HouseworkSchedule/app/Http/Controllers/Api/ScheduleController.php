<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;

class ScheduleController extends Controller
{
    public function scheduleindex(Request $request)
    {
        $schedules = Schedule::all();
        return response()->json($schedules);
    }

    public function create(Request $request)
    {
        $schedules = new Schedule;
        $schedules->title = $request->title;
        $schedules->detail = $request->detail;
        $schedules->due_date = $request->due_date;
        $schedules->category = $request->category;
        $schedules->is_complete = $request->is_complete;
        $schedules->save();
        return response()->json($schedules);
    }

    public function edit(Request $request)
    {
        $schedules = Schedule::find($request->id);
        return $schedules;
    }

    public function update(Request $request)
    {
        $schedules = Schedule::find($request->id);
        $schedules->title = $request->title;
        $schedules->detail = $request->detail;
        $schedules->due_date = $request->due_date;
        $schedules->category = $request->category;
        $schedules->is_complete = $request->is_complete;
        $schedules->save();
        return $schedules;
    }

    public function updateDate(Request $request)
    {
        $schedules = Schedule::find($request->id);
        $schedules->due_date = $request->due_date;
        $schedules->save();
        return $schedules;
    }

    public function delete(Request $request)
    {
        $schedule = Schedule::find($request->id);
        $schedule->delete();
        $schedules = Schedule::all();
        return $schedules;
    }
}
