<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'status' => false,
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        $userToken = $user->createToken('api-token')->plainTextToken;

        return response(['token' => $userToken], 200);
    }
    //
}
