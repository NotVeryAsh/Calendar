<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\RegisteredUser;
use App\Models\TeamInvitation;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    /**
     * Register and authenticate the user
     */
    public function authenticate(RegisterRequest $request): JsonResponse
    {
        // Get validated data
        $email = $request->validated('email');
        $username = $request->validated('name');
        $password = $request->validated('password');
        $remember = $request->validated('remember');

        // Create a user based on validated data
        $user = User::query()->create([
            'username' => $username,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        // Authenticate user
        Auth::login($user);

        // Send welcome email
        Mail::to($user)->queue(new RegisteredUser($user));

        return response()->json([
            'message' => 'User registered successfully.',
            'user' => $user,
        ], 201);
    }
}
