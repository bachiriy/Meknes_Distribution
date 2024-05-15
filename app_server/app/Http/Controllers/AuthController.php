<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->only('name', 'email', 'password');
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        $token = $user->createToken('oauth2')->accessToken;
        $user->assignRole('sub-admin');
        $response = [
            'status' => 'success',
            'message' => 'User is created successfully.',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ];
        return response()->json($response);
    }

    function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        Auth::shouldUse('web');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('Personal Access Token')->accessToken;
            $user = User::with('roles')->where('id', $user->id)->first();
            $response = [
                'status' => 'success',
                'message' => 'User is logged in successfully.',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ],
            ];
            return response()->json($response);
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 401);
        }
    }

    function logout(Request $request)
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
            return response()->json(['message' => 'Logged out successfully']);
        } else {
            return response()->json(['error' => 'Not authenticated']);
        }
    }

    public function isConnected(): \Illuminate\Http\JsonResponse
    {
        return response()->json(['data' => Auth::guard('api')->check()]);
    }
}
