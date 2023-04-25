<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    protected function permissions($permissionName): bool
    {
        if (Auth::check()) {
            return Auth::user()->hasPermissionTo($permissionName);
        }
        return false;
    }
    public function index(Request $request): Response
    {
        $users = User::all();
        return Inertia::render('UserList', [
            'users' => $users,
            'isAdmin' => $this->permissions('Admin')
        ]);
    }

    public function update(User $user, Request  $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user->fill([
            'status' => !$user->status
        ])->save();

        return Redirect::back();
    }
    //
}
