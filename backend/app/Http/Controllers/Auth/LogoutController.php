<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * Logout functionality
     */
    public function __invoke(): JsonResponse
    {
        // Logout current device and clear session
        Auth::logout();

        $request = request();

        // Invalidate user's session and regenerate CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'User logged out successfully.',
        ], 200);
    }
}
