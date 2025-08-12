<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function show(Request $request)
    {
        return response()->json($request->user());
    }
}
