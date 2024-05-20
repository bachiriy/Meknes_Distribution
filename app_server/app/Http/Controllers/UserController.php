<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    function index(): \Illuminate\Http\JsonResponse
    {
        $users = User::with('roles')->get();
        $response = [
            'status' => 'success',
            'users' => $users
        ];
        return response()->json($response);
    }

    function store(Request $request): \Illuminate\Http\JsonResponse
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
        $user->assignRole('sub-admin');
        $response = [
            'status' => 'success',
            'message' => 'User is created successfully.',
            'data' => [
                'user' => $user
            ]
        ];
        return response()->json($response);
    }

    function update(Request $request, $id)
    {
        $data = $request->only('name', 'email', 'password');
        $data['id'] = $id;
        $validator = Validator::make($data, [
            'name' => 'required|max:255',
            'id' => 'required|numeric|exists:users',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data['password'] = Hash::make($data['password']);

        $user = User::find($id);
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->save();
        $response = [
            'status' => 'success',
            'message' => 'User is updated successfully.',
            'data' => [
                'user' => $user
            ]
        ];
        return response()->json($response);
    }

    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = User::find($request->id);
        $user->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'User has been deleted successfully'
        ]);
    }

    function assignRoleToUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $data = $request->only('user_id', 'role_id');

        $validator = Validator::make($data, [
            'user_id' => 'required|numeric|exists:users,id',
            'role_id' => 'required|numeric|exists:roles,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::find($data['user_id']);
        $user->roles()->detach();
        $role = Role::findById($data['role_id'], 'api');
        $user->assignRole($role);
        $response = [
            'status' => 'success',
            'message' => 'Role has been assigned to User successfully.',
        ];
        return response()->json($response);
    }
}
