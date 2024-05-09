<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // We don't want to redirect anywhere since it's an API.
        return null;
    }

    /**
     * Handle an unauthenticated user response.
     */
    protected function unauthenticated($request, array $guards)
    {
        return response()->json(['error' => 'Unauthorized access'], 401);
    }
}
