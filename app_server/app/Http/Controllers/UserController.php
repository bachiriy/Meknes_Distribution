<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
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
        $user = User::with('roles')->where('id', $user->id)->first();
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
        $data = $request->only('name', 'email', 'password', 'role_id');
        $data['id'] = $id;
        $validator = Validator::make($data, [
            'name' => 'required|max:255',
            'id' => 'required|numeric|exists:users',
            'role_id' => 'required|numeric|exists:roles,id',
            'email' => [
                'email',
                'max:255',
                Rule::unique('users')->ignore($id)
            ]
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::find($id);


        if (isset($data['password'])) {
            $validator = Validator::make(['password' => $data['password']], [
                'password' => 'required|string|min:8'
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $data['password'] = Hash::make($data['password']);
            $user->password = $data['password'];
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->save();
        $this->assignRoleToUser([
            'user_id' => $id,
            'role_id' => $data['role_id']
        ]);
        $user = User::with('roles')->where('id', $id)->first();
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

    function assignRoleToUser($data): void
    {
        $user = User::find($data['user_id']);
        $user->roles()->detach();
        $role = Role::findById($data['role_id'], 'api');
        $user->assignRole($role);
    }
}
