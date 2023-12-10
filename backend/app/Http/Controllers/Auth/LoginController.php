<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Authenticate the user with username or email - and password
     */
    public function authenticate(LoginRequest $request): JsonResponse
    {
        $email = $request->validated('identifier');
        $password = $request->validated('password');

        // Attempt to authenticate the user with the identifier (username or email) and password
        $authIsSuccessful = Auth::attempt(['email' => $email, 'password' => $password]);

        // Password is incorrect - we have already established that a user with the identifier exists
        if (! $authIsSuccessful) {

            return response()->json([
                'message' => 'Password is incorrect. Try again or click "Forgot Password" to reset your password.',
            ], 401);
        }

        // Regenerate the session to prevent session fixation attacks
        $request->session()->regenerate();

        // Redirect the user to the intended page, or the dashboard if there is no intended page.
        return response()->json([
            'message' => 'User logged in successfully.',
            'user' => Auth::user(),
        ], 200);
    }
}
