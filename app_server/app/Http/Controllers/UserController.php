<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
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

    function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = User::find($request->id);
        $user->delete();
        return response()->json([
            'status' => 'success'
        ]);
    }
}
